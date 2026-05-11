import { useAnalyze } from "@/hooks/useAnalyze";
import { Loader2, Upload } from "lucide-react";

export default function AnalyzerForm() {
  const [formData, errors, handleInputChange, handleSubmit, mutation] =
    useAnalyze();

  return (
    <form
      onSubmit={handleSubmit}
      className="flex max-w-xl flex-col gap-6 font-mono ml-16"
    >
      <div className="mb-2 flex items-center gap-3">
        <span className="text-xl text-[#c0392b]">//</span>
        <h2 className="font-syne text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
          AI Resume Analyzer
        </h2>
      </div>
      <div className="relative flex cursor-pointer flex-col items-center justify-center border-2 border-dashed border-zinc-300 bg-transparent p-12 text-center transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-900/50">
        <input
          type="file"
          name="pdf"
          onChange={handleInputChange}
          accept=".pdf"
          className="absolute text-white inset-0 h-full cursor-pointer opacity-0"
        />
        <Upload className="mb-4 h-6 w-6 text-zinc-400" />
        <p className="text-sm text-zince-600 dark:text-zinc-400">
          {formData.pdf
            ? (formData.pdf as File).name
            : "Drop you resume here or click to upload"}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-[10px] uppercase tracking-widest text-zinc-500">
            Company Name
          </label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName || ""}
            onChange={handleInputChange}
            placeholder="e.g. Google"
            className="w-full border text-white border-zinc-300 bg-[#f4f1e8] p-3 text-sm outline-none focus:border-[#c0392b] dark:border-zinc-700 dark:bg-zinc-800"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[10px] uppercase tracking-widest text-zinc-500">
            Role
          </label>
          <input
            type="text"
            name="role"
            value={formData.role || ""}
            onChange={handleInputChange}
            placeholder="e.g. Software Engineer"
            className="w-full border text-white border-zinc-300 bg-[#f4f1e8] p-3 text-sm outline-none focus:border-[#c0392b] dark:border-zinc-700 dark:bg-zinc-800"
            required
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-[10px] uppercase tracking-widest text-zinc-500">
          Job Description (For Matching)
        </label>
        <textarea
          name="jobDescription"
          value={formData.jobDescription}
          onChange={handleInputChange}
          placeholder="Paste the job description here for tailored analysis..."
          rows={5}
          className="w-full resize-none border text-white border-zinc-300 bg-[#f4f1e8] p-3 text-sm outline-none focus:border-[#c0392b] dark:border-zinc-700 dark:bg-zinc-800"
        />
      </div>
      {errors?.general && (
        <p className="text-xs text-red-500">{errors.general}</p>
      )}
      <button
        type="submit"
        disabled={mutation.isPending}
        className="flex w-full items-center justify-center gap-2 rounded-none bg-[#c0392b] py-4 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-[#a93226] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {mutation.isPending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
          </>
        ) : (
          "Analyze with AI"
        )}
      </button>
    </form>
  );
}
