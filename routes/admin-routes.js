const adminRoutes = (function(){
	// Clears terminal window
	process.stdout.write('\033c');
	console.log("\n\n\nadmin-routes.js loaded\n\n\n");
	// Dependencies
	const jwt = require('express-jwt');
	const jwks = require('jwks-rsa');
	const path = require("path");
	const bodyParser = require("body-parser");
	// Passes the db object to the routes
	const db = require("./../models/index");

	// Instantiate express router
	const router = require("express").Router();

	// Middleware
	router.use(bodyParser.urlencoded({extended: false}));
	router.use(bodyParser.json());

	var jwtCheck = jwt({
	    secret: jwks.expressJwtSecret({
	        cache: true,
	        rateLimit: true,
	        jwksRequestsPerMinute: 5,
	        jwksUri: "https://mocp-me.auth0.com/.well-known/jwks.json"
	    }),
	    audience: 'https://localhost:3000/admin',
	    issuer: "https://mocp-me.auth0.com/",
	    algorithms: ['RS256']
	});

	router.use(jwtCheck)


	// API Routes go here
	// Get the images of a particular keyword
	// router.get("/search-tags/:tag_name", (req, res) => {
	// 	db.Tags.findAll({
	// 		where: {
	// 			tag_name: req.params.tag_name
	// 		}
	// 	}).then(function (tags) {
	// 		db.Photos.findAll({
	// 			where: {
	// 				id: tags[0].photo_id
	// 			}
	// 		}).then(function (photoId) {
	// 			res.json(photoId);
	// 		});
	// 	});
	// });

	// Test DB get routes
	// router.get("/all-photos", (req, res) => {
	// 	db.Photos.findAll().then(Photos => {
	// 		res.json(Photos);
	// 	})
	// });

	router.get("/all-tags", (req, res) => {
		console.log("admin/all-tags call received by backend");
		res.json({tags: "all of the tags"});
		// db.Tags.findAll().then(Tags => {
		// 	res.json(Tags);
		// })
	});

	// Catch-all route
	// router.get("*", (req, res) => res.json({answer: 42}));

	return router;
	
})();

module.exports = adminRoutes;