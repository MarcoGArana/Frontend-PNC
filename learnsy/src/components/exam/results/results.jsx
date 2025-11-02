import { useNavigate } from "react-router-dom";
import useQuestionsStore from "../../../store/questions"
import { useEffect } from "react";
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
    <div className="p-8 text-xl font-normal grid grid-cols-1 gap-5">
      <h1>¡Tus resultados</h1>

      <strong className="flex gap-3.5">
        <p>✅ {correct} Correctas,</p>
        <p>❌ {incorrect} Incorrectas,</p>
        <p> {unanswered} Sin responder</p>
      </strong>
      <p>Calificacion: {calificacion}</p>

      <button className="cursor-pointer bg-ligthBlue text-white rounded w-fit p-3" onClick={handleClick}>
          Volver al dashboard
      </button>
    </div>
  )
}

export default Results