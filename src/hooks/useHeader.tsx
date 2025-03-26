import { useLocation } from "react-router";

import DefaultHeader from "@/layouts/headers/DefaultHeader";
import SketchHeader from "@/layouts/headers/SketchHeader";
import StageHeader from "@/layouts/headers/StageHeader";

export const useHeader = () => {
  const { pathname } = useLocation();

  switch (pathname) {
    case "/sketch":
      return <SketchHeader />;
    case "/stage":
      return <StageHeader />;
    default:
      return <DefaultHeader />;
  }
};
