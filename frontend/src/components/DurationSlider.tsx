import { Slider } from "@/components/ui/slider";
import { Clock } from "lucide-react";

interface DurationSliderProps {
  duration: number;
  onDurationChange: (duration: number) => void;
}

export const DurationSlider = ({ duration, onDurationChange }: DurationSliderProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-semibold text-foreground">Duration</h2>
        </div>
        <div className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          {duration} min
        </div>
      </div>
      <Slider
        value={[duration]}
        onValueChange={(values) => onDurationChange(values[0])}
        min={5}
        max={60}
        step={5}
        className="w-full"
      />
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>5 min</span>
        <span>30 min</span>
        <span>60 min</span>
      </div>
    </div>
  );
};
