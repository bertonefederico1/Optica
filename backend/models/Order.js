'use strict'

const sequelize = require('../database/db-connection');
const { DataTypes } = require('Sequelize');

const Lens = require('./Lens');
const SupplierLaboratory = require('./SupplierLaboratory');


const Order = sequelize.define('pedido', {
    numPedido: { 
        type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false
     },
    codLenteOI: {
        type: DataTypes.INTEGER,
        references: {
            model: Lens,
            key: 'codLente'
        },
        validate: {
            notEmpty: false
        }
    },
    codLenteOD: {
        type: DataTypes.INTEGER,
        references: {
            model: Lens,
            key: 'codLente'
        },
        validate: {
            notEmpty: false
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
    fechaPedido: {
        type: DataTypes.DATE,
        references: {
            model: SupplierLaboratory,
            key: 'idProvLab'
        },
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
        type: DataTypes.DATE,
        validate: {
            notEmpty: false
        }
    },
    fechaEntregaEsperada: {
        type: DataTypes.DATE,
        validate: {
            notEmpty: false
        }
    },
    obsPedido: {
        type: DataTypes.TEXT,
        validate: {
            notEmpty: false
        }
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



module.exports = Order;