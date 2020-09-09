'use strict'

const Prescription = require('../models/Prescription');
const prescriptionController = { };


prescriptionController.getAllByCustomer = async (req, res) => {
    try {
        const prescriptions = await Prescription.findAll({
            where: {
                idCliente: req.params.customerID,
                activo: 1
            }
        });
        res.status(200).json(prescriptions);
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

prescriptionController.createPrescription = async (req, res) => {
    try {
        const customer = await Prescription.create({
            idCliente: req.body.customerID,
            nombreMedico: req.body.doctorName,
            obsReceta: req.body.prescriptionObs,
            valorEsfOD: req.body.sphericalValueRE,
            valorCilOD: req.body.cylindricalValueRE,
            ejeOD: req.body.axisRE,
            valorEsfOI: req.body.sphericalValueLE,
            valorCilOI: req.body.cylindricalValueLE,
            ejeOI: req.body.axisLE,
            valorDIPLejos: req.body.farValueDIP,
            valorDIPCerca: req.body.nearValueDIP,
            valorADD: req.body.addValue
        });
        res.status(200).json();
    } catch (err) {
        res.status(400).json()
    }
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
};
 */

module.exports = prescriptionController;