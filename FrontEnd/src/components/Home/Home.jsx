import Header from "../Header/Header";
import Productos from "../Productos/Productos";
import "./Home.css";


const Home = ({ aumentoCarro, setAumentoCarro, agregarProductosAlCarrito }) => {
     


    return (
        <div>
            <div className='slider'>
                ATENCIÓN AL CLIENTE 
            </div>
            <Header aumentoCarro={aumentoCarro} />
            <Productos agregarProductosAlCarrito={agregarProductosAlCarrito} aumentoCarro={aumentoCarro} setAumentoCarro={setAumentoCarro} />
        </div>
    );
}

export default Home;
