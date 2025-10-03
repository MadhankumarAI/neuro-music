import { Loader2 } from "lucide-react";

interface LoaderProps {
  message?: string;
}

export const Loader = ({ message = "Generating your experience..." }: LoaderProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-12">
      <div className="relative">
        {/* Outer spinning ring */}
        <div className="absolute inset-0 rounded-full border-4 border-primary/20 animate-spin-slow" />
        
        {/* Inner icon */}
        <div className="relative p-6 rounded-full bg-gradient-to-br from-primary to-accent">
          <Loader2 className="h-10 w-10 text-white animate-spin" />
        </div>
      </div>
      
      <div className="text-center space-y-2">
        <p className="text-base font-semibold text-foreground">{message}</p>
        <p className="text-sm text-muted-foreground">This may take a moment...</p>
      </div>
    </div>
  );
};
