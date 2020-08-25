'use strict'

const sequelize = require('../database/db-connection');
const { DataTypes } = require('Sequelize');

const ObraSocial = sequelize.define('obra_social', {
    idObraSocial: { 
        type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false
     },
    nombre: DataTypes.STRING,
    periodoFacMeses: DataTypes.INTEGER,
    cantFacPeriodo: DataTypes.INTEGER,
    activo: { 
        type: DataTypes.BOOLEAN, defaultValue: 1
     }
},{
    createdAt: false,
    updatedAt: false
});

module.exports = ObraSocial;