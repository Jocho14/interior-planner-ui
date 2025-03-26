import { useLocation } from "react-router";

import DefaultHeader from "@/layouts/headers/DefaultHeader";
import SketchHeader from "@/layouts/headers/SketchHeader";

export const useHeader = () => {
  const { pathname } = useLocation();

  switch (pathname) {
    case "/sketch":
      return <SketchHeader />;
    case "/stage":
      return <DefaultHeader />;
    default:
      return <DefaultHeader />;
  }
};
