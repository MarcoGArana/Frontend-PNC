import { create } from "zustand";
import { updateQuestion } from "../services/examService";

const useQuestionsStore = create((set, get) => {
    return {
        questions: [],
        currentQuestion: 0,
        respuestas: {},
        duration: 0,
        finished: false,

        fetchQuestions: ({ data, duration }) => {
            const questionsInfo = data.sort(() => Math.random() - 0.5).slice()
            set({ questions: questionsInfo, duration: duration }, false, 'FETCH_QUESTIONS')
        },

        selectAnswer: (questionId, answerIndex) => {
            const { respuestas: prevAnswers } = get();
            set({ respuestas: { ...prevAnswers, [questionId]: answerIndex } })
        },

        goNextQuestion: () => {
            const { currentQuestion, questions } = get()
            const nextQuestion = currentQuestion + 1

            if (nextQuestion < questions.length) {
                set({ currentQuestion: nextQuestion }, false, 'GO_NEXT_QUESTION')
            }
        },

        goPreviusQuestion: () => {
            const { currentQuestion } = get()
            const prevQuestion = currentQuestion - 1

            if (prevQuestion >= 0) {
                set({ currentQuestion: prevQuestion }, false, 'GO_PREVIUS_QUESTION')
            }
        },

        finishExam: () => {
            set({ finished: true }, false, 'FINISH_EXAM')
        },

        reset: () => set({
            questions: [],
            currentQuestion: 0,
            respuestas: {},
            duration: 0,
            finished: false
        }),

        updateQuestion: ({ updatedQuestion }) => {
            const { questions } = get()
            set({ questions: questions.map((e) => {                
                
                if(updatedQuestion.id == e.id){
                    
                    return updatedQuestion;
                }
                return e;
            }) }, false, 'UPDATE_QUESTIONS')
        }
    }
})

export default useQuestionsStore;