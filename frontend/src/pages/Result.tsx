/* eslint-disable @typescript-eslint/no-explicit-any */
import { 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  ArrowRight, 
  Briefcase, 
  FileText,
  BrainCircuit,
  Flag,
  ThumbsUp,
  ThumbsDown
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function Result({ resultData }: { resultData: any }) {
  const { 
    companyName, role, overallScore, atsScore, credibilityScore, impactScore,
    recruiterSummary, shortlistChance, scoreBreakdown,
    strengths, weaknesses, redFlags,
    matchedSkills, importantKeywordsFound, missingSkills, missingKeywords,
    suggestions 
  } = resultData;

  const getShortlistColor = (chance: string) => {
    switch(chance.toLowerCase()) {
      case "high": return "bg-emerald-500 text-white border-emerald-700";
      case "medium": return "bg-amber-400 text-amber-950 border-amber-600";
      case "low": return "bg-rose-500 text-white border-rose-700";
      default: return "bg-zinc-200 text-zinc-800 border-zinc-400";
    }
  };

  return (
    <div className="flex flex-col gap-12 font-mono pb-16">
      
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <span className="text-2xl text-[#c0392b]">//</span>
            <h2 className="font-syne text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
              AI Analysis Report
            </h2>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-zinc-500 ml-9">
            <div className="flex items-center gap-1.5">
              <Briefcase className="h-4 w-4" />
              <span className="uppercase tracking-wider">{companyName}</span>
            </div>
            <span className="text-zinc-300 dark:text-zinc-700">|</span>
            <div className="flex items-center gap-1.5">
              <FileText className="h-4 w-4" />
              <span className="uppercase tracking-wider">{role}</span>
            </div>
            <span className="text-zinc-300 dark:text-zinc-700">|</span>
            <div className={cn("px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest border", getShortlistColor(shortlistChance))}>
              Shortlist Chance: {shortlistChance}
            </div>
          </div>
        </div>

        <div className="relative mt-2 ml-9 max-w-4xl">
          <div className="absolute inset-0 translate-x-1.5 translate-y-1.5 border border-[#1a1a1a] bg-transparent" />
          <div className="relative border border-[#1a1a1a] bg-[#f4f1e8] p-5 dark:bg-zinc-900">
            <div className="mb-3 flex items-center gap-2 text-[#c0392b]">
              <BrainCircuit className="h-4 w-4" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Recruiter AI Summary</span>
            </div>
            <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
              "{recruiterSummary}"
            </p>
          </div>
        </div>
      </div>


      <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
        <ScoreCard label="Overall Score" score={overallScore} highlight={true} />
        <ScoreCard label="ATS Compatibility" score={atsScore} />
        <ScoreCard label="Impact Score" score={impactScore} />
        <ScoreCard label="Credibility" score={credibilityScore} />
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="font-syne text-xl font-bold text-zinc-900 dark:text-white">Score Breakdown</h3>
        <div className="grid grid-cols-1 gap-x-12 gap-y-4 md:grid-cols-2">
          <ProgressBar label="Technical Skills" value={scoreBreakdown.technicalSkills} />
          <ProgressBar label="Project Relevance" value={scoreBreakdown.projectRelevance} />
          <ProgressBar label="Experience Relevance" value={scoreBreakdown.experienceRelevance} />
          <ProgressBar label="Achievements" value={scoreBreakdown.achievements} />
          <ProgressBar label="Format & ATS" value={scoreBreakdown.formatAndATS} />
        </div>
      </div>


      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Strengths */}
        <FeedbackList title="Strengths" items={strengths} icon={ThumbsUp} color="emerald" />
        
        {/* Weaknesses */}
        <FeedbackList title="Weaknesses" items={weaknesses} icon={ThumbsDown} color="amber" />
        
        {/* Red Flags */}
        <FeedbackList title="Red Flags" items={redFlags} icon={Flag} color="rose" />
      </div>


      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="relative">
          <div className="absolute inset-0 translate-x-1 translate-y-1 border border-[#1a1a1a] bg-transparent" />
          <div className="relative flex flex-col gap-6 border border-[#1a1a1a] bg-emerald-50/50 p-6 dark:bg-emerald-950/20">
            <div>
              <h3 className="mb-3 text-[11px] font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
                Matched Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {matchedSkills.map((s: string, i: number) => <Badge key={i} text={s} type="success" />)}
              </div>
            </div>
            <div className="border-t border-emerald-200/50 pt-4 dark:border-emerald-800/50">
              <h3 className="mb-3 text-[11px] font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
                Found Keywords
              </h3>
              <div className="flex flex-wrap gap-2">
                {importantKeywordsFound.map((k: string, i: number) => <Badge key={i} text={k} type="success" />)}
              </div>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 translate-x-1 translate-y-1 border border-[#1a1a1a] bg-transparent" />
          <div className="relative flex flex-col gap-6 border border-[#1a1a1a] bg-rose-50/50 p-6 dark:bg-rose-950/20">
            <div>
              <h3 className="mb-3 text-[11px] font-bold uppercase tracking-widest text-rose-700 dark:text-rose-400">
                Missing Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {missingSkills.map((s: string, i: number) => <Badge key={i} text={s} type="error" />)}
              </div>
            </div>
            <div className="border-t border-rose-200/50 pt-4 dark:border-rose-800/50">
              <h3 className="mb-3 text-[11px] font-bold uppercase tracking-widest text-rose-700 dark:text-rose-400">
                Missing Keywords
              </h3>
              <div className="flex flex-wrap gap-2">
                {missingKeywords.map((k: string, i: number) => <Badge key={i} text={k} type="error" />)}
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-[#c0392b]" />
          <h3 className="font-syne text-xl font-bold text-zinc-900 dark:text-white">Recommended Revisions</h3>
        </div>
        
        <div className="flex flex-col gap-8">
          {suggestions.map((sug: any, idx: number) => (
            <div key={idx} className="relative">
              <div className="absolute inset-0 translate-x-1.5 translate-y-1.5 border border-[#1a1a1a] bg-transparent" />
              
              <div className="relative border border-[#1a1a1a] bg-white p-6 dark:bg-zinc-900">
                <div className="flex flex-wrap items-center gap-3 border-b border-zinc-100 pb-4 dark:border-zinc-800">
                  <span className="border border-zinc-200 bg-zinc-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-zinc-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                    {sug.category}
                  </span>
                  <span className="text-xs font-semibold text-rose-600 dark:text-rose-400">
                    Issue: {sug.problem}
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2 text-sm">
                  <div className="flex flex-col gap-2 border border-rose-100 bg-rose-50/30 p-4 dark:border-rose-900/30 dark:bg-rose-950/10">
                    <span className="text-[10px] uppercase tracking-widest text-rose-500">Current (Before)</span>
                    <p className="text-zinc-600 line-through decoration-rose-300 dark:text-zinc-400">{sug.before}</p>
                  </div>
                  
                  <div className="flex flex-col gap-2 border border-emerald-100 bg-emerald-50/30 p-4 dark:border-emerald-900/30 dark:bg-emerald-950/10">
                    <span className="text-[10px] uppercase tracking-widest text-emerald-600">Suggested (After)</span>
                    <p className="text-zinc-800 font-medium dark:text-zinc-200">{sug.after}</p>
                  </div>
                </div>

                <div className="mt-4 flex items-start gap-2 border-t border-zinc-100 pt-4 dark:border-zinc-800">
                  <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-[#c0392b]" />
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    <span className="font-bold text-zinc-700 dark:text-zinc-300">AI Reasoning: </span> 
                    {sug.reason}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}


function ScoreCard({ label, score, highlight = false }: { label: string, score: number, highlight?: boolean }) {
  const getScoreColor = (s: number) => {
    if (s >= 80) return "text-emerald-600 dark:text-emerald-400";
    if (s >= 60) return "text-amber-500 dark:text-amber-400";
    return "text-rose-600 dark:text-rose-400";
  };

  return (
    <div className="relative">
      <div className="absolute inset-0 translate-x-1 translate-y-1 border border-[#1a1a1a] bg-transparent" />
      <div className={cn(
        "relative flex flex-col items-center justify-center border border-[#1a1a1a] p-6 text-center",
        highlight ? "bg-[#1a1a1a] text-white dark:bg-white dark:text-[#1a1a1a]" : "bg-white dark:bg-zinc-900"
      )}>
        <span className={cn("text-4xl font-black", !highlight && getScoreColor(score))}>
          {score}%
        </span>
        <span className={cn(
          "mt-2 text-[10px] font-bold uppercase tracking-widest",
          highlight ? "text-zinc-400 dark:text-zinc-500" : "text-zinc-500"
        )}>
          {label}
        </span>
      </div>
    </div>
  );
}

function ProgressBar({ label, value }: { label: string, value: number }) {
  const getColor = (v: number) => {
    if (v >= 80) return "bg-emerald-500";
    if (v >= 60) return "bg-amber-400";
    return "bg-rose-500";
  };

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex justify-between text-xs">
        <span className="uppercase tracking-widest text-zinc-600 dark:text-zinc-400">{label}</span>
        <span className="font-bold text-zinc-900 dark:text-white">{value}%</span>
      </div>
      <div className="h-2 w-full border border-[#1a1a1a] bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800">
        <div className={cn("h-full border-r border-[#1a1a1a] dark:border-zinc-700", getColor(value))} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

function FeedbackList({ title, items, icon: Icon, color }: { title: string, items: string[], icon: any, color: "emerald" | "amber" | "rose" }) {
  if (!items || items.length === 0) return null;

  const colorStyles = {
    emerald: "border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-900/50 dark:bg-emerald-950/20 dark:text-emerald-400",
    amber: "border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-900/50 dark:bg-amber-950/20 dark:text-amber-400",
    rose: "border-rose-200 bg-rose-50 text-rose-800 dark:border-rose-900/50 dark:bg-rose-950/20 dark:text-rose-400"
  };

  const iconColors = {
    emerald: "text-emerald-600 dark:text-emerald-500",
    amber: "text-amber-600 dark:text-amber-500",
    rose: "text-rose-600 dark:text-rose-500"
  };

  return (
    <div className={cn("flex flex-col gap-3 border p-5", colorStyles[color])}>
      <div className="flex items-center gap-2 mb-2">
        <Icon className={cn("h-4 w-4", iconColors[color])} />
        <h4 className="text-[11px] font-bold uppercase tracking-widest">{title}</h4>
      </div>
      <ul className="flex flex-col gap-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-xs">
            <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-current opacity-50" />
            <span className="leading-relaxed opacity-90">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Badge({ text, type }: { text: string, type: "success" | "error" }) {
  const isSuccess = type === "success";
  return (
    <span className={cn(
      "flex items-center gap-1.5 border px-2.5 py-1 text-xs bg-white dark:bg-black",
      isSuccess 
        ? "border-emerald-200 text-emerald-700 dark:border-emerald-800 dark:text-emerald-400" 
        : "border-rose-200 text-rose-700 dark:border-rose-800 dark:text-rose-400"
    )}>
      {isSuccess ? <CheckCircle2 className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
      {text}
    </span>
  );
}