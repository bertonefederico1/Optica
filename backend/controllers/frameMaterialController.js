'use strict'

const FrameMaterial = require('../models/FrameMaterial');
const frameMaterialController = { };


frameMaterialController.getAll = async (req, res) => {
    try {
        const frameMaterials = await FrameMaterial.findAll();
        res.status(200).json(frameMaterials);
    } catch (err) {
        res.json(err);
    }
}


module.exports = frameMaterialController;