import React, { useState } from 'react';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [category, setCategory] = useState('camarero'); // Valor por defecto

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Crear el usuario con email y contraseña
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Guardar la categoría en Firestore
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        category: category,
      });

      console.log('Usuario registrado con éxito:', user.uid);
    } catch (error) {
      console.error("Error al registrar al usuario", error);
    }
  };

  return (
    <div>
      <h2>Registro</h2>
      <form onSubmit={handleRegister}>
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
        <div>
          <label>Categoría:</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="camarero">Camarero</option>
            <option value="restaurante">Restaurante</option>
          </select>
        </div>
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
};

export default Register;
