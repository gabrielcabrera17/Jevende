
const controladorProducto = require('../controller/ControllerProducto');
const upload = require('../Middleware/SubirImagen');
const validarToken = require('../Middleware/validarToken');
const verificarRol = require('../Middleware/verificarRol');

module.exports = (app) => {
    app.get('/api/productos', validarToken, controladorProducto.obtenerProductos);
    app.post('/api/crear/producto', validarToken, verificarRol('admin'), upload.single('imagen'), controladorProducto.agregarProducto);
    app.delete('/api/eliminar/producto/:id', validarToken, verificarRol('admin'), controladorProducto.eliminarProducto);
}
