import { BrowserRouter, Route, Routes } from "react-router-dom";
import StartPage from "../pages/StartPage";
import HlaarFamilyTree from "pages/HlaarFamily/HlaarFamilyTree";
import SideMenu from "components/navigation/SideMenu";
import AllCharactersPage from "pages/AllCharacters/AllCharactersPage";
import HlaarFamilyTimeline from "pages/HlaarFamily/HlaarFamilyTimeline";

const Router: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<StartPage />} />
            <Route path="/hlaar-tree" element={<HlaarFamilyTree />} />
            <Route path="/hlaar-timeline" element={<HlaarFamilyTimeline />} />
            <Route path="/all-characters" element={<AllCharactersPage />} />
            <Route path="*">"404"</Route>
        </Routes>
    );
};

export default Router;
