import { createContext, useContext, useEffect, useState } from "react";
import { Vector3 } from "three";

import { PROJECT_NAME } from "@/constants/localStorage";
import { WALL_HEIGHT, WALL_THICKNESS } from "@/constants/stageConstants";

interface StageContextType {
  wallThickness: number;
  wallHeight: number;
  cameraPosition: Vector3 | null;
  wallTextureId: string | undefined;
  floorTextureId: string | undefined;
  wallTextureDensity: number;
  floorTextureDensity: number;
  updateWallThickness: (thickness: number) => void;
  updateWallHeight: (height: number) => void;
  updateCameraPosition: (position: Vector3 | null) => void;
  updateWallTextureId: (id: string) => void;
  updateFloorTextureId: (id: string) => void;
  updateWallTextureDensity: (density: number) => void;
  updateFloorTextureDensity: (density: number) => void;
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
  const [cameraPosition, setCameraPosition] = useState<Vector3 | null>(null);

  const [wallTextureId, setWallTextureId] = useState<string | undefined>(() => {
    const savedWallTexture = localStorage.getItem(
      `${PROJECT_NAME}_active_wall-texture-id`
    );
    return savedWallTexture ? JSON.parse(savedWallTexture) : undefined;
  });
  const [floorTextureId, setFloorTextureId] = useState<string | undefined>(
    () => {
      const savedFloorTexture = localStorage.getItem(
        `${PROJECT_NAME}_active_floor-texture-id`
      );

      return savedFloorTexture ? JSON.parse(savedFloorTexture) : undefined;
    }
  );

  const [wallTextureDensity, setWallTextureDensity] = useState<number>(() => {
    const savedWallTexture = localStorage.getItem(
      `${PROJECT_NAME}_active_wall-texture-density`
    );
    return savedWallTexture ? JSON.parse(savedWallTexture) : 0.01;
  });
  const [floorTextureDensity, setFloorTextureDensity] = useState<number>(() => {
    const savedFloorTexture = localStorage.getItem(
      `${PROJECT_NAME}_active_floor-texture-density`
    );

    return savedFloorTexture ? JSON.parse(savedFloorTexture) : 0.01;
  });

  const updateWallThickness = (thickness: number) => {
    setWallThickness(thickness);
  };

  const updateWallHeight = (height: number) => {
    setWallHeight(height);
  };

  const updateCameraPosition = (position: Vector3 | null) => {
    setCameraPosition(position);
  };

  const updateWallTextureId = (id: string) => {
    setWallTextureId(id);
  };

  const updateFloorTextureId = (id: string) => {
    setFloorTextureId(id);
  };

  const updateWallTextureDensity = (density: number) => {
    setWallTextureDensity(density);
  };

  const updateFloorTextureDensity = (density: number) => {
    setFloorTextureDensity(density);
  };

  useEffect(() => {
    localStorage.setItem(
      `${PROJECT_NAME}_active_wall-thickness`,
      JSON.stringify(wallThickness)
    );
    localStorage.setItem(
      `${PROJECT_NAME}_active_wall-height`,
      JSON.stringify(wallHeight)
    );
    localStorage.setItem(
      `${PROJECT_NAME}_active_wall-texture-id`,
      JSON.stringify(wallTextureId)
    );
    localStorage.setItem(
      `${PROJECT_NAME}_active_floor-texture-id`,
      JSON.stringify(floorTextureId)
    );
    localStorage.setItem(
      `${PROJECT_NAME}_active_wall-texture-density`,
      JSON.stringify(wallTextureDensity)
    );
    localStorage.setItem(
      `${PROJECT_NAME}_active_floor-texture-density`,
      JSON.stringify(floorTextureDensity)
    );
  }, [wallThickness, wallHeight, wallTextureId, floorTextureId]);

  return (
    <StageContext.Provider
      value={{
        wallThickness,
        wallHeight,
        cameraPosition,
        wallTextureId,
        floorTextureId,
        wallTextureDensity,
        floorTextureDensity,
        updateWallHeight,
        updateWallThickness,
        updateCameraPosition,
        updateWallTextureId,
        updateFloorTextureId,
        updateWallTextureDensity,
        updateFloorTextureDensity,
      }}
    >
      {children}
    </StageContext.Provider>
  );
};
