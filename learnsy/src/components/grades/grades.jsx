import { useQuery } from "@tanstack/react-query";
import { getGrades } from "../../services/authService";
import { useParams } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

const Grades = () => {
    const { materiaId } = useParams();
    const user = useAuthStore((state) => state.user);

    const { data, isError, isPending } = useQuery(
        {
            queryKey: ["grades", materiaId],
            queryFn: () => getGrades({ materiaId: materiaId, userId: user.usuarioId })
        }
    );
    return (
        <>
            <div className="bg-white p-8 flex flex-col gap-10 min-w-5xl min-h-64 soft-ring rounded-2xl">
                <h3>Notas</h3>
                <hr className="h-0.5 border-0 bg-primary"></hr>
                {isPending && <p>loading...</p>}
                {!isPending && data?.data.map((g)=>{
                    const nota = g.calificacion;
                    const examen = g.examen;

                    return (
                        <div className="flex gap-3">
                            <div>{examen}</div>
                            <div>{nota}</div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default Grades;