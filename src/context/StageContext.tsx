import { PROJECT_NAME } from "@/constants/localStorage";
import { WALL_HEIGHT, WALL_THICKNESS } from "@/constants/stageConstants";
// import { UUID } from "@/types/uuid";
import { createContext, useContext, useEffect, useState } from "react";

interface StageContextType {
  wallThickness: number;
  wallHeight: number;
  updateWallThickness: (thickness: number) => void;
  updateWallHeight: (height: number) => void;
  // setWallMaterial: (id: UUID) => void;
}

const StageContext = createContext<StageContextType | undefined>(undefined);

export const useStage = () => {
  const context = useContext(StageContext);
  if (!context) {
    throw new Error("useStage must be used within a StageProvider");
  }
  return context;
};

export const StageProvider = ({ children }: { children: React.ReactNode }) => {
  const [wallThickness, setWallThickness] = useState<number>(() => {
    const savedWallThickness = localStorage.getItem(
      `${PROJECT_NAME}_active_wall-thickness`
    );
    return savedWallThickness ? JSON.parse(savedWallThickness) : WALL_THICKNESS;
  });
  const [wallHeight, setWallHeight] = useState<number>(() => {
    const savedWallHeight = localStorage.getItem(
      `${PROJECT_NAME}_active_wall-height`
    );
    return savedWallHeight ? JSON.parse(savedWallHeight) : WALL_HEIGHT;
  });

  const updateWallThickness = (thickness: number) => {
    setWallThickness(thickness);
  };

  const updateWallHeight = (height: number) => {
    setWallHeight(height);
  };

  // const setWallMaterial = (id: UUID) => {

  // }

  useEffect(() => {
    localStorage.setItem(
      `${PROJECT_NAME}_active_wall-thickness`,
      JSON.stringify(wallThickness)
    );
  }, [wallThickness]);

  useEffect(() => {
    localStorage.setItem(
      `${PROJECT_NAME}_active_wall-height`,
      JSON.stringify(wallHeight)
    );
  }, [wallHeight]);

  return (
    <StageContext.Provider
      value={{
        wallThickness,
        wallHeight,
        updateWallHeight,
        updateWallThickness,
        // setWallMaterial,
      }}
    >
      {children}
    </StageContext.Provider>
  );
};
