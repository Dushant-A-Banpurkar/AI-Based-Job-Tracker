/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useAuthUser } from "./useAuthUser";
import { useNavigate } from "react-router-dom";
import {
  useMutation,
  type UseMutationOptions,
  type UseMutationResult,
} from "@tanstack/react-query";
import { toast } from "sonner";

interface updateApplication {
  userId: string;
  company: string;
  role: string;
  status: string;
  applied_date: Date | string;
  location: string;
  interview_date: Date | string;
  notes: string;
}

const update = async (data: updateApplication) => {
  const url = import.meta.env.VITE_BACKEND_API;
  const res = await fetch(`${url}/api/application/update`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Failed Add New Application");
  }

  return res.json();
};

export const useUpdate = () => {
  const { data: user } = useAuthUser();
  const [formData, setFormData] = useState<updateApplication>({
    userId: user._id,
    company: "",
    role: "",
    status: "",
    applied_date: "",
    location: "",
    interview_date: "",
    notes: "",
  });

  const [error, setErrors] = useState<Record<string, string>>({});

  const navigate = useNavigate();

  const mutation: UseMutationResult<string, Error, updateApplication> =
    useMutation({
      mutationFn: update,
      
      onError(error: any) {
        setErrors({ general: error.message });
        toast.error("Failed to Add Application");
      },
      onSuccess: () => {
        toast.success("Application Update Suceesfully");
        navigate("/jobapplication");
      },
    } as UseMutationOptions<string, Error, updateApplication>);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev:any) => ({
      ...prev,
      [name]:
        (name === "applied_date") || (name === "interview_date") && value
          ? new Date(value)
          : value,
    }));
  };

  const handleSubmit=async (e:React.FormEvent) => {
    e.preventDefault();
    setErrors({})
    try {
        mutation.mutate(formData);
    } catch (error:any) {
        toast.error(error.message)
    }
  };
  return [formData,error,handleInputChange,handleSubmit,mutation]
};
