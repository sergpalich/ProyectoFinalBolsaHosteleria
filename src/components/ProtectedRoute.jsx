import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext'; // Creamos el contexto de autenticación para compartir la info de usuario

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    // Si no está autenticado, redirige a la página de autenticación
    return <Navigate to="/AuthPage" />;
  }

  // Si está autenticado, permite el acceso a la ruta
  return children;
};

export default ProtectedRoute;
