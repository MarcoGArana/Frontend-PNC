import { useEffect, useState } from "react";
import useQuestionsStore from "../store/questions";

export default function useExamLifecycle(examId) {
    const resetQuestionsStore = useQuestionsStore(state => state.reset);
    const finished = useQuestionsStore(state => state.finished);

    const [examStarted, setExamStarted] = useState(false);
    const [editExam, setEditExam] = useState(false);

    // Reinicia los estados al cambiar entre examenes
    useEffect(() => {
        resetQuestionsStore();
        setExamStarted(false);
        setEditExam(false);
    }, [examId]);

    const startExam = () => setExamStarted(true);
    const openEdit = () => setEditExam(true);
    const closeEdit = () => setEditExam(false);

    return {
        examStarted,
        editExam,
        finished,
        startExam,
        openEdit,
        closeEdit
    };
}