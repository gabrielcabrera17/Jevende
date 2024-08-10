const jwt = require('jsonwebtoken');
const SECRETO = 'secreto';

const validarToken = ((req, res, next)=>{
    const token = req.headers.token;
    jwt.verify(token, SECRETO, (error, decodificado)=>{
        if(error){
            return res.status(401).json({ message: 'Token inválido' });
        }

        req.infoUsuario = {
            nombre: decodificado.nombre,
            email: decodificado.email
        }

        next();
    })
})

module.exports = validarToken;