const controladorUsuario = require('../controller/ControllerUsuario');
const validarToken = require('../Middleware/validarToken');
const verificarRol = require('../Middleware/verificarRol');

module.exports = (app) => {
    app.get('/api/usuarios', validarToken, verificarRol('admin'), controladorUsuario.obtenerUsuarios);
    app.post('/api/crear/usuario', controladorUsuario.agregarUsuario);
    app.delete('/api/eliminar/usuario/:email', validarToken, verificarRol('admin'), controladorUsuario.eliminarUsuario);
    app.post('/api/login', controladorUsuario.login);
};