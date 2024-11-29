// app/dashboard/posts/drafts/page.tsx
"use client";

import React from "react";
import {
  Search,
  Filter,
  Calendar,
  Clock,
  MoreVertical,
  Pencil,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import EditDraftDialog from "@/components/dialogs/edit-draft-dialog";

// Define the structure of a draft post
interface DraftPost {
  id: string;
  title: string;
  content: string;
  type: "post" | "thread";
  lastModified: string;
  scheduledFor?: string;
}

export default function DraftsPage() {
  // State management for the drafts page
  const [selectedDraft, setSelectedDraft] = React.useState<DraftPost | null>(
    null
  );
  const [sortBy, setSortBy] = React.useState("newest");
  const [currentPage, setCurrentPage] = React.useState(1);

  // Example data - in a real app, this would come from an API
  const [drafts] = React.useState<DraftPost[]>([
    {
      id: "1",
      title: "Thoughts on the AT Protocol",
      content:
        "The AT Protocol represents a significant shift in how we think about social networking...",
      type: "post",
      lastModified: "2024-01-15T10:30:00Z",
    },
    {
      id: "2",
      title: "Building Community Features",
      content:
        "A thread about the importance of community features in social platforms...",
      type: "thread",
      lastModified: "2024-01-14T15:45:00Z",
      scheduledFor: "2024-02-01T09:00:00Z",
    },
  ]);

  // Helper function to format dates consistently
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  // Handler for saving edited drafts
  const handleSaveDraft = () => {
    // Here you would update the draft in your backend
    setSelectedDraft(null);
  };

  // Handler for opening the edit dialog
  const handleEditClick = (draft: DraftPost) => {
    setSelectedDraft(draft);
  };

  return (
    <div className='flex flex-col gap-6 p-6 h-full'>
      {/* Page Header */}
      <div className='flex justify-between items-center'>
        <div>
          <h1 className='font-semibold text-2xl tracking-tight'>Drafts</h1>
          <p className='text-muted-foreground'>
            Manage your unpublished content
          </p>
        </div>
      </div>

      {/* Search, Filter, and Sort Controls */}
      <div className='flex items-center gap-4'>
        <div className='relative flex-1'>
          <Search className='top-1/2 left-2.5 absolute w-4 h-4 text-muted-foreground -translate-y-1/2' />
          <Input placeholder='Search drafts...' className='pl-8' />
        </div>

        <div className='flex items-center gap-2'>
          <Button variant='outline' size='icon'>
            <Filter className='w-4 h-4' />
          </Button>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='Sort by' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='newest'>Newest First</SelectItem>
              <SelectItem value='oldest'>Oldest First</SelectItem>
              <SelectItem value='title'>Title A-Z</SelectItem>
              <SelectItem value='scheduled'>Scheduled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Drafts List */}
      <div className='gap-4 grid'>
        {drafts.length > 0 ? (
          drafts.map((draft) => (
            <Card key={draft.id} className='group'>
              <CardContent className='p-4'>
                <div className='flex justify-between items-start gap-4'>
                  {/* Draft Content Preview */}
                  <div className='flex-1 min-w-0'>
                    <div className='flex items-center gap-2 mb-1'>
                      <h3 className='font-medium truncate'>{draft.title}</h3>
                      <span className='bg-blue-100 px-2 py-0.5 rounded-full text-blue-800 text-xs'>
                        {draft.type === "thread" ? "Thread" : "Post"}
                      </span>
                    </div>
                    <p className='mb-4 line-clamp-2 text-muted-foreground text-sm'>
                      {draft.content}
                    </p>
                    <div className='flex items-center gap-4 text-muted-foreground text-sm'>
                      <div className='flex items-center gap-1'>
                        <Clock className='w-4 h-4' />
                        Last edited {formatDate(draft.lastModified)}
                      </div>
                      {draft.scheduledFor && (
                        <div className='flex items-center gap-1'>
                          <Calendar className='w-4 h-4' />
                          Scheduled for {formatDate(draft.scheduledFor)}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Draft Actions */}
                  <div className='flex items-center gap-2'>
                    <Button
                      variant='secondary'
                      size='sm'
                      onClick={() => handleEditClick(draft)}
                    >
                      <Pencil className='mr-2 w-4 h-4' />
                      Edit
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant='ghost' size='icon'>
                          <MoreVertical className='w-4 h-4' />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align='end'>
                        <DropdownMenuItem>Schedule</DropdownMenuItem>
                        <DropdownMenuItem>Duplicate</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className='text-destructive'>
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          // Empty State
          <div className='py-12 text-center'>
            <p className='text-muted-foreground'>No drafts found</p>
            <Button variant='outline' className='mt-4'>
              Create New Post
            </Button>
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      <div className='mt-auto pt-6'>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href='#'
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              />
            </PaginationItem>
            {[1, 2, 3].map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  href='#'
                  onClick={() => setCurrentPage(page)}
                  isActive={currentPage === page}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href='#'
                onClick={() => setCurrentPage((p) => Math.min(3, p + 1))}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

      {/* Edit Draft Dialog */}
      {selectedDraft && (
        <EditDraftDialog
          open={!!selectedDraft}
          onClose={() => setSelectedDraft(null)}
          draft={selectedDraft}
          onSave={handleSaveDraft}
        />
      )}
    </div>
  );
}
