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
        if (!file) return toast.error("Selecciona una imagen");

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
            <div className="bg-[#E8E3F0] rounded-3xl shadow-2xl p-12 w-full max-w-2xl space-y-8">

                <h2 className="text-4xl title font-normal text-[#5B5478] text-center mb-6">
                    Cambiar foto
                </h2>

                <div className="space-y-3">
                    <label className="block text-base body font-normal text-gray-800">
                        Coloca el enlace de tu foto:
                    </label>
                    
                    <label
                        htmlFor="avatar"
                        className="flex items-center gap-0 w-full border border-gray-400 bg-white px-0 py-0 rounded-lg cursor-pointer hover:border-purple-400 transition overflow-hidden"
                    >
                        <span className="bg-[#6B6482] text-white px-6 py-3 text-base font-normal">
                            Seleccionar archivo
                        </span>

                        <span className="text-gray-500 text-base px-4 flex-1">
                            {file ? file.name : "Ningun archivo seleccionado"}
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

                <div className="flex justify-center pt-4">
                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={loading}
                        className="px-12 py-3.5 rounded-xl bg-[#C357B3] text-white hover:bg-[#b03d9f] transition disabled:opacity-50 text-base font-normal uppercase tracking-wider shadow-md"
                    >
                        {loading ? "Subiendo..." : "Seleccionar"}
                    </button>
                </div>
            </div>
        </div>
    );
};


export default ChangeAvatarModal;
