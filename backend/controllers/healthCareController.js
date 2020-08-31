'use strict'

const Customer = require('../models/Customer');
const HealthCare = require('../models/HealthCare');
const HealthCareController = { };

HealthCareController.getAll = async (req, res) => {
    try {
        const HealthCares = await HealthCare.findAll({
            where: {
                activo: 1
            }
        });
        res.json(HealthCares);
    } catch (err) {
        res.json(err);
    }
};

HealthCareController.getOne = async (req, res) => {
    try {
        const HealthCare = await HealthCare.findOne(req.params.id, {
            where: {
                activo: 1
            }
        });
        res.json(HealthCare);
    } catch(err){
        res.json(err);
    }
}

/* HealthCareController.createObraSocial = async (req, res) => {
    try {
        await Customer.create({
            nombre: req.body.name,
            apellido: req.body.surname,
            telefono: req.body.telephone,
            email: req.body.email,
            domicilio: req.body.address
        });
        res.json({status: "OK"});
    } catch (err) {
        res.json(err);
    }
}; */

/* obraSocialController.editObraSocial = async (req, res) => {
    try {
        Customer.update(req.body, {
            where: {
                idCliente: req.params.id
            }
        });
        res.json({status: "OK"});
    } catch (err) {
        res.json(err);
    }
}; */

HealthCareController.suspendObraSocial = async (req, res) => {
    try {
        await HealthCare.update({
            activo: 0
        }, {
            where: {
                idObraSocial: req.params.id
            }
        });
        res.json({status: "OK"});
    } catch (err) {
        res.json(err);
    }
};


module.exports = HealthCareController;