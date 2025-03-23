import { lazy } from "react";

const Main = lazy(() => import("../layouts/Main"));
const LandingPage = lazy(() => import("../pages/LandingPage"));
const TestPage = lazy(() => import("../pages/Testpage"));
const Scene = lazy(() => import("../scene/Scene"));

const routes = [
  {
    path: "/",
    element: <Main />,
    children: [
      { path: "", element: <LandingPage /> },
      { path: "/test", element: <TestPage /> },
      { path: "/scene", element: <Scene /> },
    ],
  },

  //   { path: "*", element: <NotFoundPage /> },
];

export default routes;
