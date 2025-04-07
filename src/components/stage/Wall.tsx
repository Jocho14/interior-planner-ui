import { WallType } from "@/types/wall";
import { useLoader } from "@react-three/fiber";
import { RepeatWrapping, TextureLoader } from "three";

const Wall: React.FC<WallType> = ({ position, scale, rotation }) => {
  const name = (type: string) =>
    `/textures/walls/plaster001/Plaster001_1K-PNG_${type}.png`;

  const [colorMap, displacementMap, normalMap, roughnessMap] = useLoader(
    TextureLoader,
    [name("Color"), name("Displacement"), name("NormalGL"), name("Roughness")]
  );

  colorMap.wrapS = colorMap.wrapT = RepeatWrapping;
  colorMap.repeat.set(0.1, 0.1);

  return (
    <mesh position={position} scale={scale} rotation={[0, rotation ?? 0, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        map={colorMap}
        displacementMap={displacementMap}
        normalMap={normalMap}
        roughnessMap={roughnessMap}
        displacementScale={0}
      />
    </mesh>
  );
};

export default Wall;
