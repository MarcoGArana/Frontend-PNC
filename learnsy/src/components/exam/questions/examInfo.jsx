import { useState } from "react";
import useQuestionsStore from "../../../store/questions";
import Controls from "../controls/controls";
import UpdateExamContent from "../editExamContent.jsx/updateExamQuestion";
import Question from "./question";
import Swal from "sweetalert2";
import { completeExam } from "../../../services/examService";

const ExamInfo = ({ user, examId }) => {
    const {
        questions,
        currentQuestion,
        respuestas,
        selectAnswer,
        goNextQuestion,
        goPreviusQuestion,
        finishExam,
        duration
    } = useQuestionsStore()

    const [editQuestion, setEditQuestion] = useState(false);

    const questionInfo = questions[currentQuestion];

    const handleChange = (respuestaId) => () => {
        selectAnswer(questionInfo.id, respuestaId)
    }

    const changeQuestion = ({ next }) => () => {
        next ? goNextQuestion() : goPreviusQuestion();
    }

    const handleFinish = async () => {
        Swal.fire({
            title: '¿Quieres terminar el examen?',
            showDenyButton: true,
            confirmButtonText: 'Si',
            denyButtonText: 'No',
            customClass: {
                actions: 'my-actions',
                confirmButton: 'order-2 confirm',
                denyButton: 'order-1 confirm',
                popup: 'custom-popup',
                title: 'popup-title'
            },
        }).then(async (result) => {
            if (result.isConfirmed) {
                let correct = 0;
                
                questions.forEach(q => {
                    const userAnswer = respuestas[q.id];
                    const answerExist = q.responses.find(ans => ans.id == userAnswer);
                    if (answerExist?.isCorrect) correct++;
                });
        
                const calificacion = (correct * 10) / (questions.length);
        
                if (user.rol != 'admin') {
                    await completeExam({
                        examId: examId,
                        userId: user.id,
                        calificacion: calificacion
                    });
                }

                Swal.fire('Examen terminado!', '', 'success');

                finishExam();
            }
        })
    }

    return (
        <>

            {!editQuestion &&
                (
                    <div className="flex flex-col gap-14 w-full">
                        <Question questionInfo={questionInfo} respuestas={respuestas} handleChange={handleChange} duration={duration} />
                        <Controls currentQuestion={currentQuestion} limit={questions.length} changeQuestion={changeQuestion} />
                    </div>
                )
            }

            {user?.rol == 'admin' && !editQuestion && (
                <div className=" w-full flex">
                    <button className="cursor-pointer" onClick={() => { setEditQuestion(true) }}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" /></svg>
                    </button>
                </div>
            )}

            {currentQuestion === (questions.length - 1) && !editQuestion &&
                <button className="bg-pink rounded-sm p-2 relative -top-[2.7rem] -right-[21.75rem] text-white font-light cursor-pointer" onClick={() => handleFinish()}>Finalizar examen</button>
            }

            {editQuestion && <UpdateExamContent onClose={() => setEditQuestion(false)} questionInfo={questionInfo} />}
        </>
    )
}

export default ExamInfo;