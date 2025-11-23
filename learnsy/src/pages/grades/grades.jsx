import { useQuery } from "@tanstack/react-query";
import { getGrades } from "../../services/authService";
import { getExamenesUsuarios, getMateriaWithDetails } from "../../services/materiaService";
import { useParams, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { AiOutlineSearch } from "react-icons/ai";
import { useEffect, useState } from "react";

const Grades = () => {
    const { materiaId } = useParams();
    const navigate = useNavigate();
    const user = useAuthStore((state) => state.user);
    const rol = useAuthStore((state) => state.user?.rol);
    
    const [search, setSearch] = useState("");

    // Query para obtener detalles de la materia (nombre)
    const { data: materiaDetails, isPending: materiaPending, error: errorMateria } = useQuery({
        queryKey: ["materiaDetails", materiaId],
        queryFn: () => getMateriaWithDetails({ materiaId }),
    });

    // Query para usuarios normales - obtener calificaciones
    const { data: gradesData, isError: gradesError, isPending: gradesPending } = useQuery(
        {
            queryKey: ["grades", materiaId],
            queryFn: () => getGrades({ materiaId: materiaId, userId: user.usuarioId }),
            enabled: rol !== 'admin'
        }
    );

    // Query para obtener todos los exámenes de la materia (usuarios normales)
    const { data: allExamsData, isPending: examsPending, error: allExamsError } = useQuery({
        queryKey: ["materia-exams", materiaId],
        queryFn: async () => {
            const response = await fetch(`https://backend-pnc-production-d8ff.up.railway.app/api/materia/${materiaId}/exams`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            return response.json();
        },
        enabled: rol !== 'admin'
    });

    // Query para admins
    const { data: adminData, isError: adminError, isPending: adminPending } = useQuery(
        {
            queryKey: ["examenes-usuarios", materiaId],
            queryFn: () => getExamenesUsuarios({ materiaId: materiaId }),
            enabled: rol === 'admin'
        }
    );

    useEffect(() => {
        if (adminError || allExamsError || errorMateria || gradesError) {
            navigate("/", { replace: true });
        }
    }, [adminError, allExamsError, errorMateria, gradesError]);


    // Vista para ADMIN
    if (rol === 'admin') {
        // Obtener lista única de usuarios de todos los exámenes
        const usuariosMap = new Map();
        
        if (adminData?.data) {
            adminData.data.examenes.forEach((examen) => {
                examen.usuarios.forEach((usuario) => {
                    if (!usuariosMap.has(usuario.usuarioId)) {
                        usuariosMap.set(usuario.usuarioId, {
                            usuarioId: usuario.usuarioId,
                            nombre: usuario.nombre,
                            calificaciones: {}
                        });
                    }
                    usuariosMap.get(usuario.usuarioId).calificaciones[examen.examenId] = usuario.calificacion;
                });
            });
        }

        const usuarios = Array.from(usuariosMap.values()).filter((usuario) =>
            usuario.nombre.toLowerCase().includes(search.toLowerCase())
        );

        return (
            <div className="w-full flex flex-col items-center gap-8 mt-2 px-4 pb-18">
                
                {/* Titulo de la materia */}
                <div className="w-full max-w-5xl bg-white shadow-xl rounded-2xl border-[1px] border-gray-300 px-6 py-10">
                    {!materiaPending && (
                        <h1 className="text-center text-3xl md:text-4xl title font-medium uppercase">
                            {materiaDetails?.nombre}
                        </h1>
                    )}
                </div>

                <div className="w-full max-w-5xl bg-white shadow-xl rounded-2xl border-[1px] border-gray-300 p-6 md:p-10">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                        
                        <h2 className="text-2xl title font-light">CALIFICACIONES</h2>

                        {/* Buscador */}
                        <div className="relative w-full md:w-1/2">
                            <input
                                type="text"
                                placeholder="Buscar"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="
                                    w-full 
                                    border border-gray-300 
                                    rounded-md 
                                    px-4 py-2 pr-10
                                    title-font font-light
                                    text-[var(--color-border-shadow)]
                                    placeholder:text-gray-400 
                                    focus:outline-none focus:ring-2 focus:ring-purple-300
                                    transition
                                "
                            />
                            <AiOutlineSearch
                                size={20}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                            />
                        </div>

                        {/* Botón agregar participante */}
                        <button
                            onClick={() =>
                                navigate(`/dashboard/materia/${materiaId}/agregar-participante`)
                            }
                            className="btn-primary py-2.5 px-4 rounded-md transition min-w-[110px] text-base"
                        >
                            Agregar participante
                        </button>
                    </div>
                    
                    {adminPending && <p>Cargando...</p>}
                    
                    {!adminPending && adminData?.data && (
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[600px]">
                                <thead>
                                    <tr className="body text-base text-center">
                                        <th className="text-left pb-3">Nombre / Apellido</th>
                                        {adminData.data.examenes.map((examen) => (
                                            <th key={examen.examenId} className="pb-3">
                                                {examen.examenNombre}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {usuarios.map((usuario, index) => (
                                        <tr 
                                            key={usuario.usuarioId} 
                                            className={`${index % 2 === 0 ? 'bg-[#EFE9FF]' : 'bg-white'} text-center`}
                                        >
                                            <td className="p-4 body text-base font-medium text-left">
                                                {usuario.nombre}
                                            </td>
                                            {adminData.data.examenes.map((examen) => (
                                                <td key={examen.examenId} className="p-4 body text-base">
                                                    {usuario.calificaciones[examen.examenId] != undefined 
                                                        ? usuario.calificaciones[examen.examenId].toFixed(1)
                                                        : '-'}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {adminData?.data?.examenes.length === 0 && (
                        <p className="text-gray-500 text-center">No hay exámenes registrados para esta materia.</p>
                    )}
                </div>
            </div>
        );
    }

    // Vista para USUARIO NORMAL
    // Combinar todos los exámenes con las calificaciones del usuario
    const allGrades = allExamsData?.data ? allExamsData.data.map(exam => {
        const userGrade = gradesData?.data?.find(g => g.examId === exam.id);
        return {
            id: exam.id,
            examen: exam.name,
            calificacion: userGrade?.calificacion,
            realizado: !!userGrade
        };
    }) : [];

    return (
        <div className="w-full flex flex-col items-center gap-8 mt-2 px-4 pb-18">
            {/* Titulo de la materia */}
            <div className="w-full max-w-5xl bg-white shadow-xl rounded-2xl border-[1px] border-gray-300 px-6 py-10">
                {!materiaPending && (
                    <h1 className="text-center text-3xl md:text-4xl title font-medium uppercase">
                        {materiaDetails?.nombre}
                    </h1>
                )}
            </div>

            {/* Tarjeta de calificaciones */}
            <div className="w-full max-w-5xl bg-white shadow-xl rounded-2xl border-[1px] border-gray-300 p-6 md:p-10">
                <h2 className="text-2xl title font-light mb-8">CALIFICACIONES</h2>

                {(gradesPending || examsPending) && (
                    <p className="text-gray-500 text-center">Cargando...</p>
                )}

                {!gradesPending && !examsPending && allGrades.length === 0 && (
                    <p className="text-gray-500 text-center">No hay exámenes registrados para esta materia.</p>
                )}

                {!gradesPending && !examsPending && allGrades.length > 0 && (
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[400px]">
                            <thead>
                                <tr className="body text-base">
                                    <th className="text-left pb-4 font-semibold">Evaluación</th>
                                    <th className="text-center pb-4 font-semibold">Nota</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allGrades.map((g, index) => (
                                    <tr 
                                        key={g.id} 
                                        className={`${index % 2 === 0 ? 'bg-[#EFE9FF]' : 'bg-white'}`}
                                    >
                                        <td className="p-4 body text-base font-medium">
                                            {g.examen}
                                        </td>
                                        <td className="p-4 body text-base text-center font-semibold">
                                            {g.realizado 
                                                ? (g.calificacion !== null && g.calificacion !== undefined 
                                                    ? g.calificacion.toFixed(1)
                                                    : '-')
                                                : 'No se ha realizado'}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Botón regresar al tablero */}
                <div className="mt-8 text-center">
                    <button
                        onClick={() => navigate(`/dashboard/materia/${materiaDetails?.nombre}/${materiaId}`)}
                        className="btn-primary py-2.5 px-6 rounded-md transition"
                    >
                        Regresar al tablero
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Grades;