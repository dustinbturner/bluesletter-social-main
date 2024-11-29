// components/analytics/content-performance.tsx
"use client";

import React from "react";
import {
  BarChart2,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  MessageCircle,
  Repeat,
  Star,
  Search,
  Users,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

// We'll use this interface to type our content data
interface ContentItem {
  id: string;
  title: string;
  type: "post" | "thread";
  publishedAt: string;
  metrics: {
    likes: number;
    reposts: number;
    replies: number;
    engagement: number;
    reach: number;
  };
  trend: {
    direction: "up" | "down";
    percentage: number;
  };
}

export function ContentPerformanceTab() {
  const [contentType, setContentType] = React.useState("all");
  const [sortBy, setSortBy] = React.useState("engagement");

  // Example data - in a real app, this would come from your API
  const contentItems: ContentItem[] = [
    {
      id: "1",
      title: "Understanding the AT Protocol",
      type: "thread",
      publishedAt: "2024-01-20T10:00:00Z",
      metrics: {
        likes: 523,
        reposts: 128,
        replies: 89,
        engagement: 12.5,
        reach: 15234,
      },
      trend: {
        direction: "up",
        percentage: 23,
      },
    },
    // Add more items...
  ];

  return (
    <div className='space-y-6'>
      {/* Performance Overview Cards */}
      <div className='gap-4 grid md:grid-cols-4'>
        <Card>
          <CardHeader className='flex flex-row justify-between items-center pb-2'>
            <CardTitle className='font-medium text-sm'>
              Avg. Engagement
            </CardTitle>
            <BarChart2 className='w-4 h-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='font-bold text-2xl'>8.2%</div>
            <div className='flex items-center text-green-500 text-sm'>
              <ArrowUpRight className='mr-1 w-4 h-4' />
              12% higher than average
            </div>
          </CardContent>
        </Card>
        {/* Add similar cards for other high-level metrics */}
      </div>

      {/* Content Filters */}
      <div className='flex sm:flex-row flex-col sm:justify-between sm:items-center gap-4'>
        <div className='relative flex-1 max-w-md'>
          <Input placeholder='Search content...' className='pl-8' />
          <Search className='top-1/2 left-2.5 absolute w-4 h-4 text-muted-foreground -translate-y-1/2' />
        </div>

        <div className='flex items-center gap-2'>
          <Select value={contentType} onValueChange={setContentType}>
            <SelectTrigger className='w-[140px]'>
              <SelectValue placeholder='Content type' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>All Content</SelectItem>
              <SelectItem value='posts'>Posts</SelectItem>
              <SelectItem value='threads'>Threads</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className='w-[140px]'>
              <SelectValue placeholder='Sort by' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='engagement'>Engagement</SelectItem>
              <SelectItem value='reach'>Reach</SelectItem>
              <SelectItem value='recent'>Most Recent</SelectItem>
            </SelectContent>
          </Select>

          <Button variant='outline' size='icon'>
            <Filter className='w-4 h-4' />
          </Button>
        </div>
      </div>

      {/* Content Performance List */}
      <Card>
        <CardHeader>
          <CardTitle>Content Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='space-y-6'>
            {contentItems.map((item) => (
              <div
                key={item.id}
                className='flex flex-col gap-4 last:border-0 pb-6 last:pb-0 border-b'
              >
                <div className='flex justify-between items-start'>
                  <div className='space-y-1'>
                    <div className='flex items-center gap-2'>
                      <h3 className='font-medium'>{item.title}</h3>
                      <span
                        className={cn(
                          "text-xs px-2 py-0.5 rounded-full",
                          item.type === "thread"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-green-100 text-green-800"
                        )}
                      >
                        {item.type === "thread" ? "Thread" : "Post"}
                      </span>
                    </div>
                    <p className='text-muted-foreground text-sm'>
                      Published{" "}
                      {new Date(item.publishedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className='text-right'>
                    <div className='flex items-center text-sm'>
                      {item.trend.direction === "up" ? (
                        <ArrowUpRight className='mr-1 w-4 h-4 text-green-500' />
                      ) : (
                        <ArrowDownRight className='mr-1 w-4 h-4 text-red-500' />
                      )}
                      <span
                        className={
                          item.trend.direction === "up"
                            ? "text-green-500"
                            : "text-red-500"
                        }
                      >
                        {item.trend.percentage}%
                      </span>
                    </div>
                    <p className='text-muted-foreground text-sm'>vs. avg</p>
                  </div>
                </div>

                <div className='gap-4 grid grid-cols-2 md:grid-cols-4'>
                  <div className='flex items-center gap-2'>
                    <Star className='w-4 h-4 text-muted-foreground' />
                    <div>
                      <p className='font-medium text-sm'>
                        {item.metrics.likes.toLocaleString()}
                      </p>
                      <p className='text-muted-foreground text-xs'>Likes</p>
                    </div>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Repeat className='w-4 h-4 text-muted-foreground' />
                    <div>
                      <p className='font-medium text-sm'>
                        {item.metrics.reposts.toLocaleString()}
                      </p>
                      <p className='text-muted-foreground text-xs'>Reposts</p>
                    </div>
                  </div>
                  <div className='flex items-center gap-2'>
                    <MessageCircle className='w-4 h-4 text-muted-foreground' />
                    <div>
                      <p className='font-medium text-sm'>
                        {item.metrics.replies.toLocaleString()}
                      </p>
                      <p className='text-muted-foreground text-xs'>Replies</p>
                    </div>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Users className='w-4 h-4 text-muted-foreground' />
                    <div>
                      <p className='font-medium text-sm'>
                        {item.metrics.reach.toLocaleString()}
                      </p>
                      <p className='text-muted-foreground text-xs'>Reach</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
