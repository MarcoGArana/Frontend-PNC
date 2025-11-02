import useQuestionsStore from "../../../store/questions";
import Controls from "../controls/controls";
import Timer from "../timer/timer";
import Question from "./question";

const ExamInfo = () => {
    // state handling
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

    const questionInfo = questions[currentQuestion];    

    const handleChange = (respuestaId) => () => {
        selectAnswer(questionInfo.id, respuestaId)
    }

    const changeQuestion = ({ next }) => () => {
        next ? goNextQuestion() : goPreviusQuestion();
    }

    return (
        <>
            <Timer duration={duration}/>
            <div className="grid gap-14">
                <Question questionInfo={questionInfo} respuestas={respuestas} handleChange={handleChange}/>
                <Controls currentQuestion={currentQuestion} limit={questions.length} changeQuestion={changeQuestion}/>
            </div>
            
            {currentQuestion === (questions.length - 1) && 
                <button className="bg-ligthBlue rounded-sm p-2 relative -top-[2.7rem] -right-[21.75rem] text-white font-light cursor-pointer" onClick={() => finishExam()}>Finalizar examen</button>
            }
        </>
    )
}

export default ExamInfo;