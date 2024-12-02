"use client";

import React, { useState } from "react";
import {
  GridIcon,
  ListIcon,
  BookmarkIcon,
  MoreVerticalIcon,
  ExternalLinkIcon,
  CopyIcon,
  TrashIcon,
  FolderIcon,
  SortAsc,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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

type Bookmark = {
  id: string;
  title: string;
  url: string;
  description?: string;
  thumbnail?: string;
  folder?: string;
  tags: string[];
  createdAt: string;
};

type ViewMode = "grid" | "list";

export default function BookmarksPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [folderFilter, setFolderFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("date");
  const { toast } = useToast();

  // Dummy data - replace with actual API calls
  const bookmarks: Bookmark[] = [
    {
      id: "1",
      title: "Interesting Article About Bluesky",
      url: "https://example.com/article",
      description:
        "A fascinating deep dive into the AT Protocol and its implications",
      thumbnail: "/placeholder/400/300",
      folder: "Articles",
      tags: ["bluesky", "technology", "social"],
      createdAt: "2024-02-20T10:00:00Z",
    },
    {
      id: "2",
      title: "Developer Documentation",
      url: "https://example.com/docs",
      description: "Official documentation for AT Protocol integration",
      folder: "Resources",
      tags: ["documentation", "development", "reference"],
      createdAt: "2024-02-19T15:30:00Z",
    },
  ];

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    toast({
      title: "URL Copied",
      description: "The bookmark URL has been copied to your clipboard.",
    });
  };

  const handleDelete = (id: string) => {
    toast({
      title: "Bookmark Deleted",
      description: "The bookmark has been removed from your library.",
    });
  };

  const filteredBookmarks = bookmarks.filter((bookmark) => {
    const matchesSearch =
      bookmark.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bookmark.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bookmark.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );
    const matchesFolder =
      folderFilter === "all" || bookmark.folder === folderFilter;
    return matchesSearch && matchesFolder;
  });

  const folders = Array.from(
    new Set(bookmarks.map((b) => b.folder).filter(Boolean))
  );

  return (
    <div className='flex flex-col gap-6 p-6'>
      {/* Header */}
      <div className='flex justify-between items-center mb-8'>
        <div>
          <h1 className='font-semibold text-2xl tracking-tight'>Bookmarks</h1>
          <p className='text-muted-foreground'>
            Manage your saved posts and resources
          </p>
        </div>
        <Button>
          <BookmarkIcon className='mr-2 w-4 h-4' />
          Add Bookmark
        </Button>
      </div>

      {/* Filters and Controls */}
      <div className='flex md:flex-row flex-col md:items-center gap-4'>
        <div className='relative flex-1'>
          <Input
            placeholder='Search bookmarks...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className='max-w-sm'
          />
        </div>

        <div className='flex flex-wrap gap-2'>
          <Select value={folderFilter} onValueChange={setFolderFilter}>
            <SelectTrigger className='w-[150px]'>
              <FolderIcon className='mr-2 w-4 h-4' />
              <SelectValue placeholder='Folder' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>All Folders</SelectItem>
              {folders.map((folder) => (
                <SelectItem key={folder} value={folder!}>
                  {folder}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className='w-[150px]'>
              <SortAsc className='mr-2 w-4 h-4' />
              <SelectValue placeholder='Sort by' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='date'>Save Date</SelectItem>
              <SelectItem value='name'>Title</SelectItem>
              <SelectItem value='folder'>Folder</SelectItem>
            </SelectContent>
          </Select>

          <div className='flex border rounded-md'>
            <Button
              variant={viewMode === "grid" ? "secondary" : "ghost"}
              size='sm'
              className='rounded-r-none'
              onClick={() => setViewMode("grid")}
            >
              <GridIcon className='w-4 h-4' />
            </Button>
            <Button
              variant={viewMode === "list" ? "secondary" : "ghost"}
              size='sm'
              className='rounded-l-none'
              onClick={() => setViewMode("list")}
            >
              <ListIcon className='w-4 h-4' />
            </Button>
          </div>
        </div>
      </div>

      {/* Bookmarks Display */}
      <div
        className={
          viewMode === "grid"
            ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            : "space-y-2"
        }
      >
        {filteredBookmarks.map((bookmark) => (
          <Card
            key={bookmark.id}
            className={viewMode === "list" ? "hover:bg-muted/5" : ""}
          >
            <CardContent
              className={
                viewMode === "grid" ? "p-2" : "flex items-center gap-4 p-4"
              }
            >
              {viewMode === "grid" ? (
                <div className='space-y-2'>
                  {bookmark.thumbnail && (
                    <div className='relative aspect-video'>
                      <img
                        src={bookmark.thumbnail}
                        alt={bookmark.title}
                        className='rounded-md w-full h-full object-cover'
                      />
                    </div>
                  )}
                  <div className='space-y-1'>
                    <h3 className='line-clamp-2 font-medium text-sm'>
                      {bookmark.title}
                    </h3>
                    {bookmark.description && (
                      <p className='line-clamp-2 text-muted-foreground text-xs'>
                        {bookmark.description}
                      </p>
                    )}
                    <div className='flex items-center gap-2 text-muted-foreground text-xs'>
                      {bookmark.folder && (
                        <div className='flex items-center gap-1'>
                          <FolderIcon className='w-3 h-3' />
                          {bookmark.folder}
                        </div>
                      )}
                    </div>
                    <div className='flex flex-wrap gap-1'>
                      {bookmark.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant='secondary'
                          className='text-xs'
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div className='flex-1 min-w-0'>
                    <div className='flex justify-between items-start'>
                      <div className='space-y-1'>
                        <h3 className='font-medium'>{bookmark.title}</h3>
                        {bookmark.description && (
                          <p className='line-clamp-2 text-muted-foreground text-sm'>
                            {bookmark.description}
                          </p>
                        )}
                        <div className='flex flex-wrap gap-2'>
                          {bookmark.folder && (
                            <div className='flex items-center gap-1 text-muted-foreground text-xs'>
                              <FolderIcon className='w-3 h-3' />
                              {bookmark.folder}
                            </div>
                          )}
                          {bookmark.tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant='secondary'
                              className='text-xs'
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className='flex items-center gap-2'>
                        <Button variant='ghost' size='icon' asChild>
                          <a
                            href={bookmark.url}
                            target='_blank'
                            rel='noopener noreferrer'
                          >
                            <ExternalLinkIcon className='w-4 h-4' />
                          </a>
                        </Button>
                        <Button
                          variant='ghost'
                          size='icon'
                          onClick={() => handleCopyUrl(bookmark.url)}
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
                              onClick={() => handleDelete(bookmark.id)}
                              className='text-destructive focus:text-destructive'
                            >
                              <TrashIcon className='mr-2 w-4 h-4' />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
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
