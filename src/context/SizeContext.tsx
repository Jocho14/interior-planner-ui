import { createContext, useContext, useEffect, useRef, useState } from "react";

interface SizeContextType {
  width: number;
  height: number;
  setSize: (width: number, height: number) => void;
}

const SizeContext = createContext<SizeContextType | undefined>(undefined);

export const useSize = () => {
  const context = useContext(SizeContext);
  if (!context) {
    throw new Error("useSize must be used within a SizeProvider");
  }
  return context;
};

export const SizeProvider = ({ children }: { children: React.ReactNode }) => {
  const [size, setSize] = useState({ width: 0, height: 0 });

  const updateSize = (width: number, height: number) => {
    setSize({ width, height });
  };

  return (
    <SizeContext.Provider value={{ ...size, setSize: updateSize }}>
      {children}
    </SizeContext.Provider>
  );
};
