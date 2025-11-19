import { useState } from "react";
import { createQuestionWithAnswers } from "../../../services/examService";
import { toast } from "react-toastify";

const CreateExamContent = ({ idExam, onClose }) => {
    const [question, setQuestion] = useState('');
    const [loading, setLoading] = useState(false);
    const [correct, setCorrect] = useState(-1);
    const [answers, setAnswers] = useState(['', '', '', '']);
    const [imageUrl, setImageUrl] = useState('https://sp-ao.shortpixel.ai/client/to_auto,q_glossy,ret_img,w_768,h_484/https://anahisalgado.com/wp-content/uploads/2022/07/image-12-1024x645.png');

    const handleAnswerChange = (index, value) => {
        const newAnswers = [...answers];
        newAnswers[index] = value;
        setAnswers(newAnswers);
    };

    const handleDeleteAnswer = (index) => {
        const newAnswers = answers.filter((_, i) => i !== index);
        setAnswers(newAnswers);
    };

    const handleAddOption = () => {
        setAnswers([...answers, '']);
    };

    const clearForm = () => {
        setQuestion('');
        setAnswers(['', '', '', '']);
        setImageUrl('');
        setCorrect(-1);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(question == ''){
            toast.error('El enunciado es obligatorio');
            return;
        }

        if(answers.includes('')){
            toast.error('No pueden haber respuestas en blanco');
            return;
        }

        if(correct == -1){
            toast.error('Debe agregar una respuesta correcta');
            return;
        }

        const questionData = {
            image: imageUrl == '' ? 'https://sp-ao.shortpixel.ai/client/to_auto,q_glossy,ret_img,w_768,h_484/https://anahisalgado.com/wp-content/uploads/2022/07/image-12-1024x645.png' : imageUrl,
            statement: question,
            idExam: idExam
        }

        const questionAnswers = answers.map((e, i) => ({
            image: '',
            description: e,
            isCorrect: correct == i + 1,
            idPreguntaOpcionMultiple: -1
        }))

        const response = await createQuestionWithAnswers({ questionData: questionData }, questionAnswers);

        if (response) {
            toast.info('Pregunta guardada correctamente');
            clearForm();
        }
    }

    return (
        <div>
            <div className="font-light flex gap-10 min-h-52 items-center">
                <form className="flex flex-col gap-3.5 w-[40rem] justify-center" onSubmit={handleSubmit}>
                    <div className="mb-8">
                        <label className="block text-gray-700 font-semibold mb-3 text-lg">
                            Pregunta:
                        </label>
                        <div className="bg-gray-50 rounded-lg p-1 border border-gray-200">
                            <textarea
                                value={question}
                                onChange={(e) => setQuestion(e.target.value)}
                                placeholder="Escriba la pregunta aquí. Ej: ¿Qué son los principios SOLID?"
                                className="w-full p-4 bg-transparent border-none outline-none resize-none text-gray-600"
                                rows="3"
                            />
                        </div>
                    </div>

                    <div className="mb-8">
                        <label className="block text-gray-700 font-semibold mb-3 text-lg">
                            Imagen de la pregunta:
                        </label>
                        <div className="bg-gray-50 rounded-lg p-1 border border-gray-200">
                            <input
                                value={imageUrl}
                                onChange={(e) => setImageUrl(e.target.value)}
                                placeholder="Url de la imagen"
                                className="w-full p-4 bg-transparent border-none outline-none resize-none text-gray-600"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-gray-700 font-semibold mb-4 text-lg">
                            Respuestas:
                        </label>
                        <div className="space-y-4">
                            {answers.map((answer, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    <button
                                        type="button"
                                        className={`flex-shrink-0 text-green-600 hover:text-green-700 transition-colors cursor-pointer`}
                                        onClick={() => { setCorrect(index + 1) }}
                                    >
                                        <svg width="24" height="24" viewBox="0 0 34 34" xmlns="http://www.w3.org/2000/svg" id={correct == index + 1 ? "correct" : ""}>
                                            <path d="M17 5.77474e-06C13.6377 5.77474e-06 10.3509 0.997038 7.55531 2.86502C4.75968 4.73301 2.58075 7.38804 1.29406 10.4944C0.0073658 13.6007 -0.329291 17.0189 0.326658 20.3165C0.982607 23.6142 2.6017 26.6433 4.97919 29.0208C7.35668 31.3983 10.3858 33.0174 13.6835 33.6734C16.9811 34.3293 20.3993 33.9926 23.5056 32.706C26.612 31.4193 29.267 29.2403 31.135 26.4447C33.003 23.6491 34 20.3623 34 17C34.0019 14.767 33.5634 12.5556 32.7097 10.4922C31.856 8.42884 30.6039 6.55405 29.0249 4.97508C27.446 3.39612 25.5712 2.14398 23.5078 1.2903C21.4444 0.436626 19.233 -0.00183543 17 5.77474e-06ZM17 30C14.4288 30 11.9154 29.2376 9.77759 27.8091C7.63976 26.3807 5.97351 24.3503 4.98957 21.9749C4.00563 19.5994 3.74819 16.9856 4.2498 14.4638C4.75141 11.9421 5.98954 9.6257 7.80762 7.80762C9.6257 5.98953 11.9421 4.75141 14.4638 4.2498C16.9856 3.74819 19.5995 4.00563 21.9749 4.98957C24.3503 5.97351 26.3807 7.63975 27.8091 9.77759C29.2376 11.9154 30 14.4288 30 17C30.0034 18.7082 29.6695 20.4002 29.0174 21.9789C28.3653 23.5577 27.4079 24.9922 26.2 26.2C24.9922 27.4079 23.5577 28.3653 21.9789 29.0174C20.4002 29.6695 18.7082 30.0034 17 30ZM22 11.7L16.2 18.7L12.2 15.8C11.3 15.1 10.1 15.3 9.40001 16.2C8.70001 17.1 8.90001 18.3 9.80001 19C11 19.9 12.3 20.8 13.5 21.7C14.4 22.3 15.2 23.2 16.3 23.3C16.6 23.3 17 23.3 17.3 23.1L17.9 22.5L22.4 17.1C23.2 16.1 24 15.2 24.8 14.2C25.4 13.4 25.6 12.4 24.9 11.6L24.6 11.3C23.9 10.8 22.7 10.9 22 11.7Z" fillOpacity="0.8" />
                                        </svg>

                                    </button>
                                    <button
                                        type="button"
                                        className="flex-shrink-0 text-gray-400 cursor-pointer"
                                        onClick={() => handleDeleteAnswer(index)}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="none"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" /></svg>
                                    </button>
                                    <input
                                        type="text"
                                        value={answer}
                                        onChange={(e) => handleAnswerChange(index, e.target.value)}
                                        placeholder="Escriba la opción de respuesta acá"
                                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all text-gray-600 placeholder-gray-400"
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="my-6 flex justify-end">
                            <button
                                type="button"
                                onClick={handleAddOption}
                                className="text-[0.75em] px-4 py-2 bg-dark-purple cursor-pointer text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                            >
                                AGREGAR OPCIÓN
                            </button>
                        </div>
                    </div>

                    <div className="flex justify-center w-full gap-16">
                        <button
                            type="button"
                            onClick={clearForm}
                            disabled={loading}
                            className="cursor-pointer bg-pink text-white py-2 px-4 rounded-md min-w-36"
                        >
                            Limpiar
                        </button>
                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={loading}
                            className="cursor-pointer bg-pink text-white py-2 px-4 rounded-md min-w-36"
                        >
                            {loading ? (
                                <>
                                    <div className="rounded-full h-4 w-4 border-b-2 border-white"></div>
                                    Creando...
                                </>
                            ) : (
                                <>
                                    Guardar pregunta
                                </>
                            )}
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={loading}
                            className="cursor-pointer bg-pink text-white py-2 px-4 rounded-md min-w-36"
                        >
                            Finalizar examen
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateExamContent