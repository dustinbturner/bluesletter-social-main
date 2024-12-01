// app/dashboard/posts/scheduled/page.tsx
"use client";

import * as React from "react";
import { Calendar, Clock, MoreVertical, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Define interface for our scheduled content items
interface ScheduledContent {
  id: string;
  title: string;
  type: "post" | "thread" | "newsletter";
  scheduledFor: Date;
  author: {
    name: string;
    avatar?: string;
  };
  status: "scheduled" | "publishing" | "failed";
  content: string;
}

export default function ScheduledContent() {
  // Example data - would come from your content management system
  const scheduledItems: ScheduledContent[] = [
    {
      id: "1",
      title: "Product Launch Updates",
      type: "thread",
      scheduledFor: new Date("2024-01-15T10:00:00"),
      author: {
        name: "Dustin",
        avatar: "/placeholder.jpg",
      },
      status: "scheduled",
      content: "Thread about our new features...",
    },
    {
      id: "2",
      title: "Weekly Digest",
      type: "newsletter",
      scheduledFor: new Date("2024-01-16T14:00:00"),
      author: {
        name: "John",
        avatar: "/placeholder.jpg",
      },
      status: "scheduled",
      content: "This week's highlights...",
    },
  ];

  const [timeFilter, setTimeFilter] = React.useState("upcoming");
  const [typeFilter, setTypeFilter] = React.useState("all");

  // Helper function to format dates consistently
  const formatScheduledDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <div className='flex flex-col gap-6 p-6'>
      {/* Header */}
      <div className='flex justify-between items-center mb-8'>
        <div>
          <h1 className='font-semibold text-2xl tracking-tight'>
            Scheduled Content
          </h1>
          <p className='text-muted-foreground'>
            Manage your upcoming scheduled posts and content
          </p>
        </div>

        <div className='flex items-center gap-4'>
          {/* Time Range Filter */}
          <Select value={timeFilter} onValueChange={setTimeFilter}>
            <SelectTrigger className='w-36'>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='upcoming'>Upcoming</SelectItem>
              <SelectItem value='today'>Today</SelectItem>
              <SelectItem value='week'>This Week</SelectItem>
              <SelectItem value='month'>This Month</SelectItem>
            </SelectContent>
          </Select>

          {/* Content Type Filter */}
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className='w-32'>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>All Types</SelectItem>
              <SelectItem value='post'>Posts</SelectItem>
              <SelectItem value='thread'>Threads</SelectItem>
              <SelectItem value='newsletter'>Newsletters</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant='outline'
            onClick={() => (window.location.href = "/dashboard/posts/calendar")}
          >
            <Calendar className='mr-2 w-4 h-4' />
            View Calendar
          </Button>
        </div>
      </div>

      {/* Scheduled Items List */}
      <div className='space-y-4'>
        {scheduledItems.map((item) => (
          <div
            key={item.id}
            className='hover:bg-muted/5 p-4 border rounded-lg transition-colors'
          >
            <div className='flex justify-between items-start'>
              <div className='space-y-1'>
                <div className='flex items-center gap-2'>
                  <Badge
                    variant='outline'
                    className={
                      item.type === "thread"
                        ? "bg-blue-100"
                        : item.type === "newsletter"
                        ? "bg-purple-100"
                        : "bg-green-100"
                    }
                  >
                    {item.type}
                  </Badge>
                  <span className='text-muted-foreground text-sm'>
                    <Clock className='inline-block mr-1 w-4 h-4' />
                    {formatScheduledDate(item.scheduledFor)}
                  </span>
                </div>
                <h3 className='font-medium text-lg'>{item.title}</h3>
                <p className='line-clamp-2 text-muted-foreground text-sm'>
                  {item.content}
                </p>
              </div>

              <div className='flex items-center gap-4'>
                <div className='flex items-center gap-2'>
                  <Avatar className='w-6 h-6'>
                    <AvatarImage
                      src={item.author.avatar}
                      alt={item.author.name}
                    />
                    <AvatarFallback>{item.author.name[0]}</AvatarFallback>
                  </Avatar>
                  <span className='text-muted-foreground text-sm'>
                    {item.author.name}
                  </span>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant='ghost' size='sm'>
                      <MoreVertical className='w-4 h-4' />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align='end'>
                    <DropdownMenuItem>
                      <Pencil className='mr-2 w-4 h-4' />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem className='text-destructive'>
                      <Trash2 className='mr-2 w-4 h-4' />
                      Cancel
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
