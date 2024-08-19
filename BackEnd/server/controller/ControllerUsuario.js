const Usuario = require('../model/ModelUsuario');

const bcrypt = require('bcrypt');
const HASH_SALT = 10;
const saltGenerado = bcrypt.genSaltSync(HASH_SALT);
//jwt
const jwt = require('jsonwebtoken');
const SECRETO = 'secreto';

module.exports.agregarUsuario = async (req, res) => {
    const { nombre, email, password, rol } = req.body;
    const saltGenerado = bcrypt.genSaltSync(10); // Asegúrate de que saltGenerado esté definido
    const passwordEncriptada = bcrypt.hashSync(password, saltGenerado);

    if (!nombre || !email || !password || !rol) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    try {
        const emailRepetido = await Usuario.findOne({ email: email });
        if (emailRepetido) {
            return res.status(400).json({ message: 'El email ya se encuentra registrado' });
        } else {
            const usuario = await Usuario.create({ nombre, email, password: passwordEncriptada, rol });
            
            // Generar el token JWT
            const infoEnToken = {
                nombre: usuario.nombre,
                email: usuario.email
            };

            jwt.sign(infoEnToken, SECRETO, { expiresIn: '20m' }, (error, token) => {
                if (error) {
                    return res.status(400).json({ message: 'Error al generar el token: ' + error });
                }
                return res.status(200).json({ token });
            });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Error al crear el usuario: ' + error.message });
    }
};

module.exports.obtenerUsuarios = (req, res) => {
    return Usuario.find()
        .then((usuarios) =>{
            return res.status(200).json({ usuarios });
        })
        .catch((error) =>{
            return res.status(500).json({ message: 'Error al obtener los usuarios' });
        })
}

module.exports.eliminarUsuario = (req, res) => {
    const { email } = req.params;
    return Usuario.deleteOne({ email: email })
        .then((respuesta) =>{
            return res.status(200).json({ message: 'Usuario eliminado' });
        })
        .catch((error) =>{
            return res.status(200).json({ message: 'Error al eliminar el usuario' });
        })
}

//login
module.exports.login = (req, res) => {
    const { email, password } = req.body;
    Usuario.findOne({ email: email })
        .then((usuario) =>{
            if(!usuario){
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }

            if(bcrypt.compareSync(password, usuario.password)){
                const infoEnToken = {
                    nombre: usuario.nombre,
                    email: usuario.email
                };

                jwt.sign(infoEnToken, SECRETO, { expiresIn: '1m' }, (error, token) => {
                    if(error){
                        return res.status(400).json({ message: 'Error al generar el token: ' + error });
                    }
                    return res.status(200).json({ token });
                });
            }else{
                return res.status(401).json({ message: 'Contraseña incorrecta' });
            }
        })
        .catch((error) =>{
            return res.status(500).json({ message: 'Error al obtener el usuario:'+ error });
        })

}