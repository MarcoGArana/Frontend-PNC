import { Link } from "react-router-dom";

const NavItem = ({navData, active}) => {
    const {route, label, icon} = navData;
    const isActive = active == label.toLowerCase() ? "active" : "";

    return (
        <li className={isActive} key={route}>
            <Link to={`${route}`}>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d={icon} /></svg>
                <h3>{label}</h3>
            </Link>
        </li>
    )
}

export default NavItem;