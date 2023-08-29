import "./App.scss";

import { createContext } from "react";

import Router from "./routes/routes";
import ModalManager from "components/modalManager/ModalManager";
import { BrowserRouter } from "react-router-dom";
import SideMenu from "components/navigation/SideMenu";
import { QueryClient, QueryClientProvider } from "react-query";

const AppContext = createContext({});

function App() {
    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <div className="app">
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
                            <div className="main-content">
                                <Router />
                            </div>
                        </ModalManager>
                    </BrowserRouter>
                </AppContext.Provider>
            </div>
        </QueryClientProvider>
    );
}

export default App;
