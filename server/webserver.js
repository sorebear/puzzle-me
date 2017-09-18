const express = require('express');
var credentials = require('./mysqlCredentials');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const webserver = express();

webserver.use(bodyParser.urlencoded({ extended: false }))
webserver.use(bodyParser.json());
webserver.use(express.static('public'));

const pool = mysql.createPool(credentials);
pool.getConnection(function(err, conn){
   if(err) console.log("Error connecting to MySQL database");
});

// webserver.get('/puzzles', function(req, res){
//     console.log("req.query.retrieve is: ", req.query.retrieve);
//     if(req.query.retrieve){
//         switch(req.query.retrieve) {
//             case 'recent10':
//                 getMostRecent10Puzzles(res);//grab 10 most recent puzzles from database
//                 break;
//             default:
//                 console.log("unknown query value for puzzles key");
//         }
//     }
//     else{
//         console.log("Query key puzzles is not present");
//     }
// });
//
// function getMostRecent10Puzzles(res){
//     var query = "SELECT p.puzzle_name, u.username AS creator, p.type, p.size, p.url_ext, p.likes, p.dislikes, p.date_created " +
//                 "FROM `puzzles` AS `p` " +
//                 "JOIN `users` AS `u`" +
//                 "ON p.creator_id = u.u_id";
//     pool.query(query, (err, rows, fields) => {
//         if(err) console.log(err);
//         else res.end(JSON.stringify({success: true, data: rows}));
//     });
// }

// webserver.get('/',function(req,res){
//     console.log('sending data of file',__dirname);
//     res.sendFile(__dirname + '/public/index.html');
//     //res.end();
// })


//webserver.use(express.static('public'));

//webserver.use(express.bodyParser());
// webserver.get('/', function(req,res){
//     console.log("We have a received a GET request");
//     const connection = mysql.createConnection(credentials);
//     connection.connect(function(err){
//         if(err) throw err;
//         console.log('connected to database');
//         connection.query("SELECT * FROM users", (err, rows, fields) => {
//             if(err) console.log(err);
//             else console.log(fields);
//
//
//             //res.end(JSON.stringify(rows));
//             //res.end(rows);
//             //console.log(rows);
//         });
//     });
//     //res.end('get off my lawn');
// });
// webserver.post('/users', function(req,res){
//     console.log("post variables", req.body);
//     const {host, port, username: user , password, db: database} = credentials;
//     const newCredentials = {host, port, user, password, database};
//     console.log(newCredentials);
//     const connection = mysql.createConnection(newCredentials);
//     connection.connect(function(){
//         console.log('connected to database');
//         connection.query(
//             `INSERT INTO users
//                 SET username = '${req.body.username}',
//                 password = SHA1('${req.body.password}'),
//                 email = '${req.body.email}'`,
//             function (err, results, fields) {
//                 const output = {
//                     success: true,
//                     results: results
//                 };
//                 res.end(JSON.stringify(output));
//             });
//         //incomplete, didn't capture all of Dan's coding
//     });
// })
webserver.listen(3000, function(){
    console.log('Webserver listening on port 3000');
});

