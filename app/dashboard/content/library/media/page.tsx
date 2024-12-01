// app/dashboard/library/media/page.tsx
"use client";

import * as React from "react";
import {
  Upload,
  FolderOpen,
  Image as ImageIcon,
  Video,
  File,
  Grid,
  List,
  SortAsc,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { UploadModal } from "./_components/upload-modal";

// Define our media item interface for type safety
interface MediaItem {
  id: string;
  name: string;
  type: "image" | "video" | "file";
  url: string;
  thumbnailUrl?: string;
  size: number;
  dimensions?: {
    width: number;
    height: number;
  };
  uploadedAt: Date;
  tags: string[];
  folder?: string;
}

// View type for our media library
type ViewMode = "grid" | "list";

export default function MediaLibrary() {
  // State management
  const [searchTerm, setSearchTerm] = React.useState("");
  const [viewMode, setViewMode] = React.useState<ViewMode>("grid");
  const [uploadModalOpen, setUploadModalOpen] = React.useState(false);
  const [selectedFolder, setSelectedFolder] = React.useState<string>("all");
  const [sortBy, setSortBy] = React.useState<string>("date");

  // Example media items - would come from your storage solution
  const mediaItems: MediaItem[] = [
    {
      id: "1",
      name: "hero-image.jpg",
      type: "image",
      url: "/images/hero.jpg",
      thumbnailUrl: "/images/hero-thumb.jpg",
      size: 1024000,
      dimensions: {
        width: 1920,
        height: 1080,
      },
      uploadedAt: new Date("2024-01-15"),
      tags: ["hero", "website"],
      folder: "website",
    },
    // Add more items...
  ];

  // Format file size for display
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  // Get icon for file type
  const getFileIcon = (type: MediaItem["type"]) => {
    switch (type) {
      case "image":
        return <ImageIcon className='w-4 h-4' />;
      case "video":
        return <Video className='w-4 h-4' />;
      default:
        return <File className='w-4 h-4' />;
    }
  };

  return (
    <div className='flex flex-col gap-6 p-6'>
      <UploadModal
        open={uploadModalOpen}
        onOpenChange={setUploadModalOpen}
        onUploadComplete={(files) => {
          console.log("Uploaded files:", files);
          setUploadModalOpen(false);
        }}
      />

      {/* Header */}
      <div className='flex justify-between items-center mb-8'>
        <div>
          <h1 className='font-semibold text-2xl tracking-tight'>
            Media Library
          </h1>
          <p className='text-muted-foreground'>
            Manage your images, videos, and other media assets
          </p>
        </div>
        <Button onClick={() => setUploadModalOpen(true)}>
          <Upload className='mr-2 w-4 h-4' />
          Upload Media
        </Button>
      </div>

      {/* Filters and Controls */}
      <div className='flex md:flex-row flex-col md:items-center gap-4'>
        <div className='relative flex-1'>
          <Input
            placeholder='Search media...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='max-w-sm'
          />
        </div>

        <div className='flex flex-wrap gap-2'>
          <Select value={selectedFolder} onValueChange={setSelectedFolder}>
            <SelectTrigger className='w-[150px]'>
              <FolderOpen className='mr-2 w-4 h-4' />
              <SelectValue placeholder='Folder' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>All Folders</SelectItem>
              <SelectItem value='website'>Website</SelectItem>
              <SelectItem value='blog'>Blog</SelectItem>
              <SelectItem value='social'>Social Media</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className='w-[150px]'>
              <SortAsc className='mr-2 w-4 h-4' />
              <SelectValue placeholder='Sort by' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='date'>Upload Date</SelectItem>
              <SelectItem value='name'>File Name</SelectItem>
              <SelectItem value='size'>File Size</SelectItem>
              <SelectItem value='type'>File Type</SelectItem>
            </SelectContent>
          </Select>

          <div className='flex border rounded-md'>
            <Button
              variant={viewMode === "grid" ? "secondary" : "ghost"}
              size='sm'
              className='rounded-r-none'
              onClick={() => setViewMode("grid")}
            >
              <Grid className='w-4 h-4' />
            </Button>
            <Button
              variant={viewMode === "list" ? "secondary" : "ghost"}
              size='sm'
              className='rounded-l-none'
              onClick={() => setViewMode("list")}
            >
              <List className='w-4 h-4' />
            </Button>
          </div>
        </div>
      </div>

      {/* Media Grid */}
      <div
        className={
          viewMode === "grid"
            ? "grid grid-cols-2 md:grid-cols-4 gap-4"
            : "space-y-2"
        }
      >
        {mediaItems.map((item) => (
          <Card
            key={item.id}
            className={viewMode === "grid" ? "" : "hover:bg-muted/5"}
          >
            <CardContent
              className={
                viewMode === "grid" ? "p-2" : "flex items-center gap-4 p-4"
              }
            >
              {viewMode === "grid" ? (
                <div className='space-y-2'>
                  <div className='flex justify-center items-center bg-muted rounded-md aspect-video'>
                    {item.type === "image" && item.thumbnailUrl ? (
                      <img
                        src={item.thumbnailUrl}
                        alt={item.name}
                        className='rounded-md w-full h-full object-cover'
                      />
                    ) : (
                      getFileIcon(item.type)
                    )}
                  </div>
                  <div className='space-y-1'>
                    <p className='font-medium text-sm truncate'>{item.name}</p>
                    <p className='text-muted-foreground text-xs'>
                      {formatFileSize(item.size)}
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  {getFileIcon(item.type)}
                  <div className='flex-1 min-w-0'>
                    <p className='font-medium truncate'>{item.name}</p>
                    <p className='text-muted-foreground text-sm'>
                      {formatFileSize(item.size)} • Uploaded{" "}
                      {item.uploadedAt.toLocaleDateString()}
                    </p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
