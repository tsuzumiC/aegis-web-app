import { Link } from "react-router-dom";
import "./SideMenu.scss";

const SideMenu: React.FC = (props) => {
    return (
        <div className="side-menu">
            <Link to="/">Start</Link>
            <Link to="/hlaar-tree">Hlaar Tree</Link>
            <Link to="/hlaar-timeline">Hlaar Timeline</Link>
            <Link to="/all-characters">All Characters</Link>
        </div>
    );
};

export default SideMenu;
