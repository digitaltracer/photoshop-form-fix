import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

const EnhancedTextInput = () => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="w-full max-w-4xl mx-auto mb-8 animate-scale-in">
      <div className="relative group">
        {/* Gradient border effect */}
        <div className={`absolute -inset-[2px] bg-gradient-to-r from-primary via-purple-500 to-primary rounded-2xl opacity-0 blur-sm transition-all duration-500 ${isFocused ? 'opacity-100 blur-md' : 'group-hover:opacity-50'}`} />
        
        {/* Main input container */}
        <div className="relative bg-[hsl(var(--input-elevated))] rounded-2xl shadow-[var(--shadow-elevated)] transition-all duration-300 overflow-hidden">
          {/* Subtle top highlight */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          
          <Textarea
            placeholder="Speak naturally... 'Remind me to call mom tomorrow afternoon', or 'I felt great after my run today'. Press Enter to capture."
            className="min-h-[180px] bg-transparent border-none text-base leading-relaxed resize-none focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground/60 p-8"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          
          {/* Bottom info bar */}
          <div className="border-t border-border/50 px-8 py-4 bg-card/30 backdrop-blur-sm">
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground flex-1">
                Just write like you speak. We'll interpret it into a task or a journal entry, and fill in tags, priority, and due dates automatically.
              </p>
              <span className="text-xs px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 whitespace-nowrap shrink-0">
                Provider: gemini
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedTextInput;
