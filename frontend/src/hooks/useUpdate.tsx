/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useAuthUser } from "./useAuthUser";
import { useNavigate } from "react-router-dom";
import {
  useMutation,
  useQueryClient,
  type UseMutationOptions,
  type UseMutationResult,
} from "@tanstack/react-query";
import { toast } from "sonner";

interface updateApplication {
  _id?: string;
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

export const useUpdate = (initialData?: any) => {
  const { data: user } = useAuthUser();
  const querryClient = useQueryClient();
  const [formData, setFormData] = useState<updateApplication>({
    _id: "",
    userId: user?._id || "",
    company: "",
    role: "",
    status: "",
    applied_date: "",
    location: "",
    interview_date: "",
    notes: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();

  useEffect(() => {
    if (initialData) {
      setFormData({
        _id: initialData._id || "",
        userId: user?._id || initialData.userId || "",
        company: initialData.company || "",
        role: initialData.role || "",
        status: initialData.status || "",
        applied_date: initialData.applied_date || "",
        location: initialData.location || "",
        interview_date: initialData.interview_date || "",
        notes: initialData.notes || "",
      });
    }
  }, [initialData, user]);

  const mutation: UseMutationResult<string, Error, updateApplication> =
    useMutation({
      mutationFn: update,

      onError(error: any) {
        setErrors({ general: error.message });
        toast.error("Failed to Add Application");
      },
      onSuccess: () => {
        querryClient.invalidateQueries({ queryKey: ["applications"] });
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
    setFormData((prev: any) => ({
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
