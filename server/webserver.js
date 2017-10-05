const express = require('express');
var credentials = require('./mysqlCredentials');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
// const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const webserver = express();
const generatePuzzleID = require('./helperFunctions.js');

const baselinePointsPerPuzzle = 100;

const PORT = process.env.PORT || 4000;


//webserver.use(cookieParser('testsecret'));
webserver.set('trust proxy', 1);
webserver.use(cookieSession({
    name: 'puzme',
    keys: ['testsecret']
}));
// Andy put this here for dev purposes, will allow Cross-Origin requests, but will most likely need to remove for production
webserver.use(cors());


webserver.use(bodyParser.urlencoded({ extended: false }))
webserver.use(bodyParser.json());
webserver.use(express.static(path.resolve(__dirname, '..', 'client', 'dist')));

const pool = mysql.createPool(credentials);
pool.getConnection(function(err, conn){
   if(err) console.log("Error connecting to MySQL database");
});

webserver.get('/puzzles', function(req, res){
    console.log("req.query.retrieve is: ", req.query.retrieve);
    if(req.query.retrieve){
        switch(req.query.retrieve) {
            case 'recent10':
                getMostRecent10Puzzles(res);//grab 10 most recent puzzles from database
                break;
            default:
                console.log("unknown query value for puzzles key");
        }
    } else if (req.query.url_ext) {
        console.log("Request URL is: ", req.query.url_ext);
        getGamePlayInfo(res, req.query.url_ext);
    }
    else {
        console.log("Query key puzzles is not present");
    }
});

webserver.get('/getPuzzlesByUser', function(req, res){
    var user_id = req.body.user_id;
    var query = `SELECT url_ext FROM puzzles WHERE creator_id = ${user_id}`;
    pool.query(query, (err, rows, fields) => {
        if(err) {
            respondWithError(res, err);
        } else {
            var query = `SELECT  `
        }
    });     
});

function getGamePlayInfo(res, url_ext){
    console.log("Inside of getGamePlayInfo function");
    var query = `SELECT * FROM puzzles WHERE url_ext='${url_ext}'`
    console.log("QUERY is: ", query);
    pool.query(query, (err, rows, fields) => {
        if(err) console.log(err);
        else res.end(JSON.stringify({success: true, data: rows}));
    });
}

function respondWithError(res, err){
    res.end(JSON.stringify({success: false, errors: err}));
}

function getPuzzleInfoFromPuzzleURL(url_ext, callback){
    var query = `SELECT * FROM puzzles WHERE url_ext='${url_ext}'`
    console.log("QUERY is: ", query);
    pool.query(query, (err, rows, fields) => {
        if(err) {
            respondWithError(res, err);
        } else {
            callback(rows[0]);
        }
    });    
}

function getMostRecent10Puzzles(res){
    var query = "SELECT p.puzzle_name, u.username AS creator, p.type, p.size, p.url_ext, p.likes, p.dislikes, p.date_created, p.puzzle_object, p.avg_time_to_complete " +
                "FROM `puzzles` AS `p` " +
                "JOIN `users` AS `u`" +
                "ON p.creator_id = u.u_id";
    pool.query(query, (err, rows, fields) => {
        if(err) console.log(err);
        else res.end(JSON.stringify({success: true, data: rows}));
    });
}

function getPuzzleCompletionsByUser(user_id, puzzle_id, callback){
    var query = `SELECT * FROM puzzleSolutionTimes WHERE user_id='${user_id}' AND puzzle_id='${puzzle_id}'`;
    pool.query(query, (err, rows, fields) => {
        if(err) {
            respondWithError(res, err);
        }
        else {
            callback(rows);
        }
    });    
}

function calculatePuzzleRatings(res,callback){
    let query = "SELECT puzzle_id, AVG(completionTime) AS average_time FROM puzzleSolutionTimes WHERE firstCompletion=1 AND status='enabled' GROUP BY puzzle_id";
    pool.query(query, (err, rows, fields) => {
        if(err) {
            respondWithError(res, err);
        }
        else {
            let combinedQuery = `
            UPDATE puzzles SET 
                avg_time_to_complete = CASE `;
            rows.forEach(entry=>{
                combinedQuery += `
                    WHEN p_id = '${entry.puzzle_id}' THEN '${entry.average_time}'`;
            });
            combinedQuery+= `
            ELSE avg_time_to_complete END`;
            pool.query(combinedQuery, (err, rows, fields) =>{
                callback(rows);
            })
            
        }
    }); 
}

