

export type JobStatus = 'APPLIED' | 'SCREENING' | 'INTERVIEW' | 'OFFER' | 'REJECTED';
export interface JobApp{
    _id:string,
    company:string,
    role:string,
    status: JobStatus,
    applied_date:string,
    location:string,
    interview_date:string,
}

export const statusConfig:Record<JobApp["status"],{color:string,progress:number}>={
    APPLIED:{color:"text-blue-600 border-blue-200 bg-blue-50",progress:1},
    SCREENING:{color:"text-orange-600 border-orange-200 bg-orange-50",progress:2},
    INTERVIEW:{color:"text-emerald-600 border-emerald-200 bg-emerald-50",progress:3},
    OFFER:{color:"text-rose-600 border-rose-200 bg-rose-50", progress:4},
    REJECTED:{color:"text-zinc-500 border-zinc-200 bg-zinc-50",progress:0}
}

export const getStatusConfig=(status:string)=>{
    const upperStatus=status?.toUpperCase();

    if(upperStatus in statusConfig ){
        return statusConfig[upperStatus as JobStatus]
    }
    return statusConfig["APPLIED"]
}
