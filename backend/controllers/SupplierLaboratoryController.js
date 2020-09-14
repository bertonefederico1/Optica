'use strict'

const Supplier_Laboratory = require('../models/SupplierLaboratory');
const SupplierLaboratoryController = { };

SupplierLaboratoryController.getAll = async (req, res) => {
    try {
        let suppliers_laboratories = null;
        if(req.params.select){
            suppliers_laboratories = await Supplier_Laboratory.findAll({
                order: [['razonSocial', 'ASC']],
                where: {
                    activo: 1
                }
            });
        } else {
            suppliers_laboratories = await Supplier_Laboratory.findAll({
                where: {
                    activo: 1
                }
            });
        }
        res.status(200).json(suppliers_laboratories);
    } catch (err) {
        res.status(400).json(err);
    }
};

SupplierLaboratoryController.getOne = async (req, res) => {
    try {
        const supplierLaboratory = await Supplier_Laboratory.findOne({
            where: {
                idProvLab: req.params.supplierLaboratoryID,
                activo: 1
            }
        });
        res.status(200).json(supplierLaboratory);
    } catch(err){
        res.status(400).json(err);
    }
}

SupplierLaboratoryController.createSupplierLaboratory = async (req, res) => {
    try {
        await Supplier_Laboratory.create({
            razonSocial: req.body.businessName,
            nombreFantasia: req.body.fantasyName,
            domicilio: req.body.address,
            telefono: req.body.telephone,
            email: req.body.email,
        });
        res.status(200).json();
    } catch (err) {
        res.status(400).json(err);
    }
}; 

SupplierLaboratoryController.editSupplierLaboratory = async (req, res) => {
    try {
        await Supplier_Laboratory.update({
            razonSocial: req.body.businessName,
            nombreFantasia: req.body.fantasyName,
            domicilio: req.body.address,
            telefono: req.body.telephone,
            email: req.body.email
        }, {
            where: {
                idProvLab: req.params.supplierLaboratoryID
            }
        });
        res.status(200).json();
    } catch (err) {
        res.status(400).json(err);
    }
}; 

SupplierLaboratoryController.suspendSupplierLaboratory = async (req, res) => {
    try {
        await Supplier_Laboratory.update({
            activo: 0
        }, {
            where: {
                idProvLab: req.params.supplierLaboratoryID
            }
        });
        res.status(200).json();
    } catch (err) {
        res.status(400).json(err);
    }
};


module.exports = SupplierLaboratoryController;