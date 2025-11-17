import { Link } from "react-router-dom"

const Landing = () => {
    const placeholder = `Learnsy es una plataforma de aula virtual que conecta a estudiantes y docentes en un entorno moderno, organizado y accesible.
Permite gestionar materias, asistir a clases y realizar exámenes de forma sencilla, desde cualquier lugar. Ideal para instituciones educativas que buscan digitalizar su experiencia de enseñanza y aprendizaje.`
    return (
        <>
            <div className="h-dvh max-h-dvh overflow-hidden">
                <div className="absolute w-full z-20">
                    <nav className="bg-white">
                        <ul className="flex justify-between w-full gap-4 p-2 pr-8 items-center">
                            <li>
                                <Link to="/">
                                    <img src="http://localhost:5173/src/assets/OpcionLogo2.PNG" className="max-w-[20rem] h-auto" />
                                </Link>
                            </li>
                            <div className="flex gap-10 items-center px-4">
                                <li>
                                    <Link to="/login" className="bg-secondary p-2 rounded-lg text-white">Iniciar sesion</Link>
                                </li>
                                <svg id="profile" xmlns="http://www.w3.org/2000/svg" height="65px" viewBox="0 -960 960 960" width="65px" fill="#0000"><path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z"/></svg>
                            </div>
                        </ul>
                    </nav>
                    <div className="w-full bg-primary p-4 flex items-center"></div>
                </div>
                <div className="grid grid-cols-[40%_1fr] overflow-hidden">
                    <div className="relative -bottom-16 -left-12 rounded-full w-[40rem] h-[40rem] bg-cover grid justify-center self-end bg-[url(http://localhost:5173/src/assets/images/estanterias_bibliotecas_2.jpg)]">
                        <img src="http://localhost:5173/src/assets/images/young-hispanic-student-girl-smiling-happy-university.png" className="h-[45rem] object-cover relative -top-44 -left-4 rounded-br-[20%]"></img>
                    </div>
                    <div className="bg-white rounded-full w-[55rem] h-[55rem] flex justify-center items-center relative -top-44 -right-36 z-10 shadow-md shadow-black">
                        <p className="text-black text-[1.75rem] font-normal w-[32rem] h-[43rem] flex justify-center items-center pt-60 text-center text-pretty">
                            {placeholder}
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Landing