// app/dashboard/analytics/page.tsx
"use client";

import React from "react";
import { ArrowUpRight, Download, MessageCircle, Repeat } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ContentPerformanceTab } from "@/components/analytics/content-performance";

export default function AnalyticsDashboard() {
  const [activeTab, setActiveTab] = React.useState("overview");
  const [timeRange, setTimeRange] = React.useState("7d");

  // Example data structure for content performance
  const topPosts = [
    {
      id: "1",
      title: "Thoughts on the AT Protocol",
      likes: 324,
      reposts: 89,
      replies: 56,
      engagement: "12.5%",
    },
    // ... more posts
  ];

  return (
    <div className='flex flex-col gap-6 p-6'>
      {/* Header with Tabs and Controls */}
      <div className='flex md:flex-row flex-col md:justify-between md:items-center gap-6'>
        <div>
          <h1 className='font-semibold text-2xl tracking-tight'>Analytics</h1>
          <p className='text-muted-foreground'>
            Detailed insights into your content performance
          </p>
        </div>

        <div className='flex flex-wrap items-center gap-2'>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className='w-[160px]'>
              <SelectValue placeholder='Select range' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='24h'>Last 24 hours</SelectItem>
              <SelectItem value='7d'>Last 7 days</SelectItem>
              <SelectItem value='30d'>Last 30 days</SelectItem>
              <SelectItem value='custom'>Custom range</SelectItem>
            </SelectContent>
          </Select>

          <Button variant='outline'>
            <Download className='mr-2 w-4 h-4' />
            Export Report
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value='overview'>Overview</TabsTrigger>
          <TabsTrigger value='content'>Content Performance</TabsTrigger>
          <TabsTrigger value='audience'>Audience Insights</TabsTrigger>
          <TabsTrigger value='engagement'>Engagement Analysis</TabsTrigger>
        </TabsList>
      </Tabs>

      {activeTab === "overview" && (
        <div className='space-y-6'>
          {/* Content Performance Metrics */}
          <Card>
            <CardHeader>
              <CardTitle className='font-medium text-lg'>
                Content Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='gap-4 grid md:grid-cols-2 lg:grid-cols-4'>
                <div className='space-y-2'>
                  <p className='font-medium text-muted-foreground text-sm'>
                    Average Engagement Rate
                  </p>
                  <p className='font-bold text-2xl'>5.2%</p>
                  <p className='flex items-center text-muted-foreground text-sm'>
                    <ArrowUpRight className='mr-1 w-4 h-4 text-green-500' />
                    +0.8% from last period
                  </p>
                </div>
                {/* Add more detailed metrics */}
              </div>
            </CardContent>
          </Card>

          {/* Top Performing Content */}
          <Card>
            <CardHeader>
              <CardTitle className='font-medium text-lg'>
                Top Performing Content
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                {topPosts.map((post) => (
                  <div
                    key={post.id}
                    className='flex justify-between items-center pb-4 border-b'
                  >
                    <div className='space-y-1'>
                      <p className='font-medium'>{post.title}</p>
                      <div className='flex items-center gap-4 text-muted-foreground text-sm'>
                        <span className='flex items-center gap-1'>
                          <MessageCircle className='w-4 h-4' /> {post.replies}
                        </span>
                        <span className='flex items-center gap-1'>
                          <Repeat className='w-4 h-4' /> {post.reposts}
                        </span>
                      </div>
                    </div>
                    <div className='text-right'>
                      <p className='font-bold'>{post.engagement}</p>
                      <p className='text-muted-foreground text-sm'>
                        Engagement Rate
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      {activeTab === "content" && <ContentPerformanceTab />}
      {/* Other tab content would follow */}
    </div>
  );
}
