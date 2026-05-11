/* eslint-disable @typescript-eslint/no-explicit-any */
import { AlertTriangle, ArrowRight, Briefcase, CheckCircle2, XCircle } from "lucide-react";

const Result = ({resultData}:{resultData:any}) => {
  const {
    companyName,role,atsScore,content,format,score,matchedSkills,missingSkills,suggestions
  }=resultData;
  return (
    <div className="flex flex-col gap-10 font-mono pb-10">
      <div className="flex items-center gap-3">
        <span className="text-2xl text-[#c0392b]">//</span>
        <h2 className="font-syne text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
          Analysis Results
        </h2>
      </div>
      <div className="flex items-center gap-4 text-sm text-zinc-500 ml-9">
        <div className="flex items-center gap-1.5">
          <Briefcase className="h-4 w-4" />
          <span className="uppercase tracking-wider">
            {companyName}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <Briefcase className="h-4 w-4" />
          <span className="uppercase tracking-wider">
            {role}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <ScoreCard label="Overall Match" score={score} highlight={true}/>
        <ScoreCard label="ATS Compatibility" score={atsScore} highlight={true}/>
        <ScoreCard label="Content Quality" score={content} highlight={true}/>
        <ScoreCard label="Formating" score={format} highlight={true}/>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative">
          <div className="absolute inset-0 translate-x-1 translate--y-1 border border-[#1a1a1a] bg-transparent" />
          <div className="relative border border-[#1a1a1a] bg-emerald-50/50 p-6 dark:bg-emerald-950/50">
            <h3 className="mb-4 text-[11px] font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
              Matched Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {matchedSkills.map((skill: string, idx: number) => (
                <span
                  key={idx}
                  className="flex items-center gap-1.5 border border-emerald-200 bg-white px-2.5 py-1 text-xs text-emerald-700 dark:border-emerald-800 dark:bg-black dark:text-emerald-400"
                >
                  <CheckCircle2 className="h-3 w-3" />
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="absolute inset-0 translate-x-1 translate-y-1 border border-[#1a1a1a] bg-transparent" />
          <div className="relative border border-[#1a1a1a] bg-rose-50/50 p-6 dark:bg-rose-950/20">
          <h3 className="mb-4 text-[11px] font-bold uppercase tracking-widest text-rose-700 dark:text-rose-400">Missing Skills</h3>
          <div className="flex flex-wrap gap-2">
            {missingSkills.map((skills:string,idx:number)=>(
                <span key={idx} className="flex items-center gap-1.5 border border-rose-200 bg-white px-2.5 py-1 text-xs text-rose-700 dark:border-rose-800 dark:bg-black dark:text-rose-400">
                    <XCircle className="h-3 w-3"/>
                    {skills}
                </span>
            ))}
          </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-[#c0392b]"/>
                <h3 className="font-syne text-xl font-bold text-zinc-900 dark:text-white">Recommended Revisions</h3>
            </div>
            <div className="flex flex-col gap-6">
                {suggestions.map((sug:any)=>(
                    <div key={sug._id} className="relative">
                        <div className="absolute inset-0 translate-x-1.5 translate-y-1.5 border border-[#1a1a1a] bg-transparent"/>
                        <div className="relative border border-[#1a1a1a] bg-white p-6 dark:bg-zinc-900">
                            <span className="inline-block border border-zinc-200 bg-zinc-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-zinc-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">{sug.category}</span>
                            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 text-sm">
                                <div className="flex flex-col gap-2 border border-rose-100 bg-rose-50/30 p-4 dark:border-rose-900/30 dark:bg-rose-950/10">
                                <span className="text-[10px] uppercase tracking-widest text-rose-500">Current (Before)</span>
                                <p className="text-zinc-600 line-through decoration-rose-300 dark:text-zinc-400">{sug.before}</p></div>
                                <div className="flex flex-col gap-2 border border-emerald-100 bg-emerald-50/30 p-4 dark:border-emerald-900/30 dark:bg-emerald-950/10">
                                <span className="text-[10px] uppercase tracking-widest text-emerald-500">Suggested (After)</span>
                                <p className="text-zinc-800 font-medium dark:text-zinc-400">{sug.after}</p></div>
                            </div>
                            <div className="mt-4 items-start gap-2 border-t border-zinc-100 pt-4 dark:border-zinc-800">
                                <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-[#c0392b]"/>
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
    </div>
  );
};
export default Result;


function ScoreCard({label,score,highlight=false}:{label:string,score:number,highlight:boolean}){
    const getScoreColor=(s:number)=>{
        if(s>=80) return "text-emerald-600 dark:text-emerald-400";
        if(s>=60) return "text-amber-500 dark:text-amber-400";
        return "text-rose-600 dark:text-rose-400";
    }

    return(
        <div className="relative">
            <div className="absolute inset-0 translate-x-1 translate-y-1 border border-[#1a1a1a] bg-transparent"/>
            <div className={`relative flex flex-col items-center justify-center border border-[#1a1a1a] p-6 text-center
            ${highlight? 'bg-[#1a1a1a] text-white dark:bg-white dark:text-[#1a1a1a]':'bg-white dark:bg-zinc-900'}`}>
                <span className={`text-4xl font-bold ${highlight ? '':getScoreColor(score)}`}>{score}%</span>
                <span className={`mt-2 text-[10px] font-bold uppercase tracking-widest ${highlight ? 'text-zinc-400 dark:text-zinc-500' : 'text-zinc-500'}`}>{label}</span>
            </div>
        </div>
    )
}