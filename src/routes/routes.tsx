import { BrowserRouter, Route, Routes } from "react-router-dom";
import StartPage from "../pages/StartPage";
import HlaarPage from "pages/HlaarPage";

const Router: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<StartPage />} />
                <Route path="/hlaar" element={<HlaarPage />} />
                <Route path="*">"404"</Route>
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
