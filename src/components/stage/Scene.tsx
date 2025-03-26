import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import Wall from "./Wall";
import { useSketch } from "@/context/SketchContext";
import { convertLineToWall } from "@/utils/converter";

const Scene: React.FC = () => {
  const { walls } = useSketch();
  console.log("shit", walls);
  return (
    <div className="h-screen">
      <Canvas
        className="justify-center items-center"
        camera={{ position: [0, 100, 0], fov: 50 }}
      >
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
      </Canvas>
    </div>
  );
};

export default Scene;
