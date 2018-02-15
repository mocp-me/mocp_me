'use strict';
// Sequelize (capital) references the standard library
const Sequelize = require("sequelize");
// sequelize (lowercase) references our connection to the DB.
const db = require("../models/");

 // Creates a "Photo" model that matches up with DB
module.exports = function (db, DataTypes) {
    const Photos = db.define("Photos",

        {
            id:
                {
                    type: Sequelize.INTEGER,

                    primaryKey: true
                },
            name: Sequelize.STRING,
            path: Sequelize.STRING,
            web_path: Sequelize.STRING,
            artist_id: Sequelize.INTEGER,
            artist: Sequelize.STRING,
            title: Sequelize.STRING,
            year: Sequelize.STRING,
            medium: Sequelize.STRING,
            dimensions: Sequelize.STRING,
            web_path: Sequelize.STRING,
            accession_num: Sequelize.STRING,
            file_name: Sequelize.STRING,
        },
        {
            timestamps: false
        });

return Photos;
}