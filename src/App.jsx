import React,  { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase'; 
import './App.css';
import NavigationBar from "../src/components/Navbar";
import Buscopersonal from '../src/components/Buscopersonal';
import Buscotrabajo from '../src/components/Buscotrabajo';
import Contactos from '../src/components/Contactos';
import AuthPage from './components/AuthPage';
import Welcome from './components/pages/Welcome';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './components/context/AuthContext';

function App() {
  return (
    <AuthProvider> {/* Envolver la app con el proveedor de autenticación */}
      <Router>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Welcome />} /> {/* Renderizar Home en la ruta raíz */}
          <Route
            path="/Buscopersonal"
            element={
              <ProtectedRoute>
                <Buscopersonal />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Buscotrabajo"
            element={
              <ProtectedRoute>
                <Buscotrabajo />
              </ProtectedRoute>
            }
          />
          <Route path="/Contactos" element={<Contactos />} />
          <Route path="/AuthPage" element={<AuthPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

/*   const [user, setUser] = useState(null); 

useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Función para cerrar sesión
  const handleLogout = () => {
    signOut(auth).then(() => {
      console.log("Sesión cerrada");
    }).catch((error) => {
      console.error("Error al cerrar sesión:", error);
    });
  };

  return (
    <>
    <Router>
      <NavigationBar user={user} onLogout={handleLogout}/>
        <Routes>  
          <Route path="/" element={<Welcome />} />      
          <Route path="/Buscopersonal" element={< Buscopersonal/>}/>
          <Route path="/Buscotrabajo" element= {< Buscotrabajo/>} />
          <Route path="/Contactos" element = {< Contactos />}  />
          <Route path="/AuthPAge" element={ < AuthPage /> } />
        </Routes>   
        
    </Router>
        </>
  )
}

export default App
*/