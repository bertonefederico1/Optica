'use strict'

const Order = require('../models/Order');
const SupplierLaboratory = require('../models/SupplierLaboratory'); 
const Lens = require('../models/Lens');
const LensMaterial = require('../models/LensMaterial');
const LensDesign = require('../models/LensDesign');
const LensFinish = require('../models/LensFinish');
const Glasses = require('../models/Glasses');
const validators = require('../validators/validators');
const Prescription = require('../models/Prescription');
const Customer = require('../models/Customer');
const Validators = require('../validators/validators');
const orderController = { };


orderController.getAll = async (req, res) => {
    try {
        const orders = await Order.findAll({
            where: {
                activo: 1
            },
            include: [{
                    model: Lens,
                    as: 'LensOI'
                },{
                    model: Lens,
                    as: 'LensOD'
                },{
                    model: SupplierLaboratory
                },{
                    model: Glasses,
                    include: {
                        model: Prescription,
                        include: {
                            model: Customer
                        }
                    }
                }]
        });
        res.status(200).json(orders);
    } catch (err) {
        res.status(400).json(err);
    }
};

orderController.getOrdersByPrescription = async (req, res) => {
    try {
        const orders = await Order.findAll({
            where: {
                
            }
        })
    } catch (err) {
        res.status(400).json();
    }
};

orderController.getOne = async (req, res) => {
    try {
        const order = await Order.findOne({
            where: {
                numPedido: req.params.orderNumber,
                activo: 1
            },
            include: [{
                model: Glasses,
                include: {
                    model:Prescription,
                    include: {
                        model: Customer
                    }
                }
            }, {
                model: SupplierLaboratory
            }, {
                model: Lens,
                as: 'LensOI',
                include: [{
                    model: LensMaterial
                }, {
                    model: LensDesign
                }, {
                    model: LensFinish
                }]
            }, {
                model: Lens,
                as: 'LensOD',
                include: [{
                    model: LensMaterial
                }, {
                    model: LensDesign
                }, {
                    model: LensFinish
                }]
            }]
        });
        res.status(200).json(order);
    } catch (err) {
        res.status(400).json();
    }
};

orderController.createOrder = async (req, res) => {
    try { 
        let lensLE = {
            codLente: null
        };
        let lensRE = {
            codLente: null
        };
        validators.validatorOrder(req.body);
            if (req.body.orderLensLE){
                lensLE = await Lens.create({
                    idProvLab: req.body.supplierLaboratoryID,
                    idDisenoLente: req.body.lensDesign,
                    idMaterialLente: req.body.lensMaterial,
                    idAcabadoLente: req.body.lensFinish,
                    valorEsf: req.body.sphericalValueLE,
                    valorCil: req.body.cilyndricalValueLE,
                    indiceRefraccion: req.body.refractionIndexLE,
                    eje:req.body.axisLE,
                    diametro: req.body.lensDiameter,
                    color: req.body.lensColor,
                    cantidad: -1,
                    deStock: 0
                })
            };
            if (req.body.orderLensRE){
                lensRE = await Lens.create({
                    idProvLab: req.body.supplierLaboratoryID,
                    idDisenoLente: req.body.lensDesign,
                    idMaterialLente: req.body.lensMaterial,
                    idAcabadoLente: req.body.lensFinish,
                    valorEsf: req.body.sphericalValueRE,
                    valorCil: req.body.cilyndricalValueRE,
                    indiceRefraccion: req.body.refractionIndexRE,
                    eje: req.body.axisRE,
                    diametro: req.body.lensDiameter,
                    color: req.body.lensColor,
                    cantidad: -1,
                    deStock: 0
                })
            };
            await Order.create({
                codLenteOI: lensLE.codLente,
                codLenteOD: lensRE.codLente,
                numAnteojo: req.body.glassesNumber,
                idProvLab: req.body.supplierLaboratoryID,
                estadoPedido: 'Pendiente',
                fechaEntregaEsperada: req.body.expectedDeliveryDate,
                obsPedido: req.body.orderObs,
                pedirLenteOI: req.body.orderLensLE,
                pedirLenteOD: req.body.orderLensRE
            });
        res.status(200).json();
    } catch (err) {
        res.status(400).json({
            msg: err.message
        })
    }
};

