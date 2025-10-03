import { useState, useRef, useEffect } from "react";
import { MoodSelector } from "@/components/MoodSelector";
import { DurationSlider } from "@/components/DurationSlider";
import { Player } from "@/components/Player";
import { Visualizer } from "@/components/Visualizer";
import { Loader } from "@/components/Loader";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { generateMusic } from "@/api/musicApi";
import { toast } from "@/hooks/use-toast";
import { Sparkles } from "lucide-react";

const Index = () => {
  const [mood, setMood] = useState("meditation");
  const [duration, setDuration] = useState(15);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [totalDuration, setTotalDuration] = useState("0:00");
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const audioBlob = await generateMusic({ mood, duration });
      const url = URL.createObjectURL(audioBlob);
      setAudioUrl(url);
      
      if (audioRef.current) {
        audioRef.current.src = url;
      }
      
      toast({
        title: "Music Generated!",
        description: "Your personalized experience is ready.",
      });
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Unable to generate music. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePlayPause = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleStop = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setIsPlaying(false);
    setProgress(0);
    setCurrentTime("0:00");
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      const current = audio.currentTime;
      const total = audio.duration;
      if (total) {
        setProgress((current / total) * 100);
        setCurrentTime(formatTime(current));
        setTotalDuration(formatTime(total));
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
      setCurrentTime("0:00");
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("loadedmetadata", updateProgress);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("loadedmetadata", updateProgress);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 relative overflow-hidden">
      {/* Animated background elements - only in light mode */}
      <div className="dark:hidden absolute top-20 left-10 w-48 h-48 bg-primary/5 rounded-full blur-3xl animate-float" />
      <div className="dark:hidden absolute bottom-20 right-10 w-64 h-64 bg-accent/5 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
      
      <div className="relative z-10 container max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="flex items-center justify-between mb-12 animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-primary to-accent shadow-lg">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">{/* ... keep existing code */}
                Saphire for Life
              </h1>
              <p className="text-sm text-muted-foreground">Neuroscience-Powered Wellness</p>
            </div>
          </div>
          <ThemeToggle />
        </header>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Mood Selector */}
          <div className="animate-fade-in-scale" style={{ animationDelay: "0.1s" }}>
            <MoodSelector selectedMood={mood} onMoodChange={setMood} />
          </div>

          {/* Duration Slider */}
          <div className="animate-fade-in-scale" style={{ animationDelay: "0.2s" }}>
            <DurationSlider duration={duration} onDurationChange={setDuration} />
          </div>

          {/* Generate Button */}
          {!audioUrl && !isGenerating && (
            <div className="flex justify-center animate-fade-in-scale" style={{ animationDelay: "0.3s" }}>
              <Button
                onClick={handleGenerate}
                size="lg"
                className="rounded-full px-6 py-5 bg-gradient-to-r from-primary to-accent hover:scale-105 transition-transform duration-300"
              >
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Experience
              </Button>
            </div>
          )}

          {/* Loader */}
          {isGenerating && <Loader />}

          {/* Player and Visualizer */}
          {audioUrl && !isGenerating && (
            <div className="space-y-6 animate-fade-in-scale">
              <Visualizer isPlaying={isPlaying} />
              <Player
                isPlaying={isPlaying}
                onPlayPause={handlePlayPause}
                onStop={handleStop}
                progress={progress}
                currentTime={currentTime}
                duration={totalDuration}
              />
            </div>
          )}
        </div>

        {/* Hidden audio element */}
        <audio ref={audioRef} className="hidden" />
      </div>
    </div>
  );
};

export default Index;
