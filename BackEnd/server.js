const exprees = require('express');
const cors = require('cors');
const app = exprees();
const rutaUsuario = require('./server/routes/RutaUsuario');


//Middleware
app.use(cors());
app.use(exprees.json());
app.use(exprees.urlencoded({ extended: true }));

//requerir base de datos
require('./server/config/Basedato');

//rutas
rutaUsuario(app);

//servidor
app.listen(8080, () => {
    console.log('servidor activo en el puerto 8080');
})