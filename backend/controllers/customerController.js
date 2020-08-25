'use strict'

const Customer = require('../models/Customer');
const ObraSocial = require('../models/ObraSocial');
const Customer_ObraSocial = require('../models/Customer_ObraSocial');
const customerController = { };


customerController.getAll = async (req, res) => {
    try {
        const customers = await Customer.findAll({
            attributes: ['idCliente', 'nombre', 'apellido', 'telefono'],
            where: {
                activo: 1
            }
        });
        res.json(customers);
    } catch (err) {
        res.json(err);
    }
};

customerController.getOne = async (req, res) => {
    try {
        const customer = await Customer.findOne({
            where: {
                idCliente: req.params.id,
                activo: 1
            },
            include: ObraSocial
        });
        res.json(customer);
    } catch(err){
        res.json(err);
    }
}

customerController.createCustomer = async (req, res) => {
    try {
        const customer = await Customer.create({
            nombre: req.body.name,
            apellido: req.body.surname,
            telefono: req.body.telephone,
            email: req.body.email,
            domicilio: req.body.address
        });
        req.body.obrasSociales.map(os => {
            Customer_ObraSocial.create({
                idCliente: customer.idCliente,
                idObraSocial: os.obraSocial,
                nroSocio: os.nsocio
            })
        });
        res.json({status: "OK"});
    } catch (err) {
        res.json(err);
    }
};

customerController.editCustomer = async (req, res) => {
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
};

customerController.suspendCustomer = async (req, res) => {
    try {
        await Customer.update({
            activo: 0
        }, {
            where: {
                idCliente: req.params.id
            }
        });
        res.json({status: "OK"});
    } catch (err) {
        res.json(err);
    }
};


module.exports = customerController;