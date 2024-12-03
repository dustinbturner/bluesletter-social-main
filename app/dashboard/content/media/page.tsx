// app/dashboard/content/media/page.tsx

"use client";

import React, { useState } from "react";
import {
  GridIcon,
  ListIcon,
  UploadIcon,
  SearchIcon,
  ImageIcon,
  FileIcon,
  FileTextIcon,
  MoreVerticalIcon,
  ExternalLinkIcon,
  CopyIcon,
  TrashIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { UploadModal } from "@/components/UploadModal";

type MediaItem = {
  id: string;
  name: string;
  type: "image" | "document" | "other";
  url: string;
  size: string;
  dimensions?: string;
  uploadedAt: string;
  thumbnailUrl?: string;
};

type ViewMode = "grid" | "list";

export default function MediaLibrary() {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [fileTypeFilter, setFileTypeFilter] = useState<string>("all");
  const { toast } = useToast();
  const [showUploadModal, setShowUploadModal] = useState(false);

  // Dummy data - replace with actual API calls
  const mediaItems: MediaItem[] = [
    {
      id: "1",
      name: "hero-image.jpg",
      type: "image",
      url: "/placeholder/800/600",
      thumbnailUrl: "/placeholder/400/300",
      size: "1.2 MB",
      dimensions: "1920x1080",
      uploadedAt: "2024-02-20T10:00:00Z",
    },
    {
      id: "2",
      name: "document.pdf",
      type: "document",
      url: "#",
      size: "2.5 MB",
      uploadedAt: "2024-02-19T15:30:00Z",
    },
    // Add more dummy items as needed
  ];

  const handleUpload = () => {
    setShowUploadModal(true);
  };

  const handleUploadComplete = (files: File[]) => {
    toast({
      title: "Upload Complete",
      description: `Successfully uploaded ${files.length} files.`,
    });
    // Refresh media library or add new files to the list
  };

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    toast({
      title: "URL Copied",
      description: "The file URL has been copied to your clipboard.",
    });
  };

  const handleDelete = (_id: string) => {
    // Implement delete logic
    toast({
      title: "File Deleted",
      description: "The file has been deleted successfully.",
    });
  };

  const filteredItems = mediaItems.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesType =
      fileTypeFilter === "all" || item.type === fileTypeFilter;
    return matchesSearch && matchesType;
  });

  const FileTypeIcon = ({ type }: { type: string }) => {
    switch (type) {
      case "image":
        return <ImageIcon className='w-4 h-4' />;
      case "document":
        return <FileTextIcon className='w-4 h-4' />;
      default:
        return <FileIcon className='w-4 h-4' />;
    }
  };

  return (
    <div className='space-y-6 p-6'>
      <Card>
        <CardHeader className='flex flex-row justify-between items-center space-y-0 pb-2'>
          <div className='space-y-1'>
            <CardTitle>Media Library</CardTitle>
            <CardDescription>
              Manage your uploaded images and files
            </CardDescription>
          </div>
          <Button onClick={handleUpload}>
            <UploadIcon className='mr-2 w-4 h-4' />
            Upload Files
          </Button>
        </CardHeader>
        <CardContent>
          <div className='flex flex-col space-y-4'>
            {/* Filters Bar */}
            <div className='flex sm:flex-row flex-col gap-4'>
              <div className='relative flex-1'>
                <SearchIcon className='top-2.5 left-2.5 absolute w-4 h-4 text-muted-foreground' />
                <Input
                  placeholder='Search files...'
                  className='pl-8'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className='flex items-center gap-2'>
                <Select
                  value={fileTypeFilter}
                  onValueChange={setFileTypeFilter}
                >
                  <SelectTrigger className='w-[140px]'>
                    <SelectValue placeholder='File type' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='all'>All Files</SelectItem>
                    <SelectItem value='image'>Images</SelectItem>
                    <SelectItem value='document'>Documents</SelectItem>
                    <SelectItem value='other'>Other</SelectItem>
                  </SelectContent>
                </Select>
                <div className='flex gap-1 p-1 border rounded-md'>
                  <Button
                    variant={viewMode === "grid" ? "secondary" : "ghost"}
                    size='icon'
                    onClick={() => setViewMode("grid")}
                  >
                    <GridIcon className='w-4 h-4' />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "secondary" : "ghost"}
                    size='icon'
                    onClick={() => setViewMode("list")}
                  >
                    <ListIcon className='w-4 h-4' />
                  </Button>
                </div>
              </div>
            </div>

            {/* Files Grid/List */}
            {viewMode === "grid" ? (
              <div className='gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                {filteredItems.map((item) => (
                  <div
                    key={item.id}
                    className='hover:border-primary/50 border rounded-lg transition-colors overflow-hidden group'
                  >
                    <div className='relative bg-muted aspect-square'>
                      {item.type === "image" ? (
                        <img
                          src={item.thumbnailUrl || item.url}
                          alt={item.name}
                          className='w-full h-full object-cover'
                        />
                      ) : (
                        <div className='flex justify-center items-center w-full h-full'>
                          <FileTypeIcon type={item.type} />
                        </div>
                      )}
                      <div className='absolute inset-0 flex justify-center items-center gap-2 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity'>
                        <Button variant='secondary' size='icon' asChild>
                          <a
                            href={item.url}
                            target='_blank'
                            rel='noopener noreferrer'
                          >
                            <ExternalLinkIcon className='w-4 h-4' />
                          </a>
                        </Button>
                        <Button variant='secondary' size='icon'>
                          <CopyIcon
                            className='w-4 h-4'
                            onClick={() => handleCopyUrl(item.url)}
                          />
                        </Button>
                      </div>
                    </div>
                    <div className='p-2'>
                      <div className='flex justify-between items-center'>
                        <span className='font-medium text-sm truncate'>
                          {item.name}
                        </span>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant='ghost' size='icon'>
                              <MoreVerticalIcon className='w-4 h-4' />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align='end'>
                            <DropdownMenuItem
                              onClick={() => handleCopyUrl(item.url)}
                            >
                              <CopyIcon className='mr-2 w-4 h-4' />
                              Copy URL
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => handleDelete(item.id)}
                              className='text-destructive focus:text-destructive'
                            >
                              <TrashIcon className='mr-2 w-4 h-4' />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <div className='mt-1 text-muted-foreground text-xs'>
                        {item.size} {item.dimensions && `• ${item.dimensions}`}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className='border rounded-lg divide-y'>
                {filteredItems.map((item) => (
                  <div
                    key={item.id}
                    className='flex items-center gap-4 hover:bg-muted/50 p-4 group'
                  >
                    <div className='flex justify-center items-center bg-muted rounded w-10 h-10'>
                      <FileTypeIcon type={item.type} />
                    </div>
                    <div className='flex-1 min-w-0'>
                      <div className='font-medium truncate'>{item.name}</div>
                      <div className='text-muted-foreground text-sm'>
                        {item.size} {item.dimensions && `• ${item.dimensions}`}
                      </div>
                    </div>
                    <div className='flex items-center gap-2'>
                      <Button variant='ghost' size='icon' asChild>
                        <a
                          href={item.url}
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          <ExternalLinkIcon className='w-4 h-4' />
                        </a>
                      </Button>
                      <Button
                        variant='ghost'
                        size='icon'
                        onClick={() => handleCopyUrl(item.url)}
                      >
                        <CopyIcon className='w-4 h-4' />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant='ghost' size='icon'>
                            <MoreVerticalIcon className='w-4 h-4' />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align='end'>
                          <DropdownMenuItem
                            onClick={() => handleDelete(item.id)}
                          >
                            <TrashIcon className='mr-2 w-4 h-4' />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      <UploadModal
        isOpen={showUploadModal} // Changed from open to isOpen to match the interface
        onClose={() => setShowUploadModal(false)}
        onUploadComplete={handleUploadComplete}
      />
    </div>
  );
}
