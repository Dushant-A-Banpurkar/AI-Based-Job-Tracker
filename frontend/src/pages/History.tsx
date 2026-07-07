/* eslint-disable @typescript-eslint/no-explicit-any */
// AnalysisTimelinePage.tsx
import React, { useMemo } from "react";
import { useGetHistory } from "@/hooks/useGetHistory";
import { Calendar, ArrowRight, TrendingUp, TrendingDown, Activity, Loader2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

export default function AnalysisTimelinePage() {
  const { data, isLoading, isError, error } = useGetHistory();
  const navigate = useNavigate();

  // 1. Data Transformation & Trend Calculation
  const formattedHistory = useMemo(() => {
    // Assuming backend returns an object with a 'data' array based on your previous APIs
    const rawHistory = Array.isArray(data) ? data: (data?.data || []);
    
    // Sort from newest to oldest
    const sorted = [...rawHistory].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return sorted.map((item, index, array) => {
      // The "previous" analysis is actually the NEXT item in this descending array
      const previousItem = array[index + 1];
      
      const dateObj = new Date(item.createdAt);
      
      return {
        id: item._id,
        date: dateObj.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        time: dateObj.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
        company: item.companyName || "Unknown Company",
        role: item.role || "Role not specified",
        score: item.overallScore || item.atsScore || 0,
        previousScore: previousItem ? (previousItem.overallScore || previousItem.atsScore || 0) : null,
        chance: item.shortlistChance || "N/A",
        // Fallback to a generic string if no summary exists
        keyInsight: item.recruiterSummary || "Analysis completed successfully.",
      };
    });
  }, [data]);

  // 2. Loading State
  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-[#c0392b]" />
        <p className="font-mono text-sm text-zinc-500">Loading your history...</p>
      </div>
    );
  }

  // 3. Error State
  if (isError) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="flex max-w-md items-center gap-3 border border-red-200 bg-red-50 p-6 font-mono text-sm text-red-600">
          <AlertCircle className="h-6 w-6 shrink-0" />
          <span>{error instanceof Error ? error.message : "Failed to load history."}</span>
        </div>
      </div>
    );
  }

  // 4. Empty State
  if (formattedHistory.length === 0) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="border border-dashed border-zinc-300 p-20 text-center font-mono">
          <p className="text-zinc-400">No analysis history found.</p>
          <button 
            onClick={() => navigate('/analysis')}
            className="mt-4 text-[#c0392b] hover:underline"
          >
            Analyze your first resume →
          </button>
        </div>
      </div>
    );
  }

  // 5. Main UI
  return (
    <div className="flex flex-col gap-10 pb-20 font-mono px-16">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <span className="text-2xl text-[#c0392b]">//</span>
          <h2 className="font-syne text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
            Analysis Journey
          </h2>
        </div>
        <p className="ml-9 text-sm text-zinc-500">
          Track your resume iterations and score progression over time.
        </p>
      </div>

      <div className="relative ml-4 mt-4 md:ml-8">
        <div className="absolute bottom-0 left-0 top-0 w-0.5 bg-[#1a1a1a] dark:bg-zinc-800" />
        <div className="flex flex-col gap-12">
          {formattedHistory.map((item, index) => (
            <TimelineNode 
              key={item.id} 
              data={item} 
              isLatest={index === 0} 
              onView={() => navigate(`/analysis/${item.id}`)} // Enables clicking to the full report
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// --- Sub-Component: Timeline Node ---
function TimelineNode({ data, isLatest, onView }: { data: any, isLatest: boolean, onView: () => void }) {
  const isUp = data.previousScore !== null && data.score >= data.previousScore;
  // const isDown = data.previousScore !== null && data.score < data.previousScore;

  const getChanceColor = (chance: string) => {
    switch(chance.toLowerCase()) {
      case "high": return "bg-emerald-500 text-white border-emerald-700";
      case "medium": return "bg-amber-400 text-amber-950 border-amber-600";
      case "low": return "bg-rose-500 text-white border-rose-700";
      default: return "bg-zinc-200 text-zinc-800 border-zinc-400";
    }
  };

  return (
    <div className="relative pl-8 md:pl-12 group">
      <div className={cn(
        "absolute -left-1.25 top-1.5 h-3 w-3 rounded-none border-2 transition-colors z-10",
        isLatest 
          ? "bg-[#c0392b] border-[#c0392b] shadow-[0_0_10px_rgba(192,57,43,0.5)]" 
          : "bg-white border-[#1a1a1a] dark:bg-zinc-950 dark:border-zinc-700 group-hover:border-[#c0392b]"
      )} />

      <div className="mb-3 flex items-center gap-3 text-xs text-zinc-500">
        <span className="flex items-center gap-1.5 font-bold uppercase tracking-widest text-zinc-800 dark:text-zinc-300">
          <Calendar className="h-3.5 w-3.5 text-[#c0392b]" />
          {data.date}
        </span>
        <span className="opacity-50">|</span>
        <span>{data.time}</span>
      </div>

      <div className="relative max-w-3xl cursor-pointer" onClick={onView}>
        <div className="absolute inset-0 translate-x-1.5 translate-y-1.5 border border-[#1a1a1a] bg-transparent transition-transform group-hover:translate-x-1 group-hover:translate-y-1" />
        
        <div className="relative flex flex-col border border-[#1a1a1a] bg-[#f4f1e8] dark:bg-zinc-900 transition-colors">
          <div className="flex flex-col justify-between border-b border-zinc-200 p-5 dark:border-zinc-800 md:flex-row md:items-center">
            <div className="space-y-1">
              <h3 className="font-syne text-xl font-bold text-zinc-900 dark:text-white">
                {data.company}
              </h3>
              <p className="text-[11px] uppercase tracking-widest text-zinc-500">
                {data.role}
              </p>
            </div>

            <div className="mt-4 flex items-center gap-4 md:mt-0">
               {data.previousScore !== null && (
                 <div className="flex flex-col items-end">
                    <span className="text-[9px] uppercase tracking-widest text-zinc-400">Trend</span>
                    <div className={cn(
                      "flex items-center gap-1 text-xs font-bold",
                      isUp ? "text-emerald-600" : "text-rose-600"
                    )}>
                      {isUp ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
                      {isUp ? "+" : ""}{data.score - data.previousScore} pts
                    </div>
                 </div>
               )}
              <div className="flex h-12 w-12 items-center justify-center border text-white border-[#1a1a1a] bg-white text-lg font-black dark:bg-black">
                {data.score}
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between bg-white p-5 dark:bg-black/40 sm:flex-row sm:items-end">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <span className={cn("px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest border", getChanceColor(data.chance))}>
                  Chance: {data.chance}
                </span>
              </div>
              <div className="flex items-start gap-2 text-xs text-zinc-600 dark:text-zinc-400 max-w-lg">
                <Activity className="h-4 w-4 shrink-0 text-amber-500 mt-0.5" />
                <p className="line-clamp-2">"{data.keyInsight}"</p>
              </div>
            </div>

            <button className="mt-4 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#c0392b] sm:mt-0 transition-transform group-hover:translate-x-1">
              View Report <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}