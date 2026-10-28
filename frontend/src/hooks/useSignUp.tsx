import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { fetchInterviewBackend } from "../lib/backendApi";

interface signUpForm {
  firstname: string;
  lastname: string;
  username: string;
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

interface SignUpResponse {
  message: string;
  data: AuthUser;
}

const signup = async (data: signUpForm): Promise<SignUpResponse> => {
  const res = await fetchInterviewBackend("/api/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Failed to Create Account");
  }
  return res.json() as Promise<SignUpResponse>;
};

export const useSignUp = () => {
  const [formData, setFormData] = useState<signUpForm>({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation<SignUpResponse, Error, signUpForm>({
    mutationFn: signup,
    onError: (error) => {
      setErrors({ general: error.message });
      toast.error("Failed To Create Account");
    },
    onSuccess: (responseData) => {
      queryClient.setQueryData(["authUser"], responseData.data);
      toast.success("Account Created Successfully");
      navigate("/dashboard", { replace: true });
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    // signUpSchema.parse(formData);
    mutation.mutate(formData);
  };

  return [formData, errors, handleInputChange, handleSubmit, mutation] as const;
};
