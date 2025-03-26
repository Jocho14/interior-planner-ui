import { Link } from "react-router";
import {
  Box3dCenter,
  CubeScan,
  LongArrowUpLeft,
  LongArrowUpRight,
  ZoomIn,
  ZoomOut,
} from "iconoir-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@radix-ui/react-separator";

const SketchHeader: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/#landing">
          <div className="flex items-center gap-2 font-bold text-xl">
            <Box3dCenter className="h-6 w-6 text-primary" />
            <span>InteriorPlanner</span>
          </div>
        </Link>

        <nav className="hidden md:flex gap-6">
          <Button variant={"outline"}>
            <ZoomOut />
          </Button>
          <Button variant={"outline"}>
            <ZoomIn />
          </Button>
          <Separator orientation="vertical" color="black" />
          <Button variant={"outline"}>
            <LongArrowUpLeft />
          </Button>
          <Button variant={"outline"}>
            <LongArrowUpRight />
          </Button>
          <Separator orientation="vertical" color="black" />
        </nav>

        <div className="flex items-center gap-4">
          <Button>
            Render scene <CubeScan />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default SketchHeader;
