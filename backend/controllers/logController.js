'use strict'

const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;
const logController = {};


logController.signIn = async (req, res) => {
    try {
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

logController.signUp = async (req, res) => {
    try {
        let user = null;
        bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
            user = await User.create({
                usuario: req.body.username,
                contrasena: hash,
                rol: 'Administrador',
                nivelUsuario: 5
            });
            res.status(200).json({
                msg: 'User created',
                user: user
            })
        });
    } catch (err) {
        res.status(400).json({
            msg: err.message
        });
    }
   
    
}

logController.verifyTokenUserLvl3 = (req, res, next) => {
    if(!req.headers.authorization){
        res.status(401).json({
            msg: 'Debe inciar sesion'
        });
    };
    const token = req.headers.authorization.split(' ')[1];
    if(token === null){
        res.status(401).json({
            msg: 'Debe inciar sesion'
        });
    };
    const payload = jwt.verify(token, 'wordKey');
    req.userLevel = payload.userLevel;
    if (req.userLevel < 3) {
        res.status(401).json({
            msg: 'No tiene los permisos suficientes para acceder a este recurso'
        });
    } else {
        next();
    };
};

logController.verifyTokenUserLvl5 = (req, res, next) => {
    if(!req.headers.authorization){
        res.status(401).json({
            msg: 'Debe inciar sesion'
        });
    };
    const token = req.headers.authorization.split(' ')[1];
    if(token === null){
        res.status(401).json({
            msg: 'Debe inciar sesion'
        });
    };
    const payload = jwt.verify(token, 'wordKey');
    req.userLevel = payload.userLevel;
    if (req.userLevel < 5) {
        res.status(401).json({
            msg: 'No tiene los permisos suficientes para acceder a este recurso'
        });
    } else {
        next();
    };
};

/* logController.verifyUserLevel = (req, res, next) => {
    if(!req.headers.authorization){
        res.status(401).json();
    };
    const token = req.headers.authorization.split(' ')[1];
    if(token === null){
        res.status(401).json();
    };
    const payload = jwt.verify(token, 'wordKey');
    req.userLevel = payload.userLevel;
    console.log(req.userLevel)
    next()
}; */

module.exports = logController;