/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from "react";
import { useGetHistory } from "@/hooks/useGetHistory";
import {
  Calendar,
  ArrowRight,
  TrendingUp,
  TrendingDown,
  Activity,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

export default function AnalysisTimelinePage() {
  const { data, isLoading, isError, error } = useGetHistory();
  const navigate = useNavigate();

  // 1. Data Transformation & Trend Calculation
  const formattedHistory = useMemo(() => {
    const rawHistory = Array.isArray(data) ? data : data?.data || [];

    // Sort from newest to oldest
    const sorted = [...rawHistory].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return sorted.map((item, index, array) => {
      // The "previous" analysis is the NEXT item in this descending array
      const previousItem = array[index + 1];
      const dateObj = new Date(item.createdAt);

      // Handle cases where recruiterSummary might be an object or string
      const summaryText =
        typeof item.recruiterSummary === "string"
          ? item.recruiterSummary
          : item.recruiterSummary?.overview || "Analysis completed successfully.";

      return {
        id: item._id,
        date: dateObj.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        time: dateObj.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        company: item.companyName || "Unknown Company",
        role: item.role || "Role not specified",
        score: item.overallScore ?? item.atsScore ?? 0,
        previousScore: previousItem
          ? (previousItem.overallScore ?? previousItem.atsScore ?? 0)
          : null,
        chance: item.shortlistChance || "N/A",
        keyInsight: summaryText,
      };
    });
  }, [data]);

  // 2. Loading State
  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-4 text-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#c0392b]" />
        <p className="font-mono text-xs sm:text-sm text-zinc-500">
          Loading your history...
        </p>
      </div>
    );
  }

  // 3. Error State
  if (isError) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center px-4">
        <div className="flex w-full max-w-md items-center gap-3 border border-red-200 bg-red-50 p-4 sm:p-6 font-mono text-xs sm:text-sm text-red-600 dark:border-red-900/50 dark:bg-red-950/20 dark:text-red-400">
          <AlertCircle className="h-5 w-5 sm:h-6 sm:w-6 shrink-0" />
          <span>
            {error instanceof Error ? error.message : "Failed to load history."}
          </span>
        </div>
      </div>
    );
  }

  // 4. Empty State
  if (formattedHistory.length === 0) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center px-4">
        <div className="w-full max-w-md border border-dashed border-zinc-300 dark:border-zinc-800 p-8 sm:p-16 text-center font-mono">
          <p className="text-xs sm:text-sm text-zinc-400">
            No analysis history found.
          </p>
          <button
            onClick={() => navigate("/analysis")}
            className="mt-4 text-xs sm:text-sm text-[#c0392b] hover:underline font-bold cursor-pointer"
          >
            Analyze your first resume →
          </button>
        </div>
      </div>
    );
  }

  // 5. Main UI
  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-8 sm:gap-10 pb-16 sm:pb-20 font-mono px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col gap-1.5 sm:gap-2">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <span className="text-xl sm:text-2xl text-[#c0392b] font-bold">//</span>
          <h2 className="font-syne text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
            Analysis Journey
          </h2>
        </div>
        <p className="ml-7 sm:ml-9 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
          Track your resume iterations and score progression over time.
        </p>
      </div>

      {/* Timeline Wrapper */}
      <div className="relative ml-2 sm:ml-4 md:ml-8 mt-2 sm:mt-4">
        {/* Continuous Timeline Vertical Line */}
        <div className="absolute bottom-0 left-0 top-0 w-0.5 bg-[#1a1a1a] dark:bg-zinc-800" />

        <div className="flex flex-col gap-8 sm:gap-10 md:gap-12">
          {formattedHistory.map((item, index) => (
            <TimelineNode
              key={item.id}
              data={item}
              isLatest={index === 0}
              onView={() => navigate(`/analysis/${item.id}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// --- Sub-Component: Timeline Node ---
function TimelineNode({
  data,
  isLatest,
  onView,
}: {
  data: any;
  isLatest: boolean;
  onView: () => void;
}) {
  const scoreDiff =
    data.previousScore !== null ? data.score - data.previousScore : 0;
  const isUp = scoreDiff >= 0;

  const getChanceColor = (chance: string) => {
    switch (chance.toLowerCase()) {
      case "high":
        return "bg-emerald-500 text-white border-emerald-700";
      case "medium":
        return "bg-amber-400 text-amber-950 border-amber-600";
      case "low":
        return "bg-rose-500 text-white border-rose-700";
      default:
        return "bg-zinc-200 text-zinc-800 border-zinc-400 dark:bg-zinc-800 dark:text-zinc-200 dark:border-zinc-600";
    }
  };

  return (
    <div className="relative pl-5 sm:pl-8 md:pl-10 group">
      {/* Bullet Dot - Centered exactly on the left line */}
      <div
        className={cn(
          "absolute -left-[5px] top-1.5 h-3 w-3 rounded-none border-2 transition-colors z-10",
          isLatest
            ? "bg-[#c0392b] border-[#c0392b] shadow-[0_0_10px_rgba(192,57,43,0.5)]"
            : "bg-white border-[#1a1a1a] dark:bg-zinc-950 dark:border-zinc-700 group-hover:border-[#c0392b]"
        )}
      />

      {/* Date & Time Header */}
      <div className="mb-2.5 sm:mb-3 flex flex-wrap items-center gap-2 sm:gap-3 text-[11px] sm:text-xs text-zinc-500">
        <span className="flex items-center gap-1.5 font-bold uppercase tracking-widest text-zinc-800 dark:text-zinc-300">
          <Calendar className="h-3.5 w-3.5 text-[#c0392b]" />
          {data.date}
        </span>
        <span className="opacity-40">|</span>
        <span>{data.time}</span>
      </div>

      {/* Interactive Card */}
      <div className="relative w-full max-w-3xl cursor-pointer" onClick={onView}>
        {/* Brutalist Shadow Box */}
        <div className="absolute inset-0 translate-x-1 sm:translate-x-1.5 translate-y-1 sm:translate-y-1.5 border border-[#1a1a1a] bg-transparent transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5 dark:border-zinc-700" />

        {/* Outer Card Body */}
        <div className="relative flex flex-col border border-[#1a1a1a] bg-[#f4f1e8] dark:bg-zinc-900 transition-colors dark:border-zinc-800">
          {/* Top Section: Company, Role, Trend & Score */}
          <div className="flex flex-col gap-3 p-4 sm:p-5 border-b border-zinc-200 dark:border-zinc-800 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-0.5 sm:space-y-1 pr-2">
              <h3 className="font-syne text-base sm:text-lg md:text-xl font-bold text-zinc-900 dark:text-white break-words">
                {data.company}
              </h3>
              <p className="text-[10px] sm:text-[11px] uppercase tracking-widest text-zinc-500 font-semibold">
                {data.role}
              </p>
            </div>

            {/* Score & Trend Container */}
            <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4 pt-2 sm:pt-0 border-t border-zinc-200/60 sm:border-t-0 dark:border-zinc-800/60">
              {data.previousScore !== null && (
                <div className="flex flex-col sm:items-end">
                  <span className="text-[9px] uppercase tracking-widest text-zinc-400">
                    Trend
                  </span>
                  <div
                    className={cn(
                      "flex items-center gap-1 text-xs font-bold",
                      isUp
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-rose-600 dark:text-rose-400"
                    )}
                  >
                    {isUp ? (
                      <TrendingUp className="h-3.5 w-3.5" />
                    ) : (
                      <TrendingDown className="h-3.5 w-3.5" />
                    )}
                    {isUp ? "+" : ""}
                    {scoreDiff} pts
                  </div>
                </div>
              )}

              {/* Overall Score Box */}
              <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center border border-[#1a1a1a] bg-white text-zinc-900 text-base sm:text-lg font-black dark:bg-black dark:text-white dark:border-zinc-700">
                {data.score}
              </div>
            </div>
          </div>

          {/* Bottom Section: Chance Badge, Insight & Action Button */}
          <div className="flex flex-col gap-4 p-4 sm:p-5 bg-white dark:bg-black/40 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex flex-col gap-2.5 sm:gap-3">
              <div>
                <span
                  className={cn(
                    "inline-block px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest border",
                    getChanceColor(data.chance)
                  )}
                >
                  Chance: {data.chance}
                </span>
              </div>
              <div className="flex items-start gap-2 text-xs text-zinc-600 dark:text-zinc-400 max-w-lg">
                <Activity className="h-4 w-4 shrink-0 text-amber-500 mt-0.5" />
                <p className="line-clamp-2 leading-relaxed">
                  "{data.keyInsight}"
                </p>
              </div>
            </div>

            {/* View Report Indicator */}
            <div className="flex items-center justify-end sm:justify-start gap-2 text-xs font-bold uppercase tracking-widest text-[#c0392b] pt-2 sm:pt-0 border-t border-zinc-100 sm:border-t-0 dark:border-zinc-800/40 transition-transform group-hover:translate-x-1 shrink-0">
              <span>Views Report</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}