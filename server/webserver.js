const express = require("express");
var credentials = require("./mysqlCredentials");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
// const cookieParser = require('cookie-parser');
//const cookieSession = require('cookie-session');
const cookieSession = require("express-session");
const webserver = express();
const generatePuzzleID = require("./helperFunctions.js");
const baselinePointsPerPuzzle = 100;
// const PORT = process.env.PORT || 4000;
const PORT = 4000;


//webserver.use(cookieParser('testsecret'));
webserver.set("trust proxy", 1);
webserver.use(
	cookieSession({
		//path: '/',
		domain: "localhost:3000",
		httpOnly: false,
		secure: false,
		maxAge: 14 * 24 * 60 * 60 * 1000,
		secret: "puzme",
		resave: true,
		saveUninitialized: true
	})
);
var allowCrossDomain = function(req, res, next) {
	res.header(
		"Access-Control-Allow-Headers",
		"Content-Type, Authorization, Content-Length, X-Requested-With"
	);
	res.header("Access-Control-Allow-Origin", "http://localhost:3000");
	res.header(
		"Access-Control-Allow-Methods",
		"GET,PUT,POST,DELETE,PATCH,OPTIONS"
	);
	res.header("Access-Control-Allow-Credentials", true);
	next();
};

webserver.use(allowCrossDomain);

// Andy put this here for dev purposes, will allow Cross-Origin requests, but will most likely need to remove for production
//webserver.use(cors());

webserver.use(bodyParser.urlencoded({ extended: false }));
webserver.use(bodyParser.json());
webserver.use(express.static(path.resolve(__dirname, "client", "dist")));

const pool = mysql.createPool(credentials);

pool.getConnection(function(err, conn) {
	if (err) console.log("Error connecting to MySQL database");
});

function respondWithError(res, err) {
	res.end(JSON.stringify({ success: false, errors: err }));
}

/*//////////////////////////////////////////////////////////
//RETRIEVE PUZZLES FROM DATABASE FUNCTIONS//////////////////
//////////////////////////////////////////////////////////*/

webserver.get("/puzzles", function(req, res) {
	console.log("req.query.retrieve is: ", req.query.retrieve);
	if (req.query.retrieve) {
		switch (req.query.retrieve) {
			case "all":
				getAllPuzzles(res); 
				break;
			default:
				console.log("unknown query value for puzzles key");
		}
	} else if (req.query.url_ext) {
		console.log("Request URL is: ", req.query.url_ext);
		getGamePlayInfo(res, req.query.url_ext);
	} else {
		console.log("Query key puzzles is not present");
	}
});

function getAllPuzzles(res) {
	var query =
		"SELECT p.puzzle_name, u.username AS creator, p.type, p.size, p.url_ext, " + 
		"p.likes, p.dislikes, p.date_created, p.puzzle_object, p.avg_time_to_complete " +
		"FROM `puzzles` AS `p` " +
		"JOIN `users` AS `u`" +
		"ON p.creator_id = u.u_id";
	pool.query(query, (err, rows, fields) => {
		if (err) console.log(err);
		else res.end(JSON.stringify({ success: true, data: rows }));
	});
}

function getGamePlayInfo(res, url_ext) {
	console.log("Inside of getGamePlayInfo function");
	var query = `SELECT * FROM puzzles WHERE url_ext='${url_ext}'`;
	console.log("QUERY is: ", query);
	pool.query(query, (err, rows, fields) => {
		if (err) console.log(err);
		else res.end(JSON.stringify({ success: true, data: rows }));
	});
}

function getPuzzleInfoFromPuzzleURL(url_ext, callback) {
	var query = `SELECT * FROM puzzles WHERE url_ext='${url_ext}'`;
	console.log("QUERY is: ", query);
	pool.query(query, (err, rows, fields) => {
		if (err) {
			callback(false, err);
		} else {
			callback(rows[0]);
		}
	});
}

/*//////////////////////////////////////////////////////////
//RETRIEVE RANDOM INFO FUNCTIONS////////////////////////////
//////////////////////////////////////////////////////////*/

webserver.get("/getOneRandom", function(req, res) {
	console.log("INCOMING GET ONE RANDOM REQUEST: ", req.query.database, req.query.column);
	if (req.query.database && req.query.column) {
		let query = "SELECT " + req.query.column + " FROM " + 
		req.query.database + " ORDER BY RAND() LIMIT 1"
		pool.query(query, (err, rows, fields) => {
			if (err) { console.log("ERROR: ", err)}
			else {
				res.json({success: true, data: rows})
			}
		})
	} else {
		console.log("Proper query keys are not present");
	}
}); 

