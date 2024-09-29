Bolsa Hosteleria: es un proyecto de App que permite a los usuarios en tiempo real publicar sus vacantes y acceder a ellos possibles candidatos.

Por ahora la esctructura de App es la siguiente: pagina de Bienvenida que da acceso a login/signup, pagina Busco Personal, Pagina Busco EMpleo y Contactos.

Las pagina de Bienvenida y Contactos disponibles sin registracion , las paginas de Piblicar vacante o buscar el trabajo - ProtectedRouted y solo disponibles despues de Registrarse. 

Identificacion y BBDD estan hechas con Firebase.

El Workflow ideal en la App sera - usuario(establecimiento): usuario registra con email y contraseña. UNa vez registrado el usuario debe identificarse como representate con email de la empresa (establecimiento). Una vez esta hecho podra publicar los vacantes con los siguentes detalles: puesto, numero de vacantes, cuidad, establecimiento, fecha y hora de inicio de jornada laboral, horas de jornada, precio hora.  Despues de publicar la vacante el usuario(establecimiento) puede ver la lista de todo su vacantes publicados. 

Usuario(establecimeitno) puede entrar dentro de la vacante y ver contacto de personas que han aplicado a vacante, sus datos de contacto y ratings. Puede eliminar la offerta. 

El Workflow ideal en la App sera - usuario(candidato): usuario registra con email y contraseña. UNa vez registrado el usuario puede acudir a la pagina de Busco Empleo y usando los filtors de puesto y cuidad, fecha podra ver las vacantes publicados. Usuario puede ver los ratings de reaturantes. Usuario puede apicarse a la vacante. Despues se puede establecer la sistema de push notificaciones con busquedas de puesto y cuidad preestbalecidas que van a notificar al usuario cuando la vacante esta publicada. Los usuarios con mejor ratings podran recibir aquellas notoficaciones con 30 sec de antelacione comparando con usuarios (candidatos) de ratings mas bajos.

Despues que usuario(establecimiento) se accepta el candidato, se puede generar la documentacion de baja y alta en SS segun la legislacion viginte con costes de gestion correspondientes de gestion.

Actualmente las sistema esta en el estado de B-version: no hay push notification, no hay opcion de ver detalles de empresa ni candidato y otros limitaciones. 