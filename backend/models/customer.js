'use strict'

const sequelize = require('../database/db-connection');
const { DataTypes } = require('Sequelize');

const ObraSocial = require('../models/ObraSocial');
const Customer_ObraSocial = require('../models/Customer_ObraSocial');

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

Customer.belongsToMany(ObraSocial, { through: Customer_ObraSocial, foreignKey: 'idCliente'});
ObraSocial.belongsToMany(Customer, { through: Customer_ObraSocial, foreignKey: 'idObraSocial'});

module.exports = Customer;