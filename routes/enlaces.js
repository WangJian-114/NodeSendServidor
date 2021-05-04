const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const enlacesController = require('../controllers/enlacesController');
const archivosController = require('../controllers/archivosController');
const auth = require('../middleware/auth');


router.post('/',[
        check('nombre', 'Sube un archivo').notEmpty(),
        check('nombre_original', 'Subu un archivo').notEmpty()
    ],
    auth,
    enlacesController.nuevoEnlace
);

router.get('/',
    enlacesController.todosEnlaces
);

router.get('/:url',
    enlacesController.tienePassword,
    enlacesController.obtenerEnlace
);

router.post('/:url',
    enlacesController.verificarPassword,
    enlacesController.obtenerEnlace
);


module.exports = router;