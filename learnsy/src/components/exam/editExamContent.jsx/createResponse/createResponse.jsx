import { useState } from "react";
import { toast } from "react-toastify";
import { createAnswer } from "../../../../services/examService";

const CreateResponse = ({ idPreguntaOpcionMultiple, onClose }) => {
    const [formData, setFormData] = useState({
        description: '',
        image: '',
        isCorrect: false
    });
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        try {
            const ansData = {
                image: formData.image,
                description: formData.description,
                isCorrect: formData.isCorrect,
                idPreguntaOpcionMultiple: idPreguntaOpcionMultiple
            }
            const res = createAnswer({ ansData: ansData });
            onClose();
            toast.success('Respuesta creada!');
            setFormData({ description: '', checked: false });
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
                    <h2 className="text-2xl font-bold text-gray-800">Crear respuesta: </h2>
                </div>

                <div className="space-y-4">
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
                        <label htmlFor="isCorrect" className="block text-sm font-medium text-gray-700 mb-2">
                            Es correcta:
                        </label>
                        <input
                            type="checkbox"
                            id="isCorrect"
                            name="isCorrect"
                            checked={formData.isCorrect}
                            onChange={handleInputChange}
                            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
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
                                Enviando...
                            </>
                        ) : (
                            <>
                                Enviar respuesta
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CreateResponse;