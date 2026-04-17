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
import { useAuthUser } from "./useAuthUser";

interface analyzeForm {
  pdf: File;
  jobDescription: string;
  userId: string;
  companyName: string;
  role: string;
}
const analyze = async (data: analyzeForm) => {
  const formData = new FormData();
  formData.append("pdf", data.pdf);
  formData.append("jobDescription", data.jobDescription);
  formData.append("userId", data.userId);
  formData.append("companyName", data.companyName);
  formData.append("role", data.role);
  const res = await fetch("http://localhost:5000/api/pdf/upload-single", {
    method: "POST",
    credentials: "include",
    body: formData,
  });

  if (!res.ok) {
    const errorData = await res.json();
    // toast.error("Failed to Analyze")
    throw new Error(errorData.error || "Failed to Analyze");
  }

  return res.json();
};

export const useAnalyze = () => {
  const { data: user } = useAuthUser();
  
  const [formData, setFormData] = useState<analyzeForm>({
    pdf: null as unknown as File,
    jobDescription: "",
    role: "",
    userId: user._id,
    companyName: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation: UseMutationResult<string, Error, analyzeForm> = useMutation({
    mutationFn: analyze,
    onError: (error: any) => {
      setErrors({ general: error.message });
      toast.error("Failed to Analyze");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["analyzeData"],
      });
      toast.success("Analysis Proccess Completed");
      // add navigation to result page
      navigate("result");
    },
  } as UseMutationOptions<string, Error, analyzeForm>);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target;

    if (type === "file") {
      const fileInput = e.target as HTMLInputElement;
      const file = fileInput.files?.[0];
      if (file) {
        setFormData((prev) => ({ ...prev, pdf: file }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.pdf) {
      toast.error("Please Upload a PDF");
    }
    setErrors({});
    try {
      mutation.mutate(formData);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return [formData, errors, handleInputChange, handleSubmit, mutation] as const;
};
