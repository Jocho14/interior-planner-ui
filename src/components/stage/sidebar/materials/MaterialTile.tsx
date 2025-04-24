import { Skeleton } from "@/components/ui/skeleton";
import classNames from "classnames";
import { CheckCircle } from "iconoir-react";

interface MaterialTileProps {
  imageUrl: string;
  isLoading: boolean;
  isActive?: boolean;
  setActive: () => void;
}

const MaterialTile: React.FC<MaterialTileProps> = ({
  imageUrl,
  isLoading,
  isActive = false,
  setActive,
}) => {
  if (isLoading) return <Skeleton className="w-15 h-15 rounded-md border" />;

  return (
    <div
      onClick={setActive}
      style={{ backgroundImage: `url(${imageUrl})`, backgroundSize: "300%" }}
      className={classNames(
        "w-15 h-15 rounded-md border pl-1 cursor-pointer overflow-hidden bg-cover bg-center ",
        {
          "border-2 border-black": isActive,
        }
      )}
    >
      {isActive && <CheckCircle width={16} strokeWidth={2} />}
    </div>
  );
};

export default MaterialTile;
