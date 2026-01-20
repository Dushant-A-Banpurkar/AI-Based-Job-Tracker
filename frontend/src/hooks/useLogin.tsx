/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, type UseMutationOptions, type UseMutationResult } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface LoginForm {
  email: string;
  password: string;
}

const sigin = async (data: LoginForm) => {
  const res = await fetch("http://localhost:5000/api/auth/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Failed to Login");
  }

  return res.json();
};

export const useSignIn=()=>{
    const [formData,setFormData]=useState<LoginForm>({
        email:"",
        password:""
    });

    const [errors,setErrors]=useState<Record<string,string>>({});
    const navigate=useNavigate();

    const mutation: UseMutationResult<string,Error,LoginForm>=useMutation({
        mutationFn:sigin,
        onError:(errors:any)=>{
            setErrors({general:errors.message})
            toast.error("Failed to login")
        },
        onSuccess:()=>{
            // localStorage.setItem('token',data.token),
            toast.success("Login Successfully")
            navigate('/dashboard')
        }
    }as UseMutationOptions<string, Error, LoginForm>);

    const handleInputChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        const {name,value}=e.target;
        setFormData((prev)=>({...prev,[name]:value}))
    };

    const handleSubmit=async(e:React.FormEvent)=>{
        e.preventDefault();
        setErrors({})
        try {
           mutation.mutate(formData); 
        } catch (error:any) {
            toast.error(error.message)
        }
    }

    return [mutation,formData,errors,handleInputChange,handleSubmit] as const;
}
