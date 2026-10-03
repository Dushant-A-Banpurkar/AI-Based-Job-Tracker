/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from "react";
import { useGetAllApplications } from "@/hooks/useGet";
import { useGetHistory } from "@/hooks/useGetHistory";
import { JobCard, JobCardSkeleton } from "@/layouts/JobCard";
import { useNavigate } from "react-router-dom";
import { Calendar, Activity, ArrowRight, Loader2 } from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();

  const { data: applications, isLoading: appsLoading } =
    useGetAllApplications();
  const { data: historyData, isLoading: historyLoading } = useGetHistory();

  const stats = useMemo(() => {
    if (!applications) return { total: 0, interviews: 0, offers: 0, rate: 0 };

    const total = applications.length;
    const interviews = applications.filter((a) =>
      ["INTERVIEW", "SCREENING"].includes(a.status),
    ).length;
    const offers = applications.filter((a) => a.status === "OFFER").length;

    const responded = applications.filter((a) => a.status !== "APPLIED").length;
    const rate = total > 0 ? Math.round((responded / total) * 100) : 0;

    return { total, interviews, offers, rate };
  }, [applications]);

  const recentApps = useMemo(
    () => applications?.slice(0, 3) || [],
    [applications],
  );

  // const upcomingInterviews = useMemo(() => {
  //   if (!applications) return [];
  //   return applications
  //     .filter(a => ['INTERVIEW', 'SCREENING'].includes(a.status) && a.interview_date)
  //     .sort((a, b) => new Date(a.interview_date!).getTime() - new Date(b.interview_date!).getTime())
  //     .slice(0, 4);
  // }, [applications]);

  const recentHistory = useMemo(() => {
    const rawHistory = Array.isArray(historyData)
      ? historyData
      : historyData?.data || [];
    return [...rawHistory]
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )
      .slice(0, 2);
  }, [historyData]);

  return (
    <div className="min-h-screen  px-4 py-8 sm:px-8 md:px-12 font-mono">
      {/* STATS ROW */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <StatCard
          title="TOTAL APPLIED"
          value={stats.total.toString()}
          sub="+3 this week"
        />
        <StatCard
          title="INTERVIEWS"
          value={stats.interviews.toString()}
          sub={`${stats.interviews} upcoming`}
        />
        <StatCard
          title="OFFERS"
          value={stats.offers.toString()}
          sub="Under consideration"
        />
        <StatCard
          title="RESPONSE RATE"
          value={`${stats.rate}%`}
          sub="Above avg (25%)"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 flex flex-col gap-10">
          <section>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-xl text-[#c0392b] font-bold">//</span>
              <h2 className="font-syne text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
                Recent Applications
              </h2>
            </div>

            <div className="flex flex-col">
              {appsLoading && (
                <>
                  <JobCardSkeleton />
                  <JobCardSkeleton />
                </>
              )}
              {!appsLoading && recentApps.length === 0 && (
                <p className="text-sm text-zinc-500">No applications found.</p>
              )}
              {recentApps.map((app) => (
                <JobCard
                  key={app._id}
                  app={app}
                  onUpdate={(app) => navigate(`/updateapplication/${app._id}`)}
                />
              ))}
            </div>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-xl text-[#c0392b] font-bold">//</span>
              <h2 className="font-syne text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
                Recent AI Analysis
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white">
              {historyLoading && (
                <Loader2 className="h-6 w-6 animate-spin text-[#c0392b]" />
              )}
              {!historyLoading && recentHistory.length === 0 && (
                <p className="text-sm text-zinc-500">
                  No analysis history found.
                </p>
              )}
              {recentHistory.map((item) => (
                <HistoryMiniCard
                  key={item._id}
                  item={item}
                  onClick={() => navigate(`/analysis/${item._id}`)}
                />
              ))}
            </div>
          </section>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-8">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-xl text-[#c0392b] font-bold">//</span>
              <h2 className="font-syne text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
                AI Interviews Analysis Data
              </h2>
            </div>
            <h2 className="font-syne ml-3 text-xl font-bold tracking-tight text-gray-500 dark:text-gray-400">
              Comming Soon...
            </h2>
            {/* <div className="relative group">
              <div className="absolute inset-0 translate-x-1.5 translate-y-1.5 border border-[#1a1a1a] dark:border-zinc-700 bg-transparent" />
              <div className="relative border border-[#1a1a1a] dark:border-zinc-700 bg-white dark:bg-zinc-900 p-6">
                
                {appsLoading ? (
                   <Loader2 className="h-5 w-5 animate-spin mx-auto text-[#c0392b]" />
                ) : upcomingInterviews.length === 0 ? (
                  <div className="text-center py-8">
                    <Video className="h-8 w-8 mx-auto text-zinc-300 mb-3" />
                    <p className="text-xs text-zinc-500 uppercase tracking-widest">No upcoming interviews scheduled.</p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    {upcomingInterviews.map((interview) => (
                      <div key={interview._id} className="flex flex-col gap-2 p-3 border border-zinc-200 dark:border-zinc-800 bg-[#f9f9f9] dark:bg-black/20">
                        <div className="flex justify-between items-start">
                          <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">{interview.company}</h4>
                          <span className="text-[10px] font-bold px-1.5 py-0.5 bg-purple-100 text-purple-700 uppercase tracking-wider border border-purple-200">
                            {interview.status}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-500 truncate">{interview.role}</p>
                        <div className="flex items-center gap-2 mt-2 text-xs text-zinc-600 font-bold">
                          <Calendar className="h-3.5 w-3.5 text-[#c0392b]" />
                          {new Date(interview.interview_date!).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                        </div>
                        <button className="mt-2 w-full flex items-center justify-center gap-2 border border-[#1a1a1a] bg-white dark:bg-zinc-800 dark:border-zinc-600 dark:text-white px-3 py-1.5 text-xs font-bold uppercase tracking-widest hover:bg-[#c0392b] hover:text-white hover:border-[#c0392b] transition-colors">
                          Analyze Prep <Target className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  sub,
}: {
  title: string;
  value: string;
  sub: string;
}) {
  return (
    <div className="relative group">
      <div className="absolute inset-0 translate-x-1 translate-y-1 border border-[#1a1a1a] dark:border-zinc-700 bg-transparent transition-transform group-hover:translate-x-1.5 group-hover:translate-y-1.5" />
      <div className="relative flex flex-col justify-between border border-[#1a1a1a] dark:border-zinc-700 bg-white dark:bg-zinc-900 p-5 min-h-30">
        <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
          {title}
        </h3>
        <div className="mt-2">
          <span className="font-syne text-4xl font-black text-zinc-900 dark:text-white tracking-tighter">
            {value}
          </span>
          <p className="mt-1 text-[10px] text-zinc-400">{sub}</p>
        </div>
      </div>
    </div>
  );
}

function HistoryMiniCard({
  item,
  onClick,
}: {
  item: any;
  onClick: () => void;
}) {
  return (
    <div onClick={onClick} className="relative group cursor-pointer">
      <div className="absolute inset-0 translate-x-1 translate-y-1 border border-[#1a1a1a] dark:border-zinc-700 bg-transparent transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
      <div className="relative border border-[#1a1a1a] dark:border-zinc-700 bg-[#f4f1e8] dark:bg-zinc-900 p-4 transition-colors">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h4 className="font-syne font-bold text-zinc-900 dark:text-white truncate max-w-37.5">
              {item.companyName || "Unknown"}
            </h4>
            <div className="flex items-center gap-1 mt-1 text-[10px] text-zinc-500">
              <Calendar className="h-3 w-3 text-[#c0392b]" />
              {new Date(item.createdAt).toLocaleDateString()}
            </div>
          </div>
          <div className="flex h-8 w-8 items-center justify-center border border-[#1a1a1a] bg-white dark:bg-black font-black text-sm">
            {item.overallScore ?? item.atsScore ?? 0}
          </div>
        </div>

        <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800 flex justify-between items-center">
          <div className="flex items-center gap-1.5 text-xs text-zinc-600 dark:text-zinc-400">
            <Activity className="h-3 w-3 text-amber-500" />
            <span className="truncate max-w-30 text-[10px]">
              {item.shortlistChance
                ? `Chance: ${item.shortlistChance}`
                : "Analysis Ready"}
            </span>
          </div>
          <ArrowRight className="h-3.5 w-3.5 text-[#c0392b] transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </div>
  );
}
