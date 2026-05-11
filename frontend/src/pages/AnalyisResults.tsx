import { useResultData } from "@/hooks/useResult";
import { AlertCircle, Loader2 } from "lucide-react";
import Result from "./Result";



export default function AnalysisResult(){
    const { data: analysisResult,isLoading,isError,error } = useResultData();

  if(isLoading){
    return(
        <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-[#c0392b]"/>
            <p className="font-mono text-sm text-zinc-500">
                Analyzing resume data...
            </p>
        </div>
    )
  }
  if (isError) {
    return (
        <div className="flex min-h-[50vh] items-center justify-center">
            <div className="flex max-w-md items-center border border-red-200 bg-red-50 p-6 font-mono text-sm text-red-600">
                <AlertCircle className="h-6 w-6 shrink-0"/>
                <span>
                    {error instanceof Error ? error.message : "Failed to load analysis results."}
                </span>
            </div>
        </div>
    )
  }
  if(!analysisResult || !analysisResult.data){
    return(
        <div className="flex min-h-[50vh] items-center justify-center">
            <div className="border border-dashed border-zinc-300 p-20 text-center font-mono">
                <p className="text-zinc-400">No Analysis Data Found</p>
            </div>
        </div>
    )
  }
  return(
    <div className="w-full max-w-6xl mx-auto pt-6">
        <Result resultData={analysisResult.data}/>
    </div>
  )
}