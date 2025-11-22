import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { login } from '../../services/authService';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const setAuth = useAuthStore((state) => state.setAuth)
    const queryClient = useQueryClient()

    const { mutate: logAction, isLoading } = useMutation({
        mutationFn: ({ nameOrEmail, password }) =>
            login(nameOrEmail, password),
        onSuccess: ({ accessToken }) => {
            setAuth(accessToken)
            queryClient.invalidateQueries(['profile'])
            navigate('/dashboard');
        },
        onError: (err) => {
            console.error('Error al iniciar sesión:', err.response?.data || err)
        },
    })

    const [nameOrEmail, setNameOrEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        logAction({ nameOrEmail, password })
    };

    return (
        <div className="min-h-screen w-full flex justify-center items-center bg-[#F5F5F5] px-4">

            {/* TARJETA PRINCIPAL */}
            <div className="bg-white w-full max-w-xl rounded-[30px] p-12 shadow-xl border border-gray-200 relative">

                {/* IMAGEN DECORATIVA (NUEVOS CÍRCULOS) */}
                <img
                    src="/src/assets/circulos.png"
                    alt="Learnsy"
                    className="w-45 absolute top-0 left-1/2 -translate-x-1/2"
                />

                {/* TÍTULO */}
                <h1 className="text-center text-3xl font-bold text-[#4B2FA9] mt-32">
                    ¡HOLA DE NUEVO!
                </h1>

                <p className="text-center text-gray-500 text-sm mb-10">
                    Ingresa tus datos para empezar
                </p>

                {/* FORMULARIO */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">

                    <div className="flex flex-col w-full">
                        <label className="text-sm font-semibold text-gray-700 mb-1">Nombre</label>
                        <input
                            type="text"
                            value={nameOrEmail}
                            onChange={(e) => setNameOrEmail(e.target.value)}
                            placeholder="correo@correo.com"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#585B56B2] placeholder-[#585B56B2] text-[#585B56B2]"
                        />
                    </div>

                    <div className="flex flex-col w-full">
                        <label className="text-sm font-semibold text-gray-700 mb-1">Contraseña</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="**************"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#585B56B2] placeholder-[#585B56B2] text-[#585B56B2]"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="bg-[#C65BCF] text-white font-semibold py-2 rounded-lg mt-4 hover:bg-[#b152c0] transition w-1/2 mx-auto"
                    >
                        {isLoading ? 'Ingresando...' : 'INICIAR SESIÓN'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
