// components/UploadModal.tsx

"use client";

import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { X, Upload, File, AlertCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadComplete?: (files: File[]) => void;
}

interface UploadingFile {
  file: File;
  progress: number;
  error?: string;
  status: "uploading" | "complete" | "error";
}

export function UploadModal({
  isOpen,
  onClose,
  onUploadComplete,
}: UploadModalProps) {
  const [uploadingFiles, setUploadingFiles] = useState<UploadingFile[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const simulateFileUpload = (file: File) => {
        let progress = 0;
        const interval = setInterval(() => {
          progress += 10;
          setUploadingFiles((files) =>
            files.map((f) =>
              f.file === file
                ? {
                    ...f,
                    progress,
                    status: progress === 100 ? "complete" : "uploading",
                  }
                : f
            )
          );

          if (progress === 100) {
            clearInterval(interval);
            setUploadingFiles((files) => {
              const allComplete = files.every((f) => f.status === "complete");
              if (allComplete && onUploadComplete) {
                onUploadComplete(files.map((f) => f.file));
              }
              return files;
            });
          }
        }, 500);
      };

      const newFiles = acceptedFiles.map((file) => ({
        file,
        progress: 0,
        status: "uploading" as const,
      }));

      setUploadingFiles((current) => [...current, ...newFiles]);
      newFiles.forEach((uploadingFile) => {
        simulateFileUpload(uploadingFile.file);
      });
    },
    [onUploadComplete]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif"],
      "application/pdf": [".pdf"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
    },
  });

  const removeFile = (fileToRemove: File) => {
    setUploadingFiles((files) => files.filter((f) => f.file !== fileToRemove));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Upload Files</DialogTitle>
          <DialogDescription>
            Drag and drop files or click to upload.
          </DialogDescription>
        </DialogHeader>

        <div
          {...getRootProps()}
          className={cn(
            "mt-4 p-8 border-2 border-dashed rounded-lg text-center cursor-pointer",
            isDragActive
              ? "border-primary bg-primary/5"
              : "border-muted-foreground/25 hover:border-primary/50"
          )}
        >
          <input {...getInputProps()} />
          <Upload className='mx-auto mb-4 w-12 h-12 text-muted-foreground' />
          <p className='mb-1 text-muted-foreground text-sm'>
            {isDragActive
              ? "Drop the files here..."
              : "Drag 'n' drop files here, or click to select files"}
          </p>
          <p className='text-muted-foreground text-xs'>
            Supports: Images, PDF, DOC, DOCX
          </p>
        </div>

        {uploadingFiles.length > 0 && (
          <div className='space-y-4 mt-6'>
            {uploadingFiles.map((uploadingFile) => (
              <div
                key={uploadingFile.file.name}
                className='flex items-center gap-4 p-2 border rounded-lg text-sm'
              >
                <File className='flex-shrink-0 w-4 h-4' />
                <div className='flex-1 min-w-0'>
                  <div className='flex justify-between mb-0.5'>
                    <span className='font-medium truncate'>
                      {uploadingFile.file.name}
                    </span>
                    <span className='pl-2 text-muted-foreground text-xs'>
                      {uploadingFile.status === "complete"
                        ? "Complete"
                        : uploadingFile.status === "error"
                        ? "Error"
                        : `${uploadingFile.progress}%`}
                    </span>
                  </div>
                  <Progress value={uploadingFile.progress} className='h-1' />
                  {uploadingFile.error && (
                    <div className='flex items-center gap-1 mt-1 text-destructive text-xs'>
                      <AlertCircle className='w-3 h-3' />
                      <span>{uploadingFile.error}</span>
                    </div>
                  )}
                </div>
                <Button
                  variant='ghost'
                  size='icon'
                  className='flex-shrink-0 w-8 h-8'
                  onClick={() => removeFile(uploadingFile.file)}
                >
                  <X className='w-4 h-4' />
                  <span className='sr-only'>Remove file</span>
                </Button>
              </div>
            ))}
          </div>
        )}

        <div className='flex justify-end gap-2 mt-4'>
          <Button variant='outline' onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={onClose}
            disabled={uploadingFiles.some((f) => f.status === "uploading")}
          >
            Done
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
