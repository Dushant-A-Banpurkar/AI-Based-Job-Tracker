import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { fetchInterviewBackend } from "../lib/backendApi";
import Cookies from "js-cookie";

const logoutApi = async () => {
  const response = await fetchInterviewBackend("/api/auth/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  if (!response.ok) throw new Error("Failed to Logout");

  return response.json();
};

const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const logout = useMutation({
    mutationFn: logoutApi,
    onSuccess: async () => {
      await queryClient.cancelQueries({ queryKey: ["authUser"] });
      queryClient.setQueryData(["authUser"], null);
      Cookies.remove("user_session", { path: "/" });
      toast.success("Logged Out Successfully");
      navigate("/", { replace: true });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return logout;
};
export default useLogout;
