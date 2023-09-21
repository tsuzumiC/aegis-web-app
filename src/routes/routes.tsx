import { BrowserRouter, Route, Routes } from "react-router-dom";
import StartPage from "../pages/StartPage";
import FamilyTree from "pages/FamilyTree/FamilyTree";
import SideMenu from "components/navigation/SideMenu";
import AllCharactersPage from "pages/AllCharacters/AllCharactersPage";

const Router: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<StartPage />} />
            <Route path="/hlaar" element={<FamilyTree />} />
            <Route path="/all-characters" element={<AllCharactersPage />} />
            <Route path="*">"404"</Route>
        </Routes>
    );
};

export default Router;
