'use strict'

const sequelize = require('../database/db-connection');
const { DataTypes } = require('Sequelize');
const Prescription = require('../models/Prescription');
const Lens = require('../models/Lens');
const Frame = require('../models/Frame');
const HealthCare = require('../models/HealthCare');


const Glasses = sequelize.define('anteojo_receta', {
    numAnteojo: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true, 
        allowNull: false
     },
    numReceta: {
        type: DataTypes.INTEGER,
        references: {
            model: Prescription,
            key: 'numReceta'
        }
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
    codArmazon: {
        type: DataTypes.INTEGER,
        references: {
            model: Frame,
            key: 'codArmazon'
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
        }
    },
    fechaPrometido: {
        type: DataTypes.DATE,
        validate: {
            notEmpty: false
        }
    },
    fechaEntrega: {
        type: DataTypes.DATE
    },
    estadoAnteojo: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: false
        }
    },
    montoTotal: {
        type: DataTypes.DECIMAL(10,2),
        validate: {
            notEmpty: false
        }
    },
    montoSena: {
        type: DataTypes.DECIMAL(10,2)
    },
    abonoSaldo: {
        type: DataTypes.BOOLEAN,
        validate: {
            notEmpty: false
        }
    },
    valorAltura: {
        type: DataTypes.INTEGER,
        validate: {
            notEmpty: false
        }
    },
    utilidadAnteojo: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: false
        }
    },
    esFacObraSocial: {
        type: DataTypes.BOOLEAN,
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



Prescription.hasMany(Glasses, {foreignKey: 'numReceta'});
Glasses.belongsTo(Prescription, {foreignKey: 'numReceta'});

HealthCare.hasMany(Glasses, {foreignKey: 'idObraSocial'});
Glasses.belongsTo(HealthCare, {foreignKey: 'idObraSocial'});

Frame.hasMany(Glasses, {foreignKey: 'codArmazon'});
Glasses.belongsTo(Frame, {foreignKey: 'codArmazon'});

Lens.hasMany(Glasses, {foreignKey: 'codLenteOI', as: 'LensLE'});
Glasses.belongsTo(Lens, {foreignKey: 'codLenteOI', as: 'LensLE'});

Lens.hasMany(Glasses, {foreignKey: 'codLenteOD', as: 'LensRE'});
Glasses.belongsTo(Lens, {foreignKey: 'codLenteOD', as: 'LensRE'});


module.exports = Glasses;