'use strict'

const sequelize = require('../database/db-connection');
const { DataTypes } = require('Sequelize');

const LensMaterial = require('./LensMaterial');
const LensDesign = require('./LensDesign');
const LensFinish = require('./LensFinish');
const SupplierLaboratory = require('./SupplierLaboratory');


const Lens = sequelize.define('lente', {
    codLente: { 
        type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false
     },
    idDisenoLente: {
        type: DataTypes.INTEGER,
        references: {
            model: LensDesign,
            key: 'idDisenoLente'
        },
        validate: {
            notEmpty: false
        }
    },
    idMaterialLente: {
        type: DataTypes.INTEGER,
        references: {
            model: LensMaterial,
            key: 'idMaterialLente'
        },
        validate: {
            notEmpty: false
        }
    },
    idAcabadoLente: {
        type: DataTypes.INTEGER,
        references: {
            model: LensFinish,
            key: 'idAcabadoLente'
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
    valorEsf: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: false
        }
    },
    valorCil: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: false
        }
    },
    indiceRefraccion: {
        type: DataTypes.FLOAT,
        validate: {
            notEmpty: false
        }
    },
    eje: {
        type: DataTypes.INTEGER,
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
    diametro: {
        type: DataTypes.INTEGER,
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
    deStock: {
        type: DataTypes.BOOLEAN,
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

LensFinish.hasMany(Lens, {foreignKey: 'idAcabadoLente'});
Lens.belongsTo(LensFinish, {foreignKey: 'idAcabadoLente'});

LensMaterial.hasMany(Lens, {foreignKey: 'idMaterialLente'});
Lens.belongsTo(LensMaterial, {foreignKey: 'idMaterialLente'});

LensDesign.hasMany(Lens, {foreignKey: 'idDisenoLente'});
Lens.belongsTo(LensDesign, {foreignKey: 'idDisenoLente'});

SupplierLaboratory.hasMany(Lens, {foreignKey: 'idProvLab'});
Lens.belongsTo(SupplierLaboratory, {foreignKey: 'idProvLab'});



module.exports = Lens;