import { useState } from "react";
import { toast } from "react-toastify";

const PDFUploadForm = ({ materiaId, onClose, saveTema }) => {
    const [modalStep, setModalStep] = useState("form"); 
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

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.nombre) return console.log("No hay nombre");
        if (!formData.archivo) return console.log("No hay archivo");

        setModalStep("confirm"); 
    };

    const handleConfirmUpload = async () => {
        setLoading(true);
        try {
            const fileData = new FormData();
            fileData.append('archivo', formData.archivo);

            await saveTema({ nombre: formData.nombre, file: fileData, materiaId });

            setModalStep("success"); // Cambia a pantalla de éxito
            setFormData({ nombre: "", archivo: null });
        } catch (error) {
            console.log(error);
            toast.error("Error al subir archivo");
        } finally {
            setLoading(false);
        }
    };



    return (
    <div className="modal-overlay">
        <div className="w-full max-w-4xl mx-auto mt-8 p-8 rounded-lg" style={{ backgroundColor: "#F3F0FD" }}>

            {modalStep === "form" && (
                <>
                    <div className="flex items-center gap-2 mb-6">
                        <h2 className="text-2xl font-bold" style={{ color: "#574A80" }}>
                            Subir nuevo contenido - archivo PDF
                        </h2>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-2">
                                Nombre del contenido:
                            </label>
                            <input
                                type="text"
                                id="nombre"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                                style={{ color: "#585B56" }}
                                placeholder="Ingresa el nombre del archivo"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="archivo" className="block text-sm font-medium text-gray-700 mb-2">
                                Archivo PDF:
                            </label>
                            <input
                                type="file"
                                id="archivo"
                                name="archivo"
                                accept=".pdf"
                                onChange={handleFileChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-[#585B56] 
                                          focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent 
                                          file:mr-4 file:py-1 file:px-4 file:rounded-md file:border-0 file:text-sm 
                                          file:font-medium file:bg-[#706788] file:text-secondary 
                                          hover:file:bg-[#958cac] file:cursor-pointer"
                                required
                            />

                            {formData.archivo && (
                                <p className="p-1 text-sm text-green-600">
                                    Archivo seleccionado: {formData.archivo.name}
                                </p>
                            )}
                        </div>

                        <div className="flex gap-3 pt-2">
                            <button
                                type="button"
                                onClick={onClose}
                                className="cursor-pointer w-full py-2 px-4 rounded-md border bg-[#C65CB1] border-gray-300 text-white
                                           hover:bg-[#706788] focus:outline-none focus:ring-2 
                                           focus:ring-gray-300 focus:ring-offset-1"
                            >
                                Cancelar
                            </button>

                            <button
                                type="button"
                                onClick={handleSubmit}
                                disabled={loading}
                                className="cursor-pointer w-full flex items-center justify-center gap-2 bg-[#C65CB1] 
                                           text-white py-2 px-4 rounded-md hover:bg-[#706788] focus:outline-none 
                                           focus:ring-2 focus:ring-secondary focus:ring-offset-2 
                                           disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <>
                                        <div className="rounded-full h-4 w-4 border-b-2 border-white"></div>
                                        Enviando...
                                    </>
                                ) : (
                                    <>Subir Archivo</>
                                )}
                            </button>
                        </div>
                    </div>
                </>
            )}

            {modalStep === "confirm" && (
                <div className="text-center space-y-6 py-12">
                    <h2 className="text-2xl font-bold" style={{ color: "#574A80" }}>
                        ¿Estás seguro que deseas subir el documento?
                    </h2>

                    <div className="flex gap-3 justify-center pt-6">
                        <button
                            onClick={onClose}
                            className="cursor-pointer py-2 px-6 rounded-md bg-[#C65CB1] text-white 
                                       hover:bg-[#706788]"
                        >
                            Cancelar
                        </button>

                        <button
                            onClick={handleConfirmUpload}
                            className="cursor-pointer py-2 px-6 rounded-md bg-[#C65CB1] text-white 
                                       hover:bg-[#706788]"
                        >
                            Subir
                        </button>
                    </div>
                </div>
            )}

            {modalStep === "success" && (
                <div className="text-center space-y-6 py-12">
                    <h2 className="text-2xl font-bold text-green-600">
                        Archivo subido correctamente
                    </h2>

                    <button
                        onClick={onClose}
                        className="cursor-pointer py-2 px-6 rounded-md bg-[#C65CB1] text-white 
                                   hover:bg-[#706788]"
                    >
                        Cerrar
                    </button>
                </div>
            )}

        </div>
    </div>
);

}

export default PDFUploadForm