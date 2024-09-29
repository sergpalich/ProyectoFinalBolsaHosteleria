// src/components/pages/Home.jsx
import React, { useState } from 'react';
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';


const Home = () => {
  const [isRegistering, setIsRegistering] = useState(false); // Alternar entre registro e inicio de sesión
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  /* const [category, setCategory] = useState('empleado'); // Por defecto, el valor de categoría es "empleado" */
  const [error, setError] = useState('');

  // Función para manejar el registro de usuario
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      // Crear el usuario con Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Guardar información adicional en Firestore (incluyendo la categoría)
   /*    await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        category: category, // Guardar la categoría seleccionada
      }); */

      console.log('Usuario registrado con éxito:', user.uid);
      setError('');
    } catch (error) {
      console.error('Error en el registro:', error.message);
      setError(error.message);
    }
  };

  // Función para manejar el inicio de sesión de usuario
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('Usuario logueado con éxito:', userCredential.user);
      setError('');
    } catch (error) {
      console.error('Error al iniciar sesión:', error.message);
      setError(error.message);
    }
  };

  return (
    <div className="auth-container-wrapper">
       <div className="auth-container">
        {isRegistering ? (
          // Formulario de registro (Sign Up)
          <form onSubmit={handleSignUp}>
            <h3>Registrarse</h3>
            <div>
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Contraseña:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {/* <div>
              <label>Categoría:</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="empleado">Empleado</option>
                <option value="restaurante">Restaurante</option>
              </select>
            </div> */}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button type="submit">Registrarse</button>
            <p>
              ¿Ya tienes una cuenta?{' '}
              <span onClick={() => setIsRegistering(false)}>Iniciar sesión</span>
            </p>
          </form>
        ) : (
          // Formulario de inicio de sesión (Login)
          <form onSubmit={handleLogin}>
            <h3>Iniciar Sesión</h3>
            <div>
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Contraseña:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button type="submit">Iniciar Sesión</button>
            <p>
              ¿No tienes una cuenta?{' '}
              <span onClick={() => setIsRegistering(true)}>Registrarse</span>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default Home;
