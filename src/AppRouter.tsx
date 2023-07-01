import React from 'react';
import {Route, Routes} from "react-router-dom";
import {privateRoutes, publicRoutes} from "./routes";
import NotFoundPage from "./pages/_404";
import Login from "./pages/Login";

type AppRouterPropsType = {
    isAuth: boolean
}
function AppRouter({isAuth}: AppRouterPropsType) {

    return isAuth ?
        (
            <Routes>
                {privateRoutes.map(({path, Component, title}, index) => {
                    return (
                        <Route
                            key={index}
                            path={path}
                            Component={Component}
                            index={true}
                        />
                    )
                })}
                <Route path="*" Component={NotFoundPage} index={true}/>
            </Routes>
        )
        :
        (
            <Routes>
                {publicRoutes.map(({path, Component}, index) => {
                    return (
                        <Route key={index} path={path} Component={Component} index={true}/>
                    )
                })}
                <Route path="*" Component={Login} index={true}/>
            </Routes>
        )
}

export default AppRouter;