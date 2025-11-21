import { useState } from "react";
import Swal from "sweetalert2";

const ExamForm = ({ materiaId, onClose, saveExam }) => {
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

            if (!name || name.trim().length === 0) {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "El nombre del examen es obligatorio",
                });
                return;
            }

            if (name.trim().length < 3) {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "El nombre debe tener al menos 3 caracteres",
                });
                return;
            }

            if (!description || description.trim().length === 0) {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "La descripción es obligatoria",
                });
                return;
            }

            if (description.trim().length < 10) {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "La descripción debe tener al menos 10 caracteres",
                });
                return;
            }

            if (duration === "" || duration === null) {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "La duración es obligatoria",
                });
                return;
            }

            if (isNaN(duration) || duration <= 0) {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "La duración debe ser un número mayor a 0",
                });
                return;
            }

            if (daysDuration === "" || daysDuration === null) {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "El número de días es obligatorio",
                });
                return;
            }

            if (isNaN(daysDuration) || daysDuration < 0) {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Los días deben ser un número mayor o igual a 0",
                });
                return;
            }

            const DateHourBegin = new Date();
            const DateHourEnd = new Date(DateHourBegin);

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

            saveExam({ examData: examData });
            onClose();
            Swal.fire({
                icon: "success",
                title: "!Examen creado!",
                text: "El examen fue creado correctamente.",
                timer: 1200,
                showConfirmButton: false,
            });
        } catch (e) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Error al crear el examen",
            });

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="">
            <div className="p-6 bg-white rounded-lg">
                <div className="flex items-center justify-center pb-10">
                    <h2 className="text-5xl font-light text-titles-purple">Crear un nuevo examen</h2>
                </div>

                <div className="w-full grid gap-8">
                    <div className="grid grid-cols-2 items-center px-4">
                        <label htmlFor="name" className="text-xl font-medium text-gray-700 pl-20">
                            Nombre del parcial:
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-[30rem] px-3 py-2 border border-gray-300 rounded-md"
                            placeholder="Nombre del examen"
                            required
                        />
                    </div>
                    <div className="grid grid-cols-2 items-center px-4">
                        <label htmlFor="description" className="text-xl font-medium text-gray-700 pl-20">
                            Descripcion:
                        </label>
                        <input
                            type="text"
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            className="w-[30rem] px-3 py-2 border border-gray-300 rounded-md"
                            placeholder="Descripcion"
                            required
                        />
                    </div>
                    <div className="grid grid-cols-2 items-center px-4">
                        <label htmlFor="duration" className="text-xl font-medium text-gray-700 pl-20">
                            Duracion en horas:
                        </label>
                        <input
                            type="number"
                            min="1" max="6" step="1"
                            id="duration"
                            name="duration"
                            value={formData.duration}
                            onChange={handleInputChange}
                            className="w-20 px-3 py-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <div className="grid grid-cols-2 items-center px-4">
                        <label htmlFor="daysDuration" className="text-xl font-medium text-gray-700 pl-20">
                            Fecha maxima en dias:
                        </label>
                        <input
                            type="number"
                            min="1" max="30" step="1"
                            id="daysDuration"
                            name="daysDuration"
                            value={formData.daysDuration}
                            onChange={handleInputChange}
                            className="w-20 px-3 py-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    <div className="flex justify-center w-full gap-16">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={loading}
                            className="btn-primary py-2 px-4 rounded-md min-w-36"
                        >
                            Cancelar
                        </button>
                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={loading}
                            className="btn-primary py-2 px-4 rounded-md min-w-36"
                        >
                            {loading ? (
                                <>
                                    <div className="rounded-full h-4 w-4 border-b-2"></div>
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
        </div>
    );
}

export default ExamForm