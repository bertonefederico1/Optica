'use strict'

const sequelize = require('../database/db-connection');
const { DataTypes, Sequelize } = require('Sequelize');


const Glasses = sequelize.define('anteojo_receta', {
    numAnteojo: { 
        type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false
     },
    numReceta: {
        type: DataTypes.INTEGER,
        references: {
            model: Lens,
            key: 'codLente'
        }
    },
    numPedido: {
        type: DataTypes.INTEGER,
        references: {
            model: Lens,
            key: 'codLente'
        }
    },
    codLenteOI: {
        type: DataTypes.INTEGER,
        references: {
            model: SupplierLaboratory,
            key: 'idProvLab'
        },
        validate: {
            notEmpty: false
        }
    },
    codLenteOD: {
        type: DataTypes.DATE, 
        defaultValue: Sequelize.NOW,
        references: {
            model: SupplierLaboratory,
            key: 'idProvLab'
        },
        validate: {
            notEmpty: false
        }
    },
    codArmazon: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: false
        }
    },
    idObraSocial: {
        type: DataTypes.DATE
    },
    fechaPrometido: {
        type: DataTypes.DATE
    },
    fechaEntrega: {
        type: DataTypes.TEXT
    },
    estadoAnteojo: {
        type: DataTypes.BOOLEAN
    },
    abonoSena: {
        type: DataTypes.BOOLEAN
    },
    abonoSaldo: {
        type: DataTypes.BOOLEAN
    },
    montoTotal: {
        type: DataTypes.BOOLEAN
    },
    montoSena: {
        type: DataTypes.BOOLEAN
    },
    valorAltura: {
        type: DataTypes.BOOLEAN
    },
    utilidadAnteojo: {
        type: DataTypes.BOOLEAN
    },
    esFacObraSocial: {
        type: DataTypes.BOOLEAN
    },
    activo: {
        type: DataTypes.BOOLEAN, defaultValue: 1
    }
},{
    createdAt: false,
    updatedAt: false
});

/* Lens.hasMany(Order, {foreignKey: 'codLenteOI', as: 'LensOI'});
Order.belongsTo(Lens, {foreignKey: 'codLenteOI', as: 'LensOI'});

Lens.hasMany(Order, {foreignKey: 'codLenteOD', as: 'LensOD'});
Order.belongsTo(Lens, {foreignKey: 'codLenteOD', as: 'LensOD'});

SupplierLaboratory.hasMany(Order, {foreignKey: 'idProvLab'});
Order.belongsTo(SupplierLaboratory, {foreignKey: 'idProvLab'}); */



module.exports = Glasses;