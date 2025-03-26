import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import useScrollToAnchor from "@/hooks/useScrollToAnchor";
import routes from "./routes";

const Loading = () => <h1></h1>;

const AppRouter = () => {
  useScrollToAnchor();

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {routes.map((route, index) => {
          return (
            <Route key={index} path={route.path} element={route.element}>
              {route.children?.map((childRoute, childIndex) => {
                return (
                  <Route
                    key={childIndex}
                    path={childRoute.path}
                    element={childRoute.element}
                  />
                );
              })}
            </Route>
          );
        })}
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
