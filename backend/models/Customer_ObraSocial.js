'use strict'

const sequelize = require('../database/db-connection');
const { DataTypes } = require('Sequelize');
const Customer = require('./Customer');
const ObraSocial = require('./Customer_ObraSocial')

const Customer_ObraSocial = sequelize.define('cliente_obra_social', {
    idCliente_ObraSocial: { 
        type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false
     },
    idCliente: {
        type: DataTypes.INTEGER,
        references: {
            model: Customer,
            key: 'idCliente'
        },
        validate: {
            notEmpty: false
        }
    },
    idObraSocial: {
        type: DataTypes.INTEGER,
        references: {
            model: ObraSocial,
            key: 'idObraSocial'
        },
        validate: {
            notEmpty: false
        }
    },
    nroSocio: {
        type: DataTypes.INTEGER,
        validate: {
            notEmpty: false
        }
    }
},{
    createdAt: false,
    updatedAt: false
});

module.exports = Customer_ObraSocial;