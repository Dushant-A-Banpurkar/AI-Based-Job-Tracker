import { Button } from "@/components/ui/button";
import { useAdd } from "@/hooks/useAdd";
import { ArrowRight, ChevronDown, Loader2 } from "lucide-react";

function AddApplication() {
  const [formData, errors, handleInputChange, handleSubmit, mutation] =
    useAdd();

  const isLoading = mutation.isPending;

  const formatDateValue = (val: unknown) => {
    if (!val) return "";
    if (val instanceof Date) return val.toISOString().slice(0, 10);
    if (typeof val === "string") return val.slice(0, 10);
    return "";
  };

  return (
    <div className="flex flex-col w-full gap-6 sm:gap-8 px-4 sm:px-8 md:px-16">
      {/* Header */}
      <div className="flex items-center gap-3">
        <span className="font-mono text-2xl text-[#c0392b]">//</span>
        <h2 className="font-syne text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
          Log New Application
        </h2>
      </div>

      <div className="relative w-full max-w-3xl">
        <div className="absolute inset-0 translate-x-1.5 translate-y-1.5 border border-zinc-700 dark:border-white bg-transparent pointer-events-none" />

        <div className="relative border border-[#1a1a1a] bg-white p-5 sm:p-8 dark:bg-zinc-900">
          {errors?.general && (
            <div className="mb-6 p-3 text-xs sm:text-sm text-center text-red-500 bg-red-500/10 border border-red-500/20 rounded-none font-mono">
              {errors.general}
            </div>
          )}

          <form
            className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5 sm:gap-y-6 font-mono"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                Company
              </label>
              <input
                type="text"
                name="company"
                value={formData.company || ""}
                onChange={handleInputChange}
                placeholder="Google, Meta..."
                className="border-none text-zinc-900 bg-[#f4f1e8] p-3 text-sm focus:ring-1 focus:ring-[#c0392b] outline-none dark:bg-zinc-800 dark:text-white"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                Role
              </label>
              <input
                type="text"
                name="role"
                value={formData.role || ""}
                onChange={handleInputChange}
                placeholder="Software Engineer"
                className="border-none text-zinc-900 bg-[#f4f1e8] p-3 text-sm focus:ring-1 focus:ring-[#c0392b] outline-none dark:bg-zinc-800 dark:text-white"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                Status
              </label>
              <div className="relative">
                <select
                  className="w-full text-zinc-900 appearance-none border-none bg-[#f4f1e8] p-3 text-sm outline-none dark:bg-zinc-800 dark:text-white cursor-pointer"
                  name="status"
                  value={formData.status || ""}
                  onChange={handleInputChange}
                >
                  <option value="">Select Status</option>
                  <option value="APPLIED">Applied</option>
                  <option value="SCREENING">Screening</option>
                  <option value="INTERVIEW">Interview</option>
                  <option value="OFFER">Offer</option>
                  <option value="REJECTED">Rejected</option>
                </select>
                <ChevronDown className="absolute right-3 top-3.5 h-4 w-4 text-zinc-500 pointer-events-none" />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                Applied Date
              </label>
              <input
                type="date"
                name="applied_date"
                value={formatDateValue(formData.applied_date)}
                onChange={handleInputChange}
                className="border-none text-zinc-900 bg-[#f4f1e8] p-3 text-sm focus:ring-1 focus:ring-[#c0392b] outline-none dark:bg-zinc-800 dark:text-white"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location || ""}
                onChange={handleInputChange}
                placeholder="Remote, WFH, Mumbai..."
                className="border-none text-zinc-900 bg-[#f4f1e8] p-3 text-sm focus:ring-1 focus:ring-[#c0392b] outline-none dark:bg-zinc-800 dark:text-white"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                Interview Date
              </label>
              <input
                type="date"
                name="interview_date"
                value={formatDateValue(formData.interview_date)}
                onChange={handleInputChange}
                className="border-none text-zinc-900 bg-[#f4f1e8] p-3 text-sm focus:ring-1 focus:ring-[#c0392b] outline-none dark:bg-zinc-800 dark:text-white"
              />
            </div>

            <div className="col-span-1 sm:col-span-2 flex flex-col gap-2">
              <label className="text-xs uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                Notes
              </label>
              <textarea
                rows={3}
                name="notes"
                value={formData.notes || ""}
                onChange={handleInputChange}
                placeholder="Referral, Salary range, Recruiter name..."
                className="resize-none text-zinc-900 border-none bg-[#f4f1e8] p-3 text-sm outline-none focus:ring-1 focus:ring-[#c0392b] dark:bg-zinc-800 dark:text-white"
              />
            </div>

            <Button
              className="col-span-1 sm:col-span-2 mt-2 sm:mt-4 h-12 rounded-none bg-[#1a1a1a] text-xs font-bold uppercase tracking-[0.2em] text-white hover:bg-[#c0392b] transition-colors gap-2 cursor-pointer"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Adding Application...</span>
                </>
              ) : (
                <>
                  <ArrowRight className="h-4 w-4" />
                  <span>Log Application</span>
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddApplication;
