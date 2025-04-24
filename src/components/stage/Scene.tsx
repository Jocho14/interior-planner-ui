import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Loader, OrbitControls } from "@react-three/drei";

import { useStage } from "@/context/StageContext";
import { useSketch } from "@/context/SketchContext";
import { convertLineToWall } from "@/utils/converter";

import Wall from "./Wall";
import Floor from "./Floor";
import SideBar from "./sidebar/SideBar";
import SmoothCamera from "./SmoothCamera";

const Scene: React.FC = () => {
  const { walls } = useSketch();
  const { cameraPosition, updateCameraPosition } = useStage();

  return (
    <div className="h-screen">
      <Suspense fallback={<Loader />}>
        <Canvas
          className="justify-center items-center"
          camera={{ position: [0, 100, 0], fov: 50 }}
        >
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
          {walls.map((wall, index) => {
            if (wall.length !== 4) return null;
            //@ts-ignore
            const wallProps = convertLineToWall(wall);
            //@ts-check
            return <Wall key={index} {...wallProps} />;
          })}
          <OrbitControls />
          <Floor />
        </Canvas>
      </Suspense>
      <div className="fixed right-0 top-[50%] h-full">
        <SideBar />
      </div>
    </div>
  );
};

export default Scene;
