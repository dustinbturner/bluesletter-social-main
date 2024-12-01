// app/dashboard/network/feeds/page.tsx
"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Shuffle,
  TrendingUp,
  Users,
  Bookmark,
  Filter,
} from "lucide-react";
import { CreateFeedDialog } from "@/app/dashboard/network/your-feeds/_components/create-feed-dialog";

export default function FeedDiscovery() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [activeTab, setActiveTab] = React.useState("trending");
  const [createDialogOpen, setCreateDialogOpen] = React.useState(false);

  // Example feed data - would come from AT Protocol + our ML enhancements
  const trendingFeeds = [
    {
      name: "Tech Insights",
      description: "Curated tech news and analysis",
      subscribers: 2840,
      growth: 12.5,
      topics: ["technology", "programming", "ai"],
      matchScore: 89,
    },
    {
      name: "Creative Corner",
      description: "Digital art and creative technology",
      subscribers: 1920,
      growth: 8.3,
      topics: ["art", "technology", "design"],
      matchScore: 76,
    },
    // Add more feeds...
  ];

  return (
    <div className='flex flex-col gap-6 p-6 h-full'>
      <CreateFeedDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
      />
      {/* Header */}
      <div className='flex justify-between items-center mb-8'>
        <div>
          <h1 className='font-semibold text-2xl tracking-tight'>
            Feed Discovery
          </h1>
          <p className='text-muted-foreground'>
            Discover and explore custom feeds tailored to your interests
          </p>
        </div>
        <div className='flex gap-2'>
          <Button variant='outline' size='sm'>
            <Filter className='mr-2 w-4 h-4' />
            Filters
          </Button>
          <Button size='sm'>
            <Shuffle className='mr-2 w-4 h-4' />
            Discover
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className='relative'>
        <Search className='top-2.5 left-2 absolute w-4 h-4 text-muted-foreground' />
        <Input
          placeholder='Search feeds...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='pl-8'
        />
      </div>

      {/* Feed Categories */}
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value='trending'>
            <TrendingUp className='mr-2 w-4 h-4' />
            Trending
          </TabsTrigger>
          <TabsTrigger value='recommended'>
            <Users className='mr-2 w-4 h-4' />
            Recommended
          </TabsTrigger>
          <TabsTrigger value='saved'>
            <Bookmark className='mr-2 w-4 h-4' />
            Saved
          </TabsTrigger>
        </TabsList>

        <TabsContent value='trending' className='space-y-4 mt-4'>
          {trendingFeeds.map((feed, index) => (
            <Card key={index}>
              <CardHeader>
                <div className='flex justify-between items-start'>
                  <div>
                    <CardTitle className='text-lg'>{feed.name}</CardTitle>
                    <CardDescription>{feed.description}</CardDescription>
                  </div>
                  <Badge variant='secondary' className='ml-2'>
                    {feed.matchScore}% Match
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className='flex flex-col gap-4'>
                  <div className='flex justify-between text-sm'>
                    <div className='flex items-center gap-2'>
                      <Users className='w-4 h-4' />
                      {feed.subscribers.toLocaleString()} subscribers
                    </div>
                    <div className='flex items-center gap-2'>
                      <TrendingUp className='w-4 h-4' />
                      {feed.growth}% growth
                    </div>
                  </div>
                  <div className='flex flex-wrap gap-2'>
                    {feed.topics.map((topic) => (
                      <Badge key={topic} variant='outline'>
                        {topic}
                      </Badge>
                    ))}
                  </div>
                  <div className='flex gap-2'>
                    <Button className='flex-1'>Subscribe</Button>
                    <Button variant='outline'>Preview</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Other tab contents would follow similar pattern */}
      </Tabs>
    </div>
  );
}
