import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import ContentCard from "../../components/materia-content/contents/contentCard";
import { getMateriaById } from "../../services/materiaService";
import PDFUploadForm from "../../components/materia-content/temaUpload/temaForm";
import { useState } from "react";
import { useAuthStore } from "../../store/authStore";
import ExamForm from "../../components/materia-content/examUpload/ExamForm";

const Materia = () => {

    const { materiaId, nombre } = useParams();
    const user = useAuthStore((state) => state.user);
    const [temaModalOpen, setTemaModalOpen] = useState(false);
    const [examModalOpen, setExamModalOpen] = useState(false);

    const { data: content, isError, isPending } = useQuery(
        {
            queryKey: ["content", materiaId],
            queryFn: () => getMateriaById({ id: materiaId })
        }
    );

    const queryClient = useQueryClient();

    const deleteTemaMutation = useMutation({
        mutationFn: ({ temaId }) => deleteTema({ temaId }),

        // ⬇ Se ejecuta ANTES de la request
        onMutate: async ({ temaId }) => {
            await queryClient.cancelQueries(["content", materiaId]);

            const previousData = queryClient.getQueryData(["content", materiaId]);

            queryClient.setQueryData(["content", materiaId], (old) => {
                return {
                    ...old,
                    temas: {
                        ...old.temas,
                        data: old.temas.data.filter((tema) => tema.id !== temaId),
                    },
                };
            });

            return { previousData };
        },

        // ⬇ Si hubo error, revertimos los cambios
        onError: (err) => {
            console.error("DELETE ERROR:", err);
        },

        // ⬇ Al finalizar, revalidamos datos con el backend
        onSettled: () => {
            queryClient.invalidateQueries(["content", materiaId]);
        }
    });

    const deleteExamMutation = useMutation({
        mutationFn: ({ examId }) => deleteExam({ examId }),

        // ⬇ Se ejecuta ANTES de la request
        onMutate: async ({ examId }) => {
            await queryClient.cancelQueries(["content", materiaId]);

            const previousData = queryClient.getQueryData(["content", materiaId]);

            queryClient.setQueryData(["content", materiaId], (old) => {
                return {
                    ...old,
                    examenes: {
                        ...old.examenes,
                        data: old.examenes.data.filter((examen) => examen.id !== examId),
                    },
                };
            });

            return { previousData };
        },

        // ⬇ Si hubo error, revertimos los cambios
        onError: (err) => {
            console.error("DELETE ERROR:", err);
        },

        // ⬇ Al finalizar, revalidamos datos con el backend
        onSettled: () => {
            queryClient.invalidateQueries(["content", materiaId]);
        }
    });

    const deleteTopic = (temaId) => {
        deleteTemaMutation.mutate({ temaId });
    }

    const deleteExamen = (examId) => {
        deleteExamMutation.mutate({ examId });
    }

    if (temaModalOpen) {
        return (
            <div className="bg-white p-8 flex flex-col gap-10 min-w-5xl min-h-64 soft-ring rounded-2xl">
                <PDFUploadForm
                    materiaId={materiaId}
                    onClose={() => setTemaModalOpen(false)}
                />
            </div>
        );
    }

    if (examModalOpen) {
        return (
            <div className="bg-white p-8 flex flex-col gap-10 min-w-5xl min-h-64 soft-ring rounded-2xl">
                <ExamForm
                    materiaId={materiaId}
                    onClose={() => setExamModalOpen(false)}
                />
            </div>
        );
    }

    return (
        <div className="bg-white p-8 flex flex-col gap-10 min-w-5xl min-h-64 soft-ring rounded-2xl">
            {isPending && <div>loading...</div>}

            {!isPending && (
                <h3 className="text-primary text-4xl">{nombre}</h3>
            )}

            {user?.rol === 'admin' && (
                <button
                    className="cursor-pointer p-1.5 bg-pink text-white"
                    onClick={() => setTemaModalOpen(true)}
                >
                    Añadir tema
                </button>
            )}

            {!isPending && (
                <ContentCard
                    data={content.temas.data}
                    label="Contenido de clase"
                    type="tema"
                    deleteTopic={deleteTopic}
                    rol={user?.rol}
                />
            )}

            {user?.rol === 'admin' && (
                <button
                    className="cursor-pointer p-1.5 bg-pink text-white"
                    onClick={() => setExamModalOpen(true)}
                >
                    Crear examen
                </button>
            )}

            {!isPending && (
                <ContentCard
                    data={content.examenes.data}
                    label="Examenes"
                    type="exam"
                    deleteExamen={deleteExamen}
                    rol={user?.rol}
                />
            )}
        </div>
    );
};

export default Materia;