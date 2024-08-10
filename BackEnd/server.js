const express = require('express');
const cors = require('cors');
const app = express();
const rutaUsuario = require('./server/routes/RutaUsuario');
const rutaProducto = require('./server/routes/RutaProducto');


//Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Middleware para servir archivos estáticos desde la carpeta de imágenes
app.use('/uploads', express.static('C:\\Users\\gabri\\OneDrive\\Escritorio\\MERN Bootcamp\\Mern\\Proyectos Mern\\Jevende\\imagenes de jevende'));





//requerir base de datos
require('./server/config/Basedato');

//rutas
rutaUsuario(app);
rutaProducto(app);

//servidor
app.listen(8080, () => {
    console.log('servidor activo en el puerto 8080');
})