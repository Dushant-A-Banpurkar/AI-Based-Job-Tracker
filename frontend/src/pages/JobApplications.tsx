import { useGetAllApplications } from "@/hooks/useGet";
import { JobCard, JobCardSkeleton } from "@/layouts/JobCard";
import { useNavigate } from "react-router-dom";
import type { JobApp } from "@/types/job";

function JobApplications() {
  const {
    data: applications,
    isLoading,
    isError,
    error,
  } = useGetAllApplications();

  const navigate = useNavigate();

  const handleUpdate = (app: JobApp) => {
    navigate(`/edit-application/${app._id}`);
  };

  return (
    <div className="flex gap-8 flex-col px-4 sm:px-8 md:px-16">
      <div className="flex items-center gap-3">
        <span className="font-mono text-2xl text-[#c0392b]">//</span>
        <h2 className="font-syne text-xl sm:text-2xl font-bold tracking-tight text-white">
          All Applications
        </h2>
        {!isLoading && applications && (
          <span className="ml-auto font-mono text-sm text-zinc-400">
            {applications.length} total
          </span>
        )}
      </div>

      <div className="flex flex-col">
        {isLoading && (
          <>
            <JobCardSkeleton />
            <JobCardSkeleton />
            <JobCardSkeleton />
          </>
        )}

        {isError && (
          <div className="border border-[#c0392b] bg-rose-50 p-4 font-mono text-sm text-[#c0392b] dark:bg-zinc-900">
            <span className="font-bold">// error</span>{" "}
            {error instanceof Error
              ? error.message
              : "Failed to load applications."}
          </div>
        )}

        {!isLoading && !isError && applications?.length === 0 && (
          <p className="font-mono text-sm text-zinc-400">
            // no applications found.
          </p>
        )}

        {!isLoading &&
          !isError &&
          applications?.map((app) => (
            <JobCard key={app._id} app={app} onUpdate={handleUpdate} />
          ))}
      </div>
    </div>
  );
}

export default JobApplications;
