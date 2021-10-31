const mongoose = require('mongoose');
require('dotenv').config({path: 'variables.env'});

async function conectarDB() {
    try {
        await mongoose.connect(process.env.DB_MONGO, {
            useNewUrlParser: true,
        });
        console.log('db conectada');
    } catch (error) {
        console.log(error);
        process.exit(1); //en caso de error en la conexión detiene la app
    }
}
module.exports = conectarDB; 