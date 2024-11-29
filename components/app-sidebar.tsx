"use client";

import * as React from "react";
import {
  ChevronRight,
  LayoutDashboard,
  Settings,
  Globe,
  PlusCircle,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

// Navigation data structure defining all sidebar menu items
const navigationData = {
  mainNav: [
    {
      title: "Dashboard",
      icon: <LayoutDashboard className='mr-2 w-4 h-4' />,
      url: "/dashboard",
      items: [],
    },
    {
      title: "Posts & Threads",
      items: [
        { title: "All Posts", url: "/dashboard/posts" },
        { title: "Thread Builder", url: "/dashboard/posts/thread" },
        { title: "Drafts", url: "/dashboard/posts/drafts" },
        { title: "Scheduled", url: "/dashboard/posts/scheduled" },
      ],
    },
    {
      title: "Content Library",
      items: [
        { title: "Media Library", url: "/dashboard/library/media" },
        { title: "Templates", url: "/dashboard/library/templates" },
        { title: "Categories", url: "/dashboard/library/categories" },
        { title: "Content Calendar", url: "/dashboard/library/calendar" },
      ],
    },
    {
      title: "Network",
      items: [
        { title: "Feed Discovery", url: "/dashboard/network/feeds" },
        { title: "Your Custom Feeds", url: "/dashboard/network/your-feeds" },
        { title: "Starter Packs", url: "/dashboard/network/starter-packs" },
        { title: "Lists", url: "/dashboard/network/lists" },
        { title: "Moderation", url: "/dashboard/network/moderation" },
      ],
    },
    {
      title: "Analytics",
      items: [
        { title: "Overview", url: "/dashboard/analytics" },
        { title: "Content Performance", url: "/dashboard/analytics/content" },
        {
          title: "Engagement Insights",
          url: "/dashboard/analytics/engagement",
        },
        { title: "Network Growth", url: "/dashboard/analytics/network" },
        {
          title: "Audience Demographics",
          url: "/dashboard/analytics/demographics",
        },
        { title: "Custom Reports", url: "/dashboard/analytics/reports" },
      ],
    },
    {
      title: "Monetization",
      items: [
        {
          title: "Subscriptions",
          url: "/dashboard/monetization/subscriptions",
        },
        { title: "Products", url: "/dashboard/monetization/products" },
        { title: "Promotion Tools", url: "/dashboard/monetization/promotion" },
        {
          title: "Revenue Analytics",
          url: "/dashboard/monetization/analytics",
        },
      ],
    },
    {
      title: "Automation",
      items: [
        { title: "Post Rules", url: "/dashboard/automation/posts" },
        { title: "Cross-Posting", url: "/dashboard/automation/cross-posting" },
        { title: "Auto-Responses", url: "/dashboard/automation/responses" },
        { title: "Scheduled Tasks", url: "/dashboard/automation/tasks" },
      ],
    },
    // Settings moved to main navigation
    {
      title: "Settings",
      icon: <Settings className='mr-2 w-4 h-4' />,
      items: [
        { title: "Profile & Account", url: "/dashboard/settings/profile" },
        { title: "Bluesky Connection", url: "/dashboard/settings/bluesky" },
        { title: "Newsletter Settings", url: "/dashboard/settings/newsletter" },
        { title: "Billing & Plans", url: "/dashboard/settings/billing" },
        { title: "API & Integrations", url: "/dashboard/settings/api" },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const router = useRouter();

  // Helper functions to determine active states
  const isActiveLink = (url: string) => pathname === url;
  const isActiveGroup = (items: { url: string }[]) =>
    items.some((item) => pathname === item.url);

  // Handler for logout action
  const handleLogout = () => {
    // Add your logout logic here
    router.push("/");
  };

  return (
    <Sidebar variant='floating' {...props}>
      {/* Sidebar Header with Logo */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size='lg' asChild>
              <Link href='/dashboard'>
                <div className='flex justify-center items-center bg-sidebar-primary rounded-lg text-sidebar-primary-foreground aspect-square size-8'>
                  <Globe className='size-4' />
                </div>
                <div className='flex flex-col gap-0.5 leading-none'>
                  <span className='font-semibold'>Bluesletter</span>
                  <span className='text-muted-foreground text-xs'>
                    Dashboard
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* Main Sidebar Content */}
      <SidebarContent className='flex flex-col flex-1 justify-between'>
        {/* Navigation Menu */}
        <div className='flex-1'>
          {navigationData.mainNav.map((section) => (
            <Collapsible
              key={section.title}
              defaultOpen={
                section.items.length === 0
                  ? false
                  : isActiveGroup(section.items)
              }
              className='px-2 group/collapsible'
            >
              <SidebarGroup>
                {section.items.length === 0 ? (
                  <SidebarGroupLabel asChild>
                    <Link
                      href={section.url || "#"}
                      className='flex items-center hover:bg-sidebar-accent p-2 rounded-md w-full text-sidebar-foreground text-sm hover:text-sidebar-accent-foreground'
                    >
                      {section.icon}
                      {section.title}
                    </Link>
                  </SidebarGroupLabel>
                ) : (
                  <SidebarGroupLabel
                    asChild
                    className='hover:bg-sidebar-accent rounded-md text-sidebar-foreground text-sm hover:text-sidebar-accent-foreground group/label'
                  >
                    <CollapsibleTrigger className='flex items-center p-2 w-full'>
                      {section.icon}
                      {section.title}
                      <ChevronRight className='group-data-[state=open]/collapsible:rotate-90 ml-auto w-4 h-4 transition-transform' />
                    </CollapsibleTrigger>
                  </SidebarGroupLabel>
                )}
                {section.items.length > 0 && (
                  <CollapsibleContent>
                    <SidebarGroupContent>
                      <SidebarMenu>
                        {section.items.map((item) => (
                          <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton
                              asChild
                              isActive={isActiveLink(item.url)}
                            >
                              <Link href={item.url} className='ml-6'>
                                {item.title}
                              </Link>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        ))}
                      </SidebarMenu>
                    </SidebarGroupContent>
                  </CollapsibleContent>
                )}
              </SidebarGroup>
            </Collapsible>
          ))}
        </div>

        {/* Action Buttons Section */}
        <div className='space-y-2 p-4'>
          <Button
            variant='default'
            className='flex justify-center items-center gap-2 w-full'
            onClick={() => router.push("/dashboard/posts/new")}
          >
            <PlusCircle className='w-4 h-4' />
            Create New
          </Button>
          <Button
            variant='secondary'
            className='flex justify-center items-center gap-2 w-full'
            onClick={handleLogout}
          >
            <LogOut className='w-4 h-4' />
            Logout
          </Button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
