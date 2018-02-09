const routes = (function(){
	
	// Dependencies
	const adminRoutes = require("./admin-routes");
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
	router.use("/admin/", adminRoutes);

	// All other paths return React app
	router.use("*", function (req, res){
		res.sendFile(path.join(__dirname, "../client/build/index.html"));
	});

	return router;

})();

module.exports = routes;