import { useEffect, useState } from "react";
import { Outlet, Link, Navigate, useLocation, useParams } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import NavItem from "./navItem/navItem";

const Layout = () => {
  const [asideState, setAsideState] = useState('close');
  const [active, setActive] = useState('');
  const [participants, setParticipants] = useState({});
  const [grades, setGrades] = useState({});

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
      icon: 'M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z'
    },
    {
      route: '/profile',
      label: 'Profile',
      icon: 'M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z'
    },
    participants,
    grades
  ]

  useEffect(() => {
    setParticipants({})
    setGrades({})
    
    if(location.pathname.includes('materia')){
      setParticipants({
        route: `./materia/${materiaId}/participantes`,
        label: 'Participantes',
        icon: 'M0-240v-63q0-43 44-70t116-27q13 0 25 .5t23 2.5q-14 21-21 44t-7 48v65H0Zm240 0v-65q0-32 17.5-58.5T307-410q32-20 76.5-30t96.5-10q53 0 97.5 10t76.5 30q32 20 49 46.5t17 58.5v65H240Zm540 0v-65q0-26-6.5-49T754-397q11-2 22.5-2.5t23.5-.5q72 0 116 26.5t44 70.5v63H780Zm-455-80h311q-10-20-55.5-35T480-370q-55 0-100.5 15T325-320ZM160-440q-33 0-56.5-23.5T80-520q0-34 23.5-57t56.5-23q34 0 57 23t23 57q0 33-23 56.5T160-440Zm640 0q-33 0-56.5-23.5T720-520q0-34 23.5-57t56.5-23q34 0 57 23t23 57q0 33-23 56.5T800-440Zm-320-40q-50 0-85-35t-35-85q0-51 35-85.5t85-34.5q51 0 85.5 34.5T600-600q0 50-34.5 85T480-480Zm0-80q17 0 28.5-11.5T520-600q0-17-11.5-28.5T480-640q-17 0-28.5 11.5T440-600q0 17 11.5 28.5T480-560Zm1 240Zm-1-280Z'
      })
      setGrades({
        route: `./materia/${materiaId}/grades`,
        label: 'Grades',
        icon: 'M657-121 544-234l56-56 57 57 127-127 56 56-183 183Zm-537 1v-80h360v80H120Zm0-160v-80h360v80H120Zm0-160v-80h720v80H120Zm0-160v-80h720v80H120Zm0-160v-80h720v80H120Z'
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
      <nav className="bg-white">
        <ul className="flex justify-between w-full gap-4 p-2 pr-8 items-center">
          <li>
            <Link to="/dashboard">
              <img src="http://localhost:5173/src/assets/OpcionLogo2.PNG" className="max-w-[16.5rem] h-auto" />
            </Link>
          </li>
          <li>
            <div className="flex gap-5 items-center">
              <Link to="/profile">{user?.username}</Link>
              <img src={user?.avatar} className="w-14 h-14 rounded-full object-contain border-2 border-secondary"></img>
            </div>
          </li>
        </ul>
      </nav>
      <div className="w-full bg-primary p-2.5 flex items-center pl-3.5">
        <button className="cursor-pointer" onClick={toggleAside}>
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" className="scale-150" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" /></svg>
        </button>
      </div>
      <div id="layout" className="grid font-spartan">
        <aside id="sidebar" className={`${asideState}`}>
          <ul>
            <li key={'1279874'}>
              <div id="top">
                <span>Menu</span>
                <button id="toggle-btn" onClick={toggleAside}>
                  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="m242-200 200-280-200-280h98l200 280-200 280h-98Zm238 0 200-280-200-280h98l200 280-200 280h-98Z" /></svg>
                </button>
              </div>
            </li>
            {navItems.map((item) => {
              return (
                item?.label ? <NavItem key={item.route} navData={item} active={active} /> : <div></div>
              )
            })}
          </ul>
        </aside>
        <main>
          <div className="flex justify-center p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </>
  )
};

export default Layout;