orderController.editOrder = async (req, res) => {
    try {
        let lensLE = {
            codLente: null
        };
        let lensRE = {
            codLente: null
        };
        const currentOrder = await Order.findByPk(req.params.orderNumber);
        Validators.validatorOrderEdit(req.body);
        if(req.body.orderLensLE){
            Validators.validatorOrderLE(req.body);
        };
        if(req.body.orderLensRE){
            Validators.validatorOrderRE(req.body);
        };
        if(req.body.orderLensRE && req.body.orderLensLE){
            Validators.validatorOrder(req.body);
        };
        if(currentOrder.pedirLenteOI && !req.body.orderLensLE){
            await Validators.normalizeOrderLens(currentOrder.codLenteOI);
        } else if (!currentOrder.pedirLenteOI && req.body.orderLensLE){
            lensLE = await Lens.create({
                idProvLab: req.body.supplierLaboratoryID,
                idDisenoLente: req.body.lensDesign,
                idMaterialLente: req.body.lensMaterial,
                idAcabadoLente: req.body.lensFinish,
                valorEsf: req.body.sphericalValueLE,
                valorCil: req.body.cilyndricalValueLE,
                indiceRefraccion: req.body.refractionIndexLE,
                eje:req.body.axisLE,
                diametro: req.body.lensDiameter,
                color: req.body.lensColor,
                cantidad: -1,
                deStock: 0
            })
        } else {
            lensLE.codLente = currentOrder.codLenteOI;
            await Lens.update({
                idProvLab: req.body.supplierLaboratoryID,
                idDisenoLente: req.body.lensDesign,
                idMaterialLente: req.body.lensMaterial,
                idAcabadoLente: req.body.lensFinish,
                indiceRefraccion: req.body.refractionIndexLE
            }, {
                where: {
                    codLente: currentOrder.codLenteOI
                }
            });
        };
        if(currentOrder.pedirLenteOD && !req.body.orderLensRE){
            await Validators.normalizeOrderLens(currentOrder.codLenteOD);
        } else if (!currentOrder.pedirLenteOD && req.body.orderLensRE){
            lensRE = await Lens.create({
                idProvLab: req.body.supplierLaboratoryID,
                idDisenoLente: req.body.lensDesign,
                idMaterialLente: req.body.lensMaterial,
                idAcabadoLente: req.body.lensFinish,
                valorEsf: req.body.sphericalValueLE,
                valorCil: req.body.cilyndricalValueLE,
                indiceRefraccion: req.body.refractionIndexLE,
                eje:req.body.axisLE,
                diametro: req.body.lensDiameter,
                color: req.body.lensColor,
                cantidad: -1,
                deStock: 0
            })
        } else {
            lensRE.codLente = currentOrder.codLenteOD;
            await Lens.update({
                idProvLab: req.body.supplierLaboratoryID,
                idDisenoLente: req.body.lensDesign,
                idMaterialLente: req.body.lensMaterial,
                idAcabadoLente: req.body.lensFinish,
                indiceRefraccion: req.body.refractionIndexRE
            }, {
                where: {
                    codLente: currentOrder.codLenteOD
                }
            });
        };
        await Order.update({
            codLenteOI: lensLE.codLente,
            codLenteOD: lensRE.codLente,
            numAnteojo: req.body.glassesNumber,
            idProvLab: req.body.supplierLaboratoryID,
            fechaEntregaEsperada: req.body.expectedDeliveryDate,
            obsPedido: req.body.orderObs,
            estadoPedido: req.body.orderStatus,
            pedirLenteOI: req.body.orderLensLE,
            pedirLenteOD: req.body.orderLensRE
        }, {
            where: {
                numPedido: req.params.orderNumber
            }
        });
        res.status(200).json();
    } catch (err) {
        res.status(400).json({
            msg: err.message
        })
    }
};

orderController.suspendOrder = async (req, res) => {
    try {
        const order = await Order.findByPk(req.params.orderNumber);
        if(order.codLenteOI){
            await Lens.update({
                activo: 0
            }, {
                where: {
                    codLente: order.codLenteOI
                }
            })
        };
        if(order.codLenteOD){
            await Lens.update({
                activo: 0
            }, {
                where: {
                    codLente: order.codLenteOD
                }
            })
        };
        await Order.update({
            activo: 0
        }, {
            where: {
                numPedido: req.params.orderNumber
            }
        });
        res.status(200).json();
    } catch (err) {
        res.status(400).json({
            msg: err.message
        });
    }
};


module.exports = orderController;