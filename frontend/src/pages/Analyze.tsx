/* eslint-disable @typescript-eslint/no-explicit-any */
import { FileUpload } from "@/components/FileUpload";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAnalyze } from "@/hooks/useAnalyze";
import { Antenna, File, InfoIcon, Loader2, Sparkle } from "lucide-react";

import { Toaster } from "sonner";

const Analyze = () => {

  const [formData,errors,handleInputChange,handleSubmit,mutation]=useAnalyze();

  const isLoading=mutation.isPending;


  //handleFileChange code half is code by me and another is suggestions.
  const handleFileChange=(file:File | null) =>{
    if(file){
      handleInputChange({
        target: { name: "pdf", value: file, type: "file", files: [file] } as any,
        nativeEvent: undefined,
        currentTarget: undefined,
        bubbles: false,
        cancelable: false,
        defaultPrevented: false,
        eventPhase: 0,
        isTrusted: false,
        preventDefault: function (): void {
          throw new Error("Function not implemented.");
        },
        isDefaultPrevented: function (): boolean {
          throw new Error("Function not implemented.");
        },
        stopPropagation: function (): void {
          throw new Error("Function not implemented.");
        },
        isPropagationStopped: function (): boolean {
          throw new Error("Function not implemented.");
        },
        persist: function (): void {
          throw new Error("Function not implemented.");
        },
        timeStamp: 0,
        type: ""
      })
    }
  } 

  return (
    <div className="flex flex-col px-28 py-8">
      <Toaster/>
      <div className=" flex flex-col text-left gap-4">
        <span className="font-bold text-2xl text-left  text-white">
          New Analysis
        </span>
        <span className="font-bold text-xl text-left text-gray-600">
          Upload your resume and paste the job description to get AI-Powered
          feedback
        </span>
      </div>
      <form className="flex flex-col mt-16 w-5xl justify-center gap-16 items-center" onSubmit={handleSubmit}>
        <div className="flex flex-row gap-10">
          <div className="flex flex-col gap-5">
            <Card className="bg-transparent px-4 py-8 w-md h-72">
              <CardHeader className="font-bold gap-4">
                <CardTitle className="text-xl flex flex-row items-center gap-2">
                  <InfoIcon className="text-blue-500" />{" "}
                  <span className="text-white">Company Name and Role</span>
                </CardTitle>
                <CardDescription className="text-lg">
                  Paste the company name and role you'r applying for
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <Input 
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                required
                className="text-white text-2xl" 
                placeholder="Company Name..." />
                {errors.companyName && (
                  <p className="text-red-500">{errors.companyName}</p>
                )}
                <Input
                name="role"
                required 
                className="text-white text-2xl" 
                value={formData.role}
                onChange={handleInputChange}
                placeholder="Role..." />
                {errors.role && (
                  <p className="text-red-500">{errors.role}</p>
                )}
              </CardContent>
            </Card>
            <Card className="bg-transparent px-4 py-8 w-md h-96">
              <CardHeader className="font-bold gap-4">
                <CardTitle className="text-xl flex flex-row items-center gap-2">
                  <File className="text-blue-500" />{" "}
                  <span className="text-white">Job Description</span>
                </CardTitle>
                <CardDescription className="text-lg">
                  Paste the job description you'r applying for
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-6">
                <Textarea
                  name="jobDescription"
                  placeholder="paste the full job description here..."
                  className="text-white w-auto h-48"
                  value={formData.jobDescription}
                  onChange={handleInputChange}
                  required
                />
                {errors.jobDescription && (
                  <p className="text-red-500">{errors.jobDescription}</p>
                )}
              </CardContent>
            </Card>
          </div>
          <div className="flex flex-col gap-5">
            <Card className="bg-transparent px-4 py-8 w-md">
              <CardHeader className="font-bold gap-4">
                <CardTitle className="text-xl flex flex-row items-center gap-2">
                  <Sparkle className="text-blue-500" />{" "}
                  <span className="text-white">Your Resume</span>
                </CardTitle>
                <CardDescription className="text-lg">
                  Upload your resume in PDF format
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FileUpload onFileSelect={handleFileChange} accept=".pdf" 
                value={formData.pdf}
                name="pdf"
                onChange={handleInputChange}
                type="file"
                />
              </CardContent>
            </Card>
            <Card className="bg-transparent px-4 py-8 w-md ">
              <CardHeader className="font-bold gap-4">
                <CardTitle className="text-xl flex flex-row items-center gap-2">
                  <Antenna className="text-blue-500" />
                  <span className="text-white  text-center">
                    Ready to Analyze?
                  </span>
                </CardTitle>
                <CardDescription className="text-lg">
                  Our AI will compare your resume against the job requirements
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <Button
                  variant="secondary"
                  className="w-64  font-bold font-stretch-95% text-md"
                  type="submit"
                >
                  {isLoading?(
                    <>
                      <Loader2/>
                      Analyzing....
                    </>
                  ):(
                    "Start Analysis"
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
};
export default Analyze;
