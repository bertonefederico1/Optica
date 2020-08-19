'use strict'

const conf = require('./db-config.json');
const Sequelize = require('sequelize');

let opts = {
    define: {
        freezeTableName: true
    }
}

var sequelize = new Sequelize(`${conf.mysql.dialect}://${conf.mysql.username}:${conf.mysql.password}@${conf.mysql.host}:3306/${conf.mysql.db}`, opts)


/* const sequelize = new Sequelize(
    conf.mysql.db, 
    conf.mysql.username, 
    conf.mysql.password, 
    {
        host: conf.mysql.host,
        dialect: conf.mysql.dialect,
    }    
); */

module.exports = sequelize;

