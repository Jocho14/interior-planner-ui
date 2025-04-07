import React from "react";
import { motion } from "motion/react";
import { NavArrowLeft, Palette, Ruler, SleeperChair } from "iconoir-react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import { capitalize } from "@/utils/strings";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SideBarModelsTab from "./models/SideBarModelsTab";
import SideBarStructureTab from "./structure/SideBarStructureTab";
import SideBarMaterialsTab from "./materials/SideBarMaterialsTab";

export type TabEntry = {
  value: string;
  content: React.ReactElement;
  icon: React.ReactNode;
};

const sidebarTabs: TabEntry[] = [
  {
    value: "furniture",
    content: <SideBarModelsTab value="furniture" />,
    icon: <SleeperChair />,
  },
  {
    value: "materials",
    content: <SideBarMaterialsTab value="materials" />,
    icon: <Palette />,
  },
  {
    value: "structure",
    content: <SideBarStructureTab value="structure" />,
    icon: <Ruler />,
  },
];

const SideBar: React.FC = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", duration: 0.8 }}
          exit={{ opacity: 0 }}
        >
          <Button className="h-30 w-10 rounded-tl-lg rounded-bl-lg rounded-br-none rounded-tr-none hover:w-12">
            <NavArrowLeft />
          </Button>
        </motion.div>
      </SheetTrigger>
      <SheetContent className="pt-1.5">
        <VisuallyHidden>
          <SheetHeader>
            <SheetTitle>Stage settings</SheetTitle>
            <SheetDescription>Adjust parameters here.</SheetDescription>
          </SheetHeader>
        </VisuallyHidden>
        <Tabs defaultValue={sidebarTabs[0].value}>
          <TabsList className="flex flex-row w-[90%]">
            {sidebarTabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="cursor-pointer"
              >
                {capitalize(tab.value)}
                {tab.icon}
              </TabsTrigger>
            ))}
          </TabsList>
          {sidebarTabs.map((tab) => (
            <React.Fragment key={tab.value}>{tab.content}</React.Fragment>
          ))}
        </Tabs>
      </SheetContent>
    </Sheet>
  );
};

export default SideBar;
