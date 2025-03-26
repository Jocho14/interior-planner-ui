import { lazy } from "react";

const Main = lazy(() => import("../layouts/Main"));
const LandingPage = lazy(() => import("../pages/LandingPage"));
const Scene = lazy(() => import("../scene/Scene"));
const Room = lazy(() => import("../components/sketch/Room"));

const routes = [
  {
    path: "/",
    element: <Main />,
    children: [
      { path: "", element: <LandingPage /> },
      { path: "/sketch", element: <Room /> },
      { path: "/stage", element: <Scene /> },
    ],
  },

  //   { path: "*", element: <NotFoundPage /> },
];

export default routes;
