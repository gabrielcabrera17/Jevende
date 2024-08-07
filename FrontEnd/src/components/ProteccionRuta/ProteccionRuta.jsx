import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';


const ProteccionRuta = ({ element: Element }) => {
    const [isValidToken, setIsValidToken] = useState(null); // Empezamos con null para evitar el renderizado prematuro

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                const currentTime = Date.now() / 1000;

                // Si el token ha expirado
                if (decodedToken.exp < currentTime) {
                    localStorage.removeItem('token');
                    setIsValidToken(false);
                } else {
                    setIsValidToken(true);
                }
            } catch (error) {
                console.error("Token decoding failed:", error);
                setIsValidToken(false);
            }
        } else {
            setIsValidToken(false);
        }
    }, []);

    if (isValidToken === null) {
        return null; // O un spinner/loading mientras se verifica el token
    }

    // Si el token no es válido, redirige a la página de inicio
    if (!isValidToken) {
        return <Navigate to="/" replace />;
    }

    return <Element />;
};

export default ProteccionRuta;
