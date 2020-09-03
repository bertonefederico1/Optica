'use strict'

const express = require('express');
const router = express.Router();

const customerController = require('../controllers/customerController');
const obraSocialController = require('../controllers/healthCareController');
const supplierLaboratoryController = require('../controllers/SupplierLaboratoryController')
const frameController = require('../controllers/frameController');
const frameMaterialController = require('../controllers/frameMaterialController');
const frameDesignController = require('../controllers/frameDesignController');
const frameUtilityController = require('../controllers/frameUtilityController');

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

//Rutas de armazones
router.get('/frames', frameController.getAll);
router.get('/frame/:frameID', frameController.getOne);
router.post('/newFrame', frameController.createFrame);
router.put('/editFrame/:frameID', frameController.editFrame);
router.put('/suspendFrame/:frameID', frameController.suspendFrame);

//Ruta de Materiales de Armazones
router.get('/frameMaterials', frameMaterialController.getAll);

//Ruta de Diseños Armazones
router.get('/frameDesigns', frameDesignController.getAll);

//Ruta de Utilidades Armazones
router.get('/frameUtilities', frameUtilityController.getAll);


module.exports = router;