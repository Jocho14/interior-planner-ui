import { Button } from "../ui/button";
import { Slider } from "../ui/slider";

interface ModelActionsProps {
  rotationValue: number; // degrees
  onRotateChange: (deg: number) => void; // called whenever slider moves
  onDelete: () => void;
}

const ModelActions: React.FC<ModelActionsProps> = ({
  rotationValue,
  onRotateChange,
  onDelete,
}) => {
  return (
    <div className="absolute bottom-10 left-1/2 w-[300px] -translate-x-1/2 flex gap-4 bg-white/80 p-4 rounded-3xl shadow">
      <Slider
        value={[rotationValue]}
        max={360}
        step={1}
        onValueChange={([val]) => onRotateChange(val)}
      />
      <Button
        variant="destructive"
        className="w-[70px] rounded-lg"
        onClick={onDelete}
      >
        Delete
      </Button>
    </div>
  );
};

export default ModelActions;
