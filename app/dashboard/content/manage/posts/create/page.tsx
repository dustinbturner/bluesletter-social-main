// app/dashboard/posts/create/page.tsx
"use client";

import React from "react";
import {
  ImagePlus,
  Link2,
  AtSign,
  Hash,
  Globe,
  ChevronDown,
  Sparkles,
  Calendar,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import ScheduleDialog from "@/components/dialogs/schedule-dialog";

const CHAR_LIMIT = 300;

export default function CreatePost() {
  const [postContent, setPostContent] = React.useState("");
  const [showScheduleDialog, setShowScheduleDialog] = React.useState(false);

  // Split content into thread parts if it exceeds character limit
  const threadParts = React.useMemo(() => {
    if (postContent.length <= CHAR_LIMIT) {
      return [postContent];
    }

    const parts = [];
    let remainingContent = postContent;

    while (remainingContent.length > 0) {
      // Find the last space within the character limit
      const cutoff = remainingContent.slice(0, CHAR_LIMIT).lastIndexOf(" ");
      const splitIndex = cutoff > 0 ? cutoff : CHAR_LIMIT;

      parts.push(remainingContent.slice(0, splitIndex));
      remainingContent = remainingContent.slice(splitIndex + 1);
    }

    return parts;
  }, [postContent]);

  const charactersRemaining =
    CHAR_LIMIT - (threadParts[threadParts.length - 1]?.length || 0);

  function handleSchedule(): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className='flex flex-col gap-6 p-6 h-full'>
      {/* Header Section */}
      <div className='flex justify-between items-center mb-8'>
        <div>
          <h1 className='font-semibold text-2xl tracking-tight'>
            Create New Post
          </h1>
          <p className='text-muted-foreground'>
            Share your thoughts with your audience
          </p>
        </div>
        <div className='flex gap-2'>
          <Button
            variant='secondary'
            size='sm'
            onClick={() => setShowScheduleDialog(true)}
          >
            <Calendar className='mr-2 w-4 h-4' />
            Schedule Post
          </Button>
          <ScheduleDialog
            open={showScheduleDialog}
            onClose={() => setShowScheduleDialog(false)}
            onSchedule={handleSchedule}
          />
          <Button variant='secondary' size='sm'>
            Save Draft
          </Button>
          <Button size='sm'>Post Now</Button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className='gap-6 grid grid-cols-1 lg:grid-cols-2'>
        {/* Post Creation Card */}
        <Card className='flex flex-col lg:h-[calc(100vh-12rem)]'>
          <CardContent className='flex flex-col flex-1 p-6'>
            {/* Post Type Selector */}
            <div className='flex gap-2 mb-6'>
              <Button variant='secondary'>Single Post</Button>
              <Button variant='ghost'>Thread</Button>
            </div>

            {/* Composer Toolbar */}
            <div className='flex flex-wrap items-center gap-2 mb-4'>
              <div className='flex gap-2'>
                <Button variant='ghost' size='icon'>
                  <ImagePlus className='w-4 h-4' />
                </Button>
                <Button variant='ghost' size='icon'>
                  <Link2 className='w-4 h-4' />
                </Button>
                <Button variant='ghost' size='icon'>
                  <AtSign className='w-4 h-4' />
                </Button>
                <Button variant='ghost' size='icon'>
                  <Hash className='w-4 h-4' />
                </Button>
              </div>

              <Separator orientation='vertical' className='h-6' />

              <div className='flex gap-2 ml-auto'>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant='ghost' size='sm'>
                      <Globe className='mr-2 w-4 h-4' />
                      Everyone
                      <ChevronDown className='ml-2 w-4 h-4' />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align='end'>
                    <DropdownMenuItem>Everyone</DropdownMenuItem>
                    <DropdownMenuItem>Subscribers Only</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Button variant='ghost' size='sm'>
                  <Sparkles className='mr-2 w-4 h-4' />
                  AI Assist
                </Button>
              </div>
            </div>

            {/* Text Area with Character Count */}
            <div className='flex flex-col flex-1'>
              <Textarea
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                placeholder="What's on your mind?"
                className='flex-1 min-h-[200px] resize-none'
              />
              <div className='text-right mt-2 text-muted-foreground text-sm'>
                {charactersRemaining} characters remaining
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Preview Card */}
        <Card className='flex flex-col lg:h-[calc(100vh-12rem)]'>
          <CardContent className='flex-1 p-6 overflow-auto'>
            <h2 className='mb-4 font-medium text-lg'>Preview</h2>
            <div className='space-y-4'>
              {threadParts.map((part, index) => (
                <div
                  key={index}
                  className='bg-muted/50 p-6 rounded-lg break-words'
                >
                  <div className='max-w-none prose'>
                    {part || (
                      <p className='text-center text-muted-foreground'>
                        Your post will appear here as you type...
                      </p>
                    )}
                  </div>
                  {index === threadParts.length - 1 && (
                    <div className='mt-2 text-muted-foreground text-sm'>
                      {part.length}/{CHAR_LIMIT} characters
                    </div>
                  )}
                </div>
              ))}
              {threadParts.length > 1 && (
                <p className='px-2 text-muted-foreground text-sm'>
                  This content will be posted as a thread of{" "}
                  {threadParts.length} posts
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
