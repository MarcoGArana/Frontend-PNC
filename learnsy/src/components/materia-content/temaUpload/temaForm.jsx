import { useState } from "react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const PDFUploadForm = ({ materiaId, onClose, saveTema }) => {
    const [formData, setFormData] = useState({
        nombre: "",
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

        if (!file) return;

        if (file.type !== "application/pdf") {
            Swal.fire({
                icon: "error",
                title: "Archivo inválido",
                text: "Solo se permiten archivos PDF.",
            });
            return;
        }

        if (file.size > 10 * 1024 * 1024) {
            Swal.fire({
                icon: "error",
                title: "Archivo demasiado grande",
                text: "El tamaño máximo permitido es de 10MB.",
            });
            return;
        }

        setFormData(prev => ({
            ...prev,
            archivo: file
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.nombre) {
            return Swal.fire({
                icon: "error",
                title: "Nombre requerido",
                text: "Debe ingresar un nombre para el archivo.",
            });
        }

        if (!formData.archivo) {
            return Swal.fire({
                icon: "error",
                title: "Archivo requerido",
                text: "Debe seleccionar un archivo PDF.",
            });
        }

        const result = await Swal.fire({
            title: "¿Seguro que quieres subir este documento?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Subir",
            cancelButtonText: "Cancelar",
            confirmButtonColor: "#C65CB1",
            cancelButtonColor: "#C65CB1",
            reverseButtons: true
        });

        if (!result.isConfirmed) return;

        handleConfirmUpload();

    };

    const handleConfirmUpload = async () => {
        setLoading(true);

        try {
            const fileData = new FormData();
            fileData.append("archivo", formData.archivo);

            await saveTema({
                nombre: formData.nombre,
                file: fileData,
                materiaId
            });

            await Swal.fire({
                icon: "success",
                title: "Archivo subido correctamente",
                text: "Tu archivo ha sido subido correctamente.",
                timer: 1800,
                showConfirmButton: false
            });

            setFormData({ nombre: "", archivo: null });
            onClose();
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: "error",
                title: "Error al subir archivo",
                text: "Ocurrió un problema. Intenta nuevamente.",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-overlay">
            <div
                className="w-full max-w-4xl mx-auto mt-8 p-20 rounded-lg"
                style={{ backgroundColor: "#F3F0FD" }}
            >
                <div className="flex items-center justify-center gap-2 mb-6">
                    <h2 className="text-2xl font-bold title" style={{ color: "#574A80" }}>
                        Subir nuevo contenido - archivo PDF
                    </h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label
                            htmlFor="nombre"
                            className="block body text-sm font-semibold mb-2"
                        >
                            Nombre del contenido:
                        </label>

                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent title-font font-light
                                     text-[var(--color-border-shadow)] placeholder:text-gray-400"
                            style={{ color: "#585B56" }}
                            placeholder="Ingresa el nombre del archivo"
                            required
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="archivo"
                            className="block body text-sm font-semibold mb-2"
                        >
                            Archivo PDF:
                        </label>

                        <input
                            type="file"
                            id="archivo"
                            name="archivo"
                            accept=".pdf"
                            onChange={handleFileChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md title-font font-light
                                     text-[var(--color-border-shadow)] placeholder:text-gray-400 
                                       focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent 
                                       file:mr-4 file:py-1 file:px-4 file:rounded-md file:border-0
                                       file:text-sm file:font-medium file:bg-[#706788] file:text-secondary
                                       hover:file:bg-[#958cac] file:cursor-pointer"
                        />

                        {formData.archivo && (
                            <p className="p-1 text-sm body-font text-[var(--color-titles-purple)]">
                                Archivo seleccionado: {formData.archivo.name}
                            </p>
                        )}
                    </div>

                    <div className="flex gap-20 pt-2 justify-center">
                        <button
                            type="button"
                            onClick={onClose}
                            className="cursor-pointer w-60 py-2 px-8 rounded-md btn-secondary"
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="cursor-pointer w-60 flex items-center justify-center gap-2 
                                       py-2 px-8 rounded-md btn-primary
                                       disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <>
                                    <div className="rounded-full h-4 w-4 border-b-2 border-white animate-spin"></div>
                                    Subiendo...
                                </>
                            ) : (
                                <>Subir Archivo</>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PDFUploadForm;
