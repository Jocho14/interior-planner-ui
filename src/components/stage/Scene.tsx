import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Loader, OrbitControls } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import * as THREE from "three";

import { useStage } from "@/context/StageContext";
import { convertLineToWall } from "@/utils/converter";
import { useQuery } from "@tanstack/react-query";

import Wall, { WallRef } from "./Wall";
import Floor from "./Floor";
import SideBar from "./sidebar/SideBar";
import SmoothCamera from "./SmoothCamera";
import Model from "./Model";
import { FurnitureDto } from "@/dto/furniture.dto";
import { getFurnitureModels } from "@/api/furniture.api";
import { extractModelId } from "@/utils/strings";
import { UUID } from "@/types/uuid";
import { WallTransparencyController } from "./WallTransparencyController";
import { useSketch } from "@/context/SketchContext";
import ModelActions from "./ModelActions";

const Scene: React.FC = () => {
  const { walls } = useSketch();
  const { cameraPosition, updateCameraPosition, models } = useStage();

  const [isDragging, setIsDragging] = useState(false);
  const [draggingModelId, setDraggingModelId] = useState<UUID | null>(null);
  const [selectedModelId, setSelectedModelId] = useState<UUID | null>(null);
  const [rotationValue, setRotationValue] = useState(0);
  const prevSelected = useRef<UUID | null>(null);

  // Initialize slider once upon selection change
  useEffect(() => {
    if (selectedModelId && prevSelected.current !== selectedModelId) {
      prevSelected.current = selectedModelId;
      const m = models.find((m) => m.id === selectedModelId);
      if (m) {
        const deg = (m.rotation?.y ?? 0) * (180 / Math.PI);
        setRotationValue(deg);
      }
    }
  }, [selectedModelId, models]);

  const { updateModel, deleteModel } = useStage();

  const orbitRef = useRef<any>(null);

  const wallRefs = useMemo(
    () => walls.map(() => React.createRef<WallRef>()),
    [walls.length]
  );

  const { data: modelsData, refetch: refetchModelsData } = useQuery<
    FurnitureDto[]
  >({
    queryKey: ["active-models", models.map((m) => m.id)],
    queryFn: () => getFurnitureModels(models.map((m) => extractModelId(m.id))),
  });

  useEffect(() => {
    if (models.length > 0) {
      refetchModelsData();
    }
  }, [models, refetchModelsData]);

  const positionedModels = models
    .map((m) => {
      const modelData = modelsData?.find(
        (d) => String(d.id) === extractModelId(m.id)
      );
      if (!modelData) return null;
      return {
        id: m.id,
        path: modelData.model_url,
        //@ts-ignore
        position: m.position.clone(),
        rotation: m.rotation?.clone() ?? new THREE.Vector3(0, 0, 0),
      };
    })
    .filter(Boolean) as {
    id: UUID;
    path: string;
    position: THREE.Vector3;
    rotation: THREE.Vector3;
  }[];

  const modelPositions = useMemo(
    () => positionedModels.map((m) => m.position),
    [positionedModels]
  );
  return (
    <div className="h-screen">
      <Suspense fallback={<Loader />}>
        <Canvas camera={{ position: [0, 100, 0], fov: 50 }}>
          <Physics debug={false}>
            {cameraPosition && (
              <SmoothCamera
                targetPosition={cameraPosition}
                trigger={true}
                onDone={() => updateCameraPosition(null)}
              />
            )}

            <ambientLight />
            <pointLight position={[2, 2, 2]} />
            <axesHelper args={[10]} />

            <Suspense>
              {walls.map((wall, index) => {
                if (wall.length !== 4) return null;

                // @ts-ignore
                const wallProps = convertLineToWall(wall);
                // @ts-check
                return (
                  <Wall key={index} ref={wallRefs[index]} {...wallProps} />
                );
              })}
            </Suspense>

            <WallTransparencyController
              wallRefs={wallRefs}
              modelPositions={modelPositions}
            />
            <OrbitControls ref={orbitRef} enabled={!isDragging} />

            {positionedModels.map((model) => (
              <Model
                key={model.id}
                id={model.id}
                position={model.position}
                path={model.path}
                isDragging={draggingModelId === model.id}
                rotation={model.rotation}
                isAnotherDragging={
                  draggingModelId !== null && draggingModelId !== model.id
                }
                onDragStart={() => {
                  setDraggingModelId(model.id);
                  setIsDragging(true);
                }}
                onDragEnd={() => {
                  setDraggingModelId(null);
                  setIsDragging(false);
                }}
                onSelect={() => setSelectedModelId(model.id)}
                selected={selectedModelId === model.id}
              />
            ))}

            <Suspense>
              <Floor />
            </Suspense>
          </Physics>
        </Canvas>
        {selectedModelId && (
          <ModelActions
            rotationValue={rotationValue}
            onRotateChange={(deg) => {
              setRotationValue(deg);
              const m = models.find((m) => m.id === selectedModelId);
              if (!m) return;
              const rad = (deg * Math.PI) / 180;
              updateModel(
                m.id,
                //@ts-ignore
                m.position.clone(),
                new THREE.Vector3(0, rad, 0)
              );
            }}
            onDelete={() => {
              deleteModel(selectedModelId);
              setSelectedModelId(null);
            }}
          />
        )}
      </Suspense>
      <div className="fixed right-0 top-[50%] h-full">
        <SideBar />
      </div>
    </div>
  );
};

export default Scene;
