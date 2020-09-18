'use strict'

const sequelize = require('../database/db-connection');
const { DataTypes } = require('Sequelize');
const Customer = require('./Customer');
const HealthCare = require('./HealthCare');

const Customer_HealthCare = sequelize.define('cliente_obra_social', {
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
            model: HealthCare,
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


HealthCare.hasMany(Customer_HealthCare, {foreignKey: 'idObraSocial'});
Customer_HealthCare.belongsTo(HealthCare, {foreignKey: 'idObraSocial'});


module.exports = Customer_HealthCare;