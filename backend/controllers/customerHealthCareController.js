'use strict'


const CustomerHealthCare = require('../models/Customer_HealthCare');
const HealthCare = require('../models/HealthCare');
const customerHealthCareController = {};


customerHealthCareController.getAllByCustomer = async (req, res) => {
    try {
        const healthCaresByCustomer = await CustomerHealthCare.findAll({
            where: {
                idCliente: req.params.customerID
            },
            include: {
                model: HealthCare
            }
        })
        res.status(200).json(healthCaresByCustomer);
    } catch (err) {
        res.status(400).json(err);
    }
};

module.exports = customerHealthCareController;