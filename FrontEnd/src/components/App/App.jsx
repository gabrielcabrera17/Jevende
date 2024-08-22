import './App.css';
import Home from '../Home/Home';
import Carrito from '../Carrito/Carrito';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../Login/Login';
import ProteccionRuta from '../ProteccionRuta/ProteccionRuta'; // Importa el componente de protección de rutas
import ProductosFiltrados from '../ProductosFiltrados/ProductosFiltrados';
import RegistroUsuario from '../RegistroUsuario/RegistroUsuario';

const App = () => {
  const [aumentoCarro, setAumentoCarro] = useState(0);
  const [productoAgregado, setProductoAgregado] = useState([]); 
  const [productosAMostrar, setProductosAMostrar] = useState([]);
 
  const agregarProductosAlCarrito = (producto) => {
      setProductoAgregado([...productoAgregado, producto]);
  }; 

  return (
      <div className="App">
        <Routes>  
          <Route path='/' element={<Login />} />
          <Route path='/home' element={<ProteccionRuta element={() => <Home aumentoCarro={aumentoCarro} setAumentoCarro={setAumentoCarro} agregarProductosAlCarrito={agregarProductosAlCarrito} setProductosAMostrar={setProductosAMostrar}/>} />} />
          <Route path='/carrito' element={<ProteccionRuta element={() => <Carrito productoAgregado={productoAgregado}/>} />} />
          <Route path='/filtrados' element={<ProductosFiltrados productosAMostrar={productosAMostrar} />}/>
          <Route path='/registro' element={<RegistroUsuario/>} />
        </Routes>
      </div>
  );
}


export default App;
