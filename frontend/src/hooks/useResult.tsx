import { useQuery } from "@tanstack/react-query";
import { useAuthUser } from "./useAuthUser";

const resultData = async (userId: string) => {
  const res = await fetch(
    `http://localhost:5000/api/analysis/analyzing/${userId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({userId}),
    },
  );
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Failed to Get All Application");
  }
  return res.json();
};
export const useResultData=()=>{
    const {data:user}=useAuthUser();

    return useQuery({
        queryKey:["analysis-result",user?._id],
        queryFn:()=>resultData(user?._id as string),
        enabled:!!user._id,
        retry:false,
        staleTime:5*60*1000
    })
}