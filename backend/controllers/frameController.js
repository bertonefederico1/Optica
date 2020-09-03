'use strict'

const Frame = require('../models/Frame');
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

frameController.editFrame = async (req, res) => {
    try {
        await Frame.update({
            idMaterialArmazon: req.body.material,
            idDisenoArmazon: req.body.design,
            idUtilidadArmazon: req.body.utility,
            idProvLab: req.body.supplierLaboratory,
            modelo: req.body.model,
            marca: req.body.brand,
            color: req.body.color,
            cantidad: req.body.quantityInStock
        }, {
            where: {
                codArmazon: req.params.frameID
            }
        });
        res.status(200).json();
    } catch (err) {
        res.status(400).json()
    }
};

frameController.suspendFrame = async (req, res) => {
    try {
        await Frame.update({
            activo: 0
        }, {
            where: {
                codArmazon: req.params.frameID
            }
        });
        res.status(200).json();
    } catch (err) {
        res.status(400).json(err);
    }
};


module.exports = frameController;