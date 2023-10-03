import { Route, Routes } from "react-router-dom";
import { privateRoutes, publicRoutes } from "./routes";
import NotFoundPage from "./pages/_404";
import Login from "./pages/Login";
import PrivateRoute from './providers/PrivateRouteComponent';

function AppRouter() {
    return <Routes>
        {privateRoutes.map(({path, Component, title}, index) => {
            return (
                <Route
                    key={index}
                    path={path}
                    element={<PrivateRoute element={<Component/>}/>}
                    index={true}
                />
            )
        })}

        {publicRoutes.map(({path, Component}, index) => {
            return (
                <Route key={index} path={path} element={<Component/>} index={true}/>
            )
        })}
        <Route path="*" element={<Login/>} index={false}/>
        <Route path="*" element={<NotFoundPage/>} index={false}/>

    </Routes>
}

export default AppRouter;