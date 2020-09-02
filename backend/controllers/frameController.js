'use strict'

const Frame = require('../models/Frame');
const FrameMaterial = require('../models/FrameMaterial');
const FrameDesign = require('../models/FrameDesign');
const FrameUtility = require('../models/FrameUtility');
const SupplierLaboratory = require('../models/SupplierLaboratory'); 
const frameController = { };


frameController.getAll = async (req, res) => {
    try {
        const frames = await Frame.findAll({
            where: {
                activo: 1
            }
        });
        res.status(200).json(frames);
    } catch (err) {
        res.json(err);
    }
};

frameController.getOne = async (req, res) => {
    try {
        const frame = await Frame.findOne({
            where: {
                codArmazon: req.params.frameID,
                activo: 1
            }
        });
        res.status(200).json(frame);
    } catch(err){
        res.json(err);
    }
}

frameController.createFrame = async (req, res) => {
    try { 
        const frame = await Frame.create({
            idMaterialArmazon: req.body.material,
            idDisenoArmazon: req.body.design,
            idUtilidadArmazon: req.body.utility,
            idProvLab: req.body.supplierLaboratory,
            modelo: req.body.model,
            marca: req.body.brand,
            color: req.body.color,
            cantidad: req.body.quantityInStock
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
}; */


module.exports = frameController;