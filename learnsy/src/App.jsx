import { Route, Routes } from 'react-router-dom'
import Layout from './components/layout/layout'
import Home from './components/home/home'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Materia from './components/materia-content/materia';
import Exam from './components/exam/exam';
import Landing from './components/landing/landing';
import Login from './components/login/login';
import { useAuthStore } from './store/authStore';
import { useEffect } from 'react';
import { getProfile } from './services/authService';
import Participantes from './components/participants/participantes';
import Perfil from './components/profile/perfil';
import { ToastContainer } from 'react-toastify';
import Grades from './components/grades/grades';

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
