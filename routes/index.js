const routes = (function(){

	// Determine environment
	const env = process.env.NODE_ENV || "development";

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
	router.use("/admin-api", adminRoutes);
	router.use("/api", apiRoutes);

	// All other paths return React app, including /admin
	router.get("*", function (req, res){
		let filePath;
		if (env === "development"){
			filePath = "../client/public/index.html";
		} else {
			filePath = "../client/build/index.html";
		}
		res.sendFile(path.join(__dirname, filePath));
	});

	return router;

})();

module.exports = routes;
