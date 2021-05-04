const jwt = require('jsonwebtoken');
require('dotenv').config({ path: 'variables.env'})
const { validationResult } = require('express-validator');


module.exports = ( req, res, next ) => {

    const authHeader = req.get('Authorization');

    if(authHeader){
        // Obtener el Token
        const token = authHeader.split(' ')[1];

        try {
            // Comprobar JWT de la auth
            const usuario = jwt.verify(token, process.env.SECRETA);
            console.log(usuario);
            // Asignarlo en la req
            req.usuario = usuario;
            
        } catch (error) {
            console.log(error);
        }
        

    } 

    return next();
}