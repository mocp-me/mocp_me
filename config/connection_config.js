// -----------------------------------------------
// -------- Sequelize Connection Config ----------
// -----------------------------------------------
const Sequelize = require('sequelize');
const sequelize = new Sequelize('mocp_db', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

sequelize
    .authenticate()
    .then(() => {
        console.log('Database connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });
    
module.exports = sequelize;



