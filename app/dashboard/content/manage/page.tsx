// app/dashboard/content/manage/page.tsx
"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Edit, Clock, Archive, BarChart2, Edit2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

// Navigation tabs for content management
const contentTabs = [
  {
    title: "All Posts",
    href: "/dashboard/content/manage/posts",
    icon: BarChart2,
    description: "View and manage all published posts",
  },
  {
    title: "Create",
    href: "/dashboard/content/manage/create",
    icon: Edit2,
    description: "Create new content",
  },
  {
    title: "Drafts",
    href: "/dashboard/content/manage/drafts",
    icon: Clock,
    description: "Continue working on drafts",
  },
  {
    title: "Archive",
    href: "/dashboard/content/manage/archive",
    icon: Archive,
    description: "View archived content",
  },
];

export default function ContentManagePage() {
  const pathname = usePathname();
  const contentStats = {
    publishedPosts: 12,
    drafts: 3,
    scheduledPosts: 2,
  };

  return (
    <div className='flex flex-col gap-6 p-6'>
      {/* Page Header */}
      <div className='flex flex-col mb-8'>
        <h1 className='font-semibold text-2xl tracking-tight'>
          Content Management
        </h1>
        <p className='text-muted-foreground'>
          Create, edit, and manage your Bluesky content
        </p>
      </div>

      {/* Content Navigation */}
      <nav className='gap-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4'>
        {contentTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = pathname.startsWith(tab.href);

          return (
            <Link key={tab.href} href={tab.href}>
              <Card
                className={cn(
                  "transition-colors hover:bg-muted/50",
                  isActive && "border-primary/50 bg-muted"
                )}
              >
                <div className='p-4'>
                  <div className='flex items-center gap-2'>
                    <Icon className='w-4 h-4 text-muted-foreground' />
                    <h3 className='font-medium'>{tab.title}</h3>
                  </div>
                  <p className='mt-1 text-muted-foreground text-sm'>
                    {tab.description}
                  </p>
                </div>
              </Card>
            </Link>
          );
        })}
      </nav>

      {/* Overview Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='gap-4 grid md:grid-cols-3'>
            <div className='space-y-2'>
              <div className='flex items-center gap-2'>
                <FileText className='w-4 h-4 text-muted-foreground' />
                <span className='font-medium'>Published Posts</span>
              </div>
              <div className='font-bold text-2xl'>
                {contentStats.publishedPosts}
              </div>
            </div>

            <div className='space-y-2'>
              <div className='flex items-center gap-2'>
                <Edit className='w-4 h-4 text-muted-foreground' />
                <span className='font-medium'>Drafts</span>
              </div>
              <div className='font-bold text-2xl'>{contentStats.drafts}</div>
            </div>

            <div className='space-y-2'>
              <div className='flex items-center gap-2'>
                <Clock className='w-4 h-4 text-muted-foreground' />
                <span className='font-medium'>Scheduled</span>
              </div>
              <div className='font-bold text-2xl'>
                {contentStats.scheduledPosts}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            <p className='text-muted-foreground text-sm'>
              Recent content activity will appear here
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
