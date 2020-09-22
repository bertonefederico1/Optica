'use strict'


const Customer = require('../models/Customer');
const Glasses = require('../models/Glasses');
const Lens = require('../models/Lens');
const Frame = require('../models/Frame');
const HealthCare = require('../models/HealthCare');
const Prescription = require('../models/Prescription');
const Validators = require('../validators/validators');
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

glassesController.getOne = async (req, res) => {
    try {
        const glasses = await Glasses.findOne({
            where: {
                numAnteojo: req.params.glassesNumber,
                activo: 1
            },
            include: [{
                model: HealthCare
            }, {
                model: Prescription,
                include: {
                    model: Customer
                }
            }, {
                model: Lens,
                as: 'LensLE'
            }, {
                model: Lens,
                as: 'LensRE'
            }, {
                model: Frame
            }]
        });
        res.status(200).json(glasses);
    } catch(err){
        res.status(400).json(err);
    }
}

glassesController.createGlasses = async (req, res) => {
    try {
        Validators.validatorGlasses(req.body);
        if(req.body.leftLensID == req.body.rightLensID){
            const lens = await Lens.findByPk(req.body.leftLensID);
            if(lens.cantidad - 1 < 0) {
                throw new Error('No hay stock disponible del lente seleccionado');
            };
            if((lens.cantidad - 2) < 0){
                throw new Error('No hay stock disponible del lente seleccionado');
            };
        };
        if(!req.body.leftLensID){
            req.body.leftLensID = null;
        } else {
            const lens = await Lens.findByPk(req.body.leftLensID);
            if(lens.cantidad - 1 < 0) {
                throw new Error('No hay stock disponible del lente seleccionado');
            };
            await Lens.update({
                cantidad: lens.cantidad - 1
            },{
                where: {
                    codLente: req.body.leftLensID
                }
            })
        };
        if(!req.body.rightLensID){
            req.body.rightLensID = null;
        } else {
            const lens = await Lens.findByPk(req.body.rightLensID);
            await Lens.update({
                cantidad: lens.cantidad - 1
            },{
                where: {
                    codLente: req.body.rightLensID
                }
            })
        };
        const frame = await Frame.findByPk(req.body.frameID);
        if(frame.cantidad <= 0){
            throw new Error('No hay stock disponible del armazón seleccionado');
        } else {
            await Frame.update({
                cantidad: frame.cantidad - 1
            },{
                where: {
                    codArmazon: req.body.frameID
                }
            });
        }
        await Glasses.create({
            numReceta: req.body.prescriptionNumber,
            codLenteOI: req.body.leftLensID,
            codLenteOD: req.body.rightLensID,
            codArmazon: req.body.frameID,
            idObraSocial: req.body.healthCareID,
            fechaPrometido: req.body.expectedDeliveryDate,
            estadoAnteojo: req.body.glassesStatus,
            montoTotal: req.body.totalAmount,
            montoSena: req.body.tokenPayment,
            valorAltura: req.body.heightValue,
            utilidadAnteojo: req.body.glassesUtility,
            esFacObraSocial: req.body.receiptHealthCare
        });
        res.status(200).json();
    } catch (err) {
        res.status(400).json({
            msg: err.message
        })
    }
};

glassesController.editGlasses = async (req, res) => {
    try {
        Validators.validatorGlasses(req.body);
        if(req.body.leftLensID == req.body.rightLensID){
            const lens = await Lens.findByPk(req.body.leftLensID);
            if(lens.cantidad - 1 < 0) {
                throw new Error('No hay stock disponible del lente seleccionado');
            };
            if((lens.cantidad - 2) < 0){
                throw new Error('No hay stock disponible del lente seleccionado');
            };
        };
        if(req.body.leftLensID && req.body.rightLensID){
            Validators.normalizeStock(req.body);
        } else {
            if(!req.body.leftLensID){
                req.body.leftLensID = null;
            } else {
                const lens = await Lens.findByPk(req.body.leftLensID);
                if(lens.cantidad - 1 < 0) {
                    throw new Error('No hay stock disponible del lente seleccionado');
                };
                await Lens.update({
                    cantidad: lens.cantidad - 1
                },{
                    where: {
                        codLente: req.body.leftLensID
                    }
                });
                Validators.normalizeStock(req.body);
            };
            if(!req.body.rightLensID){
                req.body.rightLensID = null;
            } else {
                const lens = await Lens.findByPk(req.body.rightLensID);
                await Lens.update({
                    cantidad: lens.cantidad - 1
                },{
                    where: {
                        codLente: req.body.rightLensID
                    }
                });
                Validators.normalizeStock(req.body);
            };
            const frame = await Frame.findByPk(req.body.frameID);
            if(frame.cantidad <= 0){
                throw new Error('No hay stock disponible del armazón seleccionado');
            } else {
                await Frame.update({
                    cantidad: frame.cantidad - 1
                },{
                    where: {
                        codArmazon: req.body.frameID
                    }
                });
            };
        }
        
        await Glasses.create({
            numReceta: req.body.prescriptionNumber,
            codLenteOI: req.body.leftLensID,
            codLenteOD: req.body.rightLensID,
            codArmazon: req.body.frameID,
            idObraSocial: req.body.healthCareID,
            fechaPrometido: req.body.expectedDeliveryDate,
            estadoAnteojo: req.body.glassesStatus,
            montoTotal: req.body.totalAmount,
            montoSena: req.body.tokenPayment,
            valorAltura: req.body.heightValue,
            utilidadAnteojo: req.body.glassesUtility,
            esFacObraSocial: req.body.receiptHealthCare
        });
        res.status(200).json();
    } catch (err) {
        res.status(400).json({
            msg: err.message
        })
    }
};

glassesController.suspendGlasses = async (req, res) => {
    try {
       
    } catch (err) {
       
    }
};


module.exports = glassesController;