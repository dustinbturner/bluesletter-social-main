// app/dashboard/posts/page.tsx

"use client";

import React from "react";
import { Plus, Filter, Search, Calendar, Layout, List } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function PostsDashboard() {
  const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid");

  return (
    <div className='flex flex-col gap-6 p-6 h-full'>
      {/* Dashboard Header with Actions */}
      <div className='flex justify-between items-center mb-8'>
        <div>
          <h1 className='font-semibold text-2xl tracking-tight'>
            Posts & Threads
          </h1>
          <p className='text-muted-foreground'>
            Create and manage your Bluesky content
          </p>
        </div>
        <div className='flex gap-2'>
          <Button variant='secondary' size='sm'>
            <Calendar className='mr-1 w-4 h-4' />
            Schedule Post
          </Button>
          <Button size='sm'>
            <Plus className='mr-2 w-4 h-4' />
            New Post
          </Button>
        </div>
      </div>

      {/* Content Filters and View Controls */}
      <div className='flex flex-col gap-4'>
        <Tabs defaultValue='published' className='w-full'>
          <div className='flex justify-between items-center border-b'>
            <TabsList>
              <TabsTrigger value='published'>Published</TabsTrigger>
              <TabsTrigger value='scheduled'>Scheduled</TabsTrigger>
              <TabsTrigger value='drafts'>Drafts</TabsTrigger>
              <TabsTrigger value='threads'>Threads</TabsTrigger>
            </TabsList>

            <div className='flex items-center gap-3 pb-3'>
              <div className='relative'>
                <Search className='top-1/2 left-2 absolute w-4 h-4 text-muted-foreground transform -translate-y-1/2' />
                <Input
                  className='pl-8 w-[250px] h-8'
                  placeholder='Search posts...'
                />
              </div>

              <Button variant='outline' size='sm'>
                <Filter className='mr-2 w-4 h-4' />
                Filters
              </Button>

              <div className='flex gap-1'>
                <Button
                  variant={viewMode === "grid" ? "secondary" : "ghost"}
                  size='icon'
                  onClick={() => setViewMode("grid")}
                >
                  <Layout className='w-4 h-4' />
                  <span className='sr-only'>Grid view</span>
                </Button>
                <Button
                  variant={viewMode === "list" ? "secondary" : "ghost"}
                  size='icon'
                  onClick={() => setViewMode("list")}
                >
                  <List className='w-4 h-4' />
                  <span className='sr-only'>List view</span>
                </Button>
              </div>
            </div>
          </div>

          {/* Published Posts Content */}
          <TabsContent value='published' className='mt-4'>
            <div
              className={
                viewMode === "grid"
                  ? "grid gap-4 md:grid-cols-2 lg:grid-cols-3"
                  : "flex flex-col gap-3"
              }
            >
              {/* Post Card - Grid View */}
              <Card className={viewMode === "list" ? "w-full" : ""}>
                <CardContent className='p-4'>
                  <div className='flex justify-between items-start'>
                    <div className='flex-1'>
                      <div className='flex items-center gap-2'>
                        <p className='line-clamp-1 font-medium'>
                          Introducing Bluesletter
                        </p>
                        <span className='bg-blue-100 px-2 py-0.5 rounded-full text-blue-800 text-xs'>
                          Thread
                        </span>
                      </div>
                      <p className='mt-1 text-muted-foreground text-sm'>
                        Posted 2 hours ago
                      </p>
                    </div>
                    <div className='text-right text-muted-foreground text-sm'>
                      <p>324 likes</p>
                      <p>42 reposts</p>
                    </div>
                  </div>

                  <div className='mt-3'>
                    <p className='line-clamp-2 text-muted-foreground text-sm'>
                      Excited to announce Bluesletter - a new way to manage your
                      Bluesky presence and engage with your audience...
                    </p>
                  </div>

                  <div className='flex justify-between items-center mt-4 pt-4 border-t'>
                    <div className='flex gap-2'>
                      <Button size='sm' variant='outline'>
                        View
                      </Button>
                      <Button size='sm' variant='outline'>
                        Boost
                      </Button>
                    </div>
                    <Button size='sm' variant='ghost'>
                      More
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Additional cards would be rendered here */}
            </div>
          </TabsContent>

          {/* Other tab contents follow similar pattern */}
        </Tabs>
      </div>
    </div>
  );
}
