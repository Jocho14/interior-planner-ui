import { RepeatWrapping, Texture, TextureLoader } from "three";
import { useQuery } from "@tanstack/react-query";
import { useLoader } from "@react-three/fiber";
import { useMemo } from "react";

import { getWallTexture } from "@/api/walls.api";

import { WallType } from "@/types/wall";
import { TextureDto } from "@/dto/surface.dto";

import { useStage } from "@/context/StageContext";

const Wall: React.FC<WallType> = ({ position, scale, rotation }) => {
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
