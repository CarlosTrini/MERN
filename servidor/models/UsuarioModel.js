const mongoose = require('mongoose');

//definir el schema
const UsuarioSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
        trim: true
    },
    registro: {
        type: Date,
        default: Date.now()
    }
});
// se registra el modelo 'usuario' con el schema 'UsuarioSchema'
module.exports = mongoose.model('usuario', UsuarioSchema); 