import { Link } from "react-router-dom";
import "./SideMenu.scss";

const SideMenu: React.FC = (props) => {
    return (
        <div className="side-menu">
            <Link to="/">Start</Link>
            <Link to="/hlaar">Hlaar</Link>
            <Link to="/all-characters">All Characters</Link>
        </div>
    );
};

export default SideMenu;
