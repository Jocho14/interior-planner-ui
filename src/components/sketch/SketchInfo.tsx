import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { InfoCircle, Ruler, Square3dCornerToCorner } from "iconoir-react";
import React from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

export const SketchInfo: React.FC = () => {
  return (
    <Tooltip>
      <TooltipTrigger>
        <Badge variant="outline" className="p-2">
          <Ruler className="!w-5 !h-5" color="gray" />
        </Badge>
      </TooltipTrigger>
      <TooltipContent>
        <p>Grid square size: 20 cm × 20 cm</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default SketchInfo;
