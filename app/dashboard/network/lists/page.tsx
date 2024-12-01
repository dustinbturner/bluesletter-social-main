// app/dashboard/network/lists/page.tsx
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
  Lock,
  Globe,
  Edit,
  Trash2,
  Share2,
  BookMarked,
  Eye,
} from "lucide-react";
import { CreateListDialog } from "./_component/create-list-dialog";

export default function Lists() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [activeTab, setActiveTab] = React.useState("my-lists");
  const [createDialogOpen, setCreateDialogOpen] = React.useState(false);

  // Example lists data - would come from AT Protocol
  const lists = [
    {
      id: "1",
      name: "Tech Journalists",
      description: "Leading tech journalists and analysts",
      memberCount: 48,
      visibility: "public",
      lastUpdated: "2024-01-15T10:00:00Z",
      followers: 156,
      categories: ["Technology", "Media"],
      owner: {
        handle: "alice.bsky.social",
        displayName: "Alice Chen",
      },
    },
    {
      id: "2",
      name: "AI Researchers",
      description: "AI/ML researchers and thought leaders",
      memberCount: 75,
      visibility: "private",
      lastUpdated: "2024-01-14T15:00:00Z",
      followers: 0,
      categories: ["AI", "Research"],
      owner: {
        handle: "alice.bsky.social",
        displayName: "Alice Chen",
      },
    },
  ];

  return (
    <div className='flex flex-col gap-6 p-6'>
      <CreateListDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
      />

      {/* Header */}
      <div className='flex justify-between items-center mb-8'>
        <div>
          <h1 className='font-semibold text-2xl tracking-tight'>Lists</h1>
          <p className='text-muted-foreground'>
            Organize and manage collections of accounts
          </p>
        </div>
        <div className='flex gap-2'>
          <Button size='sm' onClick={() => setCreateDialogOpen(true)}>
            <Plus className='mr-2 w-4 h-4' />
            Create List
          </Button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className='flex sm:flex-row flex-col gap-4'>
        <div className='relative flex-1'>
          <Search className='top-2.5 left-2 absolute w-4 h-4 text-muted-foreground' />
          <Input
            placeholder='Search lists...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='pl-8'
          />
        </div>
      </div>

      {/* Lists Content */}
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value='my-lists'>
            <BookMarked className='mr-2 w-4 h-4' />
            My Lists
          </TabsTrigger>
          <TabsTrigger value='following'>
            <Users className='mr-2 w-4 h-4' />
            Following
          </TabsTrigger>
          <TabsTrigger value='discover'>
            <Globe className='mr-2 w-4 h-4' />
            Discover
          </TabsTrigger>
        </TabsList>

        <TabsContent value='my-lists' className='space-y-4 mt-4'>
          {lists.map((list) => (
            <Card key={list.id}>
              <CardHeader>
                <div className='flex justify-between items-start'>
                  <div className='space-y-1'>
                    <div className='flex items-center gap-2'>
                      <CardTitle className='text-lg'>{list.name}</CardTitle>
                      {list.visibility === "private" && (
                        <Lock className='w-4 h-4 text-muted-foreground' />
                      )}
                    </div>
                    <CardDescription>{list.description}</CardDescription>
                  </div>
                  <div className='flex gap-2'>
                    {list.categories.map((category) => (
                      <Badge key={category} variant='secondary'>
                        {category}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className='space-y-4'>
                  {/* List Stats */}
                  <div className='gap-4 grid grid-cols-3'>
                    <div className='space-y-1'>
                      <div className='text-muted-foreground text-sm'>
                        Members
                      </div>
                      <div className='font-semibold text-2xl'>
                        {list.memberCount}
                      </div>
                    </div>
                    {list.visibility === "public" && (
                      <div className='space-y-1'>
                        <div className='text-muted-foreground text-sm'>
                          Followers
                        </div>
                        <div className='font-semibold text-2xl'>
                          {list.followers}
                        </div>
                      </div>
                    )}
                    <div className='space-y-1'>
                      <div className='text-muted-foreground text-sm'>
                        Last Updated
                      </div>
                      <div className='text-sm'>
                        {new Date(list.lastUpdated).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className='flex gap-2'>
                    <Button className='flex-1'>
                      <Users className='mr-2 w-4 h-4' />
                      Manage Members
                    </Button>
                    <Button variant='outline'>
                      <Eye className='mr-2 w-4 h-4' />
                      View
                    </Button>
                    <Button variant='outline' size='icon'>
                      <Edit className='w-4 h-4' />
                    </Button>
                    <Button variant='outline' size='icon'>
                      <Share2 className='w-4 h-4' />
                    </Button>
                    <Button
                      variant='outline'
                      size='icon'
                      className='text-destructive'
                    >
                      <Trash2 className='w-4 h-4' />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value='following'>
          <div className='flex flex-col justify-center items-center py-12 text-center text-muted-foreground'>
            <Users className='mb-4 w-12 h-12' />
            <h3 className='font-medium text-lg'>No Lists Found</h3>
            <p className='mt-2'>You aren&apos;t following any lists yet.</p>
            <Button
              className='mt-4'
              variant='outline'
              onClick={() => setActiveTab("discover")}
            >
              <Globe className='mr-2 w-4 h-4' />
              Discover Lists
            </Button>
          </div>
        </TabsContent>

        <TabsContent value='discover'>
          <div className='flex flex-col justify-center items-center py-12 text-center text-muted-foreground'>
            <Globe className='mb-4 w-12 h-12' />
            <h3 className='font-medium text-lg'>Discover Lists</h3>
            <p className='mt-2'>Find curated lists from the community.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
