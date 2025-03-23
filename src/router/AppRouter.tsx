import { Suspense, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
// import useScrollTop from "@/hooks/useScrollTop";
import routes from "./routes";
import UseScrollToAnchor from "@/hooks/UseScrollToAnchor";

const Loading = () => <h1></h1>;

const AppRouter = () => {
  //useScrollTop();
  UseScrollToAnchor();

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