function calculateAvgTimeForPuzzleTypeAndSize(callback){
    let query = `SELECT p.p_id AS puzzle_id, AVG(pST.completionTime) as averagePuzzleTime, p.type, p.size FROM 
   puzzleSolutionTimes AS pST
 JOIN puzzles AS p 
   ON p.p_id = pST.puzzle_id
   WHERE status='enabled' AND firstCompletion=1
   GROUP BY p.type, p.size`;
   pool.query(query, (err, rows, fields) => {
        var data = {};
        rows.forEach((row=>{
            data[row.puzzle_id] = row;
        }));
        callback({err, data});
   });   
}

function calculateSolverRatingsForUser(user_id, res, callback){
    let query = `SELECT p.p_id AS puzzle_id, pST.completionTime as puzzleTime, p.type, p.size FROM 
   puzzleSolutionTimes AS pST
 JOIN puzzles AS p 
   ON p.p_id = pST.puzzle_id
   WHERE status='enabled' AND firstCompletion=1 AND user_id = ${user_id}`;

   pool.query(query, (err, rows, fields) => {
        var userData = {};
        for( let entry of rows){
            userData[entry.puzzle_id] = entry;
        }
        //TODO: really need to make this only check the puzzles that the user has completed, or
        //do a total calculation periodically and then draw from that.
        calculateAvgTimeForPuzzleTypeAndSize(response=>{
            if(response.err){
                respondWithError(res, response.err);
            } else {
                let totalPoints = 0;
                for(let id in userData){
                    if(response.data[id]!==undefined){
                        userData[id].globalAverageTime = response.data[id].averagePuzzleTime;
                        console.log('user time: '+userData[id].puzzleTime);
                        console.log('global time: '+userData[id].globalAverageTime);
                        let mult = 1 + (1 - (userData[id].puzzleTime / userData[id].globalAverageTime));
                        let points = baselinePointsPerPuzzle * mult;
                        console.log('points: '+points);
                        userData[id].points = points;
                        totalPoints+=points;                  
                    }
                    let query = `UPDATE users SET composite_solver_ranking = ${totalPoints} WHERE u_id = ${user_id}`;
                    console.log(query);
                    pool.query(query, (err, rows, fields) => {
                        if(!err){
                            res.end(JSON.stringify({success: true, solver_score: totalPoints>>0}));
                        } else {
                            respondWithError(res, response.err);
                        }
                    });                       
                }
            }
        });
   });   

    /*SELECT AVG(pST.completionTime) as averagePuzzleTime, p.type, p.size FROM 
   puzzleSolutionTimes AS pST
 JOIN puzzles AS p 
   ON p.p_id = pST.puzzle_id
   GROUP BY p.type, p.size*/
}

// webserver.post('/login', function(req, res){
//     //console.log("We received facebook data: ", req.body);
//     //set the session cookie to have the facebook user id.
//     var facebook_uid =  req.body.response.authResponse.userID;
//     req.session.userid = facebook_uid;
//     //check if the user is in the database, if not add them to it
//     var query = `SELECT * FROM users WHERE facebook_u_id='${facebook_uid}'`;
//     pool.query(query, (err,rows,fields) => {
//         console.log("Here are the rows: ", rows);
//         if(rows.length === 0){
//             query = `INSERT INTO users (facebook_u_id) VALUES (${facebook_uid})`;
//             pool.query(query, function(error, results){
//                 if(error) console.log("Error inserting into users table: ", error);
//                 else console.log("results.affectedRows is: ", results.affectedRows);
//             });
//         }
//     });
//     res.end("Successful Login");
// });
//
// webserver.post('/create/word_guessing', function(req, res){
//
// });

