import { useQuery } from "@tanstack/react-query";





const fetchApplicationById=async (id:string) => {
    const url=import.meta.env.VITE_BACKEND_API;
    const res=await fetch(`${url}/api/application/id/${id}`,{
        method:'GET',   
        headers:{
            "Content-Type":"application/json"
        },
        credentials:'include',
    });

    if(!res.ok){
        const errorData=await res.json();
        throw new Error(errorData.error || "Failed to Get Application")
    }
    return res.json();
};

export const useGetApplicationByID=(id:string)=>{
    return useQuery({
        queryKey:['application',id],
        queryFn:()=>fetchApplicationById(id),
        enabled:!!id,
        retry:false,
        staleTime:5*60*1000
    })
}