import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Loader, OrbitControls } from "@react-three/drei";

import { useStage } from "@/context/StageContext";
import { useSketch } from "@/context/SketchContext";
import { convertLineToWall } from "@/utils/converter";

import Wall from "./Wall";
import Floor from "./Floor";
import SideBar from "./sidebar/SideBar";
import SmoothCamera from "./SmoothCamera";
import Model from "./Model";
import { Physics } from "@react-three/rapier";
import { useQuery } from "@tanstack/react-query";
import { FurnitureDto } from "@/dto/furniture.dto";
import { getFurnitureModels } from "@/api/furniture.api";
import { extractModelId } from "@/utils/strings";
import { UUID } from "@/types/uuid";

const Scene: React.FC = () => {
  const { walls } = useSketch();
  const { cameraPosition, updateCameraPosition, models } = useStage();

  const [isDragging, setIsDragging] = useState(false);
  const orbitRef = useRef<any>(null);
  const [draggingModelId, setDraggingModelId] = useState<UUID | null>(null);

  const { data: modelsData, refetch: refetchModelsData } = useQuery<
    FurnitureDto[]
  >({
    queryKey: ["active-models"],
    queryFn: () =>
      getFurnitureModels(models.map((model) => extractModelId(model.id))),
  });
  useEffect(() => {
    if (models.length > 0) {
      refetchModelsData();
    }
  }, [models]);

  if (!modelsData) return null;
  const positionedModels = models
    .map((model) => {
      const modelData = modelsData.find(
        (data) => String(data.id) === extractModelId(model.id)
      );
      if (!modelData) return null;

      return {
        id: model.id,
        path: modelData.model_url,
        position: model.position,
      };
    })
    .filter(Boolean);

  return (
    <div className="h-screen">
      <Suspense fallback={<Loader />}>
        <Canvas
          className="justify-center items-center"
          camera={{ position: [0, 100, 0], fov: 50 }}
        >
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
                //@ts-ignore
                const wallProps = convertLineToWall(wall);
                //@ts-check
                return <Wall key={index} {...wallProps} />;
              })}
            </Suspense>
            <OrbitControls ref={orbitRef} enabled={!isDragging} />

            {positionedModels.map((model) => (
              <Model
                key={model?.id}
                id={model?.id}
                position={model?.position}
                path={model?.path}
                isDragging={draggingModelId === model?.id}
                isAnotherDragging={
                  draggingModelId !== null && draggingModelId !== model?.id
                }
                onDragStart={() => {
                  setDraggingModelId(model?.id ?? null);
                  setIsDragging(true);
                }}
                onDragEnd={() => {
                  setDraggingModelId(null);
                  setIsDragging(false);
                }}
              />
            ))}
            <Suspense>
              <Floor />
            </Suspense>
          </Physics>
        </Canvas>
      </Suspense>
      <div className="fixed right-0 top-[50%] h-full">
        <SideBar />
      </div>
    </div>
  );
};

export default Scene;
