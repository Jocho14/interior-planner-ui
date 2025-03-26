import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

interface SketchContextType {
  walls: number[][];
  setWalls: (walls: number[][]) => void;
  clearWalls: () => void;
  handleUndo: () => void;
  handleRedo: () => void;
  undoStack: number[][][];
  redoStack: number[][][];
  setUndoStack: Dispatch<SetStateAction<number[][][]>>;
  setRedoStack: Dispatch<SetStateAction<number[][][]>>;
}

const SketchContext = createContext<SketchContextType | undefined>(undefined);

export const useSketch = () => {
  const context = useContext(SketchContext);
  if (!context) {
    throw new Error("useSketch must be used within a SizeProvider");
  }
  return context;
};

export const SketchProvider = ({ children }: { children: React.ReactNode }) => {
  const [walls, setWalls] = useState<number[][]>(() => {
    const savedWalls = localStorage.getItem("walls");
    return savedWalls ? JSON.parse(savedWalls) : [];
  });
  const [undoStack, setUndoStack] = useState<number[][][]>([]);
  const [redoStack, setRedoStack] = useState<number[][][]>([]);

  const updateWalls = (newWalls: number[][]) => {
    setWalls(newWalls);
  };

  const clearWalls = () => {
    setWalls([]);
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
    console.log("Saving to localStorage:", walls);
    localStorage.setItem("walls", JSON.stringify(walls));
  }, [walls]);

  return (
    <SketchContext.Provider
      value={{
        walls,
        undoStack,
        redoStack,
        setWalls: updateWalls,
        clearWalls,
        handleUndo,
        handleRedo,
        setUndoStack,
        setRedoStack,
      }}
    >
      {children}
    </SketchContext.Provider>
  );
};
