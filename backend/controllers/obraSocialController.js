'use strict'

const Customer = require('../models/Customer');
const ObraSocial = require('../models/ObraSocial');
const obraSocialController = { };

obraSocialController.getAll = async (req, res) => {
    try {
        const obrasSociales = await ObraSocial.findAll({
            where: {
                activo: 1
            }
        });
        res.json(obrasSociales);
    } catch (err) {
        res.json(err);
    }
};

obraSocialController.getOne = async (req, res) => {
    try {
        const obraSocial = await ObraSocial.findOne(req.params.id, {
            where: {
                activo: 1
            }
        });
        res.json(obraSocial);
    } catch(err){
        res.json(err);
    }
}

/* obraSocialController.createObraSocial = async (req, res) => {
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

obraSocialController.suspendObraSocial = async (req, res) => {
    try {
        await ObraSocial.update({
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


module.exports = obraSocialController;