webserver.get('/calculateRatings', function(req, res){
    calculatePuzzleRatings(res,data=>{
        console.log(data);
        res.end(JSON.stringify(data));
    })
});
webserver.post('/calculateSolverRatings', function(req, res){
    calculateSolverRatingsForUser(req.body.userID,res, data =>{
        res.end(JSON.stringify(data));
    })
});
webserver.post('/login', function(req, res){
    //console.log("We received facebook data: ", req.body);
    //set the session cookie to have the facebook user id.
    var facebook_uid =  req.body.response.authResponse.userID;
    console.log('session: ',req.session);
    req.session.userid = facebook_uid;
    //check if the user is in the database, if not add them to it
    var query = `SELECT * FROM users WHERE facebook_u_id='${facebook_uid}'`;
    console.log("query: "+query);
    pool.query(query, (err,rows,fields) => {
        console.log("Here are the rows: ", rows);
        if(rows.length === 0){
            query = `INSERT INTO users SET facebook_u_id='${facebook_uid}', account_created = NOW()`;
            pool.query(query, function(error, results){
                if(error) console.log("Error inserting into users table: ", error);
                else console.log("results.affectedRows is: ", results.affectedRows);
            });
        }
    });
    res.end("Successful Login");
});

webserver.post('/savepuzzle', function(req, res){
    // console.log("req.query.retrieve is: ", req.query.retrieve);
    // console.log("data: "+JSON.stringify(req.body));
    let data = req.body;
    const HARDCODED_ID = 4;
    const HARDCODED_COMPLETE = 'yes';
    const code = generatePuzzleID();
	let query = `INSERT INTO puzzles SET 
		puzzle_name = '${data.puzzle_name}',
		creator_id =  '${HARDCODED_ID}',
		type = '${data.type}',
		size = '${data.size}',
		puzzle_object = '${JSON.stringify(data.puzzle_object)}',
		completely_built = '${HARDCODED_COMPLETE}',
		url_ext = '${code}',
		competitive_mode_enabled = 'No',
		avg_time_to_complete = 0,
		likes = 0,
		dislikes = 0,
		date_created = NOW(),
		total_plays = 0
    `;
    
    pool.query(query, (err, rows, fields) => {
        if(err) console.log(err);
        else res.end(JSON.stringify({success: true, queryID: code}));
    });
});
webserver.post('/puzzleComplete', function(req, res){
    let data = req.body;
    console.log('puzzle data:', data);
    const HARDCODED_ID = 4;
    let user_id  = HARDCODED_ID;
    // console.log(req.body);
    getPuzzleInfoFromPuzzleURL(data.queryID, puzzleData =>{
        console.log(puzzleData);
        getPuzzleCompletionsByUser(user_id, puzzleData.p_id, (completionData)=>{
            if(completionData.length>0){
                var first_puzzle = 0;
            } else {
                first_puzzle = 1;
            }
            if(puzzleData.avg_time_to_complete !== 0 && data.completionTime > puzzleData.avg_time_to_complete*2){
                var status = 'outOfRange';
            } else {
                status = 'enabled'
            }
            //need to put a check here to validate times that are beyond the expected norm
             let query = `INSERT INTO puzzleSolutionTimes SET 
                user_id = '${HARDCODED_ID}',
                puzzle_id = '${puzzleData.p_id}',
                completionTime = '${data.completionTime}',
                completionRegistered = NOW(),
                status = '${status}',
                firstCompletion = ${first_puzzle}
            `;
            
            pool.query(query, (err, rows, fields) => {
                if(err){
                    console.log(err);
                }
                else {
                    res.end(JSON.stringify({success: true}))   
                } ;
            });
        })
      
    });
});
webserver.get('*', function(req, res){
    // console.log('gettting here');
    // console.log('req.session is: ', req.session);
    res.sendFile(path.resolve(__dirname, '..', 'client', 'dist', 'index.html'));
});

webserver.listen(PORT, function(){
    console.log('Webserver listening on port %d', PORT);
});

//(To Go elsewhere) If a request is received with a session cookie that doesn't
//have facebook user id, redirect to login page