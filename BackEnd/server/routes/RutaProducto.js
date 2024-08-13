
const controladorProducto = require('../controller/ControllerProducto');
const upload = require('../Middleware/SubirImagen');
const validarToken = require('../Middleware/validarToken');

module.exports = (app) => {
    app.get('/api/productos', controladorProducto.obtenerProductos);
    app.post('/api/crear/producto', validarToken, upload.single('imagen'), controladorProducto.agregarProducto);
    app.delete('/api/eliminar/producto/:id', controladorProducto.eliminarProducto);
}
