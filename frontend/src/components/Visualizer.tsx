import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface VisualizerProps {
  isPlaying: boolean;
}

export const Visualizer = ({ isPlaying }: VisualizerProps) => {
  const [bars] = useState(() => Array.from({ length: 40 }, (_, i) => i));

  return (
    <div className="relative w-full h-32 rounded-2xl bg-gradient-to-br from-card to-card/50 border border-border/50 backdrop-blur-sm overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center gap-1 px-4">
        {bars.map((bar) => (
          <div
            key={bar}
            className={cn(
              "flex-1 rounded-full transition-all duration-300",
              "bg-gradient-to-t from-primary via-secondary to-accent",
              isPlaying ? "animate-wave" : "opacity-30"
            )}
            style={{
              height: isPlaying ? `${Math.random() * 80 + 20}%` : "20%",
              animationDelay: `${bar * 0.05}s`,
            }}
          />
        ))}
      </div>
      
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent pointer-events-none" />
    </div>
  );
};
