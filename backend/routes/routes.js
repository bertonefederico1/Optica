'use strict'

const express = require('express');
const router = express.Router();

const customerController = require('../controllers/customerController');

//Rutas de clientes
router.get('/clientes', customerController.getAll);
router.post('/nuevoCliente', customerController.createCustomer);
router.put('/editarCliente/:id', customerController.editCustomer);
router.put('/suspenderCliente/:id', customerController.suspendCustomer);




module.exports = router;