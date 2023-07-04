import "./App.scss";

import { createContext } from "react";

import Router from "./routes/routes";

import SideMenu from "./components/navigation/SideMenu";

const AppContext = createContext({});

function App() {
    return (
        <div className="main">
            <AppContext.Provider value={{}}>
                <SideMenu />
                <Router />
            </AppContext.Provider>
        </div>
    );
}

export default App;
