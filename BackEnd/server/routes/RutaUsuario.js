const controladorUsuario = require ('../controller/ControllerUsuario');
const validarToken = require ('../Middleware/validarToken');
module.exports = (app) =>{
    app.get('/api/usuarios',validarToken, controladorUsuario.obtenerUsuarios);
    app.post('/api/crear/usuario', controladorUsuario.agregarUsuario);
    app.delete('/api/eliminar/usuario/:email', controladorUsuario.eliminarUsuario);
    app.post('/api/login', controladorUsuario.login);
}