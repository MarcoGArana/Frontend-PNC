 import { useLocation, useNavigate } from "react-router-dom";
import useQuestionsStore from "../../../store/questions";
import { getPdf } from "../../../services/materiaService";
import { toast } from "react-toastify";
import pdfIcon from '../../../assets/icons/PDFicon.png';
import examIcon from '../../../assets/icons/EXAMicon.png';

const  ContentCard = ({ data, label, type, deleteTopic, deleteExamen, rol, onAddClick }) => {
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

    const handleDeleteTema = ({ temaId }) => {
        deleteTopic(temaId);
        toast.success('El tema ha sido eliminado exitosamente');
    }

    const handleDeleteExam = ({ examId }) => {
        deleteExamen(examId);
        toast.success('El examen ha sido eliminado exitosamente');
    }

    return (
        <div className="bg-[#706788] rounded-lg overflow-hidden shadow-md">
            <div className="flex justify-between items-center px-6 py-4">
                <h4 className="text-white text-xl font-semibold uppercase tracking-wide">
                    {label}
                </h4>
                {rol === 'admin' && onAddClick && (
                    <button
                        onClick={onAddClick}
                        className="cursor-pointer bg-[#C65CB1] hover:bg-[#d666af] text-white px-6 py-2 rounded-md text-sm font-medium uppercase transition-colors w-48"
                    >
                        {type === 'tema' ? 'AGREGAR CONTENIDO' : 'CREAR EVALUACIÓN'}
                    </button>
                )}
            </div>
            <div className="bg-[#F3F0FD] p-6">
                {data && data.length > 0 ? (
                    <div className="flex flex-col gap-3">
                        {data.map((content, index) => {
                            const name = type === 'tema' ? content?.nombre : content?.name;
                            return (
                                <div 
                                    className="flex items-center justify-between gap-3 group" 
                                    key={content.id || index}
                                >
                                    <button 
                                        className="flex items-center gap-3 cursor-pointer text-left flex-1 hover:opacity-75 transition-opacity"
                                        onClick={() => {
                                            if (type === 'tema') {
                                                handleTemaClick(content.id);
                                            } else {
                                                handleExamClick(content?.preguntaOpcionMultipleList, content.id, name);
                                            }
                                        }}
                                    >
                                        <div className="flex-shrink-0">
                                            {type === 'tema' ? 
                                                <img 
                                                    src={pdfIcon} 
                                                    alt="PDF icon" 
                                                    className="w-6 h-7"
                                                /> : 
                                                <img 
                                                    src={examIcon} 
                                                    alt="Exam icon" 
                                                    className="w-9 h-9"
                                                />}
                                        </div>
                                        <span className="text-[#374151] text-base underline">
                                            {index + 1}. {name}
                                        </span>
                                    </button>
                                    {rol === 'admin' && (
                                        <button 
                                            className="cursor-pointer p-1 hover:bg-gray-200 rounded transition-colors flex-shrink-0"
                                            onClick={() => {
                                                if (type === 'tema') {
                                                    handleDeleteTema({ temaId: content.id });
                                                } else {
                                                    handleDeleteExam({ examId: content.id });
                                                }
                                            }}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#6b7280">
                                                <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                                            </svg>
                                        </button>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <p className="text-gray-500 text-center py-4">No hay contenido disponible</p>
                )}
            </div>
        </div>
    );
}

export default ContentCard;