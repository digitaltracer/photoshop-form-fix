import { useState } from "react";
import { ArrowLeft, Calendar as CalendarIcon, Clock, Sparkles, Tag, CheckSquare, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { format, subDays, startOfMonth, endOfMonth, subMonths } from "date-fns";
import ThemeToggle from "@/components/ThemeToggle";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

// Mock data - will be replaced with real data later
const mockSummaries = [
  {
    id: "1",
    title: "Weekly Productivity Review",
    content: "This week showed remarkable progress across multiple fronts. Completed 12 high-priority tasks with a focus on project deliverables. Key achievements include finalizing the Q4 roadmap, conducting three successful team meetings, and implementing the new workflow system. Notable challenges included time management during peak hours, but overall productivity metrics exceeded targets by 23%. Recommendations for next week: maintain current momentum, allocate more time for deep work sessions, and continue leveraging the morning hours for creative tasks.",
    timeRange: "Nov 25 - Dec 1, 2025",
    generatedDate: "Dec 1, 2025 at 11:30 PM",
    category: "tasks",
    tags: ["productivity", "planning", "meetings", "roadmap", "workflow", "time-management", "deliverables", "team", "Q4", "optimization"],
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
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [includeTasks, setIncludeTasks] = useState(true);
  const [includeJournal, setIncludeJournal] = useState(true);

  const handleQuickDateSelect = (type: "7days" | "30days" | "lastMonth" | "thisMonth") => {
    const today = new Date();
    switch (type) {
      case "7days":
        setStartDate(subDays(today, 7));
        setEndDate(today);
        break;
      case "30days":
        setStartDate(subDays(today, 30));
        setEndDate(today);
        break;
      case "lastMonth":
        const lastMonth = subMonths(today, 1);
        setStartDate(startOfMonth(lastMonth));
        setEndDate(endOfMonth(lastMonth));
        break;
      case "thisMonth":
        setStartDate(startOfMonth(today));
        setEndDate(today);
        break;
    }
  };

  const handleGenerateSummary = () => {
    // TODO: Implement AI summary generation
    console.log("Generate summary", { startDate, endDate, includeTasks, includeJournal });
  };

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
          {/* Generate New Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                Generate New Summary
              </CardTitle>
              <CardDescription>
                Select a date range and content type to generate an AI summary
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Date Range Selection */}
              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Start Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !startDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={startDate}
                          onSelect={setStartDate}
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label>End Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !endDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={endDate}
                          onSelect={setEndDate}
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                {/* Quick Date Buttons */}
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleQuickDateSelect("7days")}
                  >
                    Last 7 Days
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleQuickDateSelect("30days")}
                  >
                    Last 30 Days
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleQuickDateSelect("lastMonth")}
                  >
                    Last Month
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleQuickDateSelect("thisMonth")}
                  >
                    This Month
                  </Button>
                </div>
              </div>

              {/* Content Type Selection */}
              <div className="space-y-3">
                <Label>Include Content</Label>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div 
                    className={cn(
                      "flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all",
                      includeTasks 
                        ? "border-primary bg-primary/5" 
                        : "border-border bg-card hover:border-border/80"
                    )}
                    onClick={() => setIncludeTasks(!includeTasks)}
                  >
                    <Checkbox
                      id="tasks"
                      checked={includeTasks}
                      onCheckedChange={(checked) => setIncludeTasks(checked as boolean)}
                      className="pointer-events-none"
                    />
                    <div className="flex items-center gap-2 flex-1">
                      <CheckSquare className="w-4 h-4 text-primary" />
                      <Label
                        htmlFor="tasks"
                        className="text-sm font-medium cursor-pointer pointer-events-none"
                      >
                        Tasks from ActionHub
                      </Label>
                    </div>
                  </div>
                  <div 
                    className={cn(
                      "flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all",
                      includeJournal 
                        ? "border-primary bg-primary/5" 
                        : "border-border bg-card hover:border-border/80"
                    )}
                    onClick={() => setIncludeJournal(!includeJournal)}
                  >
                    <Checkbox
                      id="journal"
                      checked={includeJournal}
                      onCheckedChange={(checked) => setIncludeJournal(checked as boolean)}
                      className="pointer-events-none"
                    />
                    <div className="flex items-center gap-2 flex-1">
                      <BookOpen className="w-4 h-4 text-primary" />
                      <Label
                        htmlFor="journal"
                        className="text-sm font-medium cursor-pointer pointer-events-none"
                      >
                        Journal Entries
                      </Label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Generate Button */}
              <Button
                className="w-full"
                onClick={handleGenerateSummary}
                disabled={!startDate || !endDate || (!includeTasks && !includeJournal)}
              >
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Summary
              </Button>
            </CardContent>
          </Card>

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
                        <CalendarIcon className="w-3.5 h-3.5" />
                        Generated {summary.generatedDate}
                      </span>
                      <span className="text-muted-foreground">
                        {summary.wordCount} words
                      </span>
                    </div>
                    {summary.tags && summary.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {summary.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs px-2 py-0.5">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
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
