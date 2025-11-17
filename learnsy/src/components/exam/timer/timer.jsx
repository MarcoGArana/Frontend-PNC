import { useEffect, useState } from "react";
import useQuestionsStore from "../../../store/questions";
import { toast } from "react-toastify";

const Timer = ({duration}) => {
    const finishExam = useQuestionsStore(state => state.finishExam);        

    const [startTime, setStarTime] = useState(new Date());
    const [remainingTime, setTimeRemaining] = useState(0);       

    const seconds = Math.floor((remainingTime / 1000) % 60);
    const minutes = Math.floor((remainingTime / (1000 * 60)) % 60);
    const hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);

    useEffect(() => {
        const countdownInterval = setInterval(() => {
            const currentTime = new Date();

            //TODO: colocar el duration time del backend
            const limitTime = startTime.getTime() + duration
            let timeLeft = limitTime - currentTime.getTime();

            if (timeLeft <= 0) {
                timeLeft = 0;
                clearInterval(countdownInterval);
                finishExam();
                toast.success('El tiempo se acabo!');
            }

            setTimeRemaining(timeLeft);
        }, 1000);

        return () => clearInterval(countdownInterval);
    }, [remainingTime]);

    return (<h4 className="text-dark-text"><strong>Tiempo restante:</strong> {hours}:{minutes}:{seconds}</h4>);
}

export default Timer;