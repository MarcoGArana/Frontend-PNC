import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router-dom";
import useQuestionsStore from "../../store/questions";
import { useAuthStore } from "../../store/authStore";
import ExamInfo from "./questions/examInfo";
import Results from "./results/results";
import { beginExam, getExam } from "../../services/examService";
import EditExamContent from "./editExamContent.jsx/editExamContent";

const Exam = () => {
    const { examId, materiaId, examName } = useParams();

    const [examStarted, setExamStarted] = useState(false);
    const [editExam, setEditExam] = useState(false);
    const user = useAuthStore((state) => state.user);
    const fetchQuestions = useQuestionsStore(state => state.fetchQuestions);
    const finished = useQuestionsStore(state => state.finished);
    const queryClient = useQueryClient();

    const { mutate: examAction, isLoading } = useMutation({
        mutationFn: ({ examId, materiaId }) =>
            getExam({examId, materiaId}),
        onSuccess: (data) => {
            beginExam({examId: data.id, userId: user.usuarioId});
            fetchQuestions({data: data.preguntaOpcionMultipleList, duration: data.duration})
            queryClient.invalidateQueries(['exam'])
            setExamStarted(true);
        },
        onError: (err) => {
            console.error('Error al obtener el examen:', err.response?.data || err)
        },
    })

    const startExam = () => {
        examAction({examId, materiaId})
    }

    return (
        <div>
            {examStarted && <h3 className="flex justify-end text-white text-2xl font-normal p-2">{examName}</h3>}
            <div className={`bg-white p-24 flex min-w-5xl max-w-5xl shadow-2xl shadow-black items-center flex-col ${examStarted ? "min-h-[36rem]":""}`}>
                {user?.rol == 'admin' && !editExam && (
                    <div className=" w-full flex justify-end">
                        <button className="cursor-pointer" onClick={()=>{setEditExam(true)}}>
                            <svg id="delete" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>
                        </button>
                    </div>
                )}

                {editExam && <EditExamContent idExam={examId}/>}

                {!isLoading && !examStarted && !finished && !editExam &&(
                    <div className="grid-cols-1 gap-9 justify-items-center">
                        <h3 className="text-2xl p-2">{examName}</h3>
                        <button className="cursor-pointer p-4 bg-secondary text-white rounded-2xl" type="button" onClick={startExam}>
                            Comenzar examen
                        </button>
                    </div>
                )}

                {!isLoading && examStarted && !finished &&(
                    <ExamInfo />
                )}

                {finished && <Results examId={examId} userId={user.usuarioId}/>}
            </div>
        </div>
    )
}

export default Exam;