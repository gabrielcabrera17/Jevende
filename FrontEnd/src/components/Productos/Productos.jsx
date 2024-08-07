import React, { useEffect, useState } from 'react';
import './Productos.css';
import { useNavigate } from 'react-router-dom';

const Productos = ({ aumentoCarro, setAumentoCarro, agregarProductosAlCarrito }) => {
    const [productos, setProductos] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const obtenerProductos = async () => {
            const url = 'http://localhost:8080/api/products';
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
                    setProductos(resultado);
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

    return (
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
    );
}

export default Productos;
