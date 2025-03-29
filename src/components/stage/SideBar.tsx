import { Button } from "@/components/ui/button";
import { motion } from "motion/react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  ArrowSeparate,
  ArrowSeparateVertical,
  NavArrowLeft,
} from "iconoir-react";
import BarCard from "./BarCard";
import { useStage } from "@/context/StageContext";
import { WALL_HEIGHT, WALL_THICKNESS } from "@/constants/stageConstants";

const SideBar: React.FC = () => {
  const { wallHeight, wallThickness, updateWallHeight, updateWallThickness } =
    useStage();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", duration: 0.8 }}
        >
          <Button
            variant="outline"
            className="h-30 w-10 rounded-tl-lg rounded-bl-lg rounded-br-none rounded-tr-none hover:w-12"
          >
            <NavArrowLeft />
          </Button>
        </motion.div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Stage settings</SheetTitle>
          <SheetDescription>Adjust parameters here.</SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-5 p-5">
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
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SideBar;
