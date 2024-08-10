const mongoose = require('mongoose');

//Esquema usuario
const ProductoSchema = mongoose.Schema({
   imagen:{
      type: String,
      required: true,
   },
   nombre:{
      type: String,
      required: true,
   },
   precio:{
      type: Number,
      required: true,
   },
   stock:{
      type: Number,
      required: true,
   },
   codigo:{
      type: String,
      required: true,
      unique: [true, 'Código de producto ya registrado'],
   },
   tamanio:{
      type: String,
      required: true,
   },
   descripcion:{
      type: String,
      required: true,
   },
   marca:{
      type: String,
      required: true,
   }
})

const ModelProducto = mongoose.model('productos', ProductoSchema);
module.exports = ModelProducto;