"use client";

import * as React from "react";
import {
  ChevronRight,
  Newspaper,
  PenSquare,
  MessageSquare,
  Users,
  BarChart2,
  Settings,
  Globe,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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

const navigationData = {
  mainNav: [
    {
      title: "Bluesky",
      icon: <MessageSquare className='mr-2 w-4 h-4' />,
      items: [
        {
          title: "Create Post",
          url: "/dashboard/posts/create",
        },
        {
          title: "Drafts",
          url: "/dashboard/posts/drafts",
        },
      ],
    },
    {
      title: "Newsletter",
      icon: <Newspaper className='mr-2 w-4 h-4' />,
      items: [
        {
          title: "Campaigns",
          url: "/dashboard/newsletter/campaigns",
        },
        {
          title: "Subscribers",
          url: "/dashboard/newsletter/subscribers",
        },
        {
          title: "Templates",
          url: "/dashboard/newsletter/templates",
        },
      ],
    },
    {
      title: "Blog",
      icon: <PenSquare className='mr-2 w-4 h-4' />,
      items: [
        {
          title: "All Posts",
          url: "/dashboard/posts",
        },
        {
          title: "Drafts",
          url: "/dashboard/posts/drafts",
        },
        {
          title: "Categories",
          url: "/dashboard/posts/categories",
        },
      ],
    },
    {
      title: "Community",
      icon: <Users className='mr-2 w-4 h-4' />,
      items: [
        {
          title: "Members",
          url: "/dashboard/community/members",
        },
        {
          title: "Paid Subscribers",
          url: "/dashboard/community/paid-subscribers",
        },
      ],
    },
    {
      title: "Analytics",
      icon: <BarChart2 className='mr-2 w-4 h-4' />,
      items: [
        {
          title: "Overview",
          url: "/dashboard/analytics",
        },
        {
          title: "Post Analytics",
          url: "/dashboard/analytics/posts",
        },
        {
          title: "Newsletter Analytics",
          url: "/dashboard/analytics/newsletter",
        },
      ],
    },
  ],
  bottomNav: [
    {
      title: "Settings",
      icon: <Settings className='mr-2 w-4 h-4' />,
      items: [
        {
          title: "Profile",
          url: "/dashboard/settings/profile",
        },
        {
          title: "Domain",
          url: "/dashboard/settings/domain",
        },
        {
          title: "Billing",
          url: "/dashboard/settings/billing",
        },
        {
          title: "API",
          url: "/dashboard/settings/api",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  const isActiveLink = (url: string) => pathname === url;
  const isActiveGroup = (items: { url: string }[]) =>
    items.some((item) => pathname === item.url);

  return (
    <Sidebar variant='floating' {...props}>
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

      <SidebarContent className='flex flex-col flex-1 justify-between'>
        <div className='flex-1'>
          {navigationData.mainNav.map((section) => (
            <Collapsible
              key={section.title}
              defaultOpen={isActiveGroup(section.items)}
              className='px-2 group/collapsible'
            >
              <SidebarGroup>
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
              </SidebarGroup>
            </Collapsible>
          ))}
        </div>

        {/* Bottom Navigation */}
        <div className='mt-auto px-2'>
          {navigationData.bottomNav.map((section) => (
            <Collapsible
              key={section.title}
              defaultOpen={isActiveGroup(section.items)}
              className='group/collapsible'
            >
              <SidebarGroup>
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
              </SidebarGroup>
            </Collapsible>
          ))}
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
