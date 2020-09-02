'use strict'

const sequelize = require('../database/db-connection');
const { DataTypes } = require('Sequelize');

const FrameDesign = sequelize.define('diseno_armazon', {
    idDisenoArmazon: { 
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

module.exports = FrameDesign;