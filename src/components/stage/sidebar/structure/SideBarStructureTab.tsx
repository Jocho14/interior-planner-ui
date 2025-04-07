import { ArrowSeparate, ArrowSeparateVertical } from "iconoir-react";
import BarCard from "./StructureBarCard";
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
            <BarCard
              title="Wall thickness"
              description="Adjust the thickness of your walls"
              inputLabel="Thickness"
              icon={<ArrowSeparate />}
              currentValue={wallThickness}
              minValue={WALL_THICKNESS}
              maxValue={10}
              sliderStep={0.1}
              handleValueChange={updateWallThickness}
            />
            <BarCard
              title="Wall height"
              description="Adjust the height of your walls"
              inputLabel="Height"
              icon={<ArrowSeparateVertical />}
              handleValueChange={updateWallHeight}
              currentValue={wallHeight}
              minValue={WALL_HEIGHT}
              maxValue={200}
            />
          </div>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </TabsContent>
  );
};

export default SideBarStructureTab;
