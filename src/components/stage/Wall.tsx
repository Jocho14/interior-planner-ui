// Wall.tsx
import {
  RepeatWrapping,
  Texture,
  TextureLoader,
  Mesh,
  MeshStandardMaterial,
} from "three";
import { useQuery } from "@tanstack/react-query";
import { useFrame, useLoader } from "@react-three/fiber";
import {
  forwardRef,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { RigidBody } from "@react-three/rapier";
import { getWallTexture } from "@/api/walls.api";
import { WallType } from "@/types/wall";
import { TextureDto } from "@/dto/surface.dto";
import { useStage } from "@/context/StageContext";
import * as Three from "three";

export interface WallRef {
  mesh: Mesh;
  setOpacity: (opacity: number) => void;
}

const Wall = forwardRef<WallRef, WallType>(
  ({ position, scale, rotation }, ref) => {
    const meshRef = useRef<Mesh>(null);
    const materialRef = useRef<MeshStandardMaterial>(null);
    const [targetOpacity, setTargetOpacity] = useState(1);
    const [currentOpacity, setCurrentOpacity] = useState(1);

    useImperativeHandle(ref, () => ({
      mesh: meshRef.current!,
      setOpacity: (value: number) => {
        setTargetOpacity(value); // set target instead of instantly changing
      },
    }));

    useFrame(() => {
      if (!materialRef.current) return;

      const lerped = Three.MathUtils.lerp(currentOpacity, targetOpacity, 0.1); // smooth transition
      setCurrentOpacity(lerped);
      materialRef.current.opacity = lerped;
      materialRef.current.depthWrite = lerped >= 1;
    });

    const name = (type: string) =>
      `/textures/walls/plaster001/Plaster001_1K-PNG_${type}.png`;

    const { wallTextureId, wallTextureDensity } = useStage();
    const { data: wallTexture } = useQuery<TextureDto>({
      enabled: !!wallTextureId,
      queryKey: ["walls", wallTextureId],
      queryFn: () => getWallTexture(wallTextureId),
      staleTime: 3600,
      refetchOnWindowFocus: false,
    });

    const texturePaths = useMemo(() => {
      const fallback = (value: string | undefined, type: string) =>
        value && value.trim() !== "" ? value : name(type);
      return [
        fallback(wallTexture?.color, "Color"),
        fallback(wallTexture?.displacement, "Displacement"),
        fallback(wallTexture?.normal, "NormalGL"),
        fallback(wallTexture?.roughness, "Roughness"),
      ];
    }, [wallTextureId, wallTexture]);

    const [colorMap, displacementMap, normalMap, roughnessMap] = useLoader(
      TextureLoader,
      texturePaths
    ) as Texture[];

    colorMap.wrapS = colorMap.wrapT = RepeatWrapping;
    colorMap.repeat.set(wallTextureDensity, wallTextureDensity);

    return (
      <RigidBody type="fixed" colliders="cuboid" collisionGroups={0x00020001}>
        <mesh
          ref={meshRef}
          position={position}
          scale={scale}
          rotation={[0, rotation ?? 0, 0]}
        >
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial
            ref={materialRef}
            map={colorMap}
            displacementMap={displacementMap}
            normalMap={normalMap}
            roughnessMap={roughnessMap}
            displacementScale={0}
            transparent
            opacity={1}
          />
        </mesh>
      </RigidBody>
    );
  }
);

export default Wall;
