'use strict'

const sequelize = require('../database/db-connection');
const { DataTypes } = require('Sequelize');

const Usuario = sequelize.define('usuario', {
    idUsuario: { 
        type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true
     },
    usuario: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: false
        }
    },
    contrasena: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: false
        }
    },
    nivelUsuario: {
        type: DataTypes.INTEGER,
        validate: {
            notEmpty: false
        }
    },
    rol: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: false
        }
    }
},{
    createdAt: false,
    updatedAt: false
});

module.exports = Usuario;