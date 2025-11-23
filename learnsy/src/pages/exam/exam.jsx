import { useParams } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import ExamInfo from "../../components/exam/questions/examInfo";
import Results from "../../components/exam/results/results";
import CreateExamContent from "../../components/exam/editExamContent/createExamQuestion";
import InitExam from "../../components/exam/initExam/initExam";
import useExamLifecycle from "../../hooks/useExamLifeCycle";

const Exam = () => {
    const { examId, materiaId, examName, nombre } = useParams();
    const { examStarted, editExam, finished, startExam, openEdit, closeEdit } = useExamLifecycle(examId);
    const user = useAuthStore((state) => state.user);

    return (
        <div className="grid gap-11">

            {/* Titulo de materia */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden w-full -mt-2">
                <div className="bg-white px-10 py-8 flex items-center justify-center">
                    <h3 className="title text-3xl font-bold uppercase">
                        {nombre}
                    </h3>
                </div>
            </div>

            <div className="bg-white p-6 sm:p-8 lg:p-12 flex w-fit mx-auto shadow-xl border border-gray-200 rounded-2xl items-center flex-col sm:w-5xl">

                {/* Admin: Boton comenzar a crear nuevas preguntas */}
                {user?.rol === "admin" && !editExam && !examStarted && (
                    <div className="w-full flex justify-end">
                        <button className="cursor-pointer" onClick={openEdit}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
                                <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
                            </svg>
                        </button>
                    </div>
                )}


                {/* Admin: Formulario para crear nuevas preguntas */}
                {editExam && <CreateExamContent idExam={examId} onClose={closeEdit} />}


                {/* Pantalla previa a comenzar un examen */}
                {!examStarted && !finished && !editExam && (
                    <InitExam key={examId} examId={examId} examName={examName} handleStartExam={startExam} materiaId={materiaId} user={user} />
                )}

                {/* Pantalla mostrada al comenzar el examen */}
                {examStarted && !finished && <ExamInfo user={user} examId={examId} />}


                {/* Resultados del examen finalizado */}
                {finished && <Results/>}
            </div>
        </div>

    )
}

export default Exam;