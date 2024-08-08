const controladorUsuario = require ('../controller/ControllerUsuario');

module.exports = (app) =>{
    app.get('/api/usuarios', controladorUsuario.obtenerUsuarios);
    app.post('/api/crear/usuario', controladorUsuario.agregarUsuario);
}