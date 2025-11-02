import { useLocation, useNavigate } from "react-router-dom";
import useQuestionsStore from "../../../store/questions";
import { deleteTema, getPdf } from "../../../services/materiaService";
import { toast } from "react-toastify";

const ContentCard = ({ data, label, type, deletedTopics, deleteTopic, rol }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const fetchQuestions = useQuestionsStore(state => state.fetchQuestions);

    const handleExamClick = (exam, examId, name) => {
        fetchQuestions({ data: exam })
        navigate(`${location.pathname}/${type}/${name}/${examId}`);
    }

    const handleTemaClick = (temaId) => {
        getPdf(temaId);
    }

    const handleDeleteTema = ({ temaId, name }) => {
        deleteTema({ temaId: temaId });
        deleteTopic(name);
        toast.success('El tema ha sido eliminado exitosamente');
    }

    return (
        <div className="border-4 border-solid border-gray-300">
            <h4 className="bg-gray-300 text-primary text-3xl p-1">
                {label}:
            </h4>
            <div className="flex flex-col gap-1 p-1.5 text-secondary text-2xl">
                {data?.map((content) => {
                    const name = type == 'tema' ? content?.nombre : content?.name;
                    let deleted = '';
                    if (deletedTopics.includes(name)) {
                        deleted = 'hidden'
                    }
                    return (
                        <div className={`flex justify-between ${deleted}`} key={name}>
                            <button className="flex gap-0.5 cursor-pointer"
                                onClick={
                                    () => {
                                        if (type == 'tema') {
                                            handleTemaClick(content.id);
                                        } else {
                                            handleExamClick(content?.preguntaOpcionMultipleList, content.id, name)
                                        }
                                    }
                                }>
                                - <p className="underline">{name}</p>
                            </button>
                            {rol == 'admin' &&
                                <button className="cursor-pointer"
                                    onClick={
                                        () => {
                                            if (type == 'tema') {
                                                handleDeleteTema({ temaId: content.id, name: name })
                                            } else {
                                                //delete exam
                                            }
                                        }
                                    }>
                                    <svg id="delete" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" /></svg>
                                </button>
                            }
                        </div>
                    )
                }
                )}
            </div>
        </div>
    )
}

export default ContentCard;