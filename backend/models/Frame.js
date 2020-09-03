'use strict'

const sequelize = require('../database/db-connection');
const { DataTypes } = require('Sequelize');

const FrameMaterial = require('./FrameMaterial');
const FrameDesign = require('./FrameDesign');
const FrameUtility = require('./FrameUtility');
const SupplierLaboratory = require('./SupplierLaboratory');


const Frame = sequelize.define('armazon', {
    codArmazon: { 
        type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false
     },
    idMaterialArmazon: {
        type: DataTypes.INTEGER,
        references: {
            model: FrameMaterial,
            key: 'idMaterialArmazon'
        },
        validate: {
            notEmpty: false
        }
    },
    idDisenoArmazon: {
        type: DataTypes.INTEGER,
        references: {
            model: FrameDesign,
            key: 'idDisenoArmazon'
        },
        validate: {
            notEmpty: false
        }
    },
    idUtilidadArmazon: {
        type: DataTypes.INTEGER,
        references: {
            model: FrameUtility,
            key: 'idUtilidadArmazon'
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
    modelo: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: false
        }
    },
    marca: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: false
        }
    },
    color: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: false
        }
    },
    cantidad: {
        type: DataTypes.INTEGER,
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

FrameUtility.hasMany(Frame, {foreignKey: 'idUtilidadArmazon'});
Frame.belongsTo(FrameUtility, {foreignKey: 'idUtilidadArmazon'});

FrameMaterial.hasMany(Frame, {foreignKey: 'idMaterialArmazon'});
Frame.belongsTo(FrameMaterial, {foreignKey: 'idMaterialArmazon'});

FrameDesign.hasMany(Frame, {foreignKey: 'idDisenoArmazon'});
Frame.belongsTo(FrameDesign, {foreignKey: 'idDisenoArmazon'});

SupplierLaboratory.hasMany(Frame, {foreignKey: 'idProvLab'});
Frame.belongsTo(SupplierLaboratory, {foreignKey: 'idProvLab'});



module.exports = Frame;