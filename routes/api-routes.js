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
	router.get("/search-tags/:tag_name", (req, res) => {
		db.Photos.findAll({
			include: [{
				model: db.Tags,
				as: 'Tags',
				where: {
					'tag_name': req.params.tag_name
				}
			}]
		}).then(function (response) {
			res.json(response)
			// db.Photos.findAll({
			// 	where: {
			// 		id: tags.photo_id
			// 	}
			// }).then(function (photoId) {
			// 	res.json(photoId);
			// });
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
			// Creates an array of all the photo_id
			var photoArray = [];
			for (let i = 0; i < Tags.length; i++) {
				photoArray.push(Tags[i].photo_id)
			}
			// Finds the function that was returned the most.
			function mostFreqId(idArr) {
				console.log('hello')
				const idMap = {};
				let maxId = null;
				let max = 0;
				idArr.forEach(id => {
					idMap[id] = idMap[id] +1 || 1
				})
				for (let id in idMap) {
					if(idMap[id] > max) {
						max = idMap[id];
						maxId = id;
					}
				}
				return maxId
			}
			db.Photos.findAll({
				where: {
					id: mostFreqId(photoArray)
				}
			}).then(function (photoId) {
				res.json(photoId);
			});
			console.log(mostFreqId(photoArray))
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