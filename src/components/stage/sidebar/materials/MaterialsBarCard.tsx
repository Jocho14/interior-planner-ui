import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import MaterialTile from "./MaterialTile";
import { useState } from "react";
import { UUID } from "@/types/uuid";
import { SurfaceThumbnailDto } from "@/dto/surfaceThumbnail.dto";

interface MaterialsBarCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  surfacesThumbnails: SurfaceThumbnailDto[];
}

const MaterialsBarCard: React.FC<MaterialsBarCardProps> = ({
  title,
  description,
  icon,
  surfacesThumbnails,
}) => {
  const [activeTileId, setActiveTileId] = useState<UUID | null>(null);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {title}
          {icon}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-25 w-full rounded-md border">
          <div className="p-4 w-full flex flex-row gap-x-3">
            {surfacesThumbnails.map((wall) => (
              <MaterialTile
                imageUrl={wall.imageUrl}
                key={wall.id}
                isActive={wall.id === activeTileId}
                setActive={() => setActiveTileId(wall.id)}
              />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default MaterialsBarCard;
