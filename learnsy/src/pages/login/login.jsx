import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { login } from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
    const navigate = useNavigate();
    const setAuth = useAuthStore((state) => state.setAuth)
    const queryClient = useQueryClient()

    const { mutate: logAction, isLoading } = useMutation({
        mutationFn: ({ nameOrEmail, password }) =>
            login(nameOrEmail, password),
        onSuccess: ({ accessToken }) => {
            Swal.fire({
                icon: 'success',
                title: '¡Inicio de sesión exitoso!',
                text: 'Bienvenido de nuevo',
                timer: 700,
                showConfirmButton: false
            });

            setAuth(accessToken)
            queryClient.invalidateQueries(['profile'])
            navigate('/dashboard');
        },

        onError: (err) => {
            console.error('Error al iniciar sesión:', err.response?.data || err)

            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Inicio de sesión fallido, intenta nuevamente',
            });
        },

    })

    const [nameOrEmail, setNameOrEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false);


    const handleSubmit = (e) => {
        e.preventDefault()
        logAction({ nameOrEmail, password })
    };

    return (
        <div className="min-h-screen w-full flex justify-center items-center bg-white px-4">

            {/* Tarjeta principal - contenedor del login */}
            <div className="bg-white w-full max-w-xl rounded-2xl p-12 shadow-xl border border-gray-300 relative">

                {/* Logo */}
                <img
                    src="/src/assets/circulos.png"
                    alt="Learnsy"
                    className="w-28 absolute top-6 left-1/2 -translate-x-1/2"
                />

                {/* Titulo */}
                <h1 className="text-center text-3xl title font-normal mt-28 mb-2">
                    ¡HOLA DE NUEVO!
                </h1>

                <p className="text-center body-font font-medium text-sm text-[var(--color-dark-purple)] mb-10">
                    Ingresa tus datos para empezar
                </p>

                {/* Formulario */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">

                    <div className="flex flex-col w-full">
                        <label className="text-sm font-semibold body text-medium mb-1">Usuario o correo</label>
                        <input
                            type="text"
                            value={nameOrEmail}
                            onChange={(e) => setNameOrEmail(e.target.value)}
                            placeholder="correo@correo.com"
                            className="w-full title-font font-light text-[var(--color-border-shadow)] placeholder:text-gray-400 border 
                                    border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#C65BCF]"
                        />
                    </div>

                    <div className="flex flex-col w-full relative">
                        <label className="text-sm font-semibold body text-medium mb-1">Contraseña</label>

                        <div className="relative w-full">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="**************"
                                className="w-full title-font font-light text-[var(--color-border-shadow)] placeholder:text-gray-400 border 
                                        border-gray-300 rounded-md px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-purple-400"
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showPassword ? <FaEye size={18} className="text-gray-500" /> : <FaEyeSlash size={18} className="text-gray-500" />}
                            </button>
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="btn-primary py-2.5 rounded-lg mt-4 transition w-50"
                        >
                            {isLoading ? 'Ingresando...' : 'INICIAR SESION'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
