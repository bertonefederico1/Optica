'use strict'

const Customer = require('../models/Customer');
const HealthCare = require('../models/HealthCare');
const Customer_HealthCare = require('../models/Customer_HealthCare');
const customerController = { };


customerController.getAll = async (req, res) => {
    try {
        let customers = null;
        if(req.params.select){
            customers = await Customer.findAll({
                order: [['apellido', 'ASC']],
                attributes: ['idCliente', 'nombre', 'apellido', 'telefono', 'domicilio'],
                where: {
                    activo: 1
                }
            });
        } else {
            customers = await Customer.findAll({
                attributes: ['idCliente', 'nombre', 'apellido', 'telefono', 'domicilio'],
                where: {
                    activo: 1
                }
            });
        };
        res.status(200).json(customers);
    } catch (err) {
        res.json(err);
    }
};

customerController.getOne = async (req, res) => {
    try {
        const customer = await Customer.findOne({
            where: {
                idCliente: req.params.customerID,
                activo: 1
            },
            include: HealthCare
        });
        res.status(200).json(customer);
    } catch(err){
        res.json(err);
    }
}

customerController.createCustomer = async (req, res) => {
    try {
        /* if(req.body.obrasSociales.length === 0) {
            throw new Error();
        };  */
        const customer = await Customer.create({
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            telefono: req.body.telefono,
            email: req.body.email,
            domicilio: req.body.domicilio
        });
        if(req.body.obrasSociales.length > 0){
            req.body.obrasSociales.map(os => {
                Customer_HealthCare.create({
                    idCliente: customer.idCliente,
                    idObraSocial: os.obraSocial.idObraSocial,
                    nroSocio: os.nsocio
                })
            });
        };
        res.status(200).json();
    } catch (err) {
        res.status(400).json({
            message: err
        })
    }
};

customerController.editCustomer = async (req, res) => {
    try {
        /* if(req.body.obrasSociales.length === 0) {
            throw new Error();
        };  */
        await Customer.update(req.body, {
            where: {
                idCliente: req.params.customerID
            }
        });
        await Customer_HealthCare.destroy({
            where: {
                idCliente: req.params.customerID
            }
        });
        if(req.body.obrasSociales.length > 0) {
            req.body.obrasSociales.map((os) => {
                Customer_HealthCare.create({
                    idObraSocial: os.obraSocial.idObraSocial,
                    idCliente: req.params.customerID,
                    nroSocio: os.nsocio
                })
            })
        };
        res.status(200).json();
    } catch (err) {
        res.status(400).json({
            message: err
        })
    }
};

customerController.suspendCustomer = async (req, res) => {
    try {
        await Customer.update({
            activo: 0
        }, {
            where: {
                idCliente: req.params.customerID
            }
        });
        res.status(200).json();
    } catch (err) {
        res.json(err);
    }
};


module.exports = customerController;