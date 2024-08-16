import Header from "../Header/Header";
import Productos from "../Productos/Productos";
import "./Home.css";


const Home = ({ aumentoCarro, setAumentoCarro, agregarProductosAlCarrito, setProductosAMostrar }) => {
    return (
        <div>
            <div className='slider'>
                ATENCIÓN AL CLIENTE 
            </div>
            <Header aumentoCarro={aumentoCarro} setProductosAMostrar={setProductosAMostrar} />
            <Productos agregarProductosAlCarrito={agregarProductosAlCarrito} aumentoCarro={aumentoCarro} setAumentoCarro={setAumentoCarro} />
        </div>
    );
}


export default Home;
