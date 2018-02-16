// Clears terminal window
process.stdout.write('\033c');

// Dependencies
const express = require ("express");
const bodyParser = require ("body-parser");
const routes = require ("./routes");
var path = require('path');



// Set Port number to environmental variable -or- Port 3001
const PORT = process.env.PORT || 3001;

//Instantiate express app
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Routes
app.use(express.static("client/build"));
app.use(routes);

// Activate express server
app.listen(PORT, function(){
	console.log(`
🍑🍑🍑🍑🍑🍑🍑🍑🍑🍑🍑🍑🍑🍑🍑🍑🍑🍑🍑🍑🍑🍑🍑🍑🍑🍑🍑🍑🍑🍑🍑🍑🍑🍑
Please, pay no attention to the express app listening on port ${PORT}.`);

});
