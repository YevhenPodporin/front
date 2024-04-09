import "./App.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/scss/main.scss";

import AppRouter from "./AppRouter";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  return (
    <GoogleOAuthProvider
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || ""}
    >
      <ToastContainer position={"bottom-center"} />
      <AppRouter />
    </GoogleOAuthProvider>
  );
}

export default App;
