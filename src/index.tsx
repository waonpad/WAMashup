import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

function Root() {
    return (
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
};

export default Root;

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<Root />);