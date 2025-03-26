import { Stage, Layer, Line } from "react-konva";
import { useState } from "react";

const gridSize = 20;
const width = 800;
const height = 800;

const RoomPlanner = () => {
  const [walls, setWalls] = useState<number[][]>([]);
  const [currentWall, setCurrentWall] = useState<number[] | null>(null);

  const snapToGrid = (x: number, y: number) => [
    Math.round(x / gridSize) * gridSize,
    Math.round(y / gridSize) * gridSize,
  ];

  const handleMouseDown = (e: any) => {
    const stage = e.target.getStage();
    const pointer = stage.getPointerPosition();
    if (!pointer) return;
    setCurrentWall([
      ...snapToGrid(pointer.x, pointer.y),
      ...snapToGrid(pointer.x, pointer.y),
    ]);
  };

  const handleMouseMove = (e: any) => {
    if (!currentWall) return;
    const stage = e.target.getStage();
    const pointer = stage.getPointerPosition();
    if (!pointer) return;
    setCurrentWall([
      currentWall[0],
      currentWall[1],
      ...snapToGrid(pointer.x, pointer.y),
    ]);
  };

  const handleMouseUp = () => {
    if (currentWall) {
      setWalls([...walls, currentWall]);
      setCurrentWall(null);
    }
  };

  return (
    <Stage
      width={width}
      height={height}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <Layer>
        {/* Grid */}
        {[...Array(width / gridSize)].map((_, i) => (
          <Line
            key={i}
            points={[i * gridSize, 0, i * gridSize, height]}
            stroke="#ddd"
            strokeWidth={1}
          />
        ))}
        {[...Array(height / gridSize)].map((_, i) => (
          <Line
            key={i}
            points={[0, i * gridSize, width, i * gridSize]}
            stroke="#ddd"
            strokeWidth={1}
          />
        ))}

        {/* Drawn Walls */}
        {walls.map((points, i) => (
          <Line key={i} points={points} stroke="black" strokeWidth={3} />
        ))}
        {currentWall && (
          <Line points={currentWall} stroke="black" strokeWidth={3} />
        )}
      </Layer>
    </Stage>
  );
};

export default RoomPlanner;
