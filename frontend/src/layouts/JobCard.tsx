import { cn } from "@/lib/utils";
import { getStatusConfig, type JobApp } from "@/types/job";
import { Calendar, MapPin, Target, Pencil } from "lucide-react";

const formDate = (isoString: string) => {
  if (!isoString) return "N/A";
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(isoString));
};

interface JobCardProps {
  app: JobApp;
  onUpdate?: (app: JobApp) => void;
}

export function JobCard({ app, onUpdate }: JobCardProps) {
  const config = getStatusConfig(app.status);

  return (
    <div className="relative mb-6 w-full max-w-7xl group">
      <div className="absolute inset-0 translate-x-1 translate-y-1 border border-zinc-700 dark:border-white bg-transparent transition-transform duration-300 ease-in-out group-hover:translate-x-2 group-hover:translate-y-2" />

      <div className="relative border border-[#1a1a1a] bg-[#fdfcf9] p-4 sm:p-5 font-mono dark:bg-zinc-900">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-1">
            <h3 className="font-syne text-xl font-bold text-zinc-900 dark:text-white">
              {app.company}
            </h3>
            <p className="text-sm text-zinc-400 uppercase tracking-tight">
              {app.role}
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <div
              className={cn(
                "border h-7 px-2.5 py-0.5 text-xs font-bold uppercase tracking-widest rounded-xs flex items-center justify-center",
                config.color,
              )}
            >
              {app.status}
            </div>

            <button
              type="button"
              onClick={() => onUpdate?.(app)}
              className="flex h-7 items-center gap-1.5 border border-zinc-700 bg-zinc-800/60 px-2.5 text-xs font-bold uppercase tracking-wider text-zinc-300 transition-all hover:border-[#c0392b] hover:bg-[#c0392b] hover:text-white active:scale-95 cursor-pointer"
              title="Update application details"
            >
              <Pencil className="h-3 w-3" />
              <span>Update</span>
            </button>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-4 sm:gap-6 text-[11px] text-zinc-500">
          <div className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 text-blue-400" />
            {formDate(app.applied_date)}
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-rose-400" />
            {app.location}
          </div>
          {app.interview_date && (
            <div className="flex items-center gap-1.5">
              <Target className="h-3.5 w-3.5 text-purple-400" />
              {formDate(app.interview_date)}
            </div>
          )}
        </div>

        <div className="mt-6 grid grid-cols-5 gap-1.5">
          {[0, 1, 2, 3, 4].map((step) => {
            const isCurrent =
              app.status !== "REJECTED" && step === config.progress;
            const isFilled =
              app.status !== "REJECTED" && step < config.progress;

            return (
              <div
                key={step}
                className={cn(
                  "h-1 transition-all duration-500",
                  isFilled
                    ? "bg-[#1a1a1a] dark:bg-white"
                    : "bg-zinc-200 dark:bg-zinc-800",
                  isCurrent && "bg-rose-600",
                )}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function JobCardSkeleton() {
  return (
    <div className="relative mb-6 w-full max-w-7xl">
      <div className="absolute inset-0 translate-x-1 translate-y-1 border border-[#1a1a1a] bg-transparent" />
      <div className="relative border border-[#1a1a1a] bg-[#fdfcf9] p-5 dark:bg-zinc-900 animate-pulse">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="h-5 w-32 rounded bg-zinc-200 dark:bg-zinc-700" />
            <div className="h-3 w-48 rounded bg-zinc-100 dark:bg-zinc-800" />
          </div>
          <div className="flex gap-2">
            <div className="h-7 w-20 rounded bg-zinc-100 dark:bg-zinc-800" />
            <div className="h-7 w-16 rounded bg-zinc-100 dark:bg-zinc-800" />
          </div>
        </div>
        <div className="mt-4 flex gap-6">
          <div className="h-3 w-20 rounded bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-3 w-20 rounded bg-zinc-100 dark:bg-zinc-800" />
        </div>
        <div className="mt-6 grid grid-cols-5 gap-1.5">
          {[1, 2, 3, 4, 5].map((s) => (
            <div key={s} className="h-1 rounded bg-zinc-100 dark:bg-zinc-800" />
          ))}
        </div>
      </div>
    </div>
  );
}
