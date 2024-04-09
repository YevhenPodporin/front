import { Navigate, Route, Routes } from "react-router-dom";
import { privateRoutes, publicRoutes } from "./routes";

import PrivateRoute from "./providers/PrivateRouteComponent";

function AppRouter() {
  return (
    <Routes>
      {privateRoutes.map(({ path, Component, title }, index) => {
        return (
          <Route
            key={index}
            path={path}
            element={
              path === "*" ? (
                <Component />
              ) : (
                <PrivateRoute element={<Component />} />
              )
            }
            index={true}
          />
        );
      })}

      {publicRoutes.map(({ path, Component }, index) => {
        return (
          <Route key={index} path={path} element={<Component />} index={true} />
        );
      })}
      <Route path="*" element={<Navigate to={"/login"} />} index={false} />
    </Routes>
  );
}

export default AppRouter;
