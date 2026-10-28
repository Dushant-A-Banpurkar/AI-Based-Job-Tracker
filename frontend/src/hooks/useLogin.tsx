import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { fetchInterviewBackend } from "../lib/backendApi";

interface LoginForm {
  email: string;
  password: string;
}

interface AuthUser {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  username: string;
}

interface SignInResponse {
  message: string;
  user: AuthUser;
}

const signIn = async (data: LoginForm): Promise<SignInResponse> => {
  const res = await fetchInterviewBackend("/api/auth/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Failed to Login");
  }

  return res.json() as Promise<SignInResponse>;
};

export const useSignIn = () => {
  const [formData, setFormData] = useState<LoginForm>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation<SignInResponse, Error, LoginForm>({
    mutationFn: signIn,
    onError: (error) => {
      setErrors({ general: error.message });
      toast.error("Failed to login");
    },
    onSuccess: (responseData) => {
      queryClient.setQueryData(["authUser"], responseData.user);
      toast.success("Login Successfully");
      navigate("/dashboard", { replace: true });
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    mutation.mutate(formData);
  };

  return [mutation, formData, errors, handleInputChange, handleSubmit] as const;
};
