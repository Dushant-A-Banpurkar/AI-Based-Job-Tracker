import { useMutation} from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const logoutApi = async () => {
  const response = await fetch("http://localhost:5000/api/auth/logout", {
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
  const logout= useMutation({
    mutationFn: logoutApi,
    onSuccess:()=>{
        toast.success("Logged Out Successfully");
        navigate("/")
    },
    onError:(error)=>{
        toast.error(error.message)
    }
  });
  return logout;
};
export default useLogout;
