const apiRoutes = (function(){
	// Dependencies
	const multer = require('multer');
	const upload = multer({ dest: './client/upload'});

	const fs = require('fs');
		
	const helpers = require('./helpers');

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
	router.post('/upload', upload.single('image'), async (req, res) => {
		const filePath = req.file.path;
		//pass the file to google vision which returns tags associated with that image
		const tagsArray = await helpers.detectLabels(filePath);
		//top three tags to be displayed on page
		const topThree = tagsArray.slice(0,3);
		//delete the uploaded file after we're done using it
		fs.unlink(filePath, (err) => {
			if (err) throw err;
			console.log('successfully deleted');
		  });
		//make DB call for photos with same tag association
		db.Tags.findAll({
			where: {
				tag_name: tagsArray
			}
		}).then(function (Tags) {
			db.Photos.findAll({
				where: {
					id: helpers.mostFreqId(helpers.createIdArray(Tags))
				}
			}).then(function (photoId) {
				console.log(photoId);
			});
			console.log(helpers.mostFreqId(helpers.createIdArray(Tags)))
		})
	});

	// Get the images of a particular keyword
	router.get("/search-tags/:tag_name", (req, res) => {
		db.Tags.findAll({
			where: {
				tag_name: req.params.tag_name
			}
		}).then(function (tags) {
			db.Photos.findAll({
				where: {
					id: tags[0].photo_id
				}
			}).then(function (photoId) {
				res.json(photoId);
			});
		});
	});

	// Test DB get routes
	router.get("/all-photos", (req, res) => {
		res.json({photos: "allthephotos"});
		// db.Photos.findAll().then(Photos => {
		// 	res.json(Photos);
		// })
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