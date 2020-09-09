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
const lensController = require('../controllers/lensController');
const lensMaterialController = require('../controllers/lensMaterialController');
const lensDesignController = require('../controllers/lensDesignController');
const lensFinishController = require('../controllers/lensFinishController');
const logController = require('../controllers/logController');
const prescriptionController = require('../controllers/prescriptionController');

//Login y Logout
router.post('/login', logController.logIn);

//Rutas de Clientes
router.get('/customers', customerController.getAll);
router.get('/customer/:customerID', customerController.getOne);
router.post('/newCustomer', customerController.createCustomer);
router.put('/editCustomer/:customerID', customerController.editCustomer);
router.put('/suspendCustomer/:customerID', customerController.suspendCustomer);

//Rutas de Obras Social
router.get('/healthCares', obraSocialController.getAll);
router.get('/healthCare/:healthCareID', obraSocialController.getOne);
router.post('/newHealthCare', obraSocialController.createHealthCare);
router.put('/editHealthCare/:healthCareID', obraSocialController.editHealthCare);
router.put('/suspendHealthCare/:healthCareID', obraSocialController.suspendHealthCare);

//Rutas de Proveedores/Laboratorios
router.get('/suppliersLaboratories', supplierLaboratoryController.getAll);
router.get('/supplierLaboratory/:supplierLaboratoryID', supplierLaboratoryController.getOne);
router.post('/newSupplierLaboratory', supplierLaboratoryController.createSupplierLaboratory);
router.put('/editSupplierLaboratory/:supplierLaboratoryID', supplierLaboratoryController.editSupplierLaboratory);
router.put('/suspendSupplierLaboratory/:supplierLaboratoryID', supplierLaboratoryController.suspendSupplierLaboratory);

//Rutas de Lrmazones
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

//Rutas de Lentes
router.get('/lenses', lensController.getAll);
router.get('/lens/:lensID', lensController.getOne);
router.post('/newLens', lensController.createLens);
router.put('/editLens/:lensID', lensController.editLens);
router.put('/suspendLens/:lensID', lensController.suspendLens);

//Ruta de Materiales de Lentes
router.get('/materialsLens', lensMaterialController.getAll);

//Ruta de Diseños Lentes
router.get('/designsLens', lensDesignController.getAll);

//Ruta de Utilidades Lentes
router.get('/finishesLens', lensFinishController.getAll);

//Ruta de recetas
router.get('/prescriptionsById/:customerID', prescriptionController.getAllByCustomer);
router.post('/newPrescription', prescriptionController.createPrescription);
/* router.put('/editPrescription/:prescriptionID') */

module.exports = router;