'use strict'

const Order = require('../models/Order');
const FrameMaterial = require('../models/FrameMaterial');
const SupplierLaboratory = require('../models/SupplierLaboratory'); 
const Lens = require('../models/Lens');
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
                }
            ]
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
        await Order.create({
            codLenteOI: req.body.design,
            codLenteOD: req.body.utility,
            idProvLab: req.body.supplierLaboratory,
            estadoPedido: req.body.brand,
            fechaEntregaEsperada: req.body.color,
            obsPedido: req.body.quantityInStock,
            pedirLenteOI: req.body.quantityInStock,
            pedirLenteOD: req.body.quantityInStock
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