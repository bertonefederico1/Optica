'use strict'

const Order = require('../models/Order');
const SupplierLaboratory = require('../models/SupplierLaboratory'); 
const Lens = require('../models/Lens');
const orderValidators = require('../validators/orderValidators');
const orderController = { };


orderController.getAll = async (req, res) => {
    try {
        const orders = await Order.findAll({
            where: {
                activo: 1,
                estadoPedido: 'Pendiente'
            },
            include: [{
                    model: Lens,
                    as: 'LensOI'
                },{
                    model: Lens,
                    as: 'LensOD'
                },{
                    model: SupplierLaboratory
                }]
        });
        res.status(200).json(orders);
    } catch (err) {
        res.json(err);
    }
};

/* frameController.getOne = async (req, res) => {
    try {
        const frame = await Frame.findOne({
            where: {
                codArmazon: req.params.frameID,
                activo: 1
            },
            include: [{
                model: FrameMaterial
            }, {
                model: FrameDesign
            }, {
                model: FrameUtility
            }, {
                model: SupplierLaboratory
            }]
        });
        res.status(200).json(frame);
    } catch(err){
        res.json(err);
    }
} */


orderController.createOrder = async (req, res) => {
    try { 
        let lensLE = {
            codLente: null
        };
        let lensRE = {
            codLente: null
        };;
        orderValidators.validatorOrder(req.body);
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
                    cantidad: 1,
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
                    cantidad: 1,
                    deStock: 0
                })
            };
            await Order.create({
                codLenteOI: lensLE.codLente,
                codLenteOD: lensRE.codLente,
                idProvLab: req.body.supplierLaboratoryID,
                estadoPedido: 'Pendiente',
                fechaEntregaEsperada: req.body.expectedDeliveryDate,
                obsPedido: req.body.orderObs,
                pedirLenteOI: req.body.orderLensLE,
                pedirLenteOD: req.body.orderLensRE
            });
        res.status(200).json();
    } catch (err) {
        res.status(400).json()
    }
};

/* frameController.editFrame = async (req, res) => {
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
}; */


module.exports = orderController;