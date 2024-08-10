
const controladorProducto = require('../controller/ControllerProducto');
const upload = require('../Middleware/SubirImagen');

module.exports = (app) => {
    app.get('/api/productos', controladorProducto.obtenerProductos);
    app.post('/api/crear/producto', upload.single('imagen'), controladorProducto.agregarProducto);
    app.delete('/api/eliminar/producto/:id', controladorProducto.eliminarProducto);
}
