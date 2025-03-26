import { WallType } from "@/types/wall";

const Wall: React.FC<WallType> = ({ position, scale, rotation }) => {
  return (
    <mesh position={position} scale={scale} rotation={[0, rotation ?? 0, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={"gray"} />
    </mesh>
  );
};

export default Wall;
