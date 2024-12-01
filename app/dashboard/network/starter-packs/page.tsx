// app/dashboard/network/starter-packs/page.tsx
"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Plus,
  Users,
  TrendingUp,
  BookMarked,
  Share2,
  MessagesSquare,
  Globe,
} from "lucide-react";
import { CreatePackDialog } from "@/app/dashboard/network/starter-packs/_components/create-pack-dialog";

export default function StarterPacks() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [activeTab, setActiveTab] = React.useState("explore");
  const [createDialogOpen, setCreateDialogOpen] = React.useState(false);

  // This would come from your database/AT Protocol integration
  const starterPacks = [
    {
      id: "tech-2024",
      name: "Tech Innovators 2024",
      description:
        "Essential follows for staying up to date with technology trends and discussions",
      curator: "techdigest.bsky.social",
      followers: 2840,
      accounts: 45,
      feeds: 5,
      topics: ["Technology", "AI", "Programming"],
      activity: {
        posts: 250,
        engagement: "High",
      },
      lastUpdated: "2024-01-15T10:00:00Z",
    },
    {
      id: "creative-tech",
      name: "Creative Technology",
      description:
        "Artists, designers, and creators working at the intersection of technology and creativity",
      curator: "arttech.bsky.social",
      followers: 1920,
      accounts: 35,
      feeds: 3,
      topics: ["Design", "Creative Coding", "Digital Art"],
      activity: {
        posts: 180,
        engagement: "Medium",
      },
      lastUpdated: "2024-01-14T15:00:00Z",
    },
  ];

  return (
    <div className='flex flex-col gap-6 p-6'>
      {/* Add the dialog component */}
      <CreatePackDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
      />
      {/* Header Section */}
      <div className='flex justify-between items-center mb-8'>
        <div>
          <h1 className='font-semibold text-2xl tracking-tight'>
            Starter Packs
          </h1>
          <p className='text-muted-foreground'>
            Curated collections of accounts and feeds for specific interests
          </p>
        </div>
        <div className='flex gap-2'>
          <Button size='sm' onClick={() => setCreateDialogOpen(true)}>
            <Plus className='mr-2 w-4 h-4' />
            Create Pack
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className='flex sm:flex-row flex-col gap-4'>
        <div className='relative flex-1'>
          <Search className='top-2.5 left-2 absolute w-4 h-4 text-muted-foreground' />
          <Input
            placeholder='Search starter packs...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='pl-8'
          />
        </div>
        <div className='flex gap-2'>
          <Button variant='outline' size='sm'>
            <Globe className='mr-2 w-4 h-4' />
            Categories
          </Button>
          <Button variant='outline' size='sm'>
            <TrendingUp className='mr-2 w-4 h-4' />
            Sort
          </Button>
        </div>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value='explore'>
            <Globe className='mr-2 w-4 h-4' />
            Explore
          </TabsTrigger>
          <TabsTrigger value='following'>
            <BookMarked className='mr-2 w-4 h-4' />
            Following
          </TabsTrigger>
          <TabsTrigger value='created'>
            <Plus className='mr-2 w-4 h-4' />
            Created
          </TabsTrigger>
        </TabsList>

        <TabsContent value='explore' className='space-y-4 mt-4'>
          {starterPacks.map((pack) => (
            <Card key={pack.id}>
              <CardHeader>
                <div className='flex md:flex-row flex-col md:justify-between md:items-center gap-4'>
                  <div>
                    <CardTitle className='text-xl'>{pack.name}</CardTitle>
                    <CardDescription className='mt-1.5'>
                      {pack.description}
                    </CardDescription>
                    <div className='flex items-center gap-2 mt-2 text-muted-foreground text-sm'>
                      <Users className='w-4 h-4' />
                      Curated by {pack.curator}
                    </div>
                  </div>
                  <div className='flex flex-wrap gap-2'>
                    {pack.topics.map((topic) => (
                      <Badge key={topic} variant='secondary'>
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className='flex flex-col gap-6'>
                  {/* Stats Grid */}
                  <div className='gap-4 grid grid-cols-2 md:grid-cols-4'>
                    <div className='space-y-1'>
                      <div className='text-muted-foreground text-sm'>
                        Followers
                      </div>
                      <div className='font-semibold text-2xl'>
                        {pack.followers.toLocaleString()}
                      </div>
                    </div>
                    <div className='space-y-1'>
                      <div className='text-muted-foreground text-sm'>
                        Accounts
                      </div>
                      <div className='font-semibold text-2xl'>
                        {pack.accounts}
                      </div>
                    </div>
                    <div className='space-y-1'>
                      <div className='text-muted-foreground text-sm'>Feeds</div>
                      <div className='font-semibold text-2xl'>{pack.feeds}</div>
                    </div>
                    <div className='space-y-1'>
                      <div className='text-muted-foreground text-sm'>
                        Activity
                      </div>
                      <div className='font-semibold text-2xl'>
                        {pack.activity.engagement}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className='flex flex-wrap gap-2'>
                    <Button className='flex-1'>
                      <Users className='mr-2 w-4 h-4' />
                      Follow All
                    </Button>
                    <Button variant='outline'>
                      <MessagesSquare className='mr-2 w-4 h-4' />
                      Preview
                    </Button>
                    <Button variant='outline'>
                      <Share2 className='mr-2 w-4 h-4' />
                      Share
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value='following'>
          <div className='flex flex-col justify-center items-center py-12 text-center text-muted-foreground'>
            <BookMarked className='mb-4 w-12 h-12' />
            <h3 className='font-medium text-lg'>No Followed Packs</h3>
            <p className='mt-2'>
              Start following some starter packs to see them here.
            </p>
          </div>
        </TabsContent>

        <TabsContent value='created'>
          <div className='flex flex-col justify-center items-center py-12 text-center text-muted-foreground'>
            <Plus className='mb-4 w-12 h-12' />
            <h3 className='font-medium text-lg'>Create Your First Pack</h3>
            <p className='mt-2'>
              Share your curated collection of accounts and feeds.
            </p>
            <Button className='mt-4'>
              <Plus className='mr-2 w-4 h-4' />
              Create Pack
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
