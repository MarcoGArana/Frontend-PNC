import { useEffect, useState } from "react";
import { Outlet, Link, Navigate, useLocation, useParams } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import NavItem from "../../components/layout/navItem/navItem";
import { BiLogOutCircle } from "react-icons/bi";

const Layout = () => {
  const [asideState, setAsideState] = useState('close');
  const [active, setActive] = useState('');
  const [participants, setParticipants] = useState({});
  const [grades, setGrades] = useState({});
  const logout = useAuthStore((state) => state.logout);

  const location = useLocation();
  const { materiaId } = useParams();

  const toggleAside = () => {
    asideState == 'close' ? setAsideState('open') : setAsideState('close');
  }

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);

  const navItems = [
    {
      route: '/dashboard',
      label: 'Dashboard',
      icon: 'home'
    },
    {
      route: '/profile',
      label: 'Profile',
      icon: 'profile'
    },
    participants,
    grades
  ]

  useEffect(() => {
    setParticipants({})
    setGrades({})

    if (location.pathname.includes('materia')) {
      setParticipants({
        route: `./materia/${materiaId}/participantes`,
        label: 'Participantes',
        icon: 'participants'
      })
      setGrades({
        route: `./materia/${materiaId}/grades`,
        label: 'Grades',
        icon: 'grades'
      })
    }
    if (location.pathname.includes('participantes')) {
      setActive('participantes')
    } else if (location.pathname.includes('grades')) {
      setActive('grades')
    } else if (location.pathname.includes('materia')) {
      setActive('dashboard')
    } else if (location.pathname.includes('profile')) {
      setActive('profile')
    } else if (location.pathname.includes('dashboard')) {
      setActive('dashboard')
    }

  }, [location]);

  return !isAuthenticated ? <Navigate to={"/"} /> : (
    <>
      <nav className="bg-white w-full">
      <ul className="flex flex-wrap justify-between w-full gap-4 p-4 items-center">

          <li className="flex gap-3.5 pl-4">
            <button className="cursor-pointer" onClick={toggleAside}>
              <svg id="menu" xmlns="http://www.w3.org/2000/svg" height="24px" className="scale-150" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" /></svg>
            </button>
            <Link to="/dashboard">
              <img src="http://localhost:5173/src/assets/OpcionLogo2.PNG" className="max-w-[16.5rem] h-auto" />
            </Link>
          </li>
          <li>
            <div className="flex gap-4 items-center">
              <Link to="/profile" className="max-[480px]:hidden">{user?.username}</Link>
              <img src={user?.avatar} className="w-14 h-14 rounded-full object-contain border-2 border-secondary  max-[480px]:hidden"></img>
            </div>
          </li>
        </ul>
      </nav>
      <div id="layout" className="grid min-h-screen grid-cols-[auto_1fr] font-montserrat">
        <aside id="sidebar" className={`${asideState}`}>
          <ul>
            <li>
              <div id="top">
                <span className="font-bold">Menu</span>
                <button id="toggle-btn" onClick={toggleAside}>
                  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="m242-200 200-280-200-280h98l200 280-200 280h-98Zm238 0 200-280-200-280h98l200 280-200 280h-98Z" /></svg>
                </button>
              </div>
            </li>
            {navItems.map((item) => {
              if (!item?.label) return null;

              return (
                <NavItem
                  key={item.route || index}
                  navData={item}
                  active={active}
                />
              );
            })}

            <li className="mt-auto flex items-center gap-2 cursor-pointer pb-5" onClick={logout}>
              <BiLogOutCircle size={70}/>
              <h3>Cerrar sesión</h3>
            </li>
          </ul>
        </aside>
        <main className="flex flex-col min-h-screen">
          <div className="flex-1 flex justify-center p-8">
            <Outlet />
          </div>

         <footer className="w-full bg-dark-purple text-white flex flex-col items-center justify-center gap-1 py-6 px-4 text-center">
            <h3 className="text-xl">Learnsy</h3>
            <p>learnsy@gmail.com</p>
          </footer>
        </main>
      </div>
    </>
  )
};

export default Layout;