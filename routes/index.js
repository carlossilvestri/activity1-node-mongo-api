const express = require('express');
const router = express.Router();
const usuariosController = require("../controllers/usuariosController");


module.exports = () => {
    /****USERS****/
    router.post('/user',  usuariosController.registrarUsuario);
    router.get('/user',  usuariosController.mostrarUsuarios);
    router.get('/user/:id',  usuariosController.showUserById);
    router.delete('/user/:id',  usuariosController.borrarUsuario);
    router.get('/', (req, res) => { res.send('inicio'); });
    return router;
}