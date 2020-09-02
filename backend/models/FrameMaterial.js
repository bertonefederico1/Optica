'use strict'

const sequelize = require('../database/db-connection');
const { DataTypes } = require('Sequelize');

const FrameMaterial = sequelize.define('material_armazon', {
    idMaterialArmazon: { 
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

module.exports = FrameMaterial;