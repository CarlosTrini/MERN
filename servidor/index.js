const express = require('express');
const conectarDB = require('./config/db');
const  cors = require('cors');

//crear el servidor
const app = express();

//conectar a la base de datos
conectarDB();

//Habilitar Cors
app.use(cors());

// en el puerto de la app, si existe la variable en process se asigna, de lo contrario, es 4000
const PORT = process.env.PORT || 4000;

//  habilitar express json (antes body.parser) 
// permite recibir peticiones con header Content-type: application/json
app.use(express.json({extended: true}));


// IMPORTAR RUTAS
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/proyectos', require('./routes/proyectos'));
app.use('/api/tareas', require('./routes/tareas'));

// arrancar la app
app.listen(PORT, () => {
    console.log(`escuchando desde el puerto: ${PORT}`);
});
