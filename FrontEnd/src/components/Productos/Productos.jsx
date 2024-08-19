import React, { useEffect, useState } from 'react';
import './Productos.css';
import { useNavigate } from 'react-router-dom';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Productos = ({ aumentoCarro, setAumentoCarro, agregarProductosAlCarrito }) => {
    const [productos, setProductos] = useState([]);
    const navigate = useNavigate();
    const [busqueda, setBusqueda] = useState('');

    useEffect(() => {
        const obtenerProductos = async () => {
            const url = 'http://localhost:8080/api/productos';
            try {
                const respuesta = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'token': localStorage.getItem('token')
                    }
                });

                if (respuesta.ok) {
                    const resultado = await respuesta.json();
                    setProductos(resultado.productos);
                } else {
                    console.error('Error en la respuesta del servidor:', respuesta.status);
                }
            } catch (error) {
                console.error('Error al obtener los productos:', error);
                navigate('/'); // Redirige al login en caso de error
            }
        }
        obtenerProductos();
    }, [navigate]);

    const formatoPrecio = (precio) => {
        return precio.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    const aumentoCarrito = (producto) => {
        setAumentoCarro(aumentoCarro + 1);
        agregarProductosAlCarrito(producto);
    };

    const manejoBusqueda = (event) =>{
        const value = event.target.value;
        setBusqueda(value);
    
        if (value.trim() === "") {
            // Restaurar la lista completa de productos cuando la búsqueda está vacía
            const url = 'http://localhost:8080/api/productos';
            fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'token': localStorage.getItem('token')
                }
            })
            .then(response => response.json())
            .then(data => setProductos(data.productos))
            .catch(error => console.error('Error al obtener los productos:', error));
        } else {
            // Filtrar los productos según la búsqueda
            const buscarProducto = productos.filter((p) =>
                p.nombre.toLowerCase().includes(value.toLowerCase())
            );
            setProductos(buscarProducto);
        }
        
    }

    return (
        <>
            <div className="busqueda">
               <input
               className='inputBusqueda'
                    type="text"
                    placeholder="Buscar..."
                    value={busqueda}
                    onChange={manejoBusqueda}
                />
                <FontAwesomeIcon icon={faSearch} className="iconoBusqueda" />
                
            </div>
            <div className='cardProduct'>
                {productos.map((producto, index) => (
                    <div key={index}>
                        <h1>{producto.nombre}</h1>
                        <div>
                            {producto.imagen ? (
                                <img className="imgProduct" src={`http://localhost:8080${producto.imagen}`} alt={producto.nombre} />
                            ) : (
                                <p>No hay imágenes disponibles</p>
                            )}
                        </div>
                        <p>{producto.descripcion}</p>
                        <div className='cardFooter'>
                            <p>Precio: {formatoPrecio(producto.precio)} Gs</p>
                            <button onClick={() => aumentoCarrito(producto)} className='btnAdd'>Agregar</button>
                        </div>
                    </div>
                ))}
                
            </div>
        </>
    );
}

export default Productos;
