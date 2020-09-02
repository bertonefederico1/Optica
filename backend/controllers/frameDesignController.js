'use strict'

const FrameDesign = require('../models/FrameDesign');
const frameDesignController = { };


frameDesignController.getAll = async (req, res) => {
    try {
        const frameDesigns = await FrameDesign.findAll();
        res.status(200).json(frameDesigns);
    } catch (err) {
        res.json(err);
    }
}


module.exports = frameDesignController;