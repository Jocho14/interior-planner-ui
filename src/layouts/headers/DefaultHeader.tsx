import { Link } from "react-router";
import { Box3dCenter } from "iconoir-react";

import { Button } from "@/components/ui/button";

const DefaultHeader: React.FC = () => {
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
          <Link
            to="/#features"
            className="text-sm font-medium hover:text-primary"
          >
            Features
          </Link>
          <Link
            to="/#how-it-works"
            className="text-sm font-medium hover:text-primary"
          >
            How It Works
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link
            to="/login"
            className="hidden md:flex text-sm font-medium hover:text-primary"
          >
            Log in
          </Link>
          <Button>Get Started</Button>
        </div>
      </div>
    </header>
  );
};

export default DefaultHeader;
