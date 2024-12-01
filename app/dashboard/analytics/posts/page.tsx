// src/app/dashboard/analytics/posts/page.tsx

"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, ArrowUpRight, ArrowDownRight, Filter } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function PostAnalytics() {
  const [timeRange, setTimeRange] = React.useState("7d");
  const [] = React.useState("all");

  // Example data - would come from AT Protocol
  const performanceData = [
    {
      id: "1",
      content: "Thoughts on the future of decentralized social...",
      date: "2024-01-07",
      likes: 245,
      reposts: 89,
      replies: 56,
      engagement: 12.5,
      trend: "up",
    },
    {
      id: "2",
      content: "New features in the AT Protocol...",
      date: "2024-01-06",
      likes: 189,
      reposts: 45,
      replies: 34,
      engagement: 8.7,
      trend: "down",
    },
    // Add more example posts
  ];

  const postsOverTime = [
    { date: "Mon", posts: 3, engagement: 350 },
    { date: "Tue", posts: 4, engagement: 420 },
    { date: "Wed", posts: 2, engagement: 280 },
    { date: "Thu", posts: 5, engagement: 510 },
    { date: "Fri", posts: 3, engagement: 390 },
    { date: "Sat", posts: 2, engagement: 240 },
    { date: "Sun", posts: 4, engagement: 480 },
  ];

  return (
    <div className='flex flex-col gap-6 p-6'>
      {/* Header */}
      <div className='flex md:flex-row flex-col justify-between items-start md:items-center gap-4'>
        <div>
          <h1 className='font-semibold text-2xl tracking-tight'>
            Post Analytics
          </h1>
          <p className='text-muted-foreground'>
            Track performance and engagement of your posts
          </p>
        </div>

        <div className='flex items-center gap-2'>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className='w-36'>
              <SelectValue placeholder='Time range' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='7d'>Last 7 days</SelectItem>
              <SelectItem value='30d'>Last 30 days</SelectItem>
              <SelectItem value='90d'>Last 90 days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Quick Stats */}
      <div className='gap-4 grid md:grid-cols-3'>
        <Card>
          <CardHeader className='flex flex-row justify-between items-center pb-2'>
            <CardTitle className='font-medium text-sm'>
              Average Engagement Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='font-bold text-2xl'>5.2%</div>
            <p className='text-muted-foreground text-xs'>
              Per post over selected period
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row justify-between items-center pb-2'>
            <CardTitle className='font-medium text-sm'>
              Best Performing Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='font-bold text-2xl'>2:00 PM</div>
            <p className='text-muted-foreground text-xs'>
              Based on engagement rates
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row justify-between items-center pb-2'>
            <CardTitle className='font-medium text-sm'>
              Top Post Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='font-bold text-2xl'>1.2K</div>
            <p className='text-muted-foreground text-xs'>
              Highest engagement this period
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Posts Over Time Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Posts & Engagement Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='h-[300px]'>
            <ResponsiveContainer width='100%' height='100%'>
              <BarChart data={postsOverTime}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='date' />
                <YAxis yAxisId='left' />
                <YAxis yAxisId='right' orientation='right' />
                <Tooltip />
                <Bar yAxisId='left' dataKey='posts' fill='#8884d8' />
                <Bar yAxisId='right' dataKey='engagement' fill='#82ca9d' />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Posts Table */}
      <Card>
        <CardHeader>
          <div className='flex md:flex-row flex-col justify-between md:items-center gap-4'>
            <CardTitle>Post Performance</CardTitle>
            <div className='flex items-center gap-2'>
              <div className='relative'>
                <Search className='top-2.5 left-2 absolute w-4 h-4 text-muted-foreground' />
                <Input placeholder='Search posts...' className='pl-8' />
              </div>
              <Button variant='outline' size='icon'>
                <Filter className='w-4 h-4' />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className='w-[400px]'>Content</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className='text-right'>Likes</TableHead>
                <TableHead className='text-right'>Reposts</TableHead>
                <TableHead className='text-right'>Replies</TableHead>
                <TableHead className='text-right'>Engagement</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {performanceData.map((post) => (
                <TableRow key={post.id}>
                  <TableCell className='font-medium'>{post.content}</TableCell>
                  <TableCell>{post.date}</TableCell>
                  <TableCell className='text-right'>{post.likes}</TableCell>
                  <TableCell className='text-right'>{post.reposts}</TableCell>
                  <TableCell className='text-right'>{post.replies}</TableCell>
                  <TableCell className='text-right'>
                    <div className='flex justify-end items-center'>
                      {post.engagement}%
                      {post.trend === "up" ? (
                        <ArrowUpRight className='ml-2 w-4 h-4 text-green-500' />
                      ) : (
                        <ArrowDownRight className='ml-2 w-4 h-4 text-red-500' />
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
