import { useNavigate } from "react-router-dom";
import useQuestionsStore from "../../../store/questions";
import { finishExam } from "../../../services/examService";

const Results = ({examId, userId}) => {
  
  const questions = useQuestionsStore(state => state.questions)
  const respuestas = useQuestionsStore(state => state.respuestas)
  const navigate = useNavigate();

  let correct = 0
  let incorrect = 0
  let unanswered = 0

  questions.forEach(q => {
    const userAnswer = respuestas[q.id]
    if(!userAnswer) unanswered++
    else if(q.responses.find(ans => ans.id == userAnswer).isCorrect) correct++
    else incorrect++
  });

  const calificacion = (correct*10)/(questions.length);
  const handleClick = async () => {
    await finishExam({
      examId: examId,
      userId: userId,
      calificacion: calificacion
    });
    navigate('/dashboard');
  }

  return (
    <div className="p-8 text-xl font-normal grid grid-cols-1 gap-5 justify-items-center -mt-14">
      <h2 className="text-4xl text-purple">Tus resultados</h2>
      <img src="../../../../../../src/assets/icons/d2014145c2108618a066776973b552c1d0088844.png" className="max-w-16 h-auto" />

      <div className="grid grid-cols-4 grid-rows-2 bg-gray text-dark-text justify-items-center items-center rounded-2xl border-2 border-purple mb-5">
        <p className="p-2 border-r-2 border-b-2 border-purple w-full h-full grid justify-center items-center text-center font-bold">Respuestas correctas</p>
        <p className="p-2 border-r-2 border-b-2 border-purple w-full h-full grid justify-center items-center text-center font-bold">Respuestas incorrectas</p>
        <p className="p-2 border-r-2 border-b-2 border-purple w-full h-full grid justify-center items-center text-center font-bold">Respuestas sin responder</p>
        <p className="p-2 border-b-2 border-purple w-full h-full grid justify-center items-center text-center font-bold">Calificacion</p>

        <p className="border-r-2 border-purple w-full h-full grid justify-center items-center">{correct}</p>
        <p className="border-r-2 border-purple w-full h-full grid justify-center items-center">{incorrect}</p>
        <p className="border-r-2 border-purple w-full h-full grid justify-center items-center">{unanswered}</p>
        <p className="border-purple w-full h-full grid justify-center items-center font-bold">{calificacion}</p>
      </div>

      <button className="cursor-pointer bg-pink text-white rounded-xl w-fit py-4 px-8" onClick={handleClick}>
          Regresar al tablero
      </button>
    </div>
  )
}

export default Results