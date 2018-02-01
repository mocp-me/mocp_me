const routes = (function(){
	
	// Dependencies
	const apiRoutes = require("./api-routes");
	const path = require("path");
	const bodyParser = require("body-parser");

	// Instantiate express router
	const router = require("express").Router();

	// Middleware
	router.use(bodyParser.urlencoded({extended: false}));
	router.use(bodyParser.json());

	// API calls are directed here
	router.use("/api", apiRoutes);

	// All other paths return React app
	router.use("*", function (req, res){
		res.sendFile(path.join(__dirname, "../client/public/index.html"));
	});

	return router;

})();

module.exports = routes;