/*//////////////////////////////////////////////////////////
//USER PROFILE FUNCTIONS////////////////////////////////////
//////////////////////////////////////////////////////////*/

webserver.get("/getProfile", function(req, res) {
	console.log("INCOMING GET PROFILE REQUEST: ", req.query.user_id);
	let facebookID = null;
	if (req.query.user_id !== "my_profile") {
		facebookID = req.query.user_id
	} else {
		facebookID = req.session.userid
	}
	let profileQuery = 
		"SELECT username, profile_pic, exp_gained, u_id " + 
		"FROM users WHERE facebook_u_id=" + facebookID
	pool.query(profileQuery, (err, rows, fields) => {
		if (err) { console.log(err) }
		else { 
			console.log("RESPOSNE OF FIRST CALL: ", rows);
			res.json({ Success: true, data : rows }); 
		}
	});
});

webserver.get("/getUserPuzzles", function(req, res) {
	console.log("GET USER PUZZLES QUERY: ", req.query.user_id);
	let createdQuery = 
		"SELECT puzzle_name, type, size, url_ext, avg_time_to_complete, " + 
		"likes, dislikes, date_created, total_plays " + 
		"FROM puzzles WHERE creator_id=" + req.query.user_id
	let solvedQuery = 
		"SELECT p.puzzle_name, p.type, p.size, p.url_ext, p.avg_time_to_complete, " +
		"p.likes, p.dislikes, p.date_created, p.total_plays, " +
		"s.completionTime, s.completionRegistered, u.username, u.profile_pic " +
		"FROM `puzzles` AS `p` " + 
		"JOIN `puzzleSolutionTimes` AS `s` ON s.puzzle_id=p.p_id " +
		"JOIN `users` AS `u` ON u.u_id=p.creator_id " +
		"WHERE s.user_id=" + req.query.user_id + " " +
		"AND s.firstCompletion=1"
	pool.query(createdQuery, (err, createdRows, fields) => {
		if (err) { console.log(err) }
		else { 
			// console.log("RESPONSE OF FIRST CALL: ", createdRows)
			// console.log("GET SOLVED query = ", solvedQuery);
			pool.query(solvedQuery, (err, solvedRows, fields) => {
				if (err) { console.log(err) }
				else { 
					// console.log("RESPONSE OF SECOND CALL: ", solvedRows)
					res.json({ 
						Success: true, 
						createdData : createdRows,
						solvedData : solvedRows 
					}); 
				}
			});
		}
	});
})

webserver.post("/updateProfile", function(req, res) {
	console.log("INCOMING UPDATE PROFILE REQUEST");
	if (req.body.updateField) {
		switch (req.body.updateField) {
			case "profileInfo":
				updateProfileInfo(req, res);
				break;
			case "numOfPuzzlesSolved":
				updateNumOfPuzzlesSolved(req, res);
				break;
			default:
				console.log("Unknown Data Request")		
		}
	}
});

function updateNumOfPuzzlesSolved(req, res) {
	let query = `SELECT COUNT()`
}

function updateProfileInfo (req, res) {
	console.log("REQUEST BODY: ", req.body)
	let query =`UPDATE users SET profile_pic = ${req.body.newAvatar}, ` + 
	`username = '${req.body.newUsername}' WHERE u_id = ${req.body.u_id}`;
	console.log("UPDATE PROFILE PIC QUERY: ", query);
	pool.query(query, (err, rows, fields) => {
		if (err) {
			respondWithError(res, err);
		} else {
			res.json({ success: true });
		}
	});
}

/*//////////////////////////////////////////////////////////
//DISPLY RANKING FUNCTIONS//////////////////////////////////
//////////////////////////////////////////////////////////*/

webserver.get("/getRankings", function(req, res) {
	console.log("req.query.retrieve is: ", req.query.retrieve);
	if (req.query.retrieve) {
		switch (req.query.retrieve) {
			case "user":
				getUserRankings(res);
				break;
			default:
				console.log("unknown query value for puzzles key");
		}
	} else {
		console.log("Query key puzzles is not present");
	}
});

