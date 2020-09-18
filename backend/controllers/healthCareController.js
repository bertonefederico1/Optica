'use strict'

const HealthCare = require('../models/HealthCare');
const healthCareController = { };

healthCareController.getAll = async (req, res) => {
    try {
        const healthCares = await HealthCare.findAll({
            where: {
                activo: 1
            }
        });
        res.status(200).json(healthCares);
    } catch (err) {
        res.status(400).json(err);
    }
};

healthCareController.getOne = async (req, res) => {
    try {
        const healthCare = await HealthCare.findOne({
            where: {
                idObraSocial: req.params.healthCareID,
                activo: 1
            }
        });
        res.status(200).json(healthCare);
    } catch(err){
        res.status(400).json(err);
    }
}

healthCareController.createHealthCare = async (req, res) => {
    try {
        await HealthCare.create({
            nombre: req.body.name,
            periodoFacMeses: req.body.billingPeriod,
            cantFacPeriodo: req.body.numberGlassesPerPeriod
        });
        res.status(200).json();
    } catch (err) {
        res.status(400).json(err);
    }
}; 

healthCareController.editHealthCare = async (req, res) => {
    try {
        await HealthCare.update({
            nombre: req.body.name,
            periodoFacMeses: req.body.billingPeriod,
            cantFacPeriodo: req.body.numberGlassesPerPeriod
        }, {
            where: {
                idObraSocial: req.params.healthCareID
            }
        });
        res.status(200).json();
    } catch (err) {
        res.status(400).json(err);
    }
}; 

healthCareController.suspendHealthCare = async (req, res) => {
    try {
        await HealthCare.update({
            activo: 0
        }, {
            where: {
                idObraSocial: req.params.healthCareID
            }
        });
        res.status(200).json();
    } catch (err) {
        res.status(400).json(err);
    }
};


module.exports = healthCareController;