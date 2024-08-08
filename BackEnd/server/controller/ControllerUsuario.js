const Usuario = require('../model/ModelUsuario');


module.exports.agregarUsuario = async (req, res) => {
    const { nombre, email, password, rol } = req.body;

    if(!nombre || !email || !password || !rol){
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }
    try{
        const emailRepetido = await Usuario.findOne({ email: email });
        if(emailRepetido){
            return res.status(400).json({ message: 'El email ya se encuentra registrado' });
        }else{
            const usuario =  await Usuario.create({ nombre, email, password, rol });
            return res.status(200).json({ usuario });
           
        }
    }catch(error){
        return res.status(500).json({ message: 'Error al crear el usuario' });
    }

}

module.exports.obtenerUsuarios = (req, res) => {
    return Usuario.find()
        .then((usuarios) =>{
            return res.status(200).json({ usuarios });
        })
        .catch((error) =>{
            return res.status(500).json({ message: 'Error al obtener los usuarios' });
        })
}