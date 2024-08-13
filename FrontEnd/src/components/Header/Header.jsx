import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { faSearch, faShoppingCart } from '@fortawesome/free-solid-svg-icons'; // Usando el ícono de carrito de la colección sólida
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo2.png'
//import { faHouse } from '@awesome.me/kit-KIT_CODE/icons/classic/solid'



const Header = ({aumentoCarro}) => {
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
                        Categorias 
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
