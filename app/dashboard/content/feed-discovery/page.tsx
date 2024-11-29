// app/dashboard/content/categories/page.tsx
"use client";

import React, { useState } from "react";
import {
  Radio,
  ListFilter,
  Users,
  TrendingUp,
  PackageSearch,
  ArrowUpDown,
  MoreHorizontal,
  ExternalLink,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface FeedItem {
  id: string;
  name: string;
  type: "feed" | "starterpack" | "list";
  creator: string;
  description?: string;
  memberCount: number;
  engagement: number;
  lastUpdated: string;
}

export default function FeedDiscovery() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "memberCount" | "engagement">(
    "engagement"
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // Dummy data
  const [feeds] = useState<FeedItem[]>([
    {
      id: "1",
      name: "Tech Innovators",
      type: "starterpack",
      creator: "bsky.app",
      description: "Leading voices in technology",
      memberCount: 1500,
      engagement: 85,
      lastUpdated: "2024-02-20T10:00:00Z",
    },
    {
      id: "2",
      name: "Web Development",
      type: "feed",
      creator: "dev.bsky.app",
      description: "Latest in web development",
      memberCount: 2500,
      engagement: 92,
      lastUpdated: "2024-02-19T15:30:00Z",
    },
    // Add more items as needed
  ]);

  const handleSort = (key: typeof sortBy) => {
    if (sortBy === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(key);
      setSortOrder("desc");
    }
  };

  const filteredAndSortedFeeds = feeds
    .filter(
      (feed) =>
        feed.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        feed.description?.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      const modifier = sortOrder === "asc" ? 1 : -1;
      if (sortBy === "memberCount") {
        return (a.memberCount - b.memberCount) * modifier;
      }
      if (sortBy === "engagement") {
        return (a.engagement - b.engagement) * modifier;
      }
      return a.name.localeCompare(b.name) * modifier;
    });

  return (
    <div className='space-y-6 p-6'>
      <Card>
        <CardHeader className='flex flex-row justify-between items-center space-y-0 pb-2'>
          <div className='space-y-1'>
            <CardTitle>Feed Discovery</CardTitle>
            <CardDescription>
              Track your presence across Bluesky&apos;s curated spaces
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue='featuring' className='space-y-4'>
            <TabsList>
              <TabsTrigger value='featuring'>
                <PackageSearch className='mr-2 w-4 h-4' />
                Featuring You
              </TabsTrigger>
              <TabsTrigger value='yours'>
                <Radio className='mr-2 w-4 h-4' />
                Your Feeds
              </TabsTrigger>
            </TabsList>

            <TabsContent value='featuring' className='space-y-4'>
              <div className='flex gap-4'>
                <Input
                  placeholder='Search feeds and starter packs...'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className='max-w-sm'
                />
              </div>

              <div className='gap-4 grid md:grid-cols-2 lg:grid-cols-3'>
                <Card>
                  <CardHeader className='flex flex-row justify-between items-center space-y-0 pb-2'>
                    <CardTitle className='font-medium text-sm'>
                      Starter Pack Inclusions
                    </CardTitle>
                    <PackageSearch className='w-4 h-4 text-muted-foreground' />
                  </CardHeader>
                  <CardContent>
                    <div className='font-bold text-2xl'>7</div>
                    <p className='text-muted-foreground text-xs'>
                      +2 new this month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className='flex flex-row justify-between items-center space-y-0 pb-2'>
                    <CardTitle className='font-medium text-sm'>
                      Total Reach
                    </CardTitle>
                    <Users className='w-4 h-4 text-muted-foreground' />
                  </CardHeader>
                  <CardContent>
                    <div className='font-bold text-2xl'>12.5K</div>
                    <p className='text-muted-foreground text-xs'>
                      Via curated feeds
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className='flex flex-row justify-between items-center space-y-0 pb-2'>
                    <CardTitle className='font-medium text-sm'>
                      Engagement Rate
                    </CardTitle>
                    <TrendingUp className='w-4 h-4 text-muted-foreground' />
                  </CardHeader>
                  <CardContent>
                    <div className='font-bold text-2xl'>4.6%</div>
                    <p className='text-muted-foreground text-xs'>
                      From feed viewers
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className='border rounded-md'>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className='w-[300px]'>
                        <Button
                          variant='ghost'
                          onClick={() => handleSort("name")}
                          className='font-semibold'
                        >
                          Feed / Pack
                          <ArrowUpDown className='ml-2 w-4 h-4' />
                        </Button>
                      </TableHead>
                      <TableHead>Creator</TableHead>
                      <TableHead>
                        <Button
                          variant='ghost'
                          onClick={() => handleSort("memberCount")}
                          className='font-semibold'
                        >
                          Reach
                          <ArrowUpDown className='ml-2 w-4 h-4' />
                        </Button>
                      </TableHead>
                      <TableHead>
                        <Button
                          variant='ghost'
                          onClick={() => handleSort("engagement")}
                          className='font-semibold'
                        >
                          Engagement
                          <ArrowUpDown className='ml-2 w-4 h-4' />
                        </Button>
                      </TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAndSortedFeeds.map((feed) => (
                      <TableRow key={feed.id}>
                        <TableCell className='font-medium'>
                          <div className='flex items-center gap-2'>
                            {feed.type === "starterpack" ? (
                              <PackageSearch className='w-4 h-4 text-muted-foreground' />
                            ) : feed.type === "feed" ? (
                              <Radio className='w-4 h-4 text-muted-foreground' />
                            ) : (
                              <ListFilter className='w-4 h-4 text-muted-foreground' />
                            )}
                            {feed.name}
                          </div>
                        </TableCell>
                        <TableCell className='text-muted-foreground'>
                          {feed.creator}
                        </TableCell>
                        <TableCell>
                          {feed.memberCount.toLocaleString()}
                        </TableCell>
                        <TableCell>{feed.engagement}%</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant='ghost' size='icon'>
                                <MoreHorizontal className='w-4 h-4' />
                                <span className='sr-only'>Open menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align='end'>
                              <DropdownMenuItem>
                                <ExternalLink className='mr-2 w-4 h-4' />
                                View on Bluesky
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value='yours'>
              <div className='flex justify-center items-center bg-muted/50 border rounded-md h-32'>
                <Button>Create New Feed</Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
