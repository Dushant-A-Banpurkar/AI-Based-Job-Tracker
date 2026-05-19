import { useQuery } from "@tanstack/react-query";
import { useAuthUser } from "./useAuthUser";
import type { JobApp } from "@/types/job";

interface getApplications {
  userId: string;
}

const getApplications = async (data: getApplications) => {
  const res = await fetch("/api/application/get", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Failed to Get All Application");
  }

  return res.json();
};

export const useGetAllApplications = () => {
  const { data: user } = useAuthUser();
  return useQuery<JobApp[]>({
    queryKey: ["applications", user?._id],
    queryFn: () => getApplications({ userId: user._id }),
    enabled: !!user?._id,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
 ;
};
