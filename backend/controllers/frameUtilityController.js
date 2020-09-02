'use strict'

const FrameUtility = require('../models/FrameUtility');
const frameUtilityController = { };


frameUtilityController.getAll = async (req, res) => {
    try {
        const frameUtilities = await FrameUtility.findAll();
        res.status(200).json(frameUtilities);
    } catch (err) {
        res.json(err);
    }
}


module.exports = frameUtilityController;