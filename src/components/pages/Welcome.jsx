import React from 'react';
import { Link } from 'react-router-dom'; 

const Welcome = () => {
    return (
        <div className='welcome-container'>
            <h2 className='welcomePageMessage'>
                Buscas el personal de hosteleria para afrontar cambios de ultima hora o 
                estas buscando para hacer extras esta noche en sector hosteleria? <br/><br/>
                ¡Estás en buen sitio!
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
