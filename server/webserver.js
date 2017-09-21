const express = require('express');
var credentials = require('./mysqlCredentials');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const webserver = express();


webserver.use(express.cookieParser('testsecret'));
webserver.use(express.cookieSession());
// Andy put this here for dev purposes, will allow Cross-Origin requests, but will most likely need to remove for production
webserver.use(cors());


webserver.use(bodyParser.urlencoded({ extended: false }))
webserver.use(bodyParser.json());
webserver.use(express.static(path.resolve(__dirname, 'public')));

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
    }
    else{
        console.log("Query key puzzles is not present");
    }
});

function getMostRecent10Puzzles(res){
    var query = "SELECT p.puzzle_name, u.username AS creator, p.type, p.size, p.url_ext, p.likes, p.dislikes, p.date_created " +
                "FROM `puzzles` AS `p` " +
                "JOIN `users` AS `u`" +
                "ON p.creator_id = u.u_id";
    pool.query(query, (err, rows, fields) => {
        if(err) console.log(err);
        else res.end(JSON.stringify({success: true, data: rows}));
    });
}

webserver.post('/create/word_guessing', function(req, res){

});

webserver.listen(4000, function(){
    console.log('Webserver listening on port 4000');
});

