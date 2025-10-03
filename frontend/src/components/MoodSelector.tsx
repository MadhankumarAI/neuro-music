import { Brain, Focus, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface MoodSelectorProps {
  selectedMood: string;
  onMoodChange: (mood: string) => void;
}

const moods = [
  { 
    id: "meditation", 
    label: "Meditation", 
    icon: Sparkles,
    gradient: "from-purple-500 to-pink-500",
    description: "Find inner peace"
  },
  { 
    id: "stress-relief", 
    label: "Stress Relief", 
    icon: Brain,
    gradient: "from-blue-500 to-cyan-500",
    description: "Release tension"
  },
  { 
    id: "focus", 
    label: "Focus", 
    icon: Focus,
    gradient: "from-violet-500 to-purple-500",
    description: "Enhance clarity"
  },
];

export const MoodSelector = ({ selectedMood, onMoodChange }: MoodSelectorProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-foreground">Choose Your Mood</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {moods.map((mood) => {
          const Icon = mood.icon;
          const isSelected = selectedMood === mood.id;
          
          return (
            <button
              key={mood.id}
              onClick={() => onMoodChange(mood.id)}
              className={cn(
                "relative group p-5 rounded-xl border-2 transition-all duration-300",
                "hover:scale-102",
                isSelected
                  ? "border-primary bg-gradient-to-br from-primary/10 to-accent/10"
                  : "border-border/50 bg-card hover:border-primary/50"
              )}
            >
              <div className="flex flex-col items-center gap-2">
                <div
                  className={cn(
                    "p-3 rounded-lg transition-all duration-300",
                    isSelected
                      ? `bg-gradient-to-br ${mood.gradient}`
                      : "bg-muted group-hover:bg-primary/20"
                  )}
                >
                  <Icon
                    className={cn(
                      "h-6 w-6 transition-colors duration-300",
                      isSelected ? "text-white" : "text-foreground"
                    )}
                  />
                </div>
                <div className="text-center">
                  <p className="font-semibold text-base text-foreground">{mood.label}</p>
                  <p className="text-xs text-muted-foreground">{mood.description}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
