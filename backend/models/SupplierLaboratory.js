'use strict'

const sequelize = require('../database/db-connection');
const { DataTypes } = require('Sequelize');

const Laboratory = sequelize.define('proveedor_laboratorio', {
    idProvLab: { 
        type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false
     },
    razonSocial: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: false
        }
    },
    nombreFantasia: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: false
        }
    },
    domicilio: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: false
        }
    },
    telefono: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: false
        }
    },
    email: {
        type: DataTypes.STRING,
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

module.exports = Laboratory;