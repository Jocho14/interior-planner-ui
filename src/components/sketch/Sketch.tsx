import { useEffect, useState } from "react";
import { Layer, Line, Stage } from "react-konva";
import { toast } from "sonner";

import { GRID_SIZE } from "../../constants/2dConstants";

import { useSize } from "@/context/SizeContext";
import { useSketch } from "@/context/SketchContext";

import Grid from "./Grid";

const Room: React.FC = () => {
  const size = useSize();
  if (!size) return <div>Loading...</div>;

  const { width, height } = size;

  const {
    walls,
    undoStack,
    redoStack,
    setWalls,
    handleUndo,
    handleRedo,
    setRedoStack,
    setUndoStack,
  } = useSketch();
  const [currentWall, setCurrentWall] = useState<number[] | null>(null);

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
      const overlaps = walls.some((wall) => doWallsOverlap(wall, currentWall));
      if (overlaps) {
        setCurrentWall(null);
        toast("Walls cannot overlap!", {
          action: {
            label: "Got it!",
            onClick: () => {},
          },
        });
        return;
      }

      if (isZeroLengthWall(currentWall)) {
        setCurrentWall(null);
        return;
      }

      setUndoStack([...undoStack, walls]);
      setWalls([...walls, currentWall]);
      setCurrentWall(null);
      setRedoStack([]);
    }
  };

  const doWallsOverlap = (a: number[], b: number[]) => {
    const [ax1, ay1, ax2, ay2] = a;
    const [bx1, by1, bx2, by2] = b;

    const isHorizontalA = ay1 === ay2;
    const isHorizontalB = by1 === by2;

    const isVerticalA = ax1 === ax2;
    const isVerticalB = bx1 === bx2;

    if (isHorizontalA && isHorizontalB && ay1 === by1) {
      const [aMin, aMax] = [Math.min(ax1, ax2), Math.max(ax1, ax2)];
      const [bMin, bMax] = [Math.min(bx1, bx2), Math.max(bx1, bx2)];
      return aMax > bMin && bMax > aMin;
    }

    if (isVerticalA && isVerticalB && ax1 === bx1) {
      const [aMin, aMax] = [Math.min(ay1, ay2), Math.max(ay1, ay2)];
      const [bMin, bMax] = [Math.min(by1, by2), Math.max(by1, by2)];
      return aMax > bMin && bMax > aMin;
    }

    return false;
  };

  const isZeroLengthWall = (wall: number[]): boolean => {
    const [x1, y1, x2, y2] = wall;

    return x1 === x2 && y1 === y2;
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
    <div className="flex flex-row items-center">
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
    </div>
  );
};

export default Room;
