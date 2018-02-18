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

	router.use(jwtCheck);


	// API Routes go here
	// Post Update Delete and Approve Admin Routes
	router.post("/add-tag", function (req, res) {
		console.log(req.body);
		// create takes an argument of an object describing the item we want to insert into our table.
		db.user_tags.create({
			tag_name: req.body.tag_name,
			photo_id: req.body.photo_id,
			approved: req.body.approved
		}).then(function (addedTag) {
			// We have access to the new todo as an argument inside of the callback function
			res.json(addedTag);
		});
	});

	//Update all tag content including approval
	router.put("/update", function (req, res) {
		db.user_tags.update({
			tag_name: req.body.tag_name,
			photo_id: req.body.photo_id,
			approved: req.body.approved
		},{
			where: {
				id: req.body.id
			}
		})
		.then(function (updated) {
			res.json(updated);
		});
	})

	//Update only tags approval
	router.put("/approval", function (req, res) {
		db.user_tags.update({ 
			approved: req.body.approved 
		},{
			where: { id: req.body.id }
		})
		.then(function (approved) {
			res.json(approved)
		});
	})

	// Delete from DB
	router.delete("/delete/:id", function (req, res) {
		// We just have to specify which todo we want to destroy with "where"
		db.user_tags.destroy({
			where: {
				id: req.params.id
			}
		}).then(function (deleted) {
			res.json(deleted);
		});
	});
	

	// Test DB get routes
	// router.get("/all-photos", (req, res) => {
	// 	db.Photos.findAll().then(Photos => {
	// 		res.json(Photos);
	// 	})
	// });

	router.get("/all-tags", (req, res) => {
		console.log("admin/all-tags call received by backend");
		db.Tags.findAll().then(Tags => {
			res.json(Tags);
		})
	});

	// Catch-all route
	router.get("*", (req, res) => res.json({answer: 42}));

	return router;
	
})();

module.exports = adminRoutes;