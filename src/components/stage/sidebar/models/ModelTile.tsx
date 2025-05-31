import classNames from "classnames";

import { Skeleton } from "@/components/ui/skeleton";
import { PlusCircle } from "iconoir-react";

interface ModelTileProps {
  imageUrl: string;
  isLoading: boolean;
  onClick: () => void;
}

const ModelTile: React.FC<ModelTileProps> = ({
  imageUrl,
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
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
        <PlusCircle className="text-white w-6 h-6" />
      </div>
    </div>
  );
};

export default ModelTile;
