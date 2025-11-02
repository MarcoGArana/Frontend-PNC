import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import ContentCard from "./contents/contentCard";
import { getMateriaById } from "../../services/materiaService";
import PDFUploadForm from "./temaUpload/temaForm";
import { useState } from "react";
import { useAuthStore } from "../../store/authStore";
import ExamForm from "./examUpload/ExamForm";

const Materia = () => {

    const { materiaId, nombre } = useParams();
    const user = useAuthStore((state) => state.user);
    const [temaModalOpen, setTemaModalOpen] = useState(false);
    const [examModalOpen, setExamModalOpen] = useState(false);
    const [deletedTopics, setDeletedTopic] = useState([]);

    const { data: content, isError, isPending } = useQuery(
        {
            queryKey: ["content", materiaId],
            queryFn: () => getMateriaById({id: materiaId})
        }
    );

    const deleteTopic = (name) => {
        setDeletedTopic(state => [...state, name])
    }

    return (
        <div className="grid auto-rows-min">
            <div className="bg-white p-8 flex flex-col gap-10 min-w-5xl min-h-64 shadow-2xl shadow-black">
                {isPending && <div>loading...</div>}
                {!isPending && (<h3 className="text-primary text-4xl">{nombre}</h3>)}
                {user?.rol == 'admin' && <button className="cursor-pointer p-1.5 bg-ligthBlue text-white" onClick={() => setTemaModalOpen(true)}>Añadir tema</button>}
                {!isPending && (<ContentCard data={content.temas.data} label="Contenido de clase" type="tema" deletedTopics={deletedTopics} deleteTopic={deleteTopic} rol={user?.rol}/>)}
                {user?.rol == 'admin' && <button className="cursor-pointer p-1.5 bg-ligthBlue text-white" onClick={() => setExamModalOpen(true)}>Crear examen</button>}
                {!isPending && (<ContentCard data={content.examenes.data} label="Examenes" type="exam" deletedTopics={[]} rol={user?.rol}/>)}
                {user?.rol == 'admin' && temaModalOpen && <PDFUploadForm materiaId={materiaId} onClose={() => setTemaModalOpen(false)}/>}
                {user?.rol == 'admin' && examModalOpen && <ExamForm materiaId={materiaId} onClose={() => setExamModalOpen(false)}/>}
            </div>
        </div>
    )
};

export default Materia;