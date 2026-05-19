/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useMutation,
  useQueryClient,
  type UseMutationOptions,
  type UseMutationResult,
} from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface signUpForm {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
}

const signup = async (data: signUpForm) => {
  const res = await fetch("/api/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials:"include",
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Failed to Create Account");
  }
  return res.json();
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

  const mutation: UseMutationResult<string, Error, signUpForm> = useMutation({
    mutationFn: signup,
    onError: (error: any) => {
      setErrors({ general: error.message });
      toast.error("Failed To Create Account");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      toast.success("Account Created Successfully");
      navigate("/dashboard");
    },
  } as UseMutationOptions<string, Error, signUpForm>);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    try {
      // signUpSchema.parse(formData);
      mutation.mutate(formData);
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  
  return [formData, errors, handleInputChange, handleSubmit, mutation] as const;
};
