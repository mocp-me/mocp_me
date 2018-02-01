const apiRoutes = (function(){

	// Dependencies
	const path = require("path");
	const bodyParser = require("body-parser");
	// Passes the db object to the routes
	const db = require("./../models/index");

	// Instantiate express router
	const router = require("express").Router();

	// Middleware
	router.use(bodyParser.urlencoded({extended: false}));
	router.use(bodyParser.json());

	// API Routes go here

	// Test DB get route
	router.get("/all-photos", (req, res) => {
		db.Photos.findAll().then(Photos => {
			res.json(Photos);
		})
	});

	// router.get("/all-tags", (req, res) => {
	// 	db.tags.findAll().then(tags => {
	// 		res.json(tags);
	// 	})
	// });

	// Catch-all route
	router.get("*", (req, res) => res.json({answer: 42}));

	return router;
	
})();

module.exports = apiRoutes;