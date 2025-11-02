import { useState } from "react";
import { useAuthStore } from "../../../store/authStore";
import { changeAvatar } from "../../../services/authService";

const ChangeAvatarModal = ({onClose}) => {
    const setUserInfo = useAuthStore((state) => state.setUserInfo);

    const [formData, setFormData] = useState({
        avatar: ''
    });
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        try {
            const res = await changeAvatar({ avatar: formData.avatar });
            console.log(res);
            
            setUserInfo(res.data);
            onClose();
            toast.success('Avatar actualizado!');
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
                    <h2 className="text-2xl font-bold text-gray-800">Cambiar avatar: </h2>
                </div>

                <div className="space-y-4">
                    <div>
                        <label htmlFor="avatar" className="block text-sm font-medium text-gray-700 mb-2">
                            Avatar:
                        </label>
                        <input
                            type="text"
                            id="avatar"
                            name="avatar"
                            value={formData.avatar}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                            placeholder="Avatar"
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
                                Modificar
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ChangeAvatarModal;