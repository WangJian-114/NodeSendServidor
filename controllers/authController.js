const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: 'variables.env'})
const { validationResult } = require('express-validator');

exports.autenticarUsuario = async (req, res, next) => {

    // Revisar si hay errores
    // Mostrar mensaje de error
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({
            errores: errores.array()
        })
    }

    // Buscar el usuario para ver si esta registrado
    const { email, password } = req.body;
    const usuario = await Usuario.findOne({ email });
    if(!usuario){
        res.status(401).json({
            msg: `El email: ${email} , no esta registrado`
        });

        return next();
    }

    // Verificar el password y autenticar el usuario
    if( bcrypt.compareSync(password, usuario.password) ){
        // Crear jwt
        const token = jwt.sign({
            nombre: usuario.nombre,
            id: usuario._id
        }, process.env.SECRETA, {
            expiresIn: '5h'
        } );

        res.json({token});


    } else {
        res.status(401).json({ msg: "Password Incorrecto"});
        return next();
    }


}


exports.usuarioAutenticado = async (req, res, next ) => {

    res.json({ 
        usuario :req.usuario
    });

}