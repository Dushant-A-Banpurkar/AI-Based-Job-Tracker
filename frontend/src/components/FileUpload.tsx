import { cn } from "@/lib/utils";
import { FileText, Upload, X } from "lucide-react";
import { useCallback, useState } from "react";
import { Button } from "./ui/button";

interface FileUploadProps {
  onFileSelect: (file: File | null) => void;
  accept?: string;
  className?: string;
  value?:unknown;
  name?:string;
  onChange?:unknown;
  type?:string;
}

export function FileUpload({
  onFileSelect,
  accept = ".pdf",
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragIn = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragOut = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === "application/pdf") {
      setFile(droppedFile);
      onFileSelect(droppedFile);
    }
  },[onFileSelect]);

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files?.[0];
      if (selectedFile) {
        setFile(selectedFile);
        onFileSelect(selectedFile);
      }
    },
    [onFileSelect],
  );

  const removeFile = useCallback(() => {
    setFile(null);
    onFileSelect(null);
  }, [onFileSelect]);
  return (
    <div
      className={cn(
        "relative rounded-xl border-2 border-dashed transition-all duration-300",
        isDragging
          ? "border-primary bg-primary/5"
          : "border-border hover:border-primary/50",
      )}
      onDrag={handleDrag}
      onDragEnter={handleDragIn}
      onDragLeave={handleDragOut}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      {file ? 
      <div className="flex items-center justify-between flex-row p-6 text-white">
        <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
            <FileText className="h-6 w-6 text-primary"/>
            </div>
            <div>
                <p className="font-medium">{file.name}</p>
                <p className="text-sm text-muted-foreground">{(file.size / 1024 / 1024)} MB</p>
            </div>
        </div>
        <Button
        variant='ghost'
        size="icon"
        onClick={removeFile}
        className="text-muted-foreground hover:text-destructive"
        >
            <X className="h-5 w-5"/>
        </Button>
      </div> : (
        <label
        className="flex cursor-pointer flex-col items-center justify-center gap-4 p-10"
        >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Upload className="h-8 w-8 text-primary">browse</Upload>
            </div>
            <div 
            className="text-center">
                <p className="font-medium">
                    Drop your resume here or{" "}
                    <span className="text-primary">browse</span>
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                    Support PDF files up to 10MB
                </p>
            </div>
            <input
            type="file"
            accept={accept}
            onChange={handleFileInput}
            className="hidden"
            />
        </label>
      )}
    </div>
  );
}
