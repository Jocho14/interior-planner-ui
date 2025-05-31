import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

const SkeletonFloor = ({ geometry }: { geometry: THREE.ExtrudeGeometry }) => {
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);
  const time = useRef(0);

  useFrame((_, delta) => {
    time.current += delta;
    const mat = materialRef.current;
    if (mat) {
      const pulse = 0.5 + 0.5 * Math.sin(time.current * 3);
      mat.opacity = pulse * 0.3 + 0.3; // opacity between 0.3 and 0.6
    }
  });

  return (
    <mesh
      geometry={geometry}
      position={[-60, 0, -20]}
      rotation={[Math.PI / 2, 0, 0]}
    >
      <meshStandardMaterial
        ref={materialRef}
        transparent
        opacity={0.5}
        color={"#999"}
      />
    </mesh>
  );
};

export default SkeletonFloor;
