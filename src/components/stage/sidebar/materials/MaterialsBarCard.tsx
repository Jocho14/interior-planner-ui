import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import MaterialTile from "./MaterialTile";
import { SurfacePreviewDto } from "@/dto/surface.dto";
import { Slider } from "@/components/ui/slider";

interface MaterialsBarCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  surfacePreviews: SurfacePreviewDto[] | undefined;
  surfacesLoading: boolean;
  surfaceId: string | undefined;
  surfaceDensity: number;
  updateSurfaceId: (id: string) => void;
  handleSurfaceDensityChange: (density: number) => void;
}

const MaterialsBarCard: React.FC<MaterialsBarCardProps> = ({
  title,
  description,
  icon,
  surfacePreviews,
  surfacesLoading,
  surfaceId,
  surfaceDensity,
  updateSurfaceId,
  handleSurfaceDensityChange,
}) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {title}
          {icon}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-5">
          <ScrollArea className="h-25 w-full rounded-md border">
            <div className="p-4 w-full flex flex-row gap-x-3">
              {surfacePreviews &&
                surfacePreviews.map((surfacePreview) => (
                  <MaterialTile
                    imageUrl={surfacePreview.imageUrl}
                    key={surfacePreview.id}
                    isLoading={surfacesLoading}
                    isActive={surfacePreview.id === surfaceId}
                    setActive={() => updateSurfaceId(surfacePreview.id)}
                  />
                ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
          <p>Density</p>
          <Slider
            value={[surfaceDensity]}
            defaultValue={[0.1]}
            min={0.01}
            max={1}
            step={0.01}
            onValueChange={(val) => {
              handleSurfaceDensityChange(val[0]);
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default MaterialsBarCard;
