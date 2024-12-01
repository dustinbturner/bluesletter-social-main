// app/dashboard/analytics/growth/page.tsx
"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Users,
  TrendingUp,
  BarChart2,
  LineChart as LineChartIcon,
} from "lucide-react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function GrowthTracking() {
  const [timeRange, setTimeRange] = React.useState("30d");
  const [metricType, setMetricType] = React.useState("followers");

  // Mock data - would come from AT Protocol
  const growthData = [
    { date: "Jan 01", followers: 2100, engagement: 420, posts: 5 },
    { date: "Jan 08", followers: 2300, engagement: 460, posts: 7 },
    { date: "Jan 15", followers: 2450, engagement: 490, posts: 6 },
    { date: "Jan 22", followers: 2600, engagement: 520, posts: 8 },
    { date: "Jan 29", followers: 2850, engagement: 570, posts: 6 },
    { date: "Feb 05", followers: 3000, engagement: 600, posts: 7 },
  ];

  const engagementTrends = [
    { date: "Week 1", likes: 240, reposts: 120, replies: 80 },
    { date: "Week 2", likes: 280, reposts: 150, replies: 95 },
    { date: "Week 3", likes: 320, reposts: 180, replies: 110 },
    { date: "Week 4", likes: 380, reposts: 220, replies: 130 },
  ];

  return (
    <div className='flex flex-col gap-6 p-6'>
      {/* Header */}
      <div className='flex md:flex-row flex-col justify-between items-start md:items-center gap-4'>
        <div>
          <h1 className='font-semibold text-2xl tracking-tight'>
            Growth Tracking
          </h1>
          <p className='text-muted-foreground'>
            Monitor your account growth and engagement trends
          </p>
        </div>

        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className='w-36'>
            <SelectValue placeholder='Time range' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='7d'>Last 7 days</SelectItem>
            <SelectItem value='30d'>Last 30 days</SelectItem>
            <SelectItem value='90d'>Last 90 days</SelectItem>
            <SelectItem value='1y'>Last year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Quick Stats */}
      <div className='gap-4 grid md:grid-cols-4'>
        <Card>
          <CardHeader className='flex flex-row justify-between items-center pb-2'>
            <CardTitle className='font-medium text-sm'>New Followers</CardTitle>
            <Users className='w-4 h-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='font-bold text-2xl'>+892</div>
            <div className='flex items-center text-muted-foreground text-sm'>
              <TrendingUp className='mr-1 w-4 h-4 text-green-500' />
              +12.3% from last period
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row justify-between items-center pb-2'>
            <CardTitle className='font-medium text-sm'>Growth Rate</CardTitle>
            <TrendingUp className='w-4 h-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='font-bold text-2xl'>31.4%</div>
            <div className='text-muted-foreground text-sm'>
              Monthly growth rate
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row justify-between items-center pb-2'>
            <CardTitle className='font-medium text-sm'>
              Engagement Growth
            </CardTitle>
            <BarChart2 className='w-4 h-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='font-bold text-2xl'>+18.2%</div>
            <div className='text-muted-foreground text-sm'>
              Average engagement increase
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row justify-between items-center pb-2'>
            <CardTitle className='font-medium text-sm'>
              Content Growth
            </CardTitle>
            <LineChartIcon className='w-4 h-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='font-bold text-2xl'>+24.5%</div>
            <div className='text-muted-foreground text-sm'>
              Post frequency increase
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Growth Chart */}
      <Card>
        <CardHeader>
          <div className='flex md:flex-row flex-col justify-between md:items-center gap-4'>
            <CardTitle>Growth Trends</CardTitle>
            <Tabs
              value={metricType}
              onValueChange={setMetricType}
              className='w-full md:w-auto'
            >
              <TabsList className='grid grid-cols-3 w-full md:w-auto'>
                <TabsTrigger value='followers'>Followers</TabsTrigger>
                <TabsTrigger value='engagement'>Engagement</TabsTrigger>
                <TabsTrigger value='posts'>Posts</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          <div className='h-[300px]'>
            <ResponsiveContainer width='100%' height='100%'>
              <LineChart data={growthData}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='date' />
                <YAxis />
                <Tooltip />
                <Line
                  type='monotone'
                  dataKey={metricType}
                  stroke='#8884d8'
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Engagement Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Engagement Growth</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='h-[300px]'>
            <ResponsiveContainer width='100%' height='100%'>
              <AreaChart data={engagementTrends}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='date' />
                <YAxis />
                <Tooltip />
                <Area
                  type='monotone'
                  dataKey='likes'
                  stackId='1'
                  stroke='#8884d8'
                  fill='#8884d8'
                  fillOpacity={0.3}
                />
                <Area
                  type='monotone'
                  dataKey='reposts'
                  stackId='1'
                  stroke='#82ca9d'
                  fill='#82ca9d'
                  fillOpacity={0.3}
                />
                <Area
                  type='monotone'
                  dataKey='replies'
                  stackId='1'
                  stroke='#ffc658'
                  fill='#ffc658'
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
