import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import { useEffect, useRef, useState } from "react";
import { CameraHelper } from "three";

const Wall = ({
  position,
  scale,
  rotate,
}: {
  position: [number, number, number];
  scale: [number, number, number];
  rotate?: number;
}) => {
  const meshRef = useRef<any>(null);
  const [isTransparent, setIsTransparent] = useState(false);

  // Get camera from the Canvas context
  const { camera } = useThree();

  // Rotate and check visibility from the camera
  useFrame(() => {
    if (meshRef.current) {
      //const angle = meshRef.current.rotation.x;

      // Update transparency based on camera position or mesh rotation
      // Example: Make the wall transparent when looking directly at it
      const distance = camera.position.distanceTo(meshRef.current.position);
      if (distance < 5) {
        setIsTransparent(true); // Set transparency if close enough
      } else {
        setIsTransparent(false);
      }
    }
  });

  return (
    <mesh position={position} scale={scale} rotation={[0, rotate ?? 0, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color={isTransparent ? "transparent" : "gray"}
        transparent={isTransparent}
        opacity={isTransparent ? 0.3 : 1}
      />
    </mesh>
  );
};

// const Box: React.FC = () => {
//   const boxRef = useRef<Mesh>(null!);

//   useFrame(() => {
//     boxRef.current.rotation.x += 0.005;
//     boxRef.current.rotation.y += 0.01;
//   });
//   return (
//     <mesh ref={boxRef}>
//       <boxGeometry args={[2, 2, 2]} />
//       <meshStandardMaterial color="orange" />
//     </mesh>
//   );
// };

const Scene: React.FC = () => {
  const cameraRef = useRef<any>(null);
  useEffect(() => {
    if (cameraRef.current) {
      const helper = new CameraHelper(cameraRef.current);
      cameraRef.current.add(helper);
    }
  }, []);

  return (
    <div className="h-screen">
      <Canvas className="justify-center items-center">
        <perspectiveCamera
          ref={cameraRef}
          position={[0, 5, 10]}
          fov={75}
          near={0.1}
          far={1000}
        />
        <ambientLight />
        <pointLight position={[2, 2, 2]} />
        <axesHelper args={[10]} />
        {/* <Box /> */}
        <Wall position={[0, 1.5, -5]} scale={[10, 3, 0.1]} /> {/* Back Wall */}
        <Wall position={[0, 1.5, 5]} scale={[10, 3, 0.1]} /> {/* Front Wall */}
        <Wall
          position={[5, 1.5, 0]}
          scale={[10, 3, 0.1]}
          rotate={Math.PI / 2}
        />{" "}
        {/* Left Wall */}
        <Wall
          position={[-5, 1.5, 0]}
          scale={[10, 3, 0.1]}
          rotate={Math.PI / 2}
        />{" "}
        {/* Right Wall */}
        <Wall position={[0, 0, 0]} scale={[10, 0.1, 10]} /> {/* Floor */}
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default Scene;
