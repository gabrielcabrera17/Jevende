import React, { useEffect, useState } from 'react';
import './Carrito.css';
import { Elements } from '@stripe/react-stripe-js';
//import { stripePromise } from '../../stripeConfig';
import CheckoutForm from '../CheckOutForm/ChekOutForm'; // Asegúrate de crear este componente

const Carrito = ({ productoAgregado = [] }) => {
    const [productosEnElCarrito, setProductosEnElCarrito] = useState([]);

    useEffect(() => {
        // Recuperar datos de localStorage cuando el componente se monte
        const carritoGuardado = JSON.parse(localStorage.getItem('carrito'));
        if (carritoGuardado) {
            setProductosEnElCarrito(carritoGuardado);
        }
    }, []);

    useEffect(() => {
        // Actualizar localStorage cuando cambie productosEnElCarrito
        localStorage.setItem('carrito', JSON.stringify(productosEnElCarrito));
    }, [productosEnElCarrito]);

    useEffect(() => {
        // Agregar productos al carrito cuando productoAgregado cambie
        if (productoAgregado.length > 0) {
            setProductosEnElCarrito([...productosEnElCarrito, ...productoAgregado]);
        }
    }, [productoAgregado]);

    const formatoPrecio = (precio) => {
        return precio.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    const precioTotal = () => {
        let total = 0;
        for (let i = 0; i < productosEnElCarrito.length; i++) {
            total += productosEnElCarrito[i].precio;
        }
        return total;
    };

    return (
        <div className='containerCarrito'>
            <h3>Carrito</h3>
            <table className="tableCarrito">
                <thead className='headCarrito'>
                    <tr>
                        <th>Imagen</th>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Precio</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody className='bodyCarrito'>
                    {productosEnElCarrito.map((producto, index) => (
                        <tr key={index}>
                            <td className='tdImgCarrito'>
                                {producto.imagen ? (
                                    <img className="imgCarrito" src={`http://localhost:8080${producto.imagen}`} alt={producto.nombre} />
                                ) : (
                                    'No disponible'
                                )}
                            </td>
                            <td>{producto.nombre}</td>
                            <td>{producto.descripcion}</td>
                            <td>{formatoPrecio(producto.precio) + " Gs"}</td>
                            <td>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => setProductosEnElCarrito(productosEnElCarrito.filter((_, i) => i !== index))}
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <table className='totalProducto'>
                <td className='total'>Total: {formatoPrecio(precioTotal()) + " Gs"}</td>
            </table>
            {/*<Elements stripe={stripePromise}>
                <CheckoutForm totalAmount={precioTotal()} />
            </Elements>*/}
        </div>
    );
}

export default Carrito;
