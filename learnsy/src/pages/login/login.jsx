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
        <>
            <div className='w-full h-full flex justify-center items-center flex-col text-2xl'>
                <form onSubmit={handleSubmit} className="flex flex-col items-center gap-5 max-w-sm p-8 bg-white rounded-3xl shadow-xl shadow-black">
                    <label className='text-secondary w-full text-center block font-medium text-3xl'>Iniciar sesion</label>
                    <input
                        type="name"
                        value={nameOrEmail}
                        onChange={(e) => setNameOrEmail(e.target.value)}
                        placeholder="Nombre"
                        className="font-normal w-full p-2 rounded bg-gray-200 focus:border-secondary focus:outline-none"
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Contraseña"
                        className="font-normal w-full p-2 rounded bg-gray-200 focus:outline-none"
                    />
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="bg-blue-600 text-white font-medium px-4 py-2 rounded-3xl hover:bg-blue-700"
                    >
                        {isLoading ? 'Ingresando...' : 'Ingresar'}
                    </button>
                </form>
            </div>
        </>
    )
}

export default Login