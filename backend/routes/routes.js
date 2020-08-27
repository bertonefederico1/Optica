'use strict'

const express = require('express');
const router = express.Router();

const customerController = require('../controllers/customerController');
const obraSocialController = require('../controllers/obraSocialController');

//Rutas de clientes
router.get('/clientes', customerController.getAll);
router.get('/cliente/:idCliente', customerController.getOne);
router.post('/nuevoCliente', customerController.createCustomer);
router.put('/editarCliente/:idCliente', customerController.editCustomer);
router.put('/suspenderCliente/:idCliente', customerController.suspendCustomer);

//Rutas de obras social
router.get('/obrasSociales', obraSocialController.getAll);




module.exports = router;