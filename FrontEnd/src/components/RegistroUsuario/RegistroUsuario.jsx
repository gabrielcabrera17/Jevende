import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegistroUsuario.css';

const RegistroUsuario = () => {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const procesaInfoUsuario = async (e) => {
        e.preventDefault();

        const url = 'http://localhost:8080/api/crear/usuario';
        const config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nombre, email, password }),
        };
        const respuesta = await fetch(url, config);
        const datos = await respuesta.json();

        if (respuesta.status === 200) {
            setNombre(datos.nombre);
            setEmail(datos.email);
            setPassword(datos.password);
            navigate('/');
        } else {
            setError(datos.message);
        }
    };

    return (
        <div className="registro-container">
            <h1>Registro de usuario</h1>
            <form onSubmit={procesaInfoUsuario}>
                <div>
                    <label htmlFor="nombre">Nombre:</label>
                    <input
                        type="text"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <button type="submit">Registrarse</button>
                </div>
            </form>
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default RegistroUsuario;
