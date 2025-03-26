import { useEffect, useState } from "react";
import { Layer, Line, Stage } from "react-konva";

import { GRID_SIZE } from "../constants/2dConstants";

import { useSize } from "@/context/SizeContext";

import Grid from "./Grid";

const Room: React.FC = () => {
  const size = useSize();
  if (!size) return <div>Loading...</div>;

  const { width, height } = size;

  const [walls, setWalls] = useState<number[][]>([]);
  const [currentWall, setCurrentWall] = useState<number[] | null>(null);
  console.log(walls);

  const [undoStack, setUndoStack] = useState<number[][][]>([]);
  const [redoStack, setRedoStack] = useState<number[][][]>([]);

  const snapToGrid = (x: number, y: number) => [
    Math.round(x / GRID_SIZE) * GRID_SIZE,
    Math.round(y / GRID_SIZE) * GRID_SIZE,
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
      setUndoStack([...undoStack, walls]);
      setWalls([...walls, currentWall]);
      setCurrentWall(null);
      setRedoStack([]);
    }
  };

  const handleUndo = () => {
    if (undoStack.length === 0) return;
    const previousState = undoStack[undoStack.length - 1];
    setUndoStack(undoStack.slice(0, -1));
    setRedoStack([...redoStack, walls]);
    setWalls(previousState);
  };

  const handleRedo = () => {
    if (redoStack.length === 0) return;
    const nextState = redoStack[redoStack.length - 1];
    setRedoStack(redoStack.slice(0, -1));
    setUndoStack([...undoStack, walls]);
    setWalls(nextState);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey) {
        if (e.key === "z") {
          handleUndo();
        } else if (e.key === "y") {
          handleRedo();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [undoStack, redoStack, walls]);

  return (
    <Stage
      width={width}
      height={height}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      style={{ cursor: "url('/pencil-icon.svg') 0 24, auto" }}
    >
      <Layer>
        <Grid width={width} height={height} />
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

export default Room;
