import { useEffect, useRef } from "react";
import { Outlet } from "react-router";

import { Toaster } from "@/components/ui/sonner";

import { useSize } from "@/context/SizeContext";
import { useHeader } from "@/hooks/useHeader";
import Footer from "./Footer";

const Main: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const { setSize } = useSize();

  useEffect(() => {
    const updateSize = () => {
      if (ref.current) {
        setSize(ref.current.offsetWidth, ref.current.offsetHeight);
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);

    return () => {
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  const header = useHeader();

  return (
    <>
      {header}
      <main className="min-h-screen" ref={ref}>
        <Outlet />
        <Toaster />
      </main>
      <Footer />
    </>
  );
};

export default Main;
