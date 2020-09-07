'use strict'

const LensDesign = require('../models/LensDesign');
const lensDesignController = { };


lensDesignController.getAll = async (req, res) => {
    try {
        const lensDesigns = await LensDesign.findAll();
        res.status(200).json(lensDesigns);
    } catch (err) {
        res.status(400).json(err);
    }
}


module.exports = lensDesignController;