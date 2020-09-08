'use strict'

const sequelize = require('../database/db-connection');
const { DataTypes, Sequelize } = require('Sequelize');

const Customer = require('./Customer');


const Prescription = sequelize.define('receta', {
    numReceta: { 
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
    fechaReceta: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
        validate: {
            notEmpty: false
        }
    },
    nombreMedico: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: false
        }
    },
    obsReceta: {
        type: DataTypes.TEXT,
        validate: {
            notEmpty: false
        }
    },
    valorEsfOD: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: false
        }
    },
    valorCilOD: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: false
        }
    },
    ejeOD: {
        type: DataTypes.INTEGER,
        validate: {
            notEmpty: false
        }
    },
    valorEsfOI: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: false
        }
    },
    valorCilOI: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: false
        }
    },
    ejeOI: {
        type: DataTypes.INTEGER,
        validate: {
            notEmpty: false
        }
    },
    valorDIPLejos: {
        type: DataTypes.FLOAT,
        validate: {
            notEmpty: false
        }
    },
    valorDIPCerca: {
        type: DataTypes.FLOAT,
        validate: {
            notEmpty: false
        }
    },
    valorADD: {
        type: DataTypes.FLOAT,
        validate: {
            notEmpty: false
        }
    },
    activo: {
        type: DataTypes.BOOLEAN, 
        defaultValue: 1
    }
},{
    createdAt: false,
    updatedAt: false
});

Customer.hasMany(Prescription, {foreignKey: 'idCliente'});
Prescription.belongsTo(Customer, {foreignKey: 'idCliente'});


module.exports = Prescription;