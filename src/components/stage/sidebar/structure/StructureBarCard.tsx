import * as React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface StructureBarCardProps {
  title: string;
  description: string;
  inputLabel: string;
  icon: React.ReactNode;
  currentValue: number;
  minValue: number;
  maxValue: number;
  unitLabel?: string;
  sliderStep?: number;
  handleValueChange: (value: number) => void;
}

const StructureBarCard: React.FC<StructureBarCardProps> = ({
  title,
  description,
  inputLabel,
  icon,
  currentValue,
  minValue,
  maxValue,
  unitLabel,
  sliderStep,
  handleValueChange,
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
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5 gap-y-5">
              <div className="flex flex-row gap-5">
                <Label htmlFor="name">{inputLabel}</Label>
                <div className="flex flex-row">
                  <Input
                    className="rounded-r-none"
                    value={currentValue}
                    min={minValue}
                    max={maxValue}
                    onChange={(e) => {
                      handleValueChange(
                        Math.min(Number(e.target.value), maxValue)
                      );
                    }}
                    id="name"
                    placeholder={inputLabel}
                  />
                  {unitLabel && (
                    <Input
                      className="w-[60px] rounded-l-none"
                      value={unitLabel}
                      disabled
                    />
                  )}
                </div>
              </div>

              <Slider
                value={[currentValue]}
                defaultValue={[minValue]}
                min={minValue}
                max={maxValue}
                step={sliderStep ?? 1}
                onValueChange={(val) => {
                  handleValueChange(val[0]);
                }}
              />
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default StructureBarCard;
