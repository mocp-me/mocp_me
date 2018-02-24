'use strict';
// Sequelize (capital) references the standard library
const Sequelize = require("sequelize");
// sequelize (lowercase) references our connection to the DB.
const db = require("../models/");
// Creates a "Photo" model that matches up with DB
module.exports = function (db, DataTypes) {
    const User_tags = db.define("user_tags", {
        // the tag's id gets saved as an integer
        // id: {
        //     type: Sequelize.INTEGER,
        //     primaryKey: true
        // },
        // the name of the tag (a string)
        tag_name: { type: Sequelize.STRING, allowNull: false },
        // and the photo id (an integer)
        photo_id: Sequelize.INTEGER,
        approved: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false }
    },
        {
            timestamps: true
        });

    return User_tags;
}