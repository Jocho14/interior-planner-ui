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

import { getWallsThumbnails } from "@/api/walls.api";
// import { fetchTextureData } from "@/api/texture.api";

interface SideBarMaterialsTabProps {
  value: string;
}

const SideBarMaterialsTab: React.FC<SideBarMaterialsTabProps> = ({ value }) => {
  // fetchTextureData("plaster001");
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
              surfacesThumbnails={getWallsThumbnails}
            />
            <MaterialsBarCard
              title="Floor material"
              icon={<PerspectiveView />}
              description="Set a material for the floor"
              surfacesThumbnails={getWallsThumbnails}
            />
          </div>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </TabsContent>
  );
};

export default SideBarMaterialsTab;
