## GUIA DE INSTALACION: Learnsy - Versión de NODE: v20.18.0  
### Descripcion del proyecto:
Learnsy es una aplicacion web que provee un servicio de aula virtual para que los centros educativos puedan gestionar materias/cursos y sus respectivos temas junto con sus evaluaciones. De esta manera se facilitara a los estudiantes y docentes la organizacion academica, pues todo el contenido esta separado por materia, tanto los contenidos vistos en clase (temas como pdf) asi como las evaluaciones. Del mismo modo, tendran acceso a consultar las calificaciones que han obtenido en las evaluaciones. Por parte de los docentes les servira para llevar un control claro de los temas vistos y las evaluaciones a realizar. De igual forma, podran consultar las notas de toda una seccion/materia.

### Dependencias utilizadas

React-router, Zustand, Tailwind, Axios, React-query, React-toastify  

### Pasos para instalar y ejecutar

Aclaracion: Para probarlo en local sera nesesario tener levantado el backend en el puerto 8080  
Pasos para ejecutar el proyecto:  
1. Tener instalado Node js y npm
2. Clonar el repositorio y acceder a la carpeta learnsy
3. Abrir una terminal y ejecutar el comando npm install
4. Esperar a que se instalen las dependencias
5. Ejecutar el comando npm run dev
6. Acceder a la url generada por vite en localhost:5173

El despliegue de la aplicacion ha sido realizado en Vercel con el link: https://learnsy-smoky.vercel.app/
Usuario de prueba: JPerez  
Contraseña de usuario de prueba: Contrasena1234  

### Manual de usuario:  
Al acceder a la aplicacion se mostrara la pagina principal donde se despliega informacion general sobre la pagina y se permite el acceso al sitio por medio del boton de iniciar sesion. Se debera iniciar sesion con las credenciales proporcionadas por el centro educativo correspondiente. Una vez se inicie sesion, se mostrara el area de dashboard, donde el estudiante podra visualizar las materias en las que esta inscrito. En esta misma pantalla se tendra acceso a cada materia y a sus contenidos, tambien se cuenta con una barra de navegacion lateral para acceder al perfil o regresar al dashboard. Al acceder a una materia, se mostraran el apartado de temas y evaluaciones que componen la asignatura. Del mismo modo, en la barra lateral de navegacion, apareceran los links para visualizar los participantes de la materia y mostrar los resultados de las evaluaciones de dicha materia. Para acceder a un tema basta con presionar el nombre del tema al que se desee acceder y se generara un link a un pdf correspondiente al contenido seleccionado; este pdf puede visualizarse en la web o descargarse para estudiarlo mas tarde. Al acceder a un examen se debera presionar el boton correspondiente para iniciar la evaluacion. Si se decide iniciarla, comenzara a correr un contador que muestra el tiempo restante para finalizar la prueba, de este modo, el estudiante tendra que responder todas las preguntas que pueda antes de que el tiempo se acabe, y al finalizar la prueba se le mostrara la cantidad de aciertos como de fallos junto con la calificacion. Ademas, tambien podra modificar su foto de perfil subiendo un archivo de imagen.
  
Con respecto a los administradores de la aplicacion, tienen acceso a todas las pantallas del estudiante, pero con algunas funcionalidades adicionales: Capacidad de crear materias y añadir alumnos a dichas materias, capacidad de modificar o eliminar una materia, capacidad de añadir temas (por medio de archivos de tipo pdf) y eliminarlos, capacidad de crear/modificar/eliminar evaluaciones, junto con su banco de preguntas y respuestas, capacidad de consultar las notas de todos los estudiantes de sus materias.
