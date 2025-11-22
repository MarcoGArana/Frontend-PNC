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
    <div className="bg-[#F3E9F9] rounded-xl shadow-2xl p-8 w-full max-w-md border border-purple-300 space-y-12">

        <h2 className="text-2xl font-semibold text-purple-700 mb-6 text-center">
            Cambiar foto
        </h2>

            <div>
            <label
                htmlFor="avatar"
                className="block text-sm font-medium text-gray-700 mb-2"
            >
                Selecciona una nueva imagen
            </label>
<label
        htmlFor="avatar"
        className="flex items-center gap-4 w-full border border-purple-300 bg-purple-50 px-4 py-3 rounded-xl cursor-pointer"
    >
        <span className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm">
            Seleccionar archivo
        </span>

        <span className="text-gray-600 text-sm">
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

<div className= "flex flex-row ">
           <button
    type="button"
    onClick={handleSubmit}
    disabled={loading}
    className="w-32 mx-auto py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition disabled:opacity-50 text-sm"
>
    {loading ? "Subiendo..." : "Guardar"}
</button>

<button
    type="button"
    onClick={onClose}
    className="w-32 mx-auto py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition text-sm"
>
    Cancelar
</button>



            </div>
        </div>
    </div>

    );
};


export default ChangeAvatarModal;
