// app/dashboard/analytics/page.tsx
"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Download,
  ArrowUpRight,
  ArrowDownRight,
  Users,
  BarChart2,
  TrendingUp,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const AnalyticsDashboard = () => {
  const [timeRange, setTimeRange] = React.useState("7d");
  const [activeTab, setActiveTab] = React.useState("overview");

  // Example data - would come from AT Protocol in production
  const engagementData = [
    { date: "2024-01-01", likes: 45, reposts: 12, replies: 23 },
    { date: "2024-01-02", likes: 52, reposts: 15, replies: 28 },
    { date: "2024-01-03", likes: 49, reposts: 11, replies: 19 },
    { date: "2024-01-04", likes: 63, reposts: 18, replies: 31 },
    { date: "2024-01-05", likes: 58, reposts: 14, replies: 26 },
    { date: "2024-01-06", likes: 64, reposts: 17, replies: 29 },
    { date: "2024-01-07", likes: 71, reposts: 21, replies: 34 },
  ];

  return (
    <div className='flex flex-col gap-6 p-6'>
      {/* Header Section */}
      <div className='flex md:flex-row flex-col justify-between items-start md:items-center gap-4'>
        <div>
          <h1 className='font-semibold text-2xl tracking-tight'>
            Analytics Dashboard
          </h1>
          <p className='text-muted-foreground'>
            Track your growth and engagement
          </p>
        </div>

        <div className='flex items-center gap-2'>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className='w-36'>
              <SelectValue placeholder='Select range' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='24h'>Last 24 hours</SelectItem>
              <SelectItem value='7d'>Last 7 days</SelectItem>
              <SelectItem value='30d'>Last 30 days</SelectItem>
            </SelectContent>
          </Select>

          <Button variant='outline' size='sm'>
            <Download className='mr-2 w-4 h-4' />
            Export
          </Button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className='space-y-6'
      >
        <TabsList>
          <TabsTrigger value='overview'>Overview</TabsTrigger>
          <TabsTrigger value='posts'>Post Analytics</TabsTrigger>
          <TabsTrigger value='reach'>Audience Reach</TabsTrigger>
          <TabsTrigger value='growth'>Growth</TabsTrigger>
        </TabsList>

        {/* Key Metrics Cards */}
        <div className='gap-6 grid md:grid-cols-2 lg:grid-cols-4'>
          <Card>
            <CardHeader className='flex flex-row justify-between items-center pb-2'>
              <CardTitle className='font-medium text-sm'>
                Total Followers
              </CardTitle>
              <Users className='w-4 h-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='font-bold text-2xl'>2,853</div>
              <div className='flex items-center text-muted-foreground text-sm'>
                <ArrowUpRight className='mr-1 w-4 h-4 text-green-500' />
                +12% from last week
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row justify-between items-center pb-2'>
              <CardTitle className='font-medium text-sm'>
                Engagement Rate
              </CardTitle>
              <BarChart2 className='w-4 h-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='font-bold text-2xl'>5.2%</div>
              <div className='flex items-center text-muted-foreground text-sm'>
                <ArrowDownRight className='mr-1 w-4 h-4 text-red-500' />
                -0.8% from last week
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row justify-between items-center pb-2'>
              <CardTitle className='font-medium text-sm'>Post Reach</CardTitle>
              <TrendingUp className='w-4 h-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='font-bold text-2xl'>24.5K</div>
              <div className='flex items-center text-muted-foreground text-sm'>
                <ArrowUpRight className='mr-1 w-4 h-4 text-green-500' />
                +18% from last week
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Engagement Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Engagement Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='h-[300px]'>
              <ResponsiveContainer width='100%' height='100%'>
                <AreaChart data={engagementData}>
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
      </Tabs>
    </div>
  );
};

export default AnalyticsDashboard;
