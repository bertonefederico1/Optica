'use strict'

const sequelize = require('../database/db-connection');
const { DataTypes } = require('Sequelize');

const HealthCare = require('../models/HealthCare');
const Customer_HealthCare = require('./Customer_HealthCare');


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

Customer.belongsToMany(HealthCare, { through: Customer_HealthCare, foreignKey: 'idCliente'});
HealthCare.belongsToMany(Customer, { through: Customer_HealthCare, foreignKey: 'idObraSocial'});

module.exports = Customer;