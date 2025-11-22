import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import ContentCard from "../../components/materia-content/contents/contentCard";
import { deleteTema, getMateriaById, savePdf } from "../../services/materiaService";
import PDFUploadForm from "../../components/materia-content/temaUpload/temaForm";
import { useState } from "react";
import { useAuthStore } from "../../store/authStore";
import ExamForm from "../../components/materia-content/examUpload/ExamForm";
import { useDeleteContent } from "../../hooks/useDeleteContent";
import { createExam, deleteExam } from "../../services/examService";
import { useAddContent } from "../../hooks/useCreateContent";

const Materia = () => {
    const { materiaId, nombre } = useParams();
    const user = useAuthStore((state) => state.user);
    const [temaModalOpen, setTemaModalOpen] = useState(false);
    const [examModalOpen, setExamModalOpen] = useState(false);

    const { data: content, isPending } = useQuery({
        queryKey: ["content", materiaId],
        queryFn: () => getMateriaById({ id: materiaId }),
        staleTime: 1000 * 60 * 5,
    });

    const addTemaMutation = useAddContent({
        materiaId,
        keyName: "temas",
        addFn: (data) => savePdf(data)
    });

    const addExamenMutation = useAddContent({
        materiaId,
        keyName: "examenes",
        addFn: ({ examData }) => createExam({ examData })
    });

    const deleteTemaMutation = useDeleteContent({
        materiaId,
        keyName: "temas",
        deleteFn: ({ temaId }) => deleteTema({ temaId })
    });

    const deleteExamMutation = useDeleteContent({
        materiaId,
        keyName: "examenes",
        deleteFn: ({ examId }) => deleteExam({ examId })
    });

    const saveTema = ({ nombre, file, materiaId }) => {
        addTemaMutation.mutate({ nombre, file, materiaId });
    }

    const saveExam = ({ examData }) => {
        addExamenMutation.mutate({ examData });
    }

    const deleteTopic = (temaId) => {
        deleteTemaMutation.mutate({ temaId });
    }

    const deleteExamen = (examId) => {
        deleteExamMutation.mutate({ examId });
    }

    if (temaModalOpen) {
        return (
            <div className="bg-white p-8 flex flex-col gap-10 min-w-5xl min-h-64 shadow-lg border border-gray-200 rounded-2xl">
                <PDFUploadForm
                    materiaId={materiaId}
                    onClose={() => setTemaModalOpen(false)}
                    saveTema={saveTema}
                />
            </div>
        );
    }

    if (examModalOpen) {
        return (
            <div className="bg-white p-8 flex flex-col gap-10 min-w-5xl min-h-64 shadow-lg border border-gray-200 rounded-2xl">
                <ExamForm
                    materiaId={materiaId}
                    onClose={() => setExamModalOpen(false)}
                    saveExam={saveExam}
                />
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-8 w-6xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden w-full -mt-2">
                <div className="bg-white px-10 py-8 flex items-center justify-center">
                    {isPending ? (
                        <div className="text-2xl text-gray-400">Cargando...</div>
                    ) : (
                        <h3 className="title text-3xl font-bold uppercase">{nombre}</h3>
                    )}
                </div>
            </div>

            {isPending && (
                <div className="text-center py-12 body">
                    Cargando contenido...
                </div>
            )}

            {!isPending && (
                <>
                    <ContentCard
                        data={content.temas.data}
                        label="Contenido de clase"
                        type="tema"
                        deleteTopic={deleteTopic}
                        rol={user?.rol}
                        onAddClick={user?.rol === 'admin' ? () => setTemaModalOpen(true) : null}
                    />

                    <ContentCard
                        data={content.examenes.data}
                        label="Evaluaciones"
                        type="exam"
                        deleteExamen={deleteExamen}
                        rol={user?.rol}
                        onAddClick={user?.rol === 'admin' ? () => setExamModalOpen(true) : null}
                    />
                </>
            )}
        </div>
    );
};

export default Materia;