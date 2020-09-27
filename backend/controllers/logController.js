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
        const token = jwt.sign({userLevel: user.nivelUsuario}, 'wordKey');
        res.status(200).json({token});
    } catch (err) {
        res.status(400).json({
            msg: err.message
        });
    };
}

logController.verifyToken = (req, res, next) => {
    if(!req.headers.authorization){
        res.status(401).json();
    };
    const token = req.headers.authorization.split(' ')[1];
    if(token === null){
        res.status(401).json();
    };
    const payload = jwt.verify(token, 'wordKey');
    req.userLevel = payload.userLevel;
    next();
};

module.exports = logController;