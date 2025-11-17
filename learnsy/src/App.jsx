import { Route, Routes } from 'react-router-dom'
import Layout from './pages/layout/layout'
import Home from './pages/home/home'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Materia from './pages/materia-content/materia';
import Exam from './pages/exam/exam';
import Landing from './pages/landing/landing';
import Login from './pages/login/login';
import { useAuthStore } from './store/authStore';
import { useEffect } from 'react';
import { getProfile } from './services/authService';
import Participantes from './pages/participants/participantes';
import Perfil from './pages/profile/perfil';
import { ToastContainer } from 'react-toastify';
import Grades from './pages/grades/grades';

//Para utilizar react useQuery
const queryClient = new QueryClient();

function App() {
  const token = useAuthStore((state) => state.token);
  const setUserInfo = useAuthStore((state) => state.setUserInfo);
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    const token = localStorage.getItem('token')

    async function getUserData(token){
      if (token){
        try {
          const user = await getProfile()
          setUserInfo(user.data)
        } catch (error) {
          logout()
        }
      }
    }

    getUserData(token)

  }, [token]);

  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='materia/:nombre/:materiaId' element={<Materia />} />
          <Route path='materia/:nombre/:materiaId/exam/:examName/:examId' element={<Exam />} />
          <Route path='materia/:materiaId/participantes' element={<Participantes />} />
          <Route path='materia/:materiaId/grades' element={<Grades />} />
        </Route>
        <Route path="/profile" element={<Layout />}>
          <Route index element={<Perfil/>}/>
        </Route>
      </Routes>
      <ToastContainer />
    </QueryClientProvider>
  )
}

export default App
