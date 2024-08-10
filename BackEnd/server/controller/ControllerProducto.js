const Producto = require('../model/ModelProducto');

module.exports.agregarProducto = (req, res) => {
    const { nombre, precio, stock, codigo, tamanio, descripcion, marca } = req.body;
    const imagen = req.file;

    if (!imagen) {
        return res.status(400).json({ mensaje: 'Error: La imagen es requerida.' });
    }

    const nuevoProducto = new Producto({
        imagen: `/uploads/${imagen.filename}`, // Ruta de la imagen
        nombre,
        precio,
        stock,
        codigo,
        tamanio,
        descripcion,
        marca
    });

    nuevoProducto.save()
        .then(() => res.status(201).json({ mensaje: 'Producto creado exitosamente', producto: nuevoProducto }))
        .catch(error => res.status(500).json({ mensaje: 'Error al crear el producto', error }));
};

module.exports.obtenerProductos = (req, res) => {
    return Producto.find()
        .then((productos) => {
            return res.status(200).json({ productos });
        })
        .catch((error) => {
            return res.status(500).json({ message: 'Error al obtener los productos', error });
        });
};

module.exports.eliminarProducto = (req, res) => {
    const { id } = req.params;
    return Producto.findByIdAndDelete(id)
        .then(() => {
            return res.status(200).json({ message: 'Producto eliminado' });
        })
        .catch((error) => {
            return res.status(500).json({ message: 'Error al eliminar el producto', error });
        });
}