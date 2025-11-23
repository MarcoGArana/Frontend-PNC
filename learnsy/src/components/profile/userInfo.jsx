import { useAuthStore } from "../../store/authStore";

const UserInfo = ({ data, openModal }) => {
    const { username, correo, avatar } = data;
    const logout = useAuthStore((state) => state.logout);

    return (
        <div className="w-full flex justify-center px-4 py-0 mb-20">

            {/* Tarjeta contenedora */}
            <div className="
                            w-full max-w-8xl 
                          bg-white 
                            rounded-2xl shadow-xl
                            border border-gray-200 
                            pt-2 pb-10 sm:pb-12
                            px-3 sm:px-4
                            ">

                {/* Titulo */}
                <h2 className="text-center text-4xl sm:text-3xl font-medium title mt-6 mb-8">
                    MI PERFIL
                </h2>

                {/* Contenido */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start w-full">

                    {/* Avatar/boton */}
                    <div className="flex flex-col items-center gap-6 sm:ml-40">
                        <img
                            src={avatar}
                            className="h-48 w-48 sm:h-56 sm:w-56 object-cover rounded-full border-[3px] border-[var(--color-titles-purple)]"
                        />

                        <button
                            onClick={openModal}
                            className="px-8 py-3 btn-primary rounded-md transition"
                        >
                            CAMBIAR FOTO
                        </button>
                    </div>

                    {/* Informacion del usuario */}
                    <div className="flex flex-col gap-6 text-center sm:text-left mt-10 sm:mt-20 space-y-30 sm:ml-40">

                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-4 sm:mb-6 space-x-40 sm:text-left">
                            <span className="font-semibold text-base body">Usuario:</span>
                            <span className="body text-base font-medium">{username}</span>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 space-x-20 ">
                            <span className="font-semibold text-base body">Correo electrónico:</span>
                            <span className="body text-base font-medium break-all">{correo}</span>
                        </div>



                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserInfo;
