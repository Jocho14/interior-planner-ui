import classNames from "classnames";

import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { PlusCircle } from "iconoir-react";
import { snakeToNormalCase } from "@/utils/strings";

interface ModelTileProps {
  imageUrl: string;
  name: string;
  isLoading: boolean;
  onClick: () => void;
}

const ModelTile: React.FC<ModelTileProps> = ({
  imageUrl,
  name,
  isLoading,
  onClick,
}) => {
  if (isLoading) return <Skeleton className="w-30 h-30 rounded-md border" />;

  return (
    <div
      onClick={onClick}
      style={{ backgroundImage: `url(${imageUrl})` }}
      className={classNames(
        "w-30 h-30 relative rounded-md border cursor-pointer overflow-hidden bg-cover bg-center group"
      )}
    >
      <Badge
        className="absolute text-center bottom-1 left-1 max-w-[100px] truncate overflow-hidden whitespace-nowrap"
        variant="secondary"
      >
        {snakeToNormalCase(name)}
      </Badge>
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
        <PlusCircle className="text-white w-6 h-6" />
      </div>
    </div>
  );
};

export default ModelTile;
