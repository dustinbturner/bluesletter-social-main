// app/dashboard/analytics/network/page.tsx
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
import {
  Network,
  Share2,
  Users,
  UserPlus,
  CircleUser,
  ChevronRight,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function NetworkInsights() {
  const [timeRange, setTimeRange] = React.useState("7d");

  // Example data - would come from AT Protocol
  const networkOverlapData = [
    { handle: "user1.bsky.social", overlap: 450, followers: 12500 },
    { handle: "user2.bsky.social", overlap: 380, followers: 8900 },
    { handle: "user3.bsky.social", overlap: 320, followers: 15600 },
    { handle: "user4.bsky.social", overlap: 280, followers: 6700 },
    { handle: "user5.bsky.social", overlap: 250, followers: 9300 },
  ];

  const communityDistribution = [
    { community: "Tech", members: 450, growth: 12 },
    { community: "Creative", members: 380, growth: 8 },
    { community: "News", members: 320, growth: -3 },
    { community: "Science", members: 280, growth: 15 },
    { community: "Other", members: 250, growth: 5 },
  ];

  return (
    <div className='flex flex-col gap-6 p-6'>
      {/* Header */}
      <div className='flex md:flex-row flex-col justify-between items-start md:items-center gap-4'>
        <div>
          <h1 className='font-semibold text-2xl tracking-tight'>
            Network Insights
          </h1>
          <p className='text-muted-foreground'>
            Understand your network&apos;s composition and influence
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
            <CardTitle className='font-medium text-sm'>
              Network Density
            </CardTitle>
            <Network className='w-4 h-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='font-bold text-2xl'>0.42</div>
            <p className='text-muted-foreground text-xs'>
              Connection strength score
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row justify-between items-center pb-2'>
            <CardTitle className='font-medium text-sm'>
              Active Communities
            </CardTitle>
            <Users className='w-4 h-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='font-bold text-2xl'>5</div>
            <p className='text-muted-foreground text-xs'>
              Major community clusters
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row justify-between items-center pb-2'>
            <CardTitle className='font-medium text-sm'>Network Reach</CardTitle>
            <Share2 className='w-4 h-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='font-bold text-2xl'>89K</div>
            <p className='text-muted-foreground text-xs'>
              Extended network size
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row justify-between items-center pb-2'>
            <CardTitle className='font-medium text-sm'>
              Key Influencers
            </CardTitle>
            <UserPlus className='w-4 h-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='font-bold text-2xl'>24</div>
            <p className='text-muted-foreground text-xs'>
              High-impact followers
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Community Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Community Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='h-[300px]'>
            <ResponsiveContainer width='100%' height='100%'>
              <BarChart data={communityDistribution}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='community' />
                <YAxis />
                <Tooltip />
                <Bar dataKey='members' fill='#8884d8' />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Network Overlap */}
      <Card>
        <CardHeader>
          <CardTitle>Top Network Overlap</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='space-y-6'>
            {networkOverlapData.map((user) => (
              <div
                key={user.handle}
                className='flex justify-between items-center'
              >
                <div className='flex items-center gap-4'>
                  <div className='flex justify-center items-center bg-muted rounded-full w-10 h-10'>
                    <CircleUser className='w-6 h-6' />
                  </div>
                  <div>
                    <div className='font-medium'>{user.handle}</div>
                    <div className='text-muted-foreground text-sm'>
                      {user.followers.toLocaleString()} followers
                    </div>
                  </div>
                </div>
                <div className='flex items-center gap-4'>
                  <div className='text-right'>
                    <div className='font-medium'>{user.overlap} shared</div>
                    <div className='text-muted-foreground text-sm'>
                      followers
                    </div>
                  </div>
                  <ChevronRight className='w-4 h-4 text-muted-foreground' />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
