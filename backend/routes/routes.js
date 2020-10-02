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
router.get('/getUserRole', logController.getUserRole);

//Rutas de Clientes
router.get('/customers/:select?', logController.verifyTokenUserLvl3, customerController.getAll);
router.get('/customer/:customerID', logController.verifyTokenUserLvl3, customerController.getOne);
router.post('/newCustomer', logController.verifyTokenUserLvl5, customerController.createCustomer);
router.put('/editCustomer/:customerID', logController.verifyTokenUserLvl5, customerController.editCustomer);
router.put('/suspendCustomer/:customerID', logController.verifyTokenUserLvl5, customerController.suspendCustomer);

//Rutas de Obras Sociales
router.get('/healthCares', logController.verifyTokenUserLvl3, healthCarelController.getAll);
router.get('/healthCare/:healthCareID', logController.verifyTokenUserLvl3, healthCarelController.getOne);
router.post('/newHealthCare', logController.verifyTokenUserLvl5, healthCarelController.createHealthCare);
router.put('/editHealthCare/:healthCareID', logController.verifyTokenUserLvl5, healthCarelController.editHealthCare);
router.put('/suspendHealthCare/:healthCareID', logController.verifyTokenUserLvl5, healthCarelController.suspendHealthCare);


//Rutas de Clientes - Obras Sociales
router.get('/healthCaresByCustomer/:customerID', logController.verifyTokenUserLvl3, customerHealthCareController.getAllByCustomer);

//Rutas de Proveedores/Laboratorios
router.get('/suppliersLaboratories/:select?', logController.verifyTokenUserLvl3, supplierLaboratoryController.getAll);
router.get('/supplierLaboratory/:supplierLaboratoryID', logController.verifyTokenUserLvl3, supplierLaboratoryController.getOne);
router.post('/newSupplierLaboratory', logController.verifyTokenUserLvl4, supplierLaboratoryController.createSupplierLaboratory);
router.put('/editSupplierLaboratory/:supplierLaboratoryID', logController.verifyTokenUserLvl4, supplierLaboratoryController.editSupplierLaboratory);
router.put('/suspendSupplierLaboratory/:supplierLaboratoryID', logController.verifyTokenUserLvl4, supplierLaboratoryController.suspendSupplierLaboratory);

//Rutas de Armazones
router.get('/frames/:select?', logController.verifyTokenUserLvl3, frameController.getAll);
router.get('/frame/:frameID', logController.verifyTokenUserLvl3, frameController.getOne);
router.post('/newFrame', logController.verifyTokenUserLvl3, frameController.createFrame);
router.put('/editFrame/:frameID', logController.verifyTokenUserLvl3, frameController.editFrame);
router.put('/suspendFrame/:frameID', logController.verifyTokenUserLvl3, frameController.suspendFrame);

//Ruta de Materiales de Armazones
router.get('/frameMaterials', logController.verifyTokenUserLvl3, frameMaterialController.getAll);

//Ruta de Diseños Armazones
router.get('/frameDesigns', logController.verifyTokenUserLvl3, frameDesignController.getAll);

//Ruta de Utilidades Armazones
router.get('/frameUtilities', logController.verifyTokenUserLvl3, frameUtilityController.getAll);

//Rutas de Lentes
router.get('/lenses/:select?', logController.verifyTokenUserLvl3, lensController.getAll);
router.get('/lens/:lensID', logController.verifyTokenUserLvl3, lensController.getOne);
router.post('/newLens', logController.verifyTokenUserLvl3, lensController.createLens);
router.put('/editLens/:lensID', logController.verifyTokenUserLvl3, lensController.editLens);
router.put('/suspendLens/:lensID', logController.verifyTokenUserLvl3, lensController.suspendLens);

//Ruta de Materiales de Lentes
router.get('/materialsLens', logController.verifyTokenUserLvl3, lensMaterialController.getAll);

//Ruta de Diseños Lentes
router.get('/designsLens', logController.verifyTokenUserLvl3, lensDesignController.getAll);

//Ruta de Utilidades Lentes
router.get('/finishesLens', logController.verifyTokenUserLvl3, lensFinishController.getAll);

//Rutas de recetas
router.get('/prescriptionsByCustomerId/:customerID', logController.verifyTokenUserLvl3, prescriptionController.getAllByCustomer);
router.get('/prescription/:prescriptionNumber', logController.verifyTokenUserLvl3, prescriptionController.getOne);
router.post('/newPrescription', logController.verifyTokenUserLvl5, prescriptionController.createPrescription);
router.put('/editPrescription/:prescriptionNumber', logController.verifyTokenUserLvl5, prescriptionController.editPrescription);
router.put('/deletePrescription/:prescriptionNumber', logController.verifyTokenUserLvl5, prescriptionController.suspendPrescription);

//Rutas de Pedidos
router.get('/orders', logController.verifyTokenUserLvl3, orderController.getAll);
router.get('/order/:orderNumber', logController.verifyTokenUserLvl3, orderController.getOne);
router.get('/ordersByPrescription/:prescriptionNumber', logController.verifyTokenUserLvl3, orderController.getOrdersByPrescription);
router.post('/newOrder', logController.verifyTokenUserLvl5, orderController.createOrder);
router.put('/editOrder/:orderNumber', logController.verifyTokenUserLvl3, orderController.editOrder);
router.put('/suspendOrder/:orderNumber', logController.verifyTokenUserLvl5, orderController.suspendOrder);

//Rutas de Anteojos
router.get('/glasses', logController.verifyTokenUserLvl3, glassesController.getAll);
router.get('/glasses/:glassesNumber', logController.verifyTokenUserLvl3, glassesController.getOne);
router.get('/prescriptionByGlasses/:glassesNumber', logController.verifyTokenUserLvl3, glassesController.getPrescriptionByGlasses);
router.get('/glassesPending', logController.verifyTokenUserLvl3, glassesController.getGlassesPending);
router.post('/newGlasses', logController.verifyTokenUserLvl5, glassesController.createGlasses);
router.post('/glassesByHealthCareAndDate', glassesController.getAllByHealthCareAndDate);
router.put('/editGlasses/:glassesNumber', logController.verifyTokenUserLvl3, glassesController.editGlasses);
router.put('/suspendGlasses/:glassesNumber', logController.verifyTokenUserLvl5, glassesController.suspendGlasses);

module.exports = router;