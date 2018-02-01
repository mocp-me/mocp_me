 'use strict';
// Sequelize (capital) references the standard library
 const Sequelize = require("sequelize");
// sequelize (lowercase) references our connection to the DB.
 const sequelize = require("../config/connection_config.js");

 // Creates a "Photo" model that matches up with DB
module.exports = function (sequelize, DataTypes) {
    const Photos = sequelize.define("photos",

        {
            // the Photo's id gets saved as an integer
            id:
                {
                    type: Sequelize.INTEGER,

                    primaryKey: true
                },
            // the name of the Photo (a string)
            name: Sequelize.STRING,
            // the Photo's file path (a string)
            path: Sequelize.STRING,
            // the Photo's URL aka web path (a string)
            web_path: Sequelize.STRING,
            // and the artist id (an integer)
            artist_id: Sequelize.INTEGER
        },
        {
            timestamps: false
        });

return Photos;
}