import { useState } from "react";
import { savePdf } from "../../../services/materiaService";
import { toast } from "react-toastify";

const PDFUploadForm = ({ materiaId, onClose }) => {
    const [formData, setFormData] = useState({
        nombre: '',
        archivo: null
    });
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.type !== 'application/pdf') {
                console.log('solo se admiten pdfs');
                
                return;
            }
            if (file.size > 10 * 1024 * 1024) {
                console.log('tamaño maximo alcanzado');
                
                return;
            }
            setFormData(prev => ({
                ...prev,
                archivo: file
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.nombre) {
            console.log('No hay nombre');
            return;
        }

        if (!formData.archivo) {
            console.log('No hay un archivo seleccionado');
            return;
        }

        setLoading(true);

        try {
            const fileData = new FormData();
            fileData.append('archivo', formData.archivo);

            const res = savePdf({ nombre: formData.nombre, file: fileData, materiaId });
            onClose();
            
            if (res.ok) {
                setFormData({ nombre: '', archivo: null });
                toast.success('Tema creado!');
            }else{
                toast.error('Error al crear el tema');
            }
        } catch (e) {
            console.log(e);
            toast.error('Error al crear el tema');
            
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className=" modal-overlay">
            <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg">
                <div className="flex items-center gap-2 mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Subir Archivo PDF</h2>
                </div>

                <div className="space-y-4">
                    <div>
                        <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-2">
                            Nombre:
                        </label>
                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                            placeholder="Ingresa el nombre del archivo"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="archivo" className="block text-sm font-medium text-gray-700 mb-2">
                            Archivo PDF:
                        </label>
                        <div className="">
                            <input
                                type="file"
                                id="archivo"
                                name="archivo"
                                accept=".pdf"
                                onChange={handleFileChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent file:mr-4 file:py-1 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-secondary hover:file:bg-blue-100"
                                required
                            />
                        </div>
                        {formData.archivo && (
                            <p className="p-1 text-sm text-green-600">
                                Archivo seleccionado: {formData.archivo.name}
                            </p>
                        )}
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
                                Enviar Archivo
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PDFUploadForm