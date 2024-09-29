import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

const Buscotrabajo = () => {
    // Estado para los filtros y los resultados
    const [filters, setFilters] = useState({
      titlePosition: '',
      city: ''
    });
  
    const [vacantes, setVacantes] = useState([]);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFilters({
        ...filters,
        [name]: value
      });
    };
  
    const handleSearch = async (e) => {
      e.preventDefault();
      
      try {
        // Crear la consulta con los filtros
        let q = collection(db, 'vacantes');
        
        // Filtrar por nombre de vacante si está especificado
        if (filters.titlePosition) {
          q = query(q, where('titlePosition', '==', filters.titlePosition));
        }
  
        // Filtrar por ciudad si está especificado
        if (filters.city) {
          q = query(q, where('city', '==', filters.city));
        }
  
        // Obtener los datos de la consulta
        const querySnapshot = await getDocs(q);
        const vacantesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        setVacantes(vacantesData);
        
        // Si no se encuentran resultados, mostrar un mensaje
        if (vacantesData.length === 0) {
          alert('No se encontraron vacantes con esos filtros.');
        }
        
      } catch (e) {
        console.error('Error al filtrar vacantes: ', e);
      }
    };
  
    return (
      <div>
        <div className='vacancy_candidate_details '>
        <h4>Busca las ofertas por tu profession y lugar </h4>
        <p>Introduce tu area de trabajo (ej: camarero, cocina, jefe de sala, barra etc) y lugar donde buscas </p> 
        </div>
        <form onSubmit={handleSearch} className='formato_busq_vacantes'>
          <div>
            <input 
              type="text" 
              name="titlePosition" 
              value={filters.titlePosition} 
              onChange={handleChange}
              placeholder="Ej: Mesero, Cajero..." 
            />
          </div>
  
          <div>
            <input 
              type="text" 
              name="city" 
              value={filters.city} 
              onChange={handleChange} 
              placeholder="Ej: Madrid, Barcelona..."
            />
          </div>
  
          <button type="submit">Buscar Vacantes</button>
        </form>
  
        {/* <h3>Resultados:</h3> */}
      <div className='busq_result'>
        {vacantes.length > 0 ? (
          vacantes.map((vacante) => (
            <div className="circulo" key={vacante.id}>
              <p>{vacante.titlePosition}</p>
              <p>{vacante.city}</p>
              <p>{vacante.hourlyRate} €/hora</p>
            </div>
          ))
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
};
  export default Buscotrabajo;