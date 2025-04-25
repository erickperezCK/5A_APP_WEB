import React from "react";
import { AppRouter } from "./routes/Router";
import { NotificationProvider } from "./context/NotificationContext";


function App() {
    return (
        <NotificationProvider>
            <AppRouter/>
        </NotificationProvider>
    );
}

export default App;