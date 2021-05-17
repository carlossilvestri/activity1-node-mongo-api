const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usuariosSchema = new Schema({
    name: {
        type: String,
        required: 'Agrega tu Nombre'
    },
});
module.exports = mongoose.model('Usuarios', usuariosSchema);