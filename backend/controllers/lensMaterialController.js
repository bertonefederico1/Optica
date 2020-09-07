'use strict'

const LensMaterial = require('../models/LensMaterial');
const lensMaterialController = { };


lensMaterialController.getAll = async (req, res) => {
    try {
        const lensMaterial = await LensMaterial.findAll();
        res.status(200).json(lensMaterial);
    } catch (err) {
        res.status(400).json(err);
    }
}


module.exports = lensMaterialController;