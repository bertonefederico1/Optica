'use strict'

const sequelize = require('../database/db-connection');
const { DataTypes } = require('Sequelize');

const Customer = sequelize.define('cliente', {
    idCliente: { 
        type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false
     },
    nombre: DataTypes.STRING,
    apellido: DataTypes.DECIMAL(10, 2),
    telefono: DataTypes.STRING,
    email: DataTypes.STRING,
    domicilio: DataTypes.STRING,
    activo: { 
        type: DataTypes.BOOLEAN, defaultValue: 1
     }
},{
    createdAt: false,
    updatedAt: false
});

module.exports = Customer;