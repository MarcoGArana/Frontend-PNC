import { useAuthStore } from "../../store/authStore";

const UserInfo = ({ data, openModal }) => {
    const { username, correo, avatar } = data;
    const logout = useAuthStore((state) => state.logout);

    return (
        <div className="w-full flex justify-center px-4 py-12">

            {/* TARJETA ÚNICA - IGUAL AL DISEÑO */}
            <div className="
    w-full max-w-8xl 
    bg-white 
    rounded-3xl 
    border border-gray-300 
    shadow-[0_8px_35px_rgba(0,0,0,0.12)]
    py-1 sm:py-2
    px-3 sm:px-4
">



                {/* Título */}
                <h2 className="text-center text-2xl sm:text-3xl font-bold text-[#3C2062] mb-10">
                    MI PERFIL
                </h2>

                {/* Contenido */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start justify-center gap-70 w-full">

                    {/* Avatar + Botón */}
                    <div className="flex flex-col items-center gap-6">
                        <img
                            src={avatar}
                            className="h-48 w-48 sm:h-56 sm:w-56 object-cover rounded-full border-4 border-[#D9D9D9]"
                        />

                        <button
                            onClick={openModal}
                            className="px-8 py-3 bg-[#C661C6] text-white font-semibold rounded-lg hover:opacity-90 transition"
                        >
                            CAMBIAR FOTO
                        </button>
                    </div>

                    {/* Información */}
                    <div className="flex flex-col gap-6 text-center sm:text-left mt-4 sm:mt-10">

                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-4 sm:mb-6">
                            <span className="font-semibold text-gray-800">Usuario:</span>
                            <span className="text-[#C661C6] font-medium">{username}</span>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                            <span className="font-semibold text-gray-800">Correo electrónico:</span>
                            <span className="text-[#C661C6] font-medium break-all">{correo}</span>
                        </div>



                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserInfo;
