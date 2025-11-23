import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen w-full bg-[#F5F5F5] font-sans overflow-hidden relative">

      {/* Navbar*/}
      <nav className="w-full bg-white flex justify-between items-center px-6 md:px-12 py-4 shadow-sm relative z-20">
        <div className="flex items-center gap-3">
          <img
            src="http://localhost:5173/src/assets/OpcionLogo2.PNG"
            className="h-[40px] md:h-[50px] object-contain"
          />
        </div>

        <Link
          to="/login"
          className="btn-primary px-4 py-2.5 md:px-6 md:py-2 rounded-md text-[0.8rem] md:text-sm tracking-wide shadow-sm transition"
        >
          INICIAR SESIÓN
        </Link>
      </nav>

      {/* CÍRCULOS RESPONSIVE */}
      <div className="absolute left-0 top-32 md:top-24 w-24 h-24 md:w-48 md:h-48 bg-[#92247C] rounded-full -translate-x-1/2 hidden sm:block"></div>

      <div className="absolute left-0 -bottom-10 md:-bottom-20 w-20 h-20 md:w-40 md:h-40 bg-[#5A4598] rounded-full -left-10 md:-left-0"></div>

      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-20 h-20 md:w-36 md:h-36 bg-[#CF92C6] rounded-full translate-x-1/2 hidden sm:block"></div>

      {/* Contenido de landing */}
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-2 h-[calc(100vh-80px)] items-center px-8 md:px-16 lg:px-20 relative z-10 gap-8 lg:gap-16">

        {/* textos - titulos y descripcion */}
        <div className="flex flex-col justify-center text-left">
          <h1 className="text-[3rem] md:text-[4rem] lg:text-[5.5rem] xl:text-[6.5rem] text-[var(--color-landing)] title-font font-normal leading-[1.1] mb-2">
            APRENDIENDO
          </h1>

          <h2 className="text-[2rem] md:text-[2.8rem] lg:text-[3.5rem] xl:text-[4rem] title-font font-normal text-[var(--color-sub-landing)] tracking-wide mb-8 lg:mb-12">
            EN LÍNEA
          </h2>

          <p className="body-font font-normal text-[var(--color-dark-text)] text-[1rem] md:text-[1.1rem] lg:text-[1.15rem] leading-relaxed max-w-xl">
            Bienvenido a Learnsy, tu espacio académico inteligente.
            Acá estudiantes y docentes encuentran una plataforma
            centralizada para compartir, revisar y gestionar trabajos
            y calificaciones de forma rápida y segura. Learnsy está
            diseñada para simplificar el proceso educativo,
            permitiendo una comunicación fluida y una experiencia
            de aprendizaje más organizada y accesible.
          </p>
        </div>

        {/* Imagen */}
        <div className="flex justify-center lg:justify-end items-center h-full">
          <img
            src="http://localhost:5173/src/assets/images/young-hispanic-student-girl-smiling-happy-university.png"
            className="w-full h-full object-cover"
          />
        </div>

      </div>
    </div>
  );
};

export default Landing;
