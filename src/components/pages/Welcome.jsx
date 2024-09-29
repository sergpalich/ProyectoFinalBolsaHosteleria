import React from 'react';
import { Link } from 'react-router-dom'; 

const Welcome = () => {
    return (
        <div className='welcome-container'>
            <h2 className='welcomePageMessage'>
                ¿Buscas personal de hosteleria para afrontar cambios de última hora? ¿Eres 
                un profesional y estás buscando dónde hacer horas extras esta noche en sector de hosteleria? <br/><br/>
                ¡Estás en el sitio perfecto!
            </h2>
            
            <div className="auth-link-container">
                <h3>
                    <Link to="/AuthPage" className="auth-link">Login / Sign Up</Link>
                </h3>
            </div>
        </div>
    );
};

export default Welcome;
