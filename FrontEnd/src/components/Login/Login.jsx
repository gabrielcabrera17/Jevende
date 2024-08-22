import React, {  useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import RegistroUsuario from '../RegistroUsuario/RegistroUsuario';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [abrirModal, setAbrirModal] = useState(false);
  

const autenticacionUsuario = async (e) => {
    e.preventDefault();
    const url = 'http://localhost:8080/api/login';
    const config = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    }
    const respuesta = await fetch(url, config);
    
    
    if(respuesta.status === 200){
        const datos = await respuesta.json();
        console.log(datos);
        localStorage.setItem("token", datos.token);
        navigate('/home');
    }else{
       const datosError = await respuesta.json();
       setError(datosError.message);
       navigate('/');
    }
}

    return (
        <div className="login-container">
        <h1 className="login-title">Login</h1>
        <form className="login-form" onSubmit={autenticacionUsuario}>
            <label htmlFor="email" className="login-label">Email</label>
            <input
                type="email"
                name="email"
                id="email"
                className="login-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="password" className="login-label">Password</label>
            <input
                type="password"
                name="password"
                id="password"
                className="login-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="login-error">{error}</p>}
            <div className='buttons'>
                <button type="submit" className="login-button">Login</button>
                <button
                    type="button"
                    className='registro-button'
                    onClick={() => setAbrirModal(true)}
                >
                    Registrarse
                </button>
            </div>
        </form>
        {abrirModal &&(
                <div className='modal'>
                    <div className='modal-contenido'>
                        <button className='colase-button' onClick={() => setAbrirModal(false)}>Cancelar</button>
                        <RegistroUsuario />
                    </div>
                </div>
            )}
    </div> 
    );
};

export default Login;