import { lazy } from "react";

const Main = lazy(() => import("../layouts/Main"));
const LandingPage = lazy(() => import("../pages/LandingPage"));
const Scene = lazy(() => import("../components/stage/Scene"));
const Sketch = lazy(() => import("../components/sketch/Sketch"));

const routes = [
  {
    path: "/",
    element: <Main />,
    children: [
      { path: "", element: <LandingPage /> },
      { path: "/sketch", element: <Sketch /> },
      { path: "/stage", element: <Scene /> },
    ],
  },

  //   { path: "*", element: <NotFoundPage /> },
];

export default routes;
