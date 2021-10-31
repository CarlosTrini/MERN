const mongoose  = require('mongoose');

const TareasSchema = mongoose.Schema({
   nombre: {
      type: String,
      required: true,
      trim: true
   },
   estado: {
      type: Boolean,
      default: false
   },
   creado: {
      type: Date,
      default: Date.now()
   },
   proyecto: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'proyectos'
   }
});

module.exports = mongoose.model('tareas', TareasSchema);