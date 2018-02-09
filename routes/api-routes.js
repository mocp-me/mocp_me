const apiRoutes = (function(){
	// Dependencies
	const multer = require('multer');
	const upload = multer({ dest: './client/upload'})

	const API_KEY = 'AIzaSyBY93fja8yxM9not6Nrd2v6NsRgNpJ4ZvM';
	
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

	function detectLabels(filePath) {
		// [START vision_label_detection]
		// Imports the Google Cloud client library
		const vision = require('@google-cloud/vision');
	  
		// Creates a client
		// const client = new vision.ImageAnnotatorClient();
		console.log('==================================')
		console.log('vision', vision);
		console.log('==================================')
		const client = new vision.ImageAnnotatorClient({
			projectId: 'cool-citadel-192004',
			keyFilename: './keys.json'
		  });
	 
		// Performs label detection on the local file
		client
		  .labelDetection(filePath)
		  .then(results => {
			const labels = results[0].labelAnnotations;
			console.log('Labels:');
			labels.forEach(label => console.log(label));
		  })
		  .catch(err => {
			console.error('ERROR:', err);
		  });
		// [END vision_label_detection]
	  }


	router.post('/upload', upload.single('image'), (req, res, next) => {
		console.log('==================================')
		console.log('file upload', req.file.path);
		console.log('==================================')
		const filePath = req.file.path;
		detectLabels(filePath)
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

	//Gets the best image based on array from Google Vision
	router.get("/get-matched-image/:array_string", (req, res) => {
		console.log("\n------------------------------------------")
		var array = req.params.array_string;
		array = array.split(',');


		console.log(array);
		db.Tags.findAll({
			where: {
				tag_name: array
			}
		}).then(function (Tags) {
			db.Photos.findAll({
				where: {
					id: helpers.mostFreqId(helpers.createIdArray(Tags))
				}
			}).then(function (photoId) {
				res.json(photoId);
			});
			console.log(helpers.mostFreqId(helpers.createIdArray(Tags)))
		})
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