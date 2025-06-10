import { PerspectiveView } from "iconoir-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { capitalize } from "@/utils/strings";

import { TabsContent } from "@/components/ui/tabs";
import MaterialsBarCard from "./MaterialsBarCard";
import { BrickWall } from "lucide-react";

import { useQuery } from "@tanstack/react-query";
import { SurfacePreviewDto } from "@/dto/surface.dto";
import { getWallPreviews } from "@/api/walls.api";
import { getFloorPreviews } from "@/api/floors.api";
import { useStage } from "@/context/StageContext";

interface SideBarMaterialsTabProps {
  value: string;
}

const SideBarMaterialsTab: React.FC<SideBarMaterialsTabProps> = ({ value }) => {
  const {
    wallTextureId,
    floorTextureId,
    wallTextureDensity,
    floorTextureDensity,
    updateWallTextureId,
    updateFloorTextureId,
    updateWallTextureDensity,
    updateFloorTextureDensity,
  } = useStage();

  const { data: wallPreviews, isLoading: wallsLoading } = useQuery<
    SurfacePreviewDto[]
  >({
    queryKey: ["walls"],
    queryFn: getWallPreviews,
  });

  const { data: floorPreviews, isLoading: floorsLoading } = useQuery<
    SurfacePreviewDto[]
  >({
    queryKey: ["floors"],
    queryFn: getFloorPreviews,
  });

  return (
    <TabsContent value={value}>
      <Card className="border-none shadow-none">
        <CardHeader>
          <CardTitle>{capitalize(value)}</CardTitle>
          <CardDescription>
            Set materials for every surface type here.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-y-5 w-full">
            <MaterialsBarCard
              title="Wall material"
              icon={<BrickWall strokeWidth={1.5} />}
              description="Set a material for the walls"
              surfacePreviews={wallPreviews}
              surfacesLoading={wallsLoading}
              surfaceId={wallTextureId}
              surfaceDensity={wallTextureDensity}
              updateSurfaceId={updateWallTextureId}
              handleSurfaceDensityChange={updateWallTextureDensity}
            />
            <MaterialsBarCard
              title="Floor material"
              icon={<PerspectiveView />}
              description="Set a material for the floor"
              surfacePreviews={floorPreviews}
              surfacesLoading={floorsLoading}
              surfaceId={floorTextureId}
              surfaceDensity={floorTextureDensity}
              updateSurfaceId={updateFloorTextureId}
              handleSurfaceDensityChange={updateFloorTextureDensity}
            />
          </div>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </TabsContent>
  );
};

export default SideBarMaterialsTab;
