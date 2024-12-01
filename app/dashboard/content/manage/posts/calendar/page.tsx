// app/dashboard/posts/calendar/page.tsx
"use client";

import * as React from "react";
import { Plus, ChevronLeft, ChevronRight } from "lucide-react";
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

// First, let's properly define our interfaces
interface Author {
  name: string;
  avatar?: string;
}

interface Template {
  id: string;
  name: string;
  type: ContentType;
  description: string;
  defaultTime?: string;
}

// Using a type for content types ensures consistency
type ContentType = "post" | "thread" | "newsletter";
type ViewType = "month" | "week" | "day";
type ContentStatus = "draft" | "scheduled" | "published";

interface ScheduledContent {
  id: string;
  title: string;
  type: ContentType;
  scheduledFor: Date;
  author: Author;
  status: ContentStatus;
  template?: string; // Reference to template ID if used
  category?: string;
}

export default function ContentPlanner() {
  // State management with proper typing
  const [view, setView] = React.useState<ViewType>("week");
  const [setCurrentDate] = React.useState(new Date());
  const [selectedTemplate, setSelectedTemplate] = React.useState<string>("");

  // Example data for templates
  const [templates] = React.useState<Template[]>([
    {
      id: "weekly-update",
      name: "Weekly Update",
      type: "thread",
      description: "Standard weekly update thread format",
    },
    {
      id: "newsletter",
      name: "Newsletter Template",
      type: "newsletter",
      description: "Basic newsletter structure",
    },
  ]);

  // Example scheduled content with proper typing
  const [scheduledContent] = React.useState<ScheduledContent[]>([
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
    },
  ]);

  // Helper function to format dates consistently
  const formatTime = (date: Date): string => {
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
    }).format(date);
  };

  // Template application logic with proper error handling
  const applyTemplate = async (templateId: string, date: Date) => {
    try {
      const template = templates.find((t) => t.id === templateId);
      if (!template) {
        throw new Error("Template not found");
      }

      // Here we would integrate with your content management system
      console.log(`Applying template ${template.name} for ${date}`);

      // Example of what this might do
      const newContent: Partial<ScheduledContent> = {
        type: template.type,
        scheduledFor: date,
        template: templateId,
        status: "draft",
      };

      // You would then save this to your backend
      return newContent;
    } catch (error) {
      console.error("Error applying template:", error);
      // Handle error appropriately
    }
  };

  // Calendar navigation functions
  const navigateCalendar = (direction: "prev" | "next") => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      if (view === "month") {
        newDate.setMonth(prevDate.getMonth() + (direction === "next" ? 1 : -1));
      } else if (view === "week") {
        newDate.setDate(prevDate.getDate() + (direction === "next" ? 7 : -7));
      } else {
        newDate.setDate(prevDate.getDate() + (direction === "next" ? 1 : -1));
      }
      return newDate;
    });
  };

  return (
    <div className='flex flex-col gap-6 p-6 h-full'>
      {/* Calendar Header */}
      <div className='flex justify-between items-center mb-8'>
        <div>
          <h1 className='font-semibold text-2xl tracking-tight'>
            Content Planner
          </h1>
          <p className='text-muted-foreground'>
            Plan and visualize your content strategy
          </p>
        </div>

        <div className='flex items-center gap-4'>
          {/* View Selection */}
          <Select value={view} onValueChange={(v) => setView(v as ViewType)}>
            <SelectTrigger className='w-28'>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='month'>Month</SelectItem>
              <SelectItem value='week'>Week</SelectItem>
              <SelectItem value='day'>Day</SelectItem>
            </SelectContent>
          </Select>

          {/* Template Selection */}
          <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
            <SelectTrigger className='w-40'>
              <SelectValue placeholder='Apply Template' />
            </SelectTrigger>
            <SelectContent>
              {templates.map((template) => (
                <SelectItem key={template.id} value={template.id}>
                  {template.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className='flex gap-2'>
            <Button
              variant='outline'
              size='icon'
              onClick={() => navigateCalendar("prev")}
            >
              <ChevronLeft className='w-4 h-4' />
            </Button>
            <Button
              variant='outline'
              size='icon'
              onClick={() => navigateCalendar("next")}
            >
              <ChevronRight className='w-4 h-4' />
            </Button>
          </div>

          <Button size='sm'>
            <Plus className='mr-2 w-4 h-4' />
            New Content
          </Button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className='flex-1 grid grid-cols-7 border-b divide-x divide-y'>
        {/* Week Day Headers */}
        <div className='grid grid-cols-7 col-span-7 bg-muted/10 divide-x'>
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
            <div key={day} className='p-2 font-medium text-center text-sm'>
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Cells */}
        {Array.from({ length: 35 }).map((_, i) => (
          <div
            key={i}
            className='relative hover:bg-muted/5 p-2 min-h-[120px] group'
          >
            <div className='mb-2 text-muted-foreground text-sm'>{i + 1}</div>

            {/* Example Scheduled Content */}
            {i === 15 && (
              <div className='bg-blue-50 mb-1 p-2 rounded text-xs'>
                <div className='flex items-center gap-2'>
                  <Badge variant='outline' className='bg-blue-100'>
                    Thread
                  </Badge>
                  <span className='text-blue-600'>10:00 AM</span>
                </div>
                <div className='mt-1 font-medium'>Product Launch Updates</div>
                <div className='flex items-center gap-1 mt-1'>
                  <Avatar className='w-4 h-4'>
                    <AvatarImage src='/placeholder.jpg' alt='Avatar' />
                    <AvatarFallback>A</AvatarFallback>
                  </Avatar>
                  <span className='text-muted-foreground'>Dustin</span>
                </div>
              </div>
            )}

            {i === 16 && (
              <div className='bg-purple-50 mb-1 p-2 rounded text-xs'>
                <div className='flex items-center gap-2'>
                  <Badge variant='outline' className='bg-purple-100'>
                    Newsletter
                  </Badge>
                  <span className='text-purple-600'>2:00 PM</span>
                </div>
                <div className='mt-1 font-medium'>Weekly Digest</div>
                <div className='flex items-center gap-1 mt-1'>
                  <Avatar className='w-4 h-4'>
                    <AvatarImage src='/placeholder.jpg' alt='Avatar' />
                    <AvatarFallback>A</AvatarFallback>
                  </Avatar>
                  <span className='text-muted-foreground'>John</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
