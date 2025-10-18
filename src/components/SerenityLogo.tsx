const SerenityLogo = () => {
  return (
    <div className="flex flex-col items-center gap-6 mb-8 animate-fade-in">
      <div className="relative">
        <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl animate-pulse" />
        <div className="relative w-20 h-20 rounded-full bg-primary flex items-center justify-center text-3xl font-bold text-primary-foreground shadow-[0_0_40px_hsl(var(--primary)/0.5)]">
          S
        </div>
      </div>
      <div className="text-center space-y-3">
        <h1 className="text-5xl font-bold tracking-tight">Serenity Notes</h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Boost your productivity and mindfulness with a powerful integrated task management and journaling experience.
        </p>
      </div>
    </div>
  );
};

export default SerenityLogo;