function getUserRankings(res) {
	// var query = `SELECT * FROM users`;
	let query = 
		"SELECT username, exp_gained, facebook_u_id, profile_pic, account_created " + 
		"FROM users ORDER BY exp_gained DESC";
	console.log("query = ", query);
	pool.query(query, (err, rows, fields) => {
		if (err) {
			respondWithError(res, err);
		} else {
			res.json({ Success: true, data: rows });
		}
	});
}

/*//////////////////////////////////////////////////////////
//CALCULATE AVG SCORES AND RANKINGS/////////////////////////
//////////////////////////////////////////////////////////*/

function calculatePuzzleRatings(res, callback) {
	let query =
		"SELECT puzzle_id, AVG(completionTime) AS average_time FROM puzzleSolutionTimes WHERE firstCompletion=1 AND status='enabled' GROUP BY puzzle_id";
	pool.query(query, (err, rows, fields) => {
		if (err) {
			respondWithError(res, err);
		} else {
			let combinedQuery = `UPDATE puzzles SET avg_time_to_complete = CASE`;
			rows.forEach(entry => {
				combinedQuery += `WHEN p_id = '${entry.puzzle_id}' THEN '${entry.average_time}'`;
			});
			combinedQuery += `ELSE avg_time_to_complete END`;
			pool.query(combinedQuery, (err, rows, fields) => {
				callback(rows);
			});
		}
	});
}

function calculateAvgTimeForPuzzleTypeAndSize(callback) {
	let query = `SELECT p.p_id AS puzzle_id, AVG(pST.completionTime) as averagePuzzleTime, p.type, p.size FROM 
   	puzzleSolutionTimes AS pST
	JOIN puzzles AS p 
   	ON p.p_id = pST.puzzle_id
   	WHERE status='enabled' AND firstCompletion=1
   	GROUP BY p.type, p.size`;
	pool.query(query, (err, rows, fields) => {
		var data = {};
		rows.forEach(row => {
			data[row.puzzle_id] = row;
		});
		callback({ err, data });
	});
}

/*//////////////////////////////////////////////////////////
//FACEBOOK O-AUTH FUNCTIONS ////////////////////////////////
//////////////////////////////////////////////////////////*/

webserver.get("/checkLoginStatus", function(req, res) {
	if (req.session.userid === undefined) {
		res.end(
			JSON.stringify({ success: false, errors: ["user not logged in"] })
		);
	} else {
		res.end(
			JSON.stringify({ success: true, data: "User Logged In"})
		)
	}
});

function getUserIDFromFacebookID(fb_id, callback) {
	var query = `SELECT u_id FROM users WHERE facebook_u_id=?`;
	console.log("GET USERID QUERY is: ", query);
	pool.query(query, [fb_id], (err, rows, fields) => {
		if (err) {
			callback(false, err);
		} else {
			if (rows.length) {
				callback(rows[0].u_id);
			} else {
				callback(false, "no user id");
			}
		}
	});
}

function checkUserLoggedIn(user_id, res) {
	if (user_id === undefined) {
		res.end(
			JSON.stringify({ success: false, errors: ["user not logged in"] })
		);
	} else {
		res.end(
			JSON.stringify({ success: true, data: "User Logged In"})
		)
	}
}

webserver.post("/login", function(req, res) {
	//set the session cookie to have the facebook user id.
	var facebook_uid = req.body.response.authResponse.userID;
	req.session.userid = facebook_uid;
	//check if the user is in the database, if not add them to it
	var query = `SELECT * FROM users WHERE facebook_u_id=?`;
	console.log("query: " + query);
	var result = pool.query(query, [facebook_uid], (err, rows, fields) => {
		if (err) {
			respondWithError(res, err);
		} else {
			if (rows.length === 0) {
				query = `INSERT INTO users SET facebook_u_id=?, username=?, account_created = NOW()`;
				pool.query(query,[facebook_uid, req.body.response.username],
					function(error, results) {
						if (error) {
							respondWithError(res, err);
						} else {
							res.end(JSON.stringify({ success: true, action: "created", profilePic: 0 }));
						}
					}
				);
			} else {
				res.end(JSON.stringify({ success: true, action: "login" }));
			}
		}
	});
});

/*//////////////////////////////////////////////////////////
//SUBMITTING PUZZLES AND TIMES TO THE DATABASE FUNCTIONS////
//////////////////////////////////////////////////////////*/

