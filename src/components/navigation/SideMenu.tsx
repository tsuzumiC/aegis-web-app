import { Link } from "react-router-dom";
import "./SideMenu.scss";

const SideMenu: React.FC = (props) => {
    return (
        <div className="side-menu">
            <Link to="/">Start</Link>
            <Link to="/hlaar">Hlaar</Link>
        </div>
    );
};

export default SideMenu;
