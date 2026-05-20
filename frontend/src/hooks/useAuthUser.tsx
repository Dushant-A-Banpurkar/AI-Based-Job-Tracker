import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import Cookies from "js-cookie";

const fetchAuthUser = async () => {
  const url=import.meta.env.VITE_BACKEND_API;
  const [response] = await Promise.all([
    fetch(`${url}/api/auth/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }),
    new Promise((resolve) => setTimeout(resolve, 800)),
  ]);

  if (!response.ok) throw new Error("Failed to fetcg user");
  return response.json();
};

export const useAuthUser = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["authUser"],
    queryFn: fetchAuthUser,
    retry: false,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (data) {
      Cookies.set("user_session", JSON.stringify(data), { expires: 7 });
    }
  }, [data]);
  return { data, isLoading, isError, error };
};
