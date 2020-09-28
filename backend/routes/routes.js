'use strict'

const express = require('express');
const router = express.Router();

const customerController = require('../controllers/customerController');
const healthCarelController = require('../controllers/healthCareController');
const supplierLaboratoryController = require('../controllers/supplierLaboratoryController')
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
const orderController = require('../controllers/orderController');
const glassesController = require('../controllers/glassesController');
const customerHealthCareController = require('../controllers/customerHealthCareController');

//Login y Logout
router.post('/login', logController.signIn);
router.post('/signup', logController.signUp);

//Rutas de Clientes
router.get('/customers/:select?', customerController.getAll);
router.get('/customer/:customerID', customerController.getOne);
router.post('/newCustomer', customerController.createCustomer);
router.put('/editCustomer/:customerID', customerController.editCustomer);
router.put('/suspendCustomer/:customerID', customerController.suspendCustomer);

//Rutas de Obras Sociales
router.get('/healthCares', healthCarelController.getAll);
router.get('/healthCare/:healthCareID', healthCarelController.getOne);
router.post('/newHealthCare', healthCarelController.createHealthCare);
router.put('/editHealthCare/:healthCareID', healthCarelController.editHealthCare);
router.put('/suspendHealthCare/:healthCareID', healthCarelController.suspendHealthCare);

//Rutas de Clientes - Obras Sociales
router.get('/healthCaresByCustomer/:customerID', customerHealthCareController.getAllByCustomer);

//Rutas de Proveedores/Laboratorios
router.get('/suppliersLaboratories/:select?', supplierLaboratoryController.getAll);
router.get('/supplierLaboratory/:supplierLaboratoryID', supplierLaboratoryController.getOne);
router.post('/newSupplierLaboratory', supplierLaboratoryController.createSupplierLaboratory);
router.put('/editSupplierLaboratory/:supplierLaboratoryID', supplierLaboratoryController.editSupplierLaboratory);
router.put('/suspendSupplierLaboratory/:supplierLaboratoryID', supplierLaboratoryController.suspendSupplierLaboratory);

//Rutas de Armazones
router.get('/frames/:select?', frameController.getAll);
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
router.get('/lenses/:select?', lensController.getAll);
router.get('/lens/:lensID', lensController.getOne);
router.post('/newLens', lensController.createLens);
router.put('/editLens/:lensID', lensController.editLens);
router.put('/suspendLens/:lensID', lensController.suspendLens);
/* router.put('/restoreLens/:lensID', lensController.restoreLens); */

//Ruta de Materiales de Lentes
router.get('/materialsLens', lensMaterialController.getAll);

//Ruta de Diseños Lentes
router.get('/designsLens', lensDesignController.getAll);

//Ruta de Utilidades Lentes
router.get('/finishesLens', lensFinishController.getAll);

//Rutas de recetas
router.get('/prescriptionsByCustomerId/:customerID', prescriptionController.getAllByCustomer);
router.get('/prescription/:prescriptionNumber', prescriptionController.getOne);
router.post('/newPrescription', prescriptionController.createPrescription);
router.put('/editPrescription/:prescriptionNumber', prescriptionController.editPrescription);
router.put('/deletePrescription/:prescriptionNumber', prescriptionController.suspendPrescription);

//Rutas de Pedidos
router.get('/orders', orderController.getAll);
router.get('/order/:orderNumber', orderController.getOne);
router.get('/ordersByPrescription/:prescriptionNumber', orderController.getOrdersByPrescription);
router.post('/newOrder', orderController.createOrder);
router.put('/editOrder/:orderNumber', orderController.editOrder);
router.put('/suspendOrder/:orderNumber', orderController.suspendOrder);

//Rutas de Anteojos
router.get('/glasses', glassesController.getAll);
router.get('/glasses/:glassesNumber', glassesController.getOne);
router.get('/prescriptionByGlasses/:glassesNumber', glassesController.getPrescriptionByGlasses);
router.get('/glassesPending', glassesController.getGlassesPending);
router.post('/newGlasses', glassesController.createGlasses);
router.put('/editGlasses/:glassesNumber', glassesController.editGlasses);
router.put('/suspendGlasses/:glassesNumber', glassesController.suspendGlasses);

module.exports = router;