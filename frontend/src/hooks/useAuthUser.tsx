import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { fetchInterviewBackend } from "../lib/backendApi";

const fetchAuthUser = async () => {
  const response = await fetchInterviewBackend("/api/auth/me", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    return null;
  }
  return response.json();
};

export const useAuthUser = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["authUser"],
    queryFn: fetchAuthUser,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (data) {
      Cookies.set("user_session", JSON.stringify(data), {
        expires: 7,
        path: "/",
      });
    } else {
      Cookies.remove("user_session", { path: "/" });
    }
  }, [data]);
  return { data, isLoading, isError, error };
};
