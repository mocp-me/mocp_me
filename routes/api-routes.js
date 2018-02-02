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
	// Get the images of a particular keyword
	router.get("/search-tags/:tag_name", function (req, res) {
		db.Tags.findAll({
			where: {
				tag_name: req.params.tag_name
			}
		}).then(function (dbTags) {
			db.Photos.findAll({
				where: {
					id: dbTags[0].photo_id
				}
			}).then(function (photoId) {
				res.json(photoId);
			});
		});
	});

	// Test DB get routes
	router.get("/all-photos", (req, res) => {
		db.Photos.findAll().then(Photos => {
			res.json(Photos);
		})
	});

	router.get("/all-tags", (req, res) => {
		db.Tags.findAll().then(Tags => {
			res.json(Tags);
		})
	});

	// Catch-all route
	router.get("*", (req, res) => res.json({answer: 42}));

	return router;
	
})();

module.exports = apiRoutes;