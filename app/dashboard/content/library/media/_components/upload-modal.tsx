// app/dashboard/library/media/_components/upload-modal.tsx

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { X, Upload as UploadIcon, Image } from "lucide-react";

// Define interface for file upload form
interface UploadModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUploadComplete?: (files: File[]) => void;
}

// Validation schema with proper file handling
const uploadFormSchema = z.object({
  files: z
    .array(z.custom<File>((val) => val instanceof File, "Please select files"))
    .refine((files) => files.length > 0, "At least one file is required"),
  folder: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

type UploadFormValues = z.infer<typeof uploadFormSchema>;

export function UploadModal({
  open,
  onOpenChange,
  onUploadComplete,
}: UploadModalProps) {
  const [uploadProgress, setUploadProgress] = React.useState<number>(0);
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);
  const [tagInput, setTagInput] = React.useState<string>("");
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const form = useForm<UploadFormValues>({
    resolver: zodResolver(uploadFormSchema),
    defaultValues: {
      folder: "",
      tags: [],
    },
  });

  // Properly typed event handler for file changes
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      form.setValue("files", Array.from(e.target.files), {
        shouldValidate: true,
      });
    }
  };

  // Tag management functions with proper typing
  const handleAddTag = () => {
    if (tagInput && selectedTags.length < 10) {
      const newTags = [...selectedTags, tagInput];
      setSelectedTags(newTags);
      form.setValue("tags", newTags);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    const newTags = selectedTags.filter((t) => t !== tag);
    setSelectedTags(newTags);
    form.setValue("tags", newTags);
  };

  // Properly typed drag and drop handler
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files.length > 0) {
      form.setValue("files", Array.from(e.dataTransfer.files), {
        shouldValidate: true,
      });
    }
  };

  // Upload progress simulation
  const simulateUploadProgress = () => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        onUploadComplete?.(Array.from(form.getValues("files") || []));
      }
    }, 200);
  };

  // Form submission handler with proper typing
  const onSubmit = async (data: UploadFormValues) => {
    try {
      console.log("Uploading files:", data);
      simulateUploadProgress();
    } catch (error) {
      console.error("Error uploading files:", error);
      setUploadProgress(0);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[625px]'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Upload Media</DialogTitle>
              <DialogDescription>
                Upload images, videos, or other media files to your library
              </DialogDescription>
            </DialogHeader>

            <ScrollArea className='mt-4 pr-4 h-[400px]'>
              <div className='space-y-6'>
                <FormField
                  control={form.control}
                  name='files'
                  render={() => (
                    <FormItem>
                      <FormControl>
                        <div
                          className={`border-2 border-dashed rounded-lg p-8 text-center hover:border-primary/50 transition-colors ${
                            form.watch("files")?.length
                              ? "bg-muted/50"
                              : "bg-background"
                          }`}
                          onDragOver={(e) => e.preventDefault()}
                          onDrop={handleDrop}
                          onClick={() => fileInputRef.current?.click()}
                        >
                          <input
                            ref={fileInputRef}
                            type='file'
                            multiple
                            className='hidden'
                            accept='image/*,video/*'
                            onChange={handleFileChange}
                          />
                          <div className='flex flex-col items-center gap-2'>
                            <UploadIcon className='w-8 h-8 text-muted-foreground' />
                            <div>
                              <p className='font-medium'>
                                Click or drag files to upload
                              </p>
                              <p className='text-muted-foreground text-sm'>
                                Upload up to 10 files at once
                              </p>
                            </div>
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Selected Files Display */}
                {form.watch("files")?.length > 0 && (
                  <div className='space-y-2'>
                    {Array.from(form.watch("files") || []).map(
                      (file, index) => (
                        <div
                          key={`${file.name}-${index}`}
                          className='flex justify-between items-center p-2 border rounded-md'
                        >
                          <div className='flex items-center gap-2'>
                            <Image className='w-4 h-4 text-muted-foreground' />
                            <span className='text-sm'>{file.name}</span>
                          </div>
                          <Badge variant='secondary'>
                            {(file.size / 1024 / 1024).toFixed(1)} MB
                          </Badge>
                        </div>
                      )
                    )}
                  </div>
                )}

                {/* Folder Selection */}
                <FormField
                  control={form.control}
                  name='folder'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Folder</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Select a folder' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value='general'>General</SelectItem>
                          <SelectItem value='website'>Website</SelectItem>
                          <SelectItem value='blog'>Blog</SelectItem>
                          <SelectItem value='social'>Social Media</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Choose a folder to organize your media
                      </FormDescription>
                    </FormItem>
                  )}
                />

                {/* Tags Input */}
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <div className='flex gap-2'>
                    <Input
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      placeholder='Add tags'
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddTag();
                        }
                      }}
                    />
                    <Button
                      type='button'
                      onClick={handleAddTag}
                      disabled={selectedTags.length >= 10}
                    >
                      Add
                    </Button>
                  </div>
                  <div className='flex flex-wrap gap-2 mt-2'>
                    {selectedTags.map((tag) => (
                      <Badge
                        key={tag}
                        variant='secondary'
                        className='flex items-center gap-1'
                      >
                        {tag}
                        <button
                          onClick={() => handleRemoveTag(tag)}
                          className='ml-1 hover:text-destructive'
                        >
                          <X className='w-3 h-3' />
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <FormDescription>
                    Add up to 10 tags to help organize your media
                  </FormDescription>
                </FormItem>
              </div>
            </ScrollArea>

            {uploadProgress > 0 && (
              <div className='mt-4'>
                <div className='bg-muted rounded-full h-2 overflow-hidden'>
                  <div
                    className='bg-primary h-full transition-all duration-200'
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}

            <DialogFooter className='mt-6'>
              <Button
                type='button'
                variant='outline'
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type='submit' disabled={uploadProgress > 0}>
                Upload Files
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default UploadModal;
