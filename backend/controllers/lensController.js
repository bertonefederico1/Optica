'use strict'

const Lens = require('../models/Lens');
const LensMaterial = require('../models/LensMaterial');
const LensDesign = require('../models/LensDesign');
const LensFinish = require('../models/LensFinish');
const SupplierLaboratory = require('../models/SupplierLaboratory'); 
const lensController = { };


lensController.getAll = async (req, res) => {
    try {
        const lenses = await Lens.findAll({
            where: {
                activo: 1,
                deStock: 1
            },
            include: {
                model: LensMaterial
            }
        });
        res.status(200).json(lenses);
    } catch (err) {
        res.json(err);
    }
};

lensController.getOne = async (req, res) => {
    try {
        const lens = await Lens.findOne({
            where: {
                codLente: req.params.lensID,
                activo: 1
            },
            include: [{
                model: LensMaterial
            },{
                model: LensDesign
            },{
                model: LensFinish
            },{
                model: SupplierLaboratory
            }]
        });
        res.status(200).json(lens);
    } catch(err){
        res.status(400).json(err);
    }
}

lensController.createLens = async (req, res) => {
    try { 
        await Lens.create({
            idProvLab: req.body.supplier,
            idDisenoLente: req.body.design,
            idMaterialLente: req.body.material,
            idAcabadoLente: req.body.finish,
            valorEsf: req.body.sphericalValue,
            valorCil: req.body.cilyndricalValue,
            indiceRefraccion: req.body.refractiveIndex,
            eje: req.body.axis,
            diametro: req.body.diameter,
            color: req.body.color,
            cantidad: req.body.quantityInStock,
            deStock: 1
        });
        res.status(200).json();
    } catch (err) {
        res.status(400).json()
    }
};

lensController.editLens = async (req, res) => {
    try {
        await Lens.update({
            idProvLab: req.body.supplier,
            idDisenoLente: req.body.design,
            idMaterialLente: req.body.material,
            idAcabadoLente: req.body.finish,
            valorEsf: req.body.sphericalValue,
            valorCil: req.body.cilyndricalValue,
            indiceRefraccion: req.body.refractiveIndex,
            eje: req.body.axis,
            diametro: req.body.diameter,
            color: req.body.color,
            cantidad: req.body.quantityInStock,
            deStock: 1
        }, {
            where: {
                codLente: req.params.lensID
            }
        });
        res.status(200).json();
    } catch (err) {
        res.status(400).json()
    }
};

lensController.suspendLens = async (req, res) => {
    try {
        await Lens.update({
            activo: 0
        }, {
            where: {
                codLente: req.params.lensID
            }
        });
        res.status(200).json();
    } catch (err) {
        res.status(400).json(err);
    }
};


module.exports = lensController;