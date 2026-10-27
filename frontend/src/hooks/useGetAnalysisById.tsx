import { useQuery } from "@tanstack/react-query";
import { fetchInterviewBackend } from "../lib/backendApi";

const fetchHistoryById = async (id: string) => {
  const res = await fetchInterviewBackend(`/api/analysis/getanalysis/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!res.ok) {
    const errorData = await res.json();
    console.log(errorData)
    throw new Error(errorData.error || " Failed to Get Analysis Result");
  }
  return res.json();
};

export const useGetHistoryById = (id: string) => {
  return useQuery({
    queryKey: ["Analysis-Result", id],
    queryFn: () => fetchHistoryById(id),
    enabled: !!id,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
};
