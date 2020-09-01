'use strict'

const express = require('express');
const router = express.Router();

const customerController = require('../controllers/customerController');
const obraSocialController = require('../controllers/healthCareController');
const supplierLaboratoryController = require('../controllers/SupplierLaboratoryController')

//Rutas de clientes
router.get('/customers', customerController.getAll);
router.get('/customer/:customerID', customerController.getOne);
router.post('/newCustomer', customerController.createCustomer);
router.put('/editCustomer/:customerID', customerController.editCustomer);
router.put('/suspendCustomer/:customerID', customerController.suspendCustomer);

//Rutas de obras social
router.get('/healthCares', obraSocialController.getAll);
router.get('/healthCare/:healthCareID', obraSocialController.getOne);
router.post('/newHealthCare', obraSocialController.createHealthCare);
router.put('/editHealthCare/:healthCareID', obraSocialController.editHealthCare);
router.put('/suspendHealthCare/:healthCareID', obraSocialController.suspendHealthCare);

//Rutas de proveedores/laboratorios
router.get('/suppliersLaboratories', supplierLaboratoryController.getAll);
router.get('/supplierLaboratory/:supplierLaboratoryID', supplierLaboratoryController.getOne);
router.post('/newSupplierLaboratory', supplierLaboratoryController.createSupplierLaboratory);
router.put('/editSupplierLaboratory/:supplierLaboratoryID', supplierLaboratoryController.editSupplierLaboratory);
router.put('/suspendSupplierLaboratory/:supplierLaboratoryID', supplierLaboratoryController.suspendSupplierLaboratory);



module.exports = router;