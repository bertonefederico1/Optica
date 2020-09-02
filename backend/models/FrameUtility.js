'use strict'

const sequelize = require('../database/db-connection');
const { DataTypes } = require('Sequelize');

const FrameUtility = sequelize.define('utilidad_armazon', {
    idUtilidadArmazon: { 
        type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false
     },
    nombre: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: false
        }
    },
    descripcion: {
        type: DataTypes.STRING
    }
},{
    createdAt: false,
    updatedAt: false
});

module.exports = FrameUtility;