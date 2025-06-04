import { Link } from "react-router";
import {
  ArrowRight,
  Box3dCenter,
  CubeScan,
  LongArrowUpLeft,
  LongArrowUpRight,
  XmarkCircle,
} from "iconoir-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@radix-ui/react-separator";
import { useSketch } from "@/context/SketchContext";
import ModalAlert from "@/components/ModalAlert";
import { useState } from "react";
import SketchInfo from "@/components/sketch/SketchInfo";

const SketchHeader: React.FC = () => {
  const [isClearModalOpen, setIsClearModalOpen] = useState(false);

  const {
    clearWalls,
    handleUndo,
    handleRedo,
    setUndoStack,
    setRedoStack,
    undoStack,
    redoStack,
    walls,
  } = useSketch();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/#landing">
          <div className="flex items-center gap-2 font-bold text-xl">
            <Box3dCenter className="h-6 w-6 text-primary" />
            <span>InteriorPlanner</span>
          </div>
        </Link>
        <SketchInfo />
        <Separator orientation="vertical" />

        <nav className="hidden md:flex gap-6">
          <Separator orientation="vertical" color="black" />
          <Button
            variant={"outline"}
            onClick={handleUndo}
            disabled={undoStack.length === 0}
          >
            <LongArrowUpLeft />
          </Button>
          <Button
            variant={"outline"}
            onClick={handleRedo}
            disabled={redoStack.length === 0}
          >
            <LongArrowUpRight />
          </Button>
          <Separator orientation="vertical" color="black" />
          <Button
            disabled={walls.length === 0}
            variant={"destructive"}
            onClick={() => {
              setIsClearModalOpen(true);
            }}
          >
            <XmarkCircle />
          </Button>
          {isClearModalOpen && (
            <ModalAlert
              open={isClearModalOpen}
              primaryAction="cancel"
              message="This will permanently delete your sketch."
              setOpen={setIsClearModalOpen}
              handleConfirm={() => {
                clearWalls();
                setUndoStack([]);
                setRedoStack([]);
                setIsClearModalOpen(false);
              }}
            />
          )}
        </nav>
        <div className="flex items-center gap-4">
          <Link to="/stage">
            <Button>
              3D View <CubeScan /> <ArrowRight />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default SketchHeader;
