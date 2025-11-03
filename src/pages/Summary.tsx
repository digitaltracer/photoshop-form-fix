import { useState } from "react";
import { ArrowLeft, Calendar, Clock, Sparkles, Tag } from "lucide-react";
import { Link } from "react-router-dom";
import ThemeToggle from "@/components/ThemeToggle";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

// Mock data - will be replaced with real data later
const mockSummaries = [
  {
    id: "1",
    title: "Weekly Productivity Review",
    content: "This week showed remarkable progress across multiple fronts. Completed 12 high-priority tasks with a focus on project deliverables. Key achievements include finalizing the Q4 roadmap, conducting three successful team meetings, and implementing the new workflow system. Notable challenges included time management during peak hours, but overall productivity metrics exceeded targets by 23%. Recommendations for next week: maintain current momentum, allocate more time for deep work sessions, and continue leveraging the morning hours for creative tasks.",
    timeRange: "Nov 25 - Dec 1, 2025",
    generatedDate: "Dec 1, 2025 at 11:30 PM",
    category: "tasks",
    wordCount: 89
  },
  {
    id: "2",
    title: "Monthly Journal Insights",
    content: "November's journal entries reveal a consistent theme of personal growth and introspection. The month began with reflections on work-life balance, evolving into deeper explorations of career aspirations and creative pursuits. Mid-month entries document a shift in perspective regarding time management and priorities. A recurring pattern of evening journaling proved most effective for processing daily experiences. Key emotional themes included gratitude, ambition, and occasional frustration with pace of progress. The practice of morning pages introduced on Nov 15th has shown promising results in clarity and focus. December goals include maintaining this consistency and exploring more structured reflection prompts.",
    timeRange: "Nov 1 - Nov 30, 2025",
    generatedDate: "Nov 30, 2025 at 10:15 PM",
    category: "journal",
    wordCount: 124
  },
  {
    id: "3",
    title: "Project Sprint Summary",
    content: "Three-day sprint focused on feature implementation yielded significant progress. Completed 8 of 10 planned tasks, with two items moved to next sprint due to dependency issues. Team collaboration was exceptional, with daily standups proving particularly valuable for alignment. Technical challenges around API integration were resolved through pair programming sessions. Code review feedback was consistently positive. Performance metrics show 40% improvement in load times after optimization work. User testing revealed positive reception to new UI components. Sprint velocity exceeded estimates by 15%. Areas for improvement: better initial time estimation and earlier stakeholder communication on scope changes.",
    timeRange: "Nov 27 - Nov 29, 2025",
    generatedDate: "Nov 29, 2025 at 6:45 PM",
    category: "tasks",
    wordCount: 112
  }
];

const Summary = () => {
  const [selectedCategory, setSelectedCategory] = useState<"all" | "tasks" | "journal">("all");

  const filteredSummaries = selectedCategory === "all" 
    ? mockSummaries 
    : mockSummaries.filter(s => s.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link 
              to="/" 
              className="w-10 h-10 rounded-lg bg-card/50 border border-border/50 flex items-center justify-center hover:bg-card hover:border-border transition-all"
              aria-label="Back to home"
            >
              <ArrowLeft className="w-5 h-5 text-muted-foreground" />
            </Link>
            <div>
              <h1 className="text-2xl font-semibold text-foreground flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-primary" />
                AI Summaries
              </h1>
              <p className="text-sm text-muted-foreground">Your activity insights and reflections</p>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Filters */}
          <div className="flex gap-2 flex-wrap">
            <Badge 
              variant={selectedCategory === "all" ? "default" : "outline"}
              className="cursor-pointer px-4 py-2 text-sm"
              onClick={() => setSelectedCategory("all")}
            >
              All Summaries
            </Badge>
            <Badge 
              variant={selectedCategory === "tasks" ? "default" : "outline"}
              className="cursor-pointer px-4 py-2 text-sm"
              onClick={() => setSelectedCategory("tasks")}
            >
              Tasks
            </Badge>
            <Badge 
              variant={selectedCategory === "journal" ? "default" : "outline"}
              className="cursor-pointer px-4 py-2 text-sm"
              onClick={() => setSelectedCategory("journal")}
            >
              Journal
            </Badge>
          </div>

          {/* Summary cards */}
          <div className="space-y-6">
            {filteredSummaries.map((summary) => (
              <Card key={summary.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardHeader className="space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <CardTitle className="text-xl">{summary.title}</CardTitle>
                    <Badge variant="secondary" className="shrink-0">
                      <Tag className="w-3 h-3 mr-1" />
                      {summary.category}
                    </Badge>
                  </div>
                  <CardDescription className="space-y-2">
                    <div className="flex items-center gap-4 text-xs flex-wrap">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        {summary.timeRange}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        Generated {summary.generatedDate}
                      </span>
                      <span className="text-muted-foreground">
                        {summary.wordCount} words
                      </span>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="max-h-[300px]">
                    <p className="text-sm text-foreground/90 leading-relaxed whitespace-pre-wrap">
                      {summary.content}
                    </p>
                  </ScrollArea>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredSummaries.length === 0 && (
            <Card className="p-12 text-center">
              <div className="text-muted-foreground space-y-2">
                <Sparkles className="w-12 h-12 mx-auto opacity-50" />
                <p className="text-lg font-medium">No summaries yet</p>
                <p className="text-sm">Your AI-generated summaries will appear here</p>
              </div>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default Summary;
