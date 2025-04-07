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
import { Skeleton } from "@/components/ui/skeleton";

import { capitalize } from "@/utils/strings";

interface SideBarModelsTabProps {
  value: string;
}
const SideBarModelsTab: React.FC<SideBarModelsTabProps> = ({ value }) => {
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
              {Array.from({ length: 10 }).map((_, index) => (
                <Skeleton key={index} className="h-[130px] w-[130px]" />
              ))}
            </div>
          </ScrollArea>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </TabsContent>
  );
};

export default SideBarModelsTab;
