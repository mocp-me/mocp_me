const apiRoutes = (() => {
	// Dependencies
	const Multer = require('multer');
	
	const multer = Multer({ 
		storage: Multer.MemoryStorage,
		fileSize: 5 * 1024 * 1024
	});

	const Sequelize = require('sequelize');
	const Op = Sequelize.Op;
	
	const imgUpload = require('./imgUpload');

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
	router.post('/upload', multer.single('image'), imgUpload.uploadToGcs, (req, res) => {
		const data = req.body;
		if (req.file && req.file.cloudStoragePublicUrl) {
		  data.imageUrl = req.file.cloudStoragePublicUrl;
		}
		res.json(data);
	  })


	router.get('/vision/:file', async (req, res) => {
		const file = req.params.file;
		//pass the file to google vision which returns tags associated with that image
		const tagsArray = await helpers.detectLabels(file);
		//top three tags to be displayed on page
		const visionTopTags = tagsArray.slice(0,3);
		//delete the uploaded file after we're done using it
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
				if(!results.length) {
					res.send('no results')
					return;
				}
				const appendedResults = results[0].dataValues;
				appendedResults.visionTopTags = visionTopTags;
				res.json(appendedResults)
			});
		})
	});

	router.post('/submit-photo', (req, res) => {
		console.log('stuff to be saved to the new db pending successful save', req.body)
		let fileName = req.body.uploadedImg;
		fileName = fileName.split('/');
		fileName = fileName[fileName.length-1];
		helpers.submit(fileName);
	});

	router.post('/submit-tag', (req, res) => {
		console.log("route hit: ", req.body)
		const { id, tag } = req.body
		db.UserTags.findOrCreate({
			where: {
				tag_name: tag,
				photo_id: id
			}
		}).spread((tag, created) => {
			console.log(tag.get({
			  plain: true
			}));
			console.log("tag created: ", created)
		  });
		});
	
	// Get the images of a particular keyword
	router.get("/search-tags/:tag_name/:random?", (req, res) => {
		const arr = [];
		const queryParams = {
			where: {
				tag_name: req.params.tag_name
			}
		};

		if(req.params.random) {
			queryParams.limit = 5;
			queryParams.order = [ Sequelize.fn('RAND') ];
		}

		db.Tags.findAll(queryParams).then(Tags => {
			Tags.forEach(i => {
				arr.push(i.photo_id);
			})
		}).then(() => {
			db.Photos.findAll({
				where: {
					id: {
						$in: arr
					}
				},
				include: [{
					model: db.Tags
				}]
			}).then(matched => {
				res.json(matched)
			});
		});
	});

	router.get('/check-tag/:tag_name', (req, res) => {
		db.Tags.findOne({
			where: {
				tag_name: req.params.tag_name
			}
		}).then(result => {
			res.json(result);
		})
	})

	// Test DB get routes
	router.get("/all-photos", (req, res) => {
		db.Photos.findAll({
			include: [{
				model: db.Tags
			}]
		}).then(Photos => {
			res.json(Photos);
		})
	});

	router.get("/all-tags/:random?", (req, res) => {
		const queryParams = {}
		if(req.params.random) {
			queryParams.attributes =  [ Sequelize.fn('DISTINCT', Sequelize.col('tag_name')) ,'tag_name' ];
			queryParams.limit = 10;
			queryParams.order = [ Sequelize.fn('RAND') ];
		}
		db.Tags.findAll(queryParams).then(Tags => {
			res.json(Tags);
		})
	});

	// Test DB Post routes
	router.post("/add-tag", (req, res) => {
		// create takes an argument of an object describing the item we want to insert into our table.
		db.user_tags.create({
			tag_name: req.body.tag_name,
			photo_id: req.body.photo_id
			//approved: req.body.approved
		}).then((addedTag) => {
			// We have access to the new todo as an argument inside of the callback function
			res.json(addedTag);
		});
	});
	// TESTING ADMIN ROUTES WITHOUT AUTH.
	// //Update all tag content including approval
	// router.put("/update", function (req, res) {
	// 	db.user_tags.update({
	// 		tag_name: req.body.tag_name,
	// 		photo_id: req.body.photo_id,
	// 		approved: req.body.approved
	// 	},
	// 	{
	// 		where: {
	// 			id: req.body.id
	// 		}
	// 	})
	// 	.then(function (updated) {
	// 		res.json(updated);
	// 	});
	// })

	// //Update only tags approval
	// router.put("/approval", function (req, res) {
	// 	db.user_tags.update({ approved: req.body.approved },
	// 	{ 
	// 		where: { id: req.body.id } 
	// 	})
	// 	.then(function (approved) { res.json(approved) });
	// })

	// // Delete from DB
	// router.delete("/delete/:id", function (req, res) {
	// 	// We just have to specify which todo we want to destroy with "where"
	// 	db.user_tags.destroy({
	// 		where: {
	// 			id: req.params.id
	// 		}
	// 	}).then(function (deleted) {
	// 		res.json(deleted);
	// 	});
	// });


	// Catch-all route
	router.get("*", (req, res) => res.json({answer: 42}));

	return router;
	
})();

module.exports = apiRoutes;