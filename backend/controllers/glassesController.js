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
        let stock;
        if(req.body.leftLensID == req.body.rightLensID){
            const lens = await Lens.findByPk(req.body.leftLensID);
            stock = lens.cantidad;
            if(stock - 1 < 0) {
                throw new Error('No hay stock disponible');
            };
            if((stock - 2) < 0){
                throw new Error('No hay stock disponible');
            };
        };
        if(!req.body.leftLensID){
            req.body.leftLensID = null;
        } else {
            const lens = await Lens.findByPk(req.body.leftLensID);
            stock = lens.cantidad;
            if(stock - 1 < 0) {
                throw new Error('No hay stock disponible');
            };
            await Lens.update({
                cantidad: stock - 1
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
            stock = lens.cantidad;
            await Lens.update({
                cantidad: stock - 1
            },{
                where: {
                    codLente: req.body.rightLensID
                }
            })
        };
        await Glasses.create({
            numReceta: req.body.prescriptionNumber,
            codLenteOI: req.body.leftLensID,
            codLenteOD: req.body.rightLensID,
            codArmazon: req.body.frameID,
            idObraSocial: req.body.healthCareID,
            fechaPrometido: req.body.expectedDeliveryDate,
            estadoAnteojo: 'Pendiente',
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