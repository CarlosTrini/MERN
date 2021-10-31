const mongoose = require('mongoose');

const ProyectosSchema = mongoose.Schema({

    nombre: {
        type: String,
        require: true,
        trim: true
    },
    creador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usuario' //es el modelo usuario del UsuarioModel...
    },
    creado: {
        type: Date,
        default: Date.now()
    }


});
//se registra el modelo "proyectos" con el schema "ProyectosSchema"
module.exports = mongoose.model('proyectos', ProyectosSchema);