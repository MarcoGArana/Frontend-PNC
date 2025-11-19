import { useState } from "react";
import { useAuthStore } from "../../../store/authStore";
import { changeAvatar } from "../../../services/authService";
import { toast } from "react-toastify";

const ChangeAvatarModal = ({ onClose }) => {
    const setUserInfo = useAuthStore((state) => state.setUserInfo);

    const [formData, setFormData] = useState({ avatar: "" });
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await changeAvatar({ avatar: formData.avatar });
            setUserInfo(res.data);
            toast.success("Avatar actualizado!");
            onClose();
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm sm:max-w-md border border-purple-200">

                <h2 className="text-xl sm:text-2xl font-bold text-purple-700 mb-6 text-center">
                    Cambiar foto
                </h2>

                <div className="space-y-4">
                    <div>
                        <label
                            htmlFor="avatar"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Colocar nueva foto
                        </label>

                        <input
                            type="text"
                            id="avatar"
                            name="avatar"
                            value={formData.avatar}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                            placeholder="Ingrese el enlace de la nueva foto"
                            required
                        />
                    </div>

                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={loading}
                        className="w-full cursor-pointer bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition disabled:opacity-50"
                    >
                        {loading ? "Enviando..." : "Seleccionar"}
                    </button>

                    <button
                        type="button"
                        onClick={onClose}
                        className="w-full text-gray-600 hover:text-gray-900 text-sm mt-1 cursor-pointer"
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChangeAvatarModal;
