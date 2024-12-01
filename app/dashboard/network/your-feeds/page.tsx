// app/dashboard/network/your-feeds/page.tsx
"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Settings,
  Users,
  TrendingUp,
  Edit,
  Trash2,
  Share2,
  Eye,
  Code,
  Plus,
} from "lucide-react";
import { CreateFeedDialog } from "@/app/dashboard/network/your-feeds/_components/create-feed-dialog";

export default function CustomFeeds() {
  const [activeTab, setActiveTab] = React.useState("active");
  const [createDialogOpen, setCreateDialogOpen] = React.useState(false);

  // Example custom feeds - would come from AT Protocol
  const customFeeds = [
    {
      id: "1",
      name: "Tech Curations",
      description: "My personally curated tech insights and discussions",
      subscribers: 1240,
      growth: 15.5,
      status: "active",
      rules: [
        "from:user1.bsky.social",
        "language:en",
        "#technology OR #programming",
      ],
      lastUpdated: "2024-01-15T10:30:00Z",
    },
    {
      id: "2",
      name: "Creative Tech",
      description: "Intersection of technology and creativity",
      subscribers: 890,
      growth: 8.2,
      status: "active",
      rules: ["#creativecoding", "NOT #nft", "has:images"],
      lastUpdated: "2024-01-14T15:45:00Z",
    },
    // Add more feeds...
  ];

  return (
    <div className='flex flex-col gap-6 p-6'>
      <CreateFeedDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
      />
      {/* Header */}
      <div className='flex justify-between items-center mb-8'>
        <div>
          <h1 className='font-semibold text-2xl tracking-tight'>
            Your Custom Feeds
          </h1>
          <p className='text-muted-foreground'>
            Manage your custom feeds and discover new ones
          </p>
        </div>
        <div className='flex gap-2'>
          <Button size='sm' onClick={() => setCreateDialogOpen(true)}>
            <Plus className='mr-2 w-4 h-4' />
            Create Feed
          </Button>
        </div>
      </div>
      {/* Feed Management */}
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value='active'>Active Feeds</TabsTrigger>
          <TabsTrigger value='drafts'>Drafts</TabsTrigger>
          <TabsTrigger value='archived'>Archived</TabsTrigger>
        </TabsList>

        <TabsContent value='active' className='space-y-4 mt-4'>
          {customFeeds.map((feed) => (
            <Card key={feed.id}>
              <CardHeader>
                <div className='flex justify-between items-start'>
                  <div>
                    <CardTitle className='flex items-center gap-2 text-lg'>
                      {feed.name}
                      <Badge variant='secondary'>Active</Badge>
                    </CardTitle>
                    <CardDescription>{feed.description}</CardDescription>
                  </div>
                  <div className='flex gap-2'>
                    <Button variant='outline' size='icon'>
                      <Edit className='w-4 h-4' />
                    </Button>
                    <Button variant='outline' size='icon'>
                      <Settings className='w-4 h-4' />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className='flex flex-col gap-6'>
                  {/* Stats */}
                  <div className='gap-4 grid grid-cols-1 md:grid-cols-3'>
                    <div className='flex items-center gap-2'>
                      <Users className='w-4 h-4 text-muted-foreground' />
                      <div className='text-sm'>
                        <div className='font-medium'>
                          {feed.subscribers.toLocaleString()}
                        </div>
                        <div className='text-muted-foreground'>Subscribers</div>
                      </div>
                    </div>
                    <div className='flex items-center gap-2'>
                      <TrendingUp className='w-4 h-4 text-muted-foreground' />
                      <div className='text-sm'>
                        <div className='font-medium'>+{feed.growth}%</div>
                        <div className='text-muted-foreground'>Growth rate</div>
                      </div>
                    </div>
                    <div className='flex items-center gap-2'>
                      <Eye className='w-4 h-4 text-muted-foreground' />
                      <div className='text-sm'>
                        <div className='font-medium'>Updated 2h ago</div>
                        <div className='text-muted-foreground'>
                          Last refresh
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Feed Rules */}
                  <div className='space-y-2'>
                    <div className='flex items-center gap-2 font-medium text-sm'>
                      <Code className='w-4 h-4' />
                      Feed Rules
                    </div>
                    <div className='bg-muted p-3 rounded-md'>
                      <code className='text-sm'>{feed.rules.join("\n")}</code>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className='flex flex-wrap gap-2'>
                    <Button variant='outline' className='flex-1'>
                      <Eye className='mr-2 w-4 h-4' />
                      Preview Feed
                    </Button>
                    <Button variant='outline' className='flex-1'>
                      <Share2 className='mr-2 w-4 h-4' />
                      Share
                    </Button>
                    <Button variant='destructive' size='icon'>
                      <Trash2 className='w-4 h-4' />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
