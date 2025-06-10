import React from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "../ui/badge";

import { Ruler } from "iconoir-react";

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
