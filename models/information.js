'use strict';
// Sequelize (capital) references the standard library
const Sequelize = require("sequelize");
// sequelize (lowercase) references our connection to the DB.
const sequelize = require("../config/connection_config.js");

// Creates a "Photo Information" model that matches up with DB
module.exports = function (sequelize, DataTypes) {
    const Information = sequelize.define("Information",

        {
            // the Photo's id gets saved as an integer
            id:
                {
                    type: Sequelize.INTEGER,

                    primaryKey: true
                },
            // the name of the Photo (a string)
            artist: Sequelize.STRING,
            // the Photo's file path (a string)
            title: Sequelize.STRING,
            // the Photo's URL aka web path (a string)
            year: Sequelize.STRING,
            medium: Sequelize.STRING,
            dimensions: Sequelize.STRING,
            object_id: Sequelize.STRING,
            file_name: Sequelize.STRING  
        },
        {
            timestamps: false
        });

    return Information;
}