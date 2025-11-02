import { useState } from "react";
import { toast } from "react-toastify";
import { createExam } from "../../../services/examService";

const ExamForm = ({ materiaId, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        isVisible: true,
        description: '',
        duration: 2,
        daysDuration: 1
    });
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        try {
            const { name, isVisible, description, duration, daysDuration } = formData;
            const DateHourBegin = new Date();
            const DateHourEnd = new Date(DateHourBegin);

            //Conversiones:
            const durationMillis = duration * 60 * 60 * 1000;
            DateHourEnd.setDate(DateHourEnd.getDate() + daysDuration);
            const examData = {
                    name: name,
                    isVisible: isVisible,
                    description: description,
                    duration: durationMillis,
                    DateHourBegin: DateHourBegin,
                    DateHourEnd: DateHourEnd,
                    idMateria: materiaId
                }
            const res = createExam({examData: examData});
            onClose();
            toast.success('Examen creado!');
        } catch (e) {
            console.log(e);

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className=" modal-overlay">
            <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg">
                <div className="flex items-center gap-2 mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Crear examen</h2>
                </div>

                <div className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                            Nombre:
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                            placeholder="Nombre del examen"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                            Descripcion:
                        </label>
                        <input
                            type="text"
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                            placeholder="Descripcion"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-2">
                            Duracion en horas:
                        </label>
                        <input
                            type="number"
                            min="1" max="6" step="1"
                            id="duration"
                            name="duration"
                            value={formData.duration}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="daysDuration" className="block text-sm font-medium text-gray-700 mb-2">
                            Fecha maxima en dias:
                        </label>
                        <input
                            type="number"
                            min="1" max="30" step="1"
                            id="daysDuration"
                            name="daysDuration"
                            value={formData.daysDuration}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                            required
                        />
                    </div>

                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={loading}
                        className="cursor-pointer w-full flex items-center justify-center gap-2 bg-secondary text-white py-2 px-4 rounded-md hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <>
                                <div className="rounded-full h-4 w-4 border-b-2 border-white"></div>
                                Creando...
                            </>
                        ) : (
                            <>
                                Crear examen
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ExamForm