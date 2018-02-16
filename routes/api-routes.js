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
	router.post('/upload', upload.single('image'), (req, res) => {
		const fileName = req.file.filename;
		res.json(fileName)
	});

	router.get('/vision/:file', async (req, res) => {
		const file = req.params.file;
		const filePath = `client/upload/${file}`;
		//pass the file to google vision which returns tags associated with that image
		const tagsArray = await helpers.detectLabels(filePath);
		//top three tags to be displayed on page
		const visionTopTags = tagsArray.slice(0,3);
		//delete the uploaded file after we're done using it
		fs.unlink(filePath, (err) => {
			if (err) throw err;
			console.log('upload successfully deleted');
		  });
		//make DB call for photos with same tag association
		db.Tags.findAll({
			where: {
				tag_name: tagsArray
			}
		}).then(Tags => {
			db.Photos.findAll({
				where: {
					id: helpers.mostFreqId(helpers.createIdArray(Tags))
				},
				include: [{
					model: db.Tags
				}]
				
			}).then(results => {
				const appendedResults = results[0].dataValues;
				appendedResults.visionTopTags = visionTopTags;
				res.json(appendedResults)
			});
		})
	});

	// Get the images of a particular keyword
	router.get("/search-tags/:tag_name", (req, res) => {
		let arr = [];
		db.Tags.findAll({
			where: {
				tag_name: req.params.tag_name
			}
		}).then(Tags => {
			Tags.forEach(i => {
				arr.push(i.photo_id);
			})
		}).then(function(){
			db.Photos.findAll({
				where: {
					id: {
						$in: arr
					}
				},
				include: [{
					model: db.Tags
				}]
			}).then( matched => {
				res.json(matched)
			})
		})
	});

	// Test DB get routes
	router.get("/all-photos", (req, res) => {
		db.Photos.findAll({
			limit: 10,
			include: [{
				model: db.Tags
			}]
		}).then(Photos => {
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