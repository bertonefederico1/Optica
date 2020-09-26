'use strict'

const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;
const logController = {};

logController.logIn = async (req, res) => {
    try {
        /* bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
            // Generate password hash
            res.send(hash);
        }); */


        const user = await User.findOne({
            where: {
                usuario: req.body.username
            }
        });
        if(!user){
            throw new Error('Usuario y/o contraseña incorrectos');
        };
        const match = await bcrypt.compare(req.body.password, user.contrasena);
        if(!match) {
            throw new Error('Usuario y/o contraseña incorrectos');
        };
        const token = jwt.sign({role: user.rol}, 'wordKey');
        res.status(200).json({token});
    } catch (err) {
        res.status(400).json({
            msg: err.message
        });
    };
}

module.exports = logController;