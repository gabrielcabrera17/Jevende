import './ProductosFiltrados.css';
import { useState } from 'react';

const ProductosFiltrados = ({ productosAMostrar }) => {
    const [marcas, setMarcas] = useState([]);
    const [mostrarMarcaFiltrada, setMostrarMarcaFiltrada] = useState(false);
    const [marcasSeleccionadas, setMarcasSeleccionadas] = useState([]);

    const formatoPrecio = (precio) => {
        return precio.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    const marcaSeleccionada = (e) =>{
        const {value, checked} = e.target;
        if (checked) {
            // Si se selecciona una marca, agrégala al array
            setMarcasSeleccionadas((prev) => [...prev, value]);
        } else {
            // Si se deselecciona, quítala del array
            setMarcasSeleccionadas((prev) => prev.filter((marca) => marca !== value));
        }
    }

    const filtrarPorMarca = () => {
        // Lógica para filtrar por marca
        const filtraMarca = productosAMostrar.filter((producto) => 
            marcasSeleccionadas.includes(producto.marca)
        )
        setMarcas(filtraMarca);
        setMostrarMarcaFiltrada(true);
     }

 console.log("marcas..."+marcas);

    
 return (
    <div className='containerProductosFiltrados'>
        <div className='areaDeFiltrado'>
                <h1>Filtrar</h1>
                <form>
                    <input type="checkbox" value={"Samsung"} onChange={marcaSeleccionada} /> Samsung
                    <input type="checkbox" value={"Xiaomi"} onChange={marcaSeleccionada}/> Xiaomi
                    <input type="checkbox" value={"Sony"} onChange={marcaSeleccionada}/> Sony
                </form>
                <button className='botonFiltradoMarca' onClick={filtrarPorMarca}>Filtrar</button>
                {marcas && <p className='resultadoFiltrado'>Se encontraron {marcas.length} resultados</p>}
        </div>
        <div className='containerFiltrados'>
            
            {mostrarMarcaFiltrada ? (
                marcas.map((marca, index) => (
                    <div className="productCard" key={index}>
                        <h1>{marca.nombre}</h1>
                        <div className='imagenContainer'>
                            {marca.imagen ? (
                                <img className="imgProductFiltrado" src={`http://localhost:8080${marca.imagen}`} alt={marca.nombre} />
                            ) : (
                                <p>No hay imágenes disponibles</p>
                            )}
                        </div>
                        <p>{marca.descripcion}</p>
                        <div className='cardFooter'>
                            <p className="price">{formatoPrecio(marca.precio) + ' Gs'}</p>
                            <button className='botonFiltrado'>Agregar</button>
                        </div>
                    </div>
                ))
            ) : (
                productosAMostrar.map((producto) => (
                    <div className="productCard" key={producto._id}>
                        <h1>{producto.nombre}</h1>
                        <div className='imagenContainer'>
                            {producto.imagen ? (
                                <img className="imgProductFiltrado" src={`http://localhost:8080${producto.imagen}`} alt={producto.nombre} />
                            ) : (
                                <p>No hay imágenes disponibles</p>
                            )}
                        </div>
                        <p>{producto.descripcion}</p>
                        <div className='cardFooter'>
                            <p className="price">{formatoPrecio(producto.precio) + ' Gs'}</p>
                            <button className='botonFiltrado'>Agregar</button>
                        </div>
                    </div>
                ))
            )}
        </div>
    </div>
)
}


export default ProductosFiltrados;
