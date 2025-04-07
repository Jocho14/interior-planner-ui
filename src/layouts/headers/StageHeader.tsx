import { Link } from "react-router";
import { ArrowRight, Box3dCenter, OrthogonalView } from "iconoir-react";

import { Button } from "@/components/ui/button";

const StageHeader: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/#landing">
          <div className="flex items-center gap-2 font-bold text-xl">
            <Box3dCenter className="h-6 w-6 text-primary" />
            <span>InteriorPlanner</span>
          </div>
        </Link>

        <div className="flex items-center gap-4">
          <Link to="/sketch">
            <Button>
              2D View <OrthogonalView /> <ArrowRight />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default StageHeader;
