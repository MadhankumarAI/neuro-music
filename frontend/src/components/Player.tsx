import { Pause, Play, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface PlayerProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  onStop: () => void;
  progress: number;
  currentTime: string;
  duration: string;
}

export const Player = ({
  isPlaying,
  onPlayPause,
  onStop,
  progress,
  currentTime,
  duration,
}: PlayerProps) => {
  return (
    <div className="space-y-6">
      <div className="relative p-6 rounded-2xl bg-gradient-to-br from-card to-card/50 border border-border/50 backdrop-blur-sm">
        
        <div className="flex flex-col items-center gap-4">
          {/* Play/Pause button */}
          <Button
            onClick={onPlayPause}
            size="lg"
            className={cn(
              "h-16 w-16 rounded-full transition-all duration-300",
              "bg-gradient-to-br from-primary to-accent",
              "hover:scale-105",
              "active:scale-95"
            )}
          >
            {isPlaying ? (
              <Pause className="h-7 w-7 text-white" fill="white" />
            ) : (
              <Play className="h-7 w-7 text-white" fill="white" />
            )}
          </Button>

          {/* Progress bar */}
          <div className="w-full space-y-2">
            <Progress value={progress} className="h-2" />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{currentTime}</span>
              <span>{duration}</span>
            </div>
          </div>

          {/* Stop button */}
          <Button
            onClick={onStop}
            variant="outline"
            size="sm"
            className="rounded-full border-border/50 hover:border-destructive hover:text-destructive transition-all duration-300"
          >
            <Square className="h-4 w-4 mr-2" />
            Stop Session
          </Button>
        </div>
      </div>
    </div>
  );
};
