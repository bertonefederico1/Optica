'use strict'


const sequelize = require('../database/db-connection');
const Customer = require('../models/Customer');
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

glassesController.getOne = async (req, res) => {
    try {
        const glasses = await Glasses.findOne({
            where: {
                idCliente: req.params.customerID,
                activo: 1
            },
            include: ObraSocial
        });
        res.status(200).json(glasses);
    } catch(err){
        res.status(400).json(err);
    }
}

glassesController.createGlasses = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        if(!req.body.receiptHealthCare) {
            req.body.healthCareID = null;
        }; 
        if(!req.body.leftLensID){
            req.body.leftLensID = null;
        } else {
            const lens = await Lens.findByPk(req.body.leftLensID);
            const stock = lens.cantidad;
            if(stock > 0){
                await Lens.update({
                    cantidad: stock - 1
                }, {
                    where: {
                        codLente: req.body.leftLensID
                    }
                }, { transaction: t })
            } else {
                throw new Error();
            }
        };
        if(!req.body.rightLensID){
            req.body.rightLensID = null;
        } else {
            const lens = await Lens.findByPk(req.body.rightLensID);
            const stock = lens.cantidad;
            if(stock > 0){
                await Lens.update({
                    cantidad: stock - 1
                }, {
                    where: {
                        codLente: req.body.rightLensID
                    }
                }, { transaction: t })
            } else {
                throw new Error();
            }
        };
        if(req.body.tokenPayment == ''){
            req.body.tokenPayment = 0;
        };
        if(req.body.receiptHealthCare && req.body.healthCareID == null){
            throw new Error();
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
        }, { transaction: t });
        await t.commit();
        res.status(200).json();
    } catch (err) {
        await t.rollback();
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


module.exports = glassesController;