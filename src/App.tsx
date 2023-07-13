import "./App.scss";

import { createContext } from "react";

import Router from "./routes/routes";
import ModalManager from "components/modalManager/ModalManager";
import { BrowserRouter } from "react-router-dom";
import SideMenu from "components/navigation/SideMenu";

const AppContext = createContext({});

function App() {
    return (
        <div className="main">
            <AppContext.Provider value={{}}>
                <BrowserRouter
                    basename={
                        process.env.NODE_ENV === "development"
                            ? undefined
                            : "/aegis-web-app"
                    }
                >
                    <ModalManager>
                        <SideMenu />
                        <Router />
                    </ModalManager>
                </BrowserRouter>
            </AppContext.Provider>
        </div>
    );
}

export default App;
