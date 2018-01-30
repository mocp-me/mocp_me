// Sequelize (capital) references the standard library
const Sequelize = require("sequelize");
// sequelize (lowercase) references our connection to the DB.
const sequelize = require("../config/connection_config.js");

// Creates a "Tags" model that matches up with DB
const Tags = sequelize.define("tags", {
    // the tag's id gets saved as an integer
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    // the name of the tag (a string)
    tag_name: Sequelize.STRING,
    // and the photo id (an integer)
    photo_id: Sequelize.INTEGER
},
{
    timestamps: false
});

// Syncs with DB
Tags.sync();

// Makes the Tags Model available for other files (will also create a table)
module.exports = Tags;