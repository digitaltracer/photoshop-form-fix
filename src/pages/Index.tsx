import SerenityLogo from "@/components/SerenityLogo";
import EnhancedTextInput from "@/components/EnhancedTextInput";
import FeatureCard from "@/components/FeatureCard";
import { CheckSquare, BookOpen, Search, HelpCircle, Monitor } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header with icons */}
      <header className="fixed top-0 right-0 p-6 flex gap-4 z-50">
        <button className="w-10 h-10 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50 flex items-center justify-center hover:bg-card transition-colors">
          <Search className="w-5 h-5 text-muted-foreground" />
        </button>
        <button className="w-10 h-10 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50 flex items-center justify-center hover:bg-card transition-colors">
          <HelpCircle className="w-5 h-5 text-muted-foreground" />
        </button>
        <button className="w-10 h-10 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50 flex items-center justify-center hover:bg-card transition-colors">
          <Monitor className="w-5 h-5 text-muted-foreground" />
        </button>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-6 py-20 flex flex-col items-center">
        <div className="w-full max-w-6xl">
          {/* Hero section */}
          <div className="pt-12 pb-16">
            <SerenityLogo />
          </div>

          {/* Enhanced text input */}
          <div className="mb-20">
            <EnhancedTextInput />
          </div>

          {/* Feature cards */}
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <FeatureCard
              icon={CheckSquare}
              title="ActionHub"
              description="Efficiently manage tasks, projects, and priorities with a customizable workflow."
              delay="0.1s"
            />
            <FeatureCard
              icon={BookOpen}
              title="Journal"
              description="Capture thoughts, ideas, and reflections with a private, secure journaling system."
              delay="0.2s"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
