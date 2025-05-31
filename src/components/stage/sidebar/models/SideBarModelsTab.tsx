import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

import { capitalize } from "@/utils/strings";
import { useQuery } from "@tanstack/react-query";
import { FurniturePreviewDto } from "@/dto/furniture.dto";

import { getFurniturePreviews } from "@/api/furniture.api";
import ModelTile from "./ModelTile";
import { useStage } from "@/context/StageContext";
import { Vector3 } from "three";
import { getRandomInt } from "@/utils/generators";

interface SideBarModelsTabProps {
  value: string;
}
const SideBarModelsTab: React.FC<SideBarModelsTabProps> = ({ value }) => {
  const { addModel } = useStage();

  const {
    data: furniturePreviews,
    error: furnitureError,
    isLoading: furintureLoading,
  } = useQuery<FurniturePreviewDto[]>({
    queryKey: ["furniturePreviews"],
    queryFn: getFurniturePreviews,
  });

  return (
    <TabsContent value={value}>
      <Card className="border-none shadow-none">
        <CardHeader>
          <CardTitle>{capitalize(value)}</CardTitle>
          <CardDescription>
            Browse a collection of high-quality 3D models for your designs and
            projects.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <ScrollArea className="h-[660px] w-full rounded-md border">
            <div className="p-4 grid grid-cols-2 gap-5">
              {furniturePreviews &&
                furniturePreviews.map((preview) => (
                  <ModelTile
                    key={preview.id}
                    imageUrl={preview.thumbnailUrl}
                    isLoading={furintureLoading}
                    onClick={() =>
                      addModel(
                        preview.id,
                        new Vector3(getRandomInt(0, 10), 0, getRandomInt(0, 10))
                      )
                    }
                  />
                ))}
              {furnitureError && <span>Could not load models</span>}
            </div>
          </ScrollArea>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </TabsContent>
  );
};

export default SideBarModelsTab;
