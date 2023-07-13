import { BrowserRouter, Route, Routes } from "react-router-dom";
import StartPage from "../pages/StartPage";
import HlaarPage from "pages/HlaarPage";
import SideMenu from "components/navigation/SideMenu";

const Router: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<StartPage />} />
            <Route path="/hlaar" element={<HlaarPage />} />
            <Route path="*">"404"</Route>
        </Routes>
    );
};

export default Router;
