import React, { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../../firebase';

const AuthPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [user, setUser] = useState(null);

  // Observa el estado de autenticación
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Registro de usuario
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error('Error al registrarse:', error.message);
    }
  };

  // Iniciar sesión de usuario
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error('Error al iniciar sesión:', error.message);
    }
  };

  // Cerrar sesión
  const handleLogout = () => {
    signOut(auth);
  };

  return (
    <div className="auth-container">
      {user ? (
        <div className="welcomePageMessage">
          <h1 style={{color: '#B8001F'}}>Bienvenido/a</h1>
          <p>Ya puedes publicar y/o ver las ofertas de trabajo en nuestra aplicacion, filtrar las segun tu criterio. Gracias por usar nuestra App!</p>
          
        </div>
      ) : (
        <div className="auth-forms">
          <h3>{isRegistering ? 'Registrarse' : 'Iniciar Sesión'}</h3>
          <form onSubmit={isRegistering ? handleSignUp : handleLogin}>
            <input
              type="email"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              value={password}
              placeholder="Contraseña"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">{isRegistering ? 'Registrarse' : 'Iniciar Sesión'}</button>
          </form>
          <button onClick={() => setIsRegistering(!isRegistering)}>
            {isRegistering ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Registrarse'}
          </button>
        </div>
      )}
    </div>
  );
};

export default AuthPage;
