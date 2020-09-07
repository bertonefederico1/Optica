'use strict'

const LensFinish = require('../models/LensFinish');
const lensFinishController = { };


lensFinishController.getAll = async (req, res) => {
    try {
        const lensFinish = await LensFinish.findAll();
        res.status(200).json(lensFinish);
    } catch (err) {
        res.status(400).json(err);
    }
}


module.exports = lensFinishController;