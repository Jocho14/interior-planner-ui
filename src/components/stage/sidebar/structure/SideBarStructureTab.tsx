import { ArrowSeparate, ArrowSeparateVertical } from "iconoir-react";
import StructureBarCard from "./StructureBarCard";
import { useStage } from "@/context/StageContext";
import { WALL_HEIGHT, WALL_THICKNESS } from "@/constants/stageConstants";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { TabsContent } from "@/components/ui/tabs";

import { capitalize } from "@/utils/strings";

interface SideBarStructureTabProps {
  value: string;
}

const SideBarStructureTab: React.FC<SideBarStructureTabProps> = ({ value }) => {
  const { wallHeight, wallThickness, updateWallHeight, updateWallThickness } =
    useStage();
  return (
    <TabsContent value={value}>
      <Card className="border-none shadow-none">
        <CardHeader>
          <CardTitle>{capitalize(value)}</CardTitle>
          <CardDescription>Adjust parameters here.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-y-5 w-full">
            <StructureBarCard
              title="Wall thickness"
              description="Adjust the thickness of your walls"
              inputLabel="Thickness"
              icon={<ArrowSeparate />}
              currentValue={wallThickness}
              minValue={WALL_THICKNESS}
              maxValue={30}
              unitLabel="cm"
              sliderStep={1}
              handleValueChange={updateWallThickness}
            />
            <StructureBarCard
              title="Wall height"
              description="Adjust the height of your walls"
              inputLabel="Height"
              icon={<ArrowSeparateVertical />}
              handleValueChange={updateWallHeight}
              currentValue={wallHeight}
              minValue={WALL_HEIGHT}
              maxValue={400}
              unitLabel="cm"
            />
          </div>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </TabsContent>
  );
};

export default SideBarStructureTab;
