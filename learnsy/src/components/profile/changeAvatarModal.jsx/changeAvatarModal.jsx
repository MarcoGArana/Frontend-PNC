import { useState } from "react";
import { useAuthStore } from "../../../store/authStore";
import { changeAvatar } from "../../../services/authService";
import { toast } from "react-toastify";
import Swal from "sweetalert2";


const ChangeAvatarModal = ({ onClose }) => {
    const setUserInfo = useAuthStore((state) => state.setUserInfo);

    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            return Swal.fire({
                icon: "warning",
                title: "Selecciona una imagen",
                text: "Debes elegir un archivo antes de continuar.",
            });
        }


        setLoading(true);

        try {
            const res = await changeAvatar(file);
            setUserInfo(res.data);
            Swal.fire({
                icon: "success",
                title: "Materia eliminada",
                text: "Materia eliminada correctamente.",
                timer: 1200,
                showConfirmButton: false,
            });
            onClose();
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/30 flex justify-center items-center p-4 z-50">
            <div className="bg-[#F3F0FD] rounded-lg shadow-2xl p-8 w-full max-w-md border border-[#F3F0FD] space-y-12">

                <h2 className="text-2xl font-bold title mb-6 text-center">
                    Cambiar foto
                </h2>

                <div>
                    <label
                        htmlFor="avatar"
                        className="block body text-sm font-semibold mb-2"
                    >
                        Selecciona una nueva imagen
                    </label>
                    <label
                        htmlFor="avatar"
                        className="flex items-center gap-4 w-full border border-gray-300 rounded-md px-4 py-3 cursor-pointer"
                    >
                        <span className="btn-secondary px-4 py-2 rounded-md text-base">
                            Seleccionar archivo
                        </span>

                        <span className="title-font font-light text-[var(--color-border-shadow)] text-base">
                            {file ? file.name : "Ningún archivo seleccionado"}
                        </span>
                    </label>

                    <input
                        id="avatar"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                    />
                </div>

                <div className="flex flex-row ">
                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={loading}
                        className="w-32 mx-auto py-2 rounded-md btn-primary transition disabled:opacity-50 text-base"
                    >
                        {loading ? "Subiendo..." : "Guardar"}
                    </button>

                    <button
                        type="button"
                        onClick={onClose}
                        className="w-32 mx-auto py-2 rounded-md btn-secondary transition text-base"
                    >
                        Cancelar
                    </button>



                </div>
            </div>
        </div>

    );
};


export default ChangeAvatarModal;
