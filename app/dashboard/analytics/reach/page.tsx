// app/dashboard/analytics/reach/page.tsx
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
import { CircleUser, Share2, TrendingUp, Users } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function AudienceReach() {
  const [timeRange, setTimeRange] = React.useState("7d");

  // Mock data - would come from AT Protocol
  const reachData = [
    { date: "Mon", direct: 1200, indirect: 3400 },
    { date: "Tue", direct: 1300, indirect: 3800 },
    { date: "Wed", direct: 1400, indirect: 4200 },
    { date: "Thu", direct: 1800, indirect: 4800 },
    { date: "Fri", direct: 2000, indirect: 5200 },
    { date: "Sat", direct: 1600, indirect: 4400 },
    { date: "Sun", direct: 1900, indirect: 5000 },
  ];

  const audienceBreakdown = [
    { name: "Direct Followers", value: 2840 },
    { name: "Second Degree", value: 4250 },
    { name: "Third Degree", value: 2100 },
  ];

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

  return (
    <div className='flex flex-col gap-6 p-6'>
      {/* Header */}
      <div className='flex md:flex-row flex-col justify-between items-start md:items-center gap-4'>
        <div>
          <h1 className='font-semibold text-2xl tracking-tight'>
            Audience Reach
          </h1>
          <p className='text-muted-foreground'>
            Understanding your content&apos;s spread and audience engagement
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
          </SelectContent>
        </Select>
      </div>

      {/* Quick Stats */}
      <div className='gap-4 grid md:grid-cols-4'>
        <Card>
          <CardHeader className='flex flex-row justify-between items-center pb-2'>
            <CardTitle className='font-medium text-sm'>Total Reach</CardTitle>
            <Users className='w-4 h-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='font-bold text-2xl'>9,290</div>
            <p className='text-muted-foreground text-xs'>
              Unique viewers this period
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row justify-between items-center pb-2'>
            <CardTitle className='font-medium text-sm'>
              Direct Followers
            </CardTitle>
            <CircleUser className='w-4 h-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='font-bold text-2xl'>2,840</div>
            <p className='text-muted-foreground text-xs'>
              Active followers this period
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row justify-between items-center pb-2'>
            <CardTitle className='font-medium text-sm'>Amplification</CardTitle>
            <Share2 className='w-4 h-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='font-bold text-2xl'>3.2x</div>
            <p className='text-muted-foreground text-xs'>
              Average reach multiplier
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row justify-between items-center pb-2'>
            <CardTitle className='font-medium text-sm'>Growth Rate</CardTitle>
            <TrendingUp className='w-4 h-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='font-bold text-2xl'>+12.5%</div>
            <p className='text-muted-foreground text-xs'>
              Reach growth this period
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Reach Over Time Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Reach Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='h-[300px]'>
            <ResponsiveContainer width='100%' height='100%'>
              <LineChart data={reachData}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='date' />
                <YAxis />
                <Tooltip />
                <Line
                  type='monotone'
                  dataKey='direct'
                  stroke='#8884d8'
                  name='Direct Reach'
                  strokeWidth={2}
                />
                <Line
                  type='monotone'
                  dataKey='indirect'
                  stroke='#82ca9d'
                  name='Indirect Reach'
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Audience Distribution */}
      <div className='gap-6 grid md:grid-cols-2'>
        <Card>
          <CardHeader>
            <CardTitle>Audience Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='h-[300px]'>
              <ResponsiveContainer width='100%' height='100%'>
                <PieChart>
                  <Pie
                    data={audienceBreakdown}
                    cx='50%'
                    cy='50%'
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name} (${(percent * 100).toFixed(0)}%)`
                    }
                    outerRadius={80}
                    fill='#8884d8'
                    dataKey='value'
                  >
                    {audienceBreakdown.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Amplifiers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className='flex justify-between items-center'>
                  <div className='flex items-center gap-2'>
                    <div className='flex justify-center items-center bg-muted rounded-full w-8 h-8'>
                      <CircleUser className='w-4 h-4' />
                    </div>
                    <div>
                      <div className='font-medium'>User.{i}.bsky.social</div>
                      <div className='text-muted-foreground text-sm'>
                        {Math.floor(Math.random() * 1000)} followers
                      </div>
                    </div>
                  </div>
                  <div className='font-medium text-sm'>
                    {Math.floor(Math.random() * 50)} reposts
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
