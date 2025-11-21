import { Link } from "react-router-dom";
import { HiMiniHome } from "react-icons/hi2";
import { RiAccountCircleFill } from "react-icons/ri";
import { FaUserGroup } from "react-icons/fa6";
import { CgNotes } from "react-icons/cg";

const NavItem = ({ navData, active }) => {
    const { route, label, icon } = navData;
    const isActive = active == label.toLowerCase() ? "active" : "";

    const icons = {
        home: <HiMiniHome size={35}/>,
        profile: <RiAccountCircleFill size={35}/>,
        participants: <FaUserGroup size={35}/>,
        grades: <CgNotes size={35}/>
    }

    return (
        <li className={`${isActive}`}>
            <Link to={`${route}`}>
                {icons[icon]}
                <h3>{label}</h3>
            </Link>
        </li>
    )
}

export default NavItem;