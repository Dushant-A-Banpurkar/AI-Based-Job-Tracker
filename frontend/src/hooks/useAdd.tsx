/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useAuthUser } from "./useAuthUser";
import {
  useMutation,
  type UseMutationOptions,
  type UseMutationResult,
} from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface addApplication {
  userId: string;
  company: string;
  role: string;
  status: string;
  applied_date: Date | string;
  location: string;
  interview_date: Date | string;
  notes: string;
}

const add = async (data: addApplication) => {
  // Not Nesssary to use FormData
  // const formData = new FormData();
  // formData.append("userId", data.userId);
  // formData.append("company", data.company);
  // formData.append("role", data.role);
  // formData.append("status", data.status);
  // formData.append(
  //   "applied_date",
  //   data.applied_date instanceof Date
  //     ? data.applied_date.toISOString()
  //     : data.applied_date,
  // );
  // formData.append("location", data.location);
  // formData.append(
  //   "interview_date",
  //   data.interview_date instanceof Date
  //     ? data.interview_date.toISOString()
  //     : data.interview_date,
  // );
  // formData.append("notes", data.notes);
  const res = await fetch("/api/application/add", {
    method: "POST",
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

export const useAdd = () => {
  const { data: user } = useAuthUser();
  const [formData, setFormData] = useState<addApplication>({
    userId: user._id,
    company: "",
    role: "",
    status: "",
    applied_date: "",
    location: "",
    interview_date: "",
    notes: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  //   const queryClient=useQueryClient();
  const navigate = useNavigate();

  const mutation: UseMutationResult<string, Error, addApplication> =
    useMutation({
      mutationFn: add,
      onError(error: any) {
        setErrors({ general: error.message });
        toast.error("Failed to Add Application");
      },
      onSuccess: () => {
        // queryClient.invalidateQueries({
        //     queryKey:["addApplicationData"],
        // });
        toast.success("New Application Added");
        navigate("/jobapplication");
      },
    } as UseMutationOptions<string, Error, addApplication>);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        (name === "applied_date" || name === "interview_date") && value
          ? new Date(value)
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    try {
      mutation.mutate(formData);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return [formData, errors, handleInputChange, handleSubmit, mutation] as const;
};
