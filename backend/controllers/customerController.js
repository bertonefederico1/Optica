'use strict'

const Customer = require('../models/customer');
const customerController = { };

customerController.getAll = async (req, res) => {
    try {
        const customers = await Customer.findAll(    {
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

customerController.createCustomer = async (req, res) => {
    try {
        await Customer.create(req.body);
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
}


module.exports = customerController;