'use strict'

const Prescription = require('../models/Prescription');
const Customer = require('../models/Customer');
const prescriptionController = { };


prescriptionController.getAllByCustomer = async (req, res) => {
    try {
        const prescriptions = await Prescription.findAll({
            order: [['fechaReceta', 'DESC']], 
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

prescriptionController.getOne = async (req, res) => {
    try {
        const prescription = await Prescription.findOne({
            where: {
                numReceta: req.params.prescriptionNumber,
                activo: 1
            },
            include: {
                model: Customer
            }
        });
        res.status(200).json(prescription);
    } catch(err){
        res.json(err);
    }
} 

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

prescriptionController.editPrescription = async (req, res) => {
    try {
        await Prescription.update({
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
        }, {
            where: {
                numReceta: req.params.prescriptionNumber
            }
        });
        res.status(200).json();
    } catch (err) {
        res.status(400).json()
    }
};

prescriptionController.suspendPrescription = async (req, res) => {
    try {
        await Prescription.update({
            activo: 0
        }, {
            where: {
                numReceta: req.params.prescriptionNumber
            }
        });
        res.status(200).json();
    } catch (err) {
        res.json(err);
    }
};


module.exports = prescriptionController;