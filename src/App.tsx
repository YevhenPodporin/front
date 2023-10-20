import './App.scss';
import { ToastContainer } from "react-toastify";
import "react-toastify/scss/main.scss"

import AppRouter from "./AppRouter";

function App() {

    return (
        <>
            <ToastContainer position={"bottom-center"}/>
            <AppRouter/>
        </>
    );
}

export default App;