// src/components/Navbar.jsx
import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';

const NavigationBar = () => {
  const { currentUser } = useAuth(); // Accede al usuario actual desde el contexto

  // Función para manejar el logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <Navbar bg="dark" variant="dark" expand="md" fixed="top" collapseOnSelect>
      <Container>
        <Navbar.Brand as={Link} to='/'>Bolsa hosteleria</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/Buscopersonal">Busco personal</Nav.Link>
            <Nav.Link as={Link} to="/Buscotrabajo">Busco trabajo</Nav.Link>
            <Nav.Link as={Link} to="/Contactos">Contacto</Nav.Link>

            {/* Si el usuario está autenticado, mostrar su email y botón de logout */}
            {currentUser ? (
              <Nav className="ms-auto">
                <Navbar.Text className="me-3">{currentUser.email}</Navbar.Text>
                <Nav.Link onClick={handleLogout} style={{ color: 'red' }}>Logout</Nav.Link>
              </Nav>
            ) : (
              // Si no está autenticado, mostrar el enlace de login
              <Nav.Link as={Link} to="/AuthPage" style={{ color: 'blue' }}>Login</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
