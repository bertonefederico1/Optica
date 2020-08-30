'use strict'

const sequelize = require('../database/db-connection');
const { DataTypes } = require('Sequelize');

const ObraSocial = require('../models/ObraSocial');
const Customer_ObraSocial = require('../models/Customer_ObraSocial');


const Customer = sequelize.define('cliente', {
    idCliente: { 
        type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false
     },
    nombre: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: false
        }
    },
    apellido: {
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
    email: DataTypes.STRING,
    domicilio: {
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

Customer.belongsToMany(ObraSocial, { through: Customer_ObraSocial, foreignKey: 'idCliente'});
ObraSocial.belongsToMany(Customer, { through: Customer_ObraSocial, foreignKey: 'idObraSocial'});

module.exports = Customer;