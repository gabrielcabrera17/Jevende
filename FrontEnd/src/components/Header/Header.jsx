import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { faSearch, faShoppingCart } from '@fortawesome/free-solid-svg-icons'; 
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo2.png';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
//import ProductosFiltrados from '../ProductosFiltrados/ProductosFiltrados'; 
import { useNavigate, } from 'react-router-dom';


const Header = ({aumentoCarro, setProductosAMostrar, agregarProductosAlCarrito,  setAumentoCarro }) => {
    const [open, setOpen] = useState(false);
   // const [productosAMostrar, setProductosAMostrar] = useState([]);
    const [productos, setProductos] = useState([]);
    const navigate = useNavigate();
    const actualizarOpen = () => {
        setOpen(!open);
    }

    useEffect(() => {
        const url = 'http://localhost:8080/api/productos';
        const mostrarProducto = async ()  => {
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
                   // setProductosAMostrar(resultado.productos);
                    setProductos(resultado.productos);
                } else {
                    console.error('Error en la respuesta del servidor:', respuesta.status);
                }
            } catch (error) {
                console.error('Error al obtener los productos:', error);
            }
        }

        mostrarProducto();
    }, []);

    const filtrarProductos = (categorias) =>{
        const productoFiltrado = productos.filter(producto => producto.categoria === categorias);
        setProductosAMostrar(productoFiltrado);
        setOpen(false);
        navigate('/filtrados');
    }

    return (
        <div className="Header">
            <div className="item-headers">
                <div className="logo">
                    <img  className="logo-img" src={logo} alt="logo"/>
                </div>
                <div className="items-menu-titulos">
                    <div className="item-menu-inicio">
                        Inicio
                    </div>
                    
                    <div className="item-menu-categoria">
                        <button className='botonCategoria' onClick={actualizarOpen}>Categorias <FontAwesomeIcon icon={faAngleDown} /> </button>
                        {open ? (
                            <ul className="menu">
                                <li className="menu-item" onClick={() => filtrarProductos('Tecnología')}>
                                    Tecnología
                                </li>
                                <li className="menu-item" onClick={() => filtrarProductos('Óptica')}>
                                   Óptica
                                </li>
                                <li className="menu-item" onClick={() => filtrarProductos('Ropa')}>
                                   Ropa
                                </li>
                                <li className="menu-item" onClick={() => filtrarProductos('Perfumería')}>
                                   Perfumería
                                </li>
                            </ul>
                        ) : null}
                       
                    </div>
                   
                    <div className="item-menu-nuevo">
                        Nuevo
                    </div>
                    <div className="item-menu-popular">
                        Popular
                    </div>
                    
                </div>
                <div className='item-buscador'>
                    <input className="input-buscador" type="text" placeholder="Buscar..."/>
                    <FontAwesomeIcon icon={faSearch} />
                </div>
                <div className='item-menu-iconos'>
                    <FontAwesomeIcon icon={faHeartRegular} />
                    <Link className='linkCarrito' to="/carrito" ><FontAwesomeIcon icon={faShoppingCart} /> </Link>
                    <span className='aumentoCarrito'>{aumentoCarro}</span>
                    <FontAwesomeIcon icon={faUser} />
                </div>
            </div>

            
           
                
          
            

        </div>
    );
}

export default Header;
