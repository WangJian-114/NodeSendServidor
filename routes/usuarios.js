const express = require('express');
const router = express.Router();

const { check } = require('express-validator');

const usuarioController = require('../controllers/usuarioController');

router.post('/', [
        check('nombre', 'El nombre es obligatoria').not().isEmpty(),
        check('email', 'Agrega un email valido').isEmail(),
        check('password', 'El password debe ser de al menos 6 caracteres').isLength({ min: 6})
    ],
    usuarioController.nuevoUsuario);


module.exports = router;