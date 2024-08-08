const mongoose = require('mongoose');

//Esquema usuario
const UsuarioSchema = mongoose.Schema({
     nombre:{
         type: String,
         required: true,
     },
     email:{
        type: String,
        required: true,
        unique: [true, 'Email ya registrado'],
     },
     password:{
        type: String,
        required: true,
     },
     rol:{
        type: String,
        required: true,
     }
})

const ModelUsuario = mongoose.model('usuarios', UsuarioSchema);
module.exports = ModelUsuario;