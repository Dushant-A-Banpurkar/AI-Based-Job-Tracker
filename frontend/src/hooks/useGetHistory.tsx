import { useQuery } from "@tanstack/react-query";
import { useAuthUser } from "./useAuthUser";

interface fetchHistory {
  userId: string;
}

const fetchHistory = async (data: fetchHistory) => {
  const url = import.meta.env.VITE_BACKEND_API;
  const res = await fetch(`${url}/api/analysis/analysis-history`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Failed to fetch History");
  }
  return res.json();
};

export const useGetHistory = () => {
  const { data: user } = useAuthUser();
  return useQuery({
    queryKey: ["history", user?._id],
    queryFn: () => fetchHistory({ userId: user!._id }),
    enabled: !!user?._id,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
};
