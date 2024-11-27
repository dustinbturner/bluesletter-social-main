"use client";

import React, { useState, useMemo } from "react";
import {
  Users,
  MessagesSquare,
  FileText,
  BarChart2,
  PenSquare,
  Mail,
  Send,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { LineChart } from "@/components/charts/line-chart";
import { Toaster } from "@/components/ui/toaster";

type MetricType =
  | "followers"
  | "following"
  | "posts"
  | "subscribers"
  | "comments";
type TimeframeType = "24h" | "7d" | "30d";

// Dummy analytics data
const analytics = {
  current: {
    followers: 1000,
    following: 500,
    posts: 200,
  },
  changes: {
    followers: "+5%",
    following: "+2%",
    posts: "+10%",
  },
  history: Array.from({ length: 30 }, (_, i) => ({
    date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
    followers: 1000 + i * 5,
    following: 500 + i * 2,
    posts: 200 + i * 10,
  })),
};

export default function DashboardClient() {
  const [timeframe, setTimeframe] = useState<TimeframeType>("7d");
  const [selectedMetric, setSelectedMetric] = useState<MetricType>("followers");

  const statsCardsData = [
    {
      title: "Followers",
      value: analytics.current.followers.toLocaleString(),
      change: analytics.changes.followers,
      increasing: true,
      icon: Users,
    },
    {
      title: "Following",
      value: analytics.current.following.toLocaleString(),
      change: analytics.changes.following,
      increasing: true,
      icon: Users,
    },
    {
      title: "Total Posts",
      value: analytics.current.posts.toLocaleString(),
      change: analytics.changes.posts,
      increasing: true,
      icon: FileText,
    },
    {
      title: "Newsletter Subscribers",
      value: "789",
      change: "-1.2%",
      increasing: false,
      icon: BarChart2,
    },
    {
      title: "New Comments",
      value: "123",
      change: "+8.1%",
      increasing: true,
      icon: MessagesSquare,
    },
  ];

  const timeRanges = [
    { value: "24h", label: "Last 24 hours" },
    { value: "7d", label: "Last 7 days" },
    { value: "30d", label: "Last 30 days" },
  ];

  const chartData = useMemo(() => {
    const dataPoints = analytics.history.map((record) => {
      const value = record[selectedMetric as keyof typeof record];
      return typeof value === "number" ? value : 0;
    });

    return {
      labels: analytics.history.map((record) =>
        new Date(record.date).toLocaleDateString()
      ),
      datasets: [
        {
          label:
            selectedMetric.charAt(0).toUpperCase() + selectedMetric.slice(1),
          data: dataPoints,
        },
      ],
    };
  }, [selectedMetric]);

  const actionCards = [
    {
      title: "Post to Bluesky",
      description: "Share an update with your Bluesky followers",
      icon: Send,
      href: "/dashboard/posts/create",
      variant: "default" as const,
    },
    {
      title: "Create Blog Post",
      description: "Write and publish a new blog post",
      icon: PenSquare,
      href: "/dashboard/posts/new",
      variant: "default" as const,
    },
    {
      title: "Send Newsletter",
      description: "Compose and send a newsletter to your subscribers",
      icon: Mail,
      href: "/dashboard/newsletter/new",
      variant: "default" as const,
    },
  ];

  return (
    <div className='flex flex-col gap-6'>
      <div className='gap-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3'>
        {actionCards.map((card) => (
          <Card
            key={card.title}
            className='relative hover:bg-muted/50 transition-colors cursor-pointer overflow-hidden'
          >
            <CardHeader className='flex flex-row items-center gap-4'>
              <div className='bg-primary/10 p-2 rounded-lg'>
                <card.icon className='w-6 h-6 text-primary' />
              </div>
              <div className='gap-1 grid'>
                <CardTitle className='text-lg'>{card.title}</CardTitle>
                <CardDescription>{card.description}</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <Button className='w-full' variant='secondary'>
                Create
                <card.icon className='ml-2 w-4 h-4' />
              </Button>
            </CardContent>
            <a href={card.href} className='absolute inset-0'>
              <span className='sr-only'>Go to {card.title}</span>
            </a>
          </Card>
        ))}
      </div>

      <div className='relative'>
        <div className='absolute inset-0 flex items-center'>
          <Separator className='w-full' />
        </div>
      </div>

      <div className='flex justify-between items-center'>
        <h2 className='font-semibold text-2xl tracking-tight'>Analytics</h2>
        <Button variant='default'>Refresh Analytics</Button>
      </div>

      <div className='gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
        {statsCardsData.map((card) => (
          <Card key={card.title}>
            <CardHeader className='flex flex-row justify-between items-center space-y-0 pb-2'>
              <CardTitle className='font-medium text-muted-foreground text-sm'>
                {card.title}
              </CardTitle>
              <card.icon className='w-4 h-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='font-bold text-2xl'>{card.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <div className='flex sm:flex-row flex-col sm:justify-between sm:items-center space-y-4 sm:space-y-0'>
            <CardTitle>Analytics Overview</CardTitle>
            <div className='flex flex-wrap items-center gap-2'>
              <Select
                value={selectedMetric}
                onValueChange={(value: MetricType) => setSelectedMetric(value)}
              >
                <SelectTrigger className='w-[160px]'>
                  <SelectValue placeholder='Select metric' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='followers'>Followers</SelectItem>
                  <SelectItem value='following'>Following</SelectItem>
                  <SelectItem value='posts'>Posts</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={timeframe}
                onValueChange={(value: TimeframeType) => setTimeframe(value)}
              >
                <SelectTrigger className='w-[160px]'>
                  <SelectValue placeholder='Select time range' />
                </SelectTrigger>
                <SelectContent>
                  {timeRanges.map((range) => (
                    <SelectItem key={range.value} value={range.value}>
                      {range.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className='h-[400px]'>
          <LineChart data={chartData} />
        </CardContent>
      </Card>

      <Toaster />
    </div>
  );
}
