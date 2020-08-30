'use strict'

const sequelize = require('../database/db-connection');
const { DataTypes } = require('Sequelize');

const ObraSocial = sequelize.define('obra_social', {
    idObraSocial: { 
        type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false
     },
    nombre: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: false
        }
    },
    periodoFacMeses: {
        type: DataTypes.INTEGER,
        validate: {
            notEmpty: false
        }
    },
    cantFacPeriodo: {
        type: DataTypes.INTEGER,
        validate: {
            notEmpty: false
        }
    },
    activo: { 
        type: DataTypes.BOOLEAN, defaultValue: 1
     }
},{
    createdAt: false,
    updatedAt: false
});

module.exports = ObraSocial;