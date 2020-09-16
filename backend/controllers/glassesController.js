'use strict'

const Customer = require('../models/Customer');
const HealthCare = require('../models/HealthCare');
const Glasses = require('../models/Glasses');
const Lens = require('../models/Lens');
const Prescription = require('../models/Prescription');
const glassesController = { };


glassesController.getAll = async (req, res) => {
    try {
        const glasses = await Glasses.findAll({
            where: {
                activo: 1,
                estadoAnteojo: ['Pendiente', 'En taller']
            },
            include: [{
                    model: Lens,
                    as: 'LensLE'
                }, {
                    model: Lens,
                    as: 'LensRE'
                }, {
                    model: Prescription,
                    include: {
                        model: Customer
                    }
                }]
        }) 
        res.status(200).json(glasses);
    } catch (err) {
        res.status(400).json(err);
    }
};

/* customerController.getOne = async (req, res) => {
    try {
        const customer = await Customer.findOne({
            where: {
                idCliente: req.params.customerID,
                activo: 1
            },
            include: ObraSocial
        });
        res.status(200).json(customer);
    } catch(err){
        res.json(err);
    }
} */

glassesController.createGlasses = async (req, res) => {
    /* try {
        if(req.body.obrasSociales.length === 0) {
            throw new Error();
        }; 
        const customer = await Customer.create({
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            telefono: req.body.telefono,
            email: req.body.email,
            domicilio: req.body.domicilio
        });
        req.body.obrasSociales.map(os => {
            Customer_ObraSocial.create({
                idCliente: customer.idCliente,
                idObraSocial: os.obraSocial.idObraSocial,
                nroSocio: os.nsocio
            })
        });
        res.status(200).json();
    } catch (err) {
        res.status(400).json({
            message: err
        })
    } */
};

/* customerController.editCustomer = async (req, res) => {
    try {
        if(req.body.obrasSociales.length === 0) {
            throw new Error();
        }; 
        await Customer.update(req.body, {
            where: {
                idCliente: req.params.customerID
            }
        });
        await Customer_ObraSocial.destroy({
            where: {
                idCliente: req.params.customerID
            }
        });
        req.body.obrasSociales.map((os) => {
            Customer_ObraSocial.create({
                idObraSocial: os.obraSocial.idObraSocial,
                idCliente: req.params.customerID,
                nroSocio: os.nsocio
            })
        });
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
}; */


module.exports = glassesController;