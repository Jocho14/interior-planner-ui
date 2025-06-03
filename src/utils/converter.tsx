import { WallType } from "@/types/wall";

import { useStage } from "@/context/StageContext";

export const convertLineToWall = (
  line: [number, number, number, number]
): WallType => {
  const { wallThickness, wallHeight } = useStage();
  let [x1, y1, x2, y2] = line;
  x1 /= 10;
  x2 /= 10;
  y1 /= 10;
  y2 /= 10;

  const posX = (x1 + x2) / 2;
  const posY = (y1 + y2) / 2;

  const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  console.log(distance);

  const angle = -1 * Math.atan2(y1 - y2, x1 - x2);

  return {
    position: [posX - 60, wallHeight / 20, posY - 20],
    scale: [distance, wallHeight / 10, wallThickness],
    rotation: angle,
  };
};
