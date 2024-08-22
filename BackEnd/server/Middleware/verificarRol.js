module.exports = (rolRequerido) => {
    return (req, res, next) => {
        const { rol } = req.infoUsuario; // El rol debería venir del token decodificado

        if(rol !== rolRequerido) {
            return res.status(403).json({ message: 'Acceso denegado: No tienes permiso para realizar esta acción' });
        }

        next();
    }
}