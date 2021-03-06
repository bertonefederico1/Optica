'use strict'

const sequelize = require('../database/db-connection');
const { DataTypes, Sequelize } = require('Sequelize');

const Lens = require('./Lens');
const SupplierLaboratory = require('./SupplierLaboratory');
const Glasses = require('./Glasses');


const Order = sequelize.define('pedido', {
    numPedido: { 
        type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false
     },
    codLenteOI: {
        type: DataTypes.INTEGER,
        references: {
            model: Lens,
            key: 'codLente'
        }
    },
    codLenteOD: {
        type: DataTypes.INTEGER,
        references: {
            model: Lens,
            key: 'codLente'
        }
    },
    idProvLab: {
        type: DataTypes.INTEGER,
        references: {
            model: SupplierLaboratory,
            key: 'idProvLab'
        },
        validate: {
            notEmpty: false
        }
    },
    numAnteojo: {
        type: DataTypes.INTEGER,
        references: {
            model: Glasses,
            key: 'numAnteojo'
        }
    },
    fechaPedido: {
        type: DataTypes.DATE, 
        defaultValue: Sequelize.NOW,
        validate: {
            notEmpty: false
        }
    },
    estadoPedido: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: false
        }
    },
    fechaRecibido: {
        type: DataTypes.DATE
    },
    fechaEntregaEsperada: {
        type: DataTypes.DATE
    },
    obsPedido: {
        type: DataTypes.TEXT
    },
    pedirLenteOI: {
        type: DataTypes.BOOLEAN
    },
    pedirLenteOD: {
        type: DataTypes.BOOLEAN
    },
    activo: {
        type: DataTypes.BOOLEAN, defaultValue: 1
    }
},{
    createdAt: false,
    updatedAt: false
});

Lens.hasMany(Order, {foreignKey: 'codLenteOI', as: 'LensOI'});
Order.belongsTo(Lens, {foreignKey: 'codLenteOI', as: 'LensOI'});

Lens.hasMany(Order, {foreignKey: 'codLenteOD', as: 'LensOD'});
Order.belongsTo(Lens, {foreignKey: 'codLenteOD', as: 'LensOD'});

SupplierLaboratory.hasMany(Order, {foreignKey: 'idProvLab'});
Order.belongsTo(SupplierLaboratory, {foreignKey: 'idProvLab'});

Glasses.hasMany(Order, {foreignKey: 'numAnteojo'});
Order.belongsTo(Glasses, {foreignKey: 'numAnteojo'});



module.exports = Order;