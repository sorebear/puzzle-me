const express = require('express');
var credentials = require('./mysqlCredentials');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const webserver = express();
webserver.post('/users', function(req,res){
    console.log("post variables", req.body);
    const {host, port, username: user , password, db: database} = credentials;
    const newCredentials = {host, port, user, password, database};
    console.log(newCredentials);
    const connection = mysql.createConnection(newCredentials);
    connection.connect(function(){
        console.log('connected to database');
        connection.query(
            `INSERT INTO users
                SET username = '${req.body.username}',
                password = SHA1('${req.body.password}'),
                email = '${req.body.email}'`,
            function (err, results, fields) {
                const output = {
                    success: true,
                    results: results
                };
                res.end(JSON.stringify(output));
            });
        //incomplete, didn't capture all of Dan's coding
    });
})
webserver.get('/', function(req,res){

    const {host, port, username: user , password, db: database} = credentials;
    const newCredentials = {host, port, user, password, database};
    console.log(newCredentials);
    const connection = mysql.createConnection(newCredentials);
    connection.connect(function(){
        console.log('connected to database');
        connection.query("SELECT * FROM users", (err, rows, fields) => {
            //res.end(JSON.stringify(rows));
            res.end(rows);
            //console.log(rows);
        });
    });
    //res.end('get off my lawn');
});
webserver.listen(3000, function(){
    console.log('Example listening on port 3000');
});
