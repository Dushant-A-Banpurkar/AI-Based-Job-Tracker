import { useAnalyze } from "@/hooks/useAnalyze";
import { Loader2, Upload } from "lucide-react";

export default function AnalyzerForm() {
  const [formData, errors, handleInputChange, handleSubmit, mutation] =
    useAnalyze();

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-xl flex-col gap-5 sm:gap-6 font-mono mx-auto sm:ml-8 md:ml-16 px-4 sm:px-0"
    >
      {/* Header */}
      <div className="mb-1 sm:mb-2 flex items-center gap-2.5 sm:gap-3">
        <span className="text-lg sm:text-xl text-[#c0392b] font-bold">//</span>
        <h2 className="font-syne text-lg sm:text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
          AI Resume Analyzer
        </h2>
      </div>

      {/* File Upload Zone */}
      <div className="relative flex cursor-pointer flex-col items-center justify-center border-2 border-dashed border-zinc-300 bg-transparent p-6 sm:p-10 md:p-12 text-center transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-900/50">
        <input
          type="file"
          name="pdf"
          onChange={handleInputChange}
          accept=".pdf"
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
        />
        <Upload className="mb-3 sm:mb-4 h-5 w-5 sm:h-6 sm:w-6 text-zinc-400" />
        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 truncate max-w-[220px] sm:max-w-xs md:max-w-md">
          {formData.pdf
            ? (formData.pdf as File).name
            : "Drop your resume here or click to upload"}
        </p>
      </div>

      {/* Inputs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5 sm:gap-2">
          <label className="text-[10px] uppercase tracking-widest text-zinc-500">
            Company Name
          </label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName || ""}
            onChange={handleInputChange}
            placeholder="e.g. Google"
            className="w-full border border-zinc-300 bg-[#f4f1e8] p-2.5 sm:p-3 text-xs sm:text-sm text-zinc-900 dark:text-white outline-none focus:border-[#c0392b] dark:border-zinc-700 dark:bg-zinc-800"
            required
          />
        </div>
        <div className="flex flex-col gap-1.5 sm:gap-2">
          <label className="text-[10px] uppercase tracking-widest text-zinc-500">
            Role
          </label>
          <input
            type="text"
            name="role"
            value={formData.role || ""}
            onChange={handleInputChange}
            placeholder="e.g. Software Engineer"
            className="w-full border border-zinc-300 bg-[#f4f1e8] p-2.5 sm:p-3 text-xs sm:text-sm text-zinc-900 dark:text-white outline-none focus:border-[#c0392b] dark:border-zinc-700 dark:bg-zinc-800"
            required
          />
        </div>
      </div>

      {/* Job Description Field */}
      <div className="flex flex-col gap-1.5 sm:gap-2">
        <label className="text-[10px] uppercase tracking-widest text-zinc-500">
          Job Description (For Matching)
        </label>
        <textarea
          name="jobDescription"
          value={formData.jobDescription || ""}
          onChange={handleInputChange}
          placeholder="Paste the job description here for tailored analysis..."
          rows={4}
          className="w-full resize-none border border-zinc-300 bg-[#f4f1e8] p-2.5 sm:p-3 text-xs sm:text-sm text-zinc-900 dark:text-white outline-none focus:border-[#c0392b] dark:border-zinc-700 dark:bg-zinc-800"
        />
      </div>

      {/* Error State */}
      {errors?.general && (
        <p className="text-xs text-red-500">{errors.general}</p>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={mutation.isPending}
        className="flex w-full items-center justify-center gap-2 rounded-none bg-[#c0392b] py-3.5 sm:py-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-[#a93226] disabled:cursor-not-allowed disabled:opacity-70 cursor-pointer"
      >
        {mutation.isPending ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          "Analyze with AI"
        )}
      </button>
    </form>
  );
}