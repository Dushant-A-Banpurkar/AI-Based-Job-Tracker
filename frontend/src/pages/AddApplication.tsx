import { Button } from "@/components/ui/button";
import { useAdd } from "@/hooks/useAdd";
import { ArrowRight, ChevronDown, Loader2 } from "lucide-react";

function AddApplication() {
  const [formData, errors, handleInputChange, handleSubmit, mutation] =
    useAdd();

  const isLoading = mutation.isPending;
  return (
    <div className="flex flex-col w-full gap-8 px-16">
      <div className="flex gap-3">
        <span className="font-mono text-2xl text-[#c0392b]">//</span>
        <h2 className="font-syne text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
          Log New Application
        </h2>
      </div>
      <div className="relative max-w-3xl">
        <div className="absolute inset-0 translate-x-1.5 translate-y-1.5 border border-white bg-transparent" />
        <div className="relative border border-[#1a1a1a] bg-white p-8 dark:bg-zinc-900">
          {errors.general && (
            <div className="p-3 text-sm text-center text-red-500 bg-red-500/10 border border-red-500/20 rounded-md">
              {errors.general}
            </div>
          )}
          <form
            className="grid grid-cols-2 gap-x-8 gap-y-6 font-mono"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col gap-2">
              <label className="text-16 uppercase tracking-widest text-zinc-400">
                Company
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                placeholder="Google, Meta..."
                className="border-none text-white bg-[#f4f1e8] p-3 text-sm focus:ring-1 focus:ring-[#c0392b] outline-none dark:bg-zinc-800"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-16 uppercase tracking-widest text-zinc-400">
                Role
              </label>
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                placeholder="Software Engineer"
                className="border-none text-white bg-[#f4f1e8] p-3 text-sm focus:ring-1 focus:ring-[#c0392b] outline-none dark:bg-zinc-800"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-16 uppercase tracking-widest text-zinc-400">
                Status
              </label>
              <div className="relative">
                <select
                  className="w-full text-white appearance-none border-none bg-[#f4f1e8] p-3 text-sm outline-none dark:bg-zinc-800"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                >
                  <option value="">Select Status</option>
                  <option value="APPLIED">Applied</option>
                  <option value="SCREENING">Screening</option>
                  <option value="INTERVIEW">Interview</option>
                  <option value="OFFER">Offer</option>
                  <option value="REJECTED">Rejected</option>
                </select>
                <ChevronDown className="absolute right-3 top-3.5 h-4 -4 text-zinc-500" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-16 uppercase tracking-widest text-zinc-400">
                Applied Date
              </label>
              <input
                type="date"
                name="applied_date"
                value={
                  formData.applied_date instanceof Date
                    ? formData.applied_date.toISOString().slice(0, 10)
                    : formData.applied_date.slice(0, 10)
                }
                onChange={handleInputChange}
                className="border-none text-white bg-[#f4f1e8] p-3 text-sm focus:ring-1 focus:ring-[#c0392b] outline-none dark:bg-zinc-800"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-16 uppercase tracking-widest text-zinc-400">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="Remote, WFH, Mumbai..."
                className="border-none text-white bg-[#f4f1e8] p-3 text-sm focus:ring-1 focus:ring-[#c0392b] outline-none dark:bg-zinc-800"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-16 uppercase tracking-widest text-zinc-400">
                Interview Date
              </label>
              <input
                type="date"
                name="interview_date"
                value={
                  formData.interview_date instanceof Date
                    ? formData.interview_date.toISOString().slice(0, 10)
                    : formData.interview_date.slice(0, 10)
                }
                onChange={handleInputChange}
                className="border-none text-white bg-[#f4f1e8] p-3 text-sm focus:ring-1 focus:ring-[#c0392b] outline-none dark:bg-zinc-800"
              />
            </div>
            <div className="col-span-2 flex flex-col gap-2">
              <label className="text-16 uppercase tracking-widest text-zinc-400">
                Notes
              </label>
              <textarea
                rows={3}
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                placeholder="Referral, Salary range, Recruiter name..."
                className="resize-none text-white border-none bg-[#f4f1e8] p-3 text-sm outline-none dark:bg-zinc-800"
              />
            </div>
            <Button
              className="col-span-2 mt-4 h-12 rounded-none bg-[#1a1a1a] text-xs font-bold uppercase tracking-[0.2em] text-white hover:bg-[#ff1900]"
              type="submit"
            >
              {isLoading ? (
                <>
                  <Loader2 />
                  Adding Application...
                </>
              ) : (
                <>
                  <ArrowRight />
                  Log Application
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
