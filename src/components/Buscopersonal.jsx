import React, { useState, useEffect } from 'react';
import { db, auth } from '../../firebase';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const Buscopersonal = () => {
    const [formData, setFormData] = useState({
      titlePosition: '',
      establishmentName: '',
      vacancies: 0,
      city: '',
      dateTime: '',
      hours: 0,
      hourlyRate: 0,
    });
  
    const [userVacantes, setUserVacantes] = useState([]); // Estado para las vacantes del usuario
    const [user, setUser] = useState(null); // Estado para el usuario autenticado
  
    // Escuchar el estado de autenticación del usuario
    useEffect(() => {
      onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        if (currentUser) {
          fetchUserVacantes(currentUser.uid);
        }
      });
    }, []);
  
    // Obtener las vacantes del usuario autenticado
    const fetchUserVacantes = async (uid) => {
      try {
        const q = query(collection(db, 'vacantes'), where('userId', '==', uid));
        const querySnapshot = await getDocs(q);
        const vacantesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUserVacantes(vacantesData);
      } catch (error) {
        console.error('Error al obtener vacantes del usuario: ', error);
      }
    };
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (!user) {
        alert('Debes estar autenticado para publicar una vacante.');
        return;
      }
  
      try {
        // Guardar los datos en Firestore con el userId del usuario autenticado
        const docRef = await addDoc(collection(db, 'vacantes'), {
          ...formData,
          userId: user.uid, // Añadir el UID del usuario
          createdAt: new Date(),
        });
        console.log('Vacante guardada con ID: ', docRef.id);
        alert('Vacante creada con éxito!');
  
        // Limpiar el formulario después de enviar
        setFormData({
          titlePosition: '',
          establishmentName: '',
          vacancies: 0,
          city: '',
          dateTime: '',
          hours: 0,
          hourlyRate: 0,
        });
  
        // Actualizar la lista de vacantes del usuario
        fetchUserVacantes(user.uid);
      } catch (e) {
        console.error('Error al agregar vacante: ', e);
        alert('Error al crear la vacante');
      }
    };
  
    return (
      <div>
        <div className='vacancy_candidate_details '>
        <h4>Rellena datos de la vacante: </h4>
        <p>posición, nombre de local, numero vacantes, dia, hora, numero de horas de turno, precio por hora</p> 
        </div>
        <form onSubmit={handleSubmit} className='formato_busq_vacantes'>
          <div>
            {/* <label>Title de posición:</label> */}
            <input
              type="text"
              name="titlePosition"
              value={formData.titlePosition}
              onChange={handleChange}
              required
              placeholder="Ej:cocinero..."
            />
          </div>
          <div>
            {/* <label>Nombre del Establecimiento:</label> */}
            <input
              type="text"
              name="establishmentName"
              value={formData.establishmentName}
              onChange={handleChange}
              required
            placeholder="Local.."
            />
          </div>
          <div>
           {/*  <label>Número de vacantes:</label> */}
            <input
              type="number"
              name="vacancies"
              value={formData.vacancies}
              onChange={handleChange}
              required
             placeholder="# vacantes"
            />
          </div>
          <div>
            {/* <label>Ciudad:</label> */}
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
               placeholder="Cuidad"
            />
          </div>
          <div>
            {/* <label>Día y Hora:</label> */}
            <input
              type="datetime-local"
              name="dateTime"
              value={formData.dateTime}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            {/* <label>¿Cuántas horas?:</label> */}
            <input
              type="number"
              name="hours"
              value={formData.hours}
              onChange={handleChange}
              required
               placeholder="Horas"
            />
          </div>
          <div>
            {/* <label>Precio por hora:</label> */}
            <input
              type="number"
              name="hourlyRate"
              value={formData.hourlyRate}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Crear Vacante</button>
        </form>
  
        {/* <h3>Vacantes publicadas por ti</h3> */}
        {userVacantes.length > 0 ? (
          <ul className='formato_busq_vacantes'>
            {userVacantes.map((vacante) => (
              <li className="circulo" key={vacante.id}>
                {vacante.titlePosition} - {vacante.city} - {vacante.hourlyRate} €/hora
              </li>
            ))}
          </ul>
        ) : (
          <p></p>
        )}
      </div>
    );
  };
  
  export default Buscopersonal;