webserver.post("/savepuzzle", function(req, res) {
	let data = req.body;
	console.log("******* SESSION: ", req.session);
	getUserIDFromFacebookID(req.session.userid, user_id => {
		checkUserLoggedIn(user_id, res);
		const HARDCODED_COMPLETE = "yes";
		const code = generatePuzzleID();
		let query = `INSERT INTO puzzles SET 
    		puzzle_name = '${data.puzzle_name}',
    		creator_id =  '${user_id}',
    		type = '${data.type}',
    		size = '${data.size}',
    		puzzle_object = '${JSON.stringify(data.puzzle_object)}',
    		completely_built = '${HARDCODED_COMPLETE}',
    		url_ext = '${code}',
    		avg_time_to_complete = 0,
    		likes = 0,
    		dislikes = 0,
    		date_created = NOW(),
    		total_plays = 0
        `;
		pool.query(query, (err, rows, fields) => {
			if (err) console.log(err);
			else res.end(JSON.stringify({ success: true, queryID: code }));
		});
	});
});

webserver.post("/puzzleComplete", function(req, res) {
	let data = req.body;
	let user_id = 0;
	console.log("request body", req.body);
	getPuzzleInfoFromPuzzleURL(data.queryID, puzzleData => {
		getUserIDFromFacebookID(req.session.userid, user_id => {
			getPuzzleCompletionsByUser(
				user_id,
				puzzleData.p_id,
				completionData => {
					if (completionData.length > 0 || puzzleData.creator_id === user_id) {
						var first_puzzle = 0;
					} else {
						first_puzzle = 1;
						calcNewPuzzleAvgTime(data.completionTime, puzzleData);
					}
					let query = `INSERT INTO puzzleSolutionTimes SET 
                    user_id = '${user_id}',
                    puzzle_id = '${puzzleData.p_id}',
                    completionTime = '${data.completionTime}',
                    completionRegistered = NOW(),
                    status = 'enabled',
					firstCompletion = ${first_puzzle}`;
					console.log("POST QUERY: ", query);
					let distFromAvg = puzzleData.avg_time_to_complete - data.completionTime
					pool.query(query, (err, rows, fields) => {
						if (err) {
							console.log(err);
						} else {
							res.end(JSON.stringify({ 
								success: true, 
								firstCompletion : first_puzzle,
								creator : puzzleData.creator_id,
								solver : user_id,
								distFromAvg : distFromAvg,
								new_exp_points : Math.sign(distFromAvg) === 1 ? 50 + distFromAvg : 50
							}));
						}
					});
				}
			);
		});
	});
});

function calcNewPuzzleAvgTime(newTime, pData) {
	const newAvgTime = (pData.avg_time_to_complete * pData.total_plays + newTime) / (pData.total_plays + 1);
	console.log("YOUR NEW AVERAGE TIME: ", newAvgTime);
	let query = 
		`UPDATE puzzles SET avg_time_to_complete = ${newAvgTime}, 
		total_plays=${pData.total_plays + 1} WHERE p_id=${pData.p_id}`;
	pool.query(query, (err, rows, fields) => {
		if (err) {
			console.log("ERROR CALCULATING NEW TIME: ", err);
		} else {
			console.log("AVG TIME UPDATED");
		}
	})
}

webserver.post("/updateXP", function(req, res) {
	console.log("INCOMING UPDATE XP REQUEST ", req.body);
	let query = `UPDATE users SET exp_gained = exp_gained + ${req.body.new_exp_points} WHERE u_id=${req.body.user}`
	pool.query(query, (err, rows, fields) => {
		if (err) {
			console.log("ERROR ADDING NEW EXP POINTS")
		} else {
			console.log("EXP POINTS UPDATED");
			res.json({ success: true, data: rows})
		}
	})
});

function getPuzzleCompletionsByUser(user_id, puzzle_id, callback) {
	var query = `SELECT * FROM puzzleSolutionTimes WHERE user_id='${user_id}' AND puzzle_id='${puzzle_id}'`;
	console.log("GET PUZZLE QUERY: ", query)
	pool.query(query, (err, rows, fields) => {
		if (err) {
			respondWithError(res, err);
		} else {
			callback(rows);
		}
	});
}

/*//////////////////////////////////////////////////////////
//INITIALIZING FUNCTIONS////////////////////////////////////
//////////////////////////////////////////////////////////*/

webserver.get("*", function(req, res) {
	// console.log('gettting here');
	// console.log('req.session is: ', req.session);
	res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
});

webserver.listen(PORT, function() {
	console.log("Webserver listening on port %d", PORT);
});

/*//////////////////////////////////////////////////////////
//UNUSED FUNCTIONS//////////////////////////////////////////
//////////////////////////////////////////////////////////*/

	/*//////////////////////////////////////////////////////////
	//LOAD INITIAL PUZZLE PLAY STATE FUNCTIONS//////////////////
	//////////////////////////////////////////////////////////*/

	// webserver.get("/getPuzzleFromId", function(req, res) {
	// 	console.log("req.query.retrieve is: ", req.query.retrieve);
	// 	if (req.query.retrieve) {
	// 		switch (req.query.retrieve) {
	// 			case "getPuzzleFromId":
	// 				getPuzzleFromId(res, req.query.p_id);
	// 				break;
	// 			default:
	// 				console.log("unknown query value for puzzles key");
	// 		}
	// 	} else {
	// 		console.log("Query key puzzles is not present");
	// 	}
	// });

	// function getPuzzleFromId(res, id) {
	// 	var query = `SELECT * FROM puzzles where p_id=${id}`;
	// 	console.log("query = ", query);
	// 	pool.query(query, (err, rows, fields) => {
	// 		if (err) {
	// 			respondWithError(res, err);
	// 		} else {
	// 			res.json({ Success: true, data: rows });
	// 		}
	// 	});
	// }

	// function getPuzzlesByUser(user_id, requesting_own_data, callback) {
	// 	var subquery = "";
	// 	var queryFields = "";
	// 	if (!requesting_own_data) {
	// 		subquery = " AND completely_built = 'Yes'";
	// 		queryFields = "completely_built, ";
	// 	}
	// 	var query = `SELECT puzzle_name, url_ext, type, size, ${queryFields}
	//         avg_time_to_complete, likes, dislikes, UNIX_TIMESTAMP(date_created) as date_created, total_plays
	//         FROM puzzles WHERE creator_id = ? ${subquery}`;

	// 	let result = pool.query(query, [user_id], (err, rows, fields) => {
	// 		console.log(result.sql);
	// 		if (err) {
	// 			callback(false, err);
	// 		} else {
	// 			callback(rows);
	// 		}
	// 	});
	// }

	// webserver.post("/getPuzzlesByUser", function(req, res) {
	// 	console.log("GET PUZZLES BY USER IS BEING CALLED")
	// 	if (req.body.user_id) {
	// 		var user_id = req.body.user_id;
	// 		var get_own_data = true;
	// 	} else {
	// 		user_id = req.session.userid;
	// 		get_own_data = false;
	// 	}
	// 	console.log("checking for ", req.body.user_id, req.session);
	// 	if (user_id !== false) {
	// 		getUserIDFromFacebookID(user_id, simple_user_id => {
	// 			console.log("LINE 109 user id:", user_id, simple_user_id);
	// 			getPuzzlesByUser(
	// 				simple_user_id,
	// 				get_own_data,
	// 				(puzzleData, err) => {
	// 					if (puzzleData) {
	// 						res.end(
	// 							JSON.stringify({ success: true, data: puzzleData })
	// 						);
	// 					} else {
	// 						respondWithError(res, err);
	// 					}
	// 				}
	// 			);
	// 		});
	// 	}
	// });

	// webserver.use(cookieSession({
	//     name: 'puzme',
	//     keys: ['testsecret']
	// }));

	// function calculateSolverRatingsForUser(user_id, res, callback) {
	// 	let query = `SELECT p.p_id AS puzzle_id, pST.completionTime as puzzleTime, p.type, p.size FROM 
	//    	puzzleSolutionTimes AS pST
	//  	JOIN puzzles AS p 
	//    	ON p.p_id = pST.puzzle_id
	//    	WHERE status='enabled' AND firstCompletion=1 AND user_id = ${user_id}`;

	// 	pool.query(query, (err, rows, fields) => {
	// 		var userData = {};
	// 		for (let entry of rows) {
	// 			userData[entry.puzzle_id] = entry;
	// 		}
	// 		//TODO: really need to make this only check the puzzles that the user has completed, or
	// 		//do a total calculation periodically and then draw from that.
	// 		calculateAvgTimeForPuzzleTypeAndSize(response => {
	// 			if (response.err) {
	// 				respondWithError(res, response.err);
	// 			} else {
	// 				let totalPoints = 0;
	// 				for (let id in userData) {
	// 					if (response.data[id] !== undefined) {
	// 						userData[id].globalAverageTime =
	// 							response.data[id].averagePuzzleTime;
	// 						console.log("user time: " + userData[id].puzzleTime);
	// 						console.log(
	// 							"global time: " + userData[id].globalAverageTime
	// 						);
	// 						let mult =
	// 							1 +
	// 							(1 -
	// 								userData[id].puzzleTime /
	// 									userData[id].globalAverageTime);
	// 						let points = baselinePointsPerPuzzle * mult;
	// 						console.log("points: " + points);
	// 						userData[id].points = points;
	// 						totalPoints += points;
	// 					}
	// 					let query = `UPDATE users SET composite_solver_ranking = ${totalPoints} WHERE u_id = ${user_id}`;
	// 					console.log(query);
	// 					pool.query(query, (err, rows, fields) => {
	// 						if (!err) {
	// 							res.end(
	// 								JSON.stringify({
	// 									success: true,
	// 									solver_score: totalPoints >> 0
	// 								})
	// 							);
	// 						} else {
	// 							respondWithError(res, response.err);
	// 						}
	// 					});
	// 				}
	// 			}
	// 		});
	// 	});

		/*SELECT AVG(pST.completionTime) as averagePuzzleTime, p.type, p.size FROM 
	puzzleSolutionTimes AS pST
	JOIN puzzles AS p 
	ON p.p_id = pST.puzzle_id
	GROUP BY p.type, p.size*/


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

	// webserver.get("/calculateRatings", function(req, res) {
	// 	calculatePuzzleRatings(res, data => {
	// 		console.log(data);
	// 		res.end(JSON.stringify(data));
	// 	});
	// });

	// webserver.post("/calculateSolverRatings", function(req, res) {
	// 	calculateSolverRatingsForUser(req.body.userID, res, data => {
	// 		res.end(JSON.stringify(data));
	// 	});
	// });

	// webserver.post("/test", function(req, res) {
	// 	console.log("test: ", req.session);
	// 	res.end("<pre>" + JSON.stringify(req.session) + "</pre>");
	// });

	// webserver.get("/getUserPuzzles", function(req, res) {
	// 	console.log("GET USER PUZZLES QUERY: ", req.query);
	// 	if (req.query.retrieve) {
	// 		switch (req.query.retrieve) {
	// 			case "getCreatedPuzzles":
	// 				getCreatedPuzzles(res, req.query.user_id);
	// 				break;
	// 			case "getSolvedPuzzles":
	// 				getSolvedPuzzles(res, req.query.user_id);
	// 				break;
	// 			case "getSolvedPuzzlesDetails":
	// 				getSolvedPuzzlesDetails(res, req.query.p_ids);
	// 				break;
	// 			default:
	// 				console.log("unknown query value for puzzles key");
	// 		}
	// 	} else {
	// 		console.log("Query key puzzles is not present");
	// 	}
	// });


	// function getCreatedPuzzles(res, user_id) {
	// 	console.log("INTO GET CREATED PUZZLES");
	// 	var query = `SELECT * FROM puzzles where creator_id=${user_id}`;
	// 	console.log("GET CREATED PUZZLES QUERY: ", query);
	// 	pool.query(query, (err, rows, fields) => {
	// 		if (err) {
	// 			respondWithError(res, err);
	// 		} else {
	// 			res.json({ Success: true, data: rows });
	// 		}
	// 	});
	// }

	// function getSolvedPuzzles(res, user_id) {
	// 	console.log("INTO GET SOLVED PUZZLES");
	// 	var query = `SELECT puzzle_id FROM puzzleSolutionTimes where user_id=${user_id}`;
	// 	console.log("GET SOLVED PUZZLES QUERY: ", query)
	// 	pool.query(query, (err, rows, fields) => {
	// 		if (err) {
	// 			respondWithError(res, err);
	// 		} else {
	// 			res.json({ Success: true, data: rows });
	// 		}
	// 	});
	// }

	// function getSolvedPuzzlesDetails(res, p_ids) {
	// 	console.log("INTO GET SOLVED PUZZLES");
	// 	var query = `SELECT * FROM puzzles where ${p_ids}`;
	// 	console.log("GET PUZZLE DETAILS QUERY: ", query)
	// 	pool.query(query, (err, rows, fields) => {
	// 		if (err) {
	// 			respondWithError(res, err);
	// 		} else {
	// 			res.json({ Success: true, data: rows });
	// 		}
	// 	});
	// }
////////////////////////////////////////////////////////////