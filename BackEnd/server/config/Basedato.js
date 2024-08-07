mongoose = require('mongoose');

//conectarse a la base de datos
mongoose.connect('mongodb://127.0.0.1:27017/ecomerce_db')
    .then((db) =>{
        console.log('Base de datos conectada');
    })
    .catch((err) =>{
        console.log('Error al conectarse a la base de datos');
    })