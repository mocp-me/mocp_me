'use strict';

var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var basename = path.basename(module.filename);
var env = process.env.NODE_ENV || 'development';
var config = require(__dirname + '/../config/config.json')[env];
var db = {};

console.log(basename);

if (config.use_env_variable) {
    console.log("config_env used");
    var sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
    console.log("config_env not used");
    var sequelize = new Sequelize(config.database, config.username, config.password, config);
    // console.log(sequelize);
}

fs
    .readdirSync(__dirname)
    .filter((file) => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach((file) => {
        var model = sequelize['import'](path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch((err) => {
        console.log('Unable to connect to the database:', err);
    });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Import Models such that I can use them in the api just by importing 'db'
// db.Photos = require('./photos')(sequelize, Sequelize);
// db.Tags = require('./tags')(sequelize, Sequelize);
db.Tags.belongsTo(db.Photos, { foreignKey: 'id' });
db.Photos.hasMany(db.Tags, { as: 'Tags', foreignKey: 'photo_id' });

module.exports = db;