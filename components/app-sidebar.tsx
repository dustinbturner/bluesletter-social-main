"use client";

import * as React from "react";
import {
  ChevronRight,
  LayoutDashboard,
  FileEdit,
  Globe,
  BarChart2,
  Settings,
  DollarSign,
  Bot,
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

// Define core navigation item structure
interface NavItem {
  title: string;
  url?: string;
  icon?: React.ReactNode;
  items?: NavItem[];
  comingSoon?: boolean;
}

interface NavigationData {
  mainNav: NavItem[];
}

// Navigation data structure with proper typing
const navigationData: NavigationData = {
  mainNav: [
    {
      title: "Dashboard",
      icon: <LayoutDashboard className='mr-2 w-4 h-4' />,
      url: "/dashboard",
      items: [],
    },
    {
      title: "Content",
      icon: <FileEdit className='mr-2 w-4 h-4' />,
      items: [
        {
          title: "Create & Manage",
          url: "/dashboard/content/manage",
          items: [
            { title: "All Posts", url: "/dashboard/content/manage/posts" },
            { title: "Create New", url: "/dashboard/content/manage/create" },
            { title: "Drafts", url: "/dashboard/content/manage/drafts" },
          ],
        },
        {
          title: "Library",
          url: "/dashboard/content/library",
          items: [
            { title: "Bookmarks", url: "/dashboard/content/library/bookmarks" },
            { title: "Media", url: "/dashboard/content/library/media" },
            { title: "Templates", url: "/dashboard/content/library/templates" },
          ],
        },
        {
          title: "Discovery",
          url: "/dashboard/content/discovery",
          items: [
            {
              title: "Feed Discovery",
              url: "/dashboard/content/discovery/feeds",
            },
            {
              title: "Trending Topics",
              url: "/dashboard/content/discovery/trends",
            },
          ],
        },
      ],
    },
    {
      title: "Analytics",
      icon: <BarChart2 className='mr-2 w-4 h-4' />,
      items: [
        { title: "Overview", url: "/dashboard/analytics" },
        { title: "Post Analytics", url: "/dashboard/analytics/posts" },
        { title: "Audience Reach", url: "/dashboard/analytics/reach" },
        { title: "Network Insights", url: "/dashboard/analytics/network" },
        { title: "Growth Tracking", url: "/dashboard/analytics/growth" },
      ],
    },
    {
      title: "Monetization",
      icon: <DollarSign className='mr-2 w-4 h-4' />,
      items: [
        {
          title: "Subscriptions",
          url: "/dashboard/monetization/subscriptions",
          comingSoon: true,
        },
        {
          title: "Products",
          url: "/dashboard/monetization/products",
          comingSoon: true,
        },
        {
          title: "Promotion Tools",
          url: "/dashboard/monetization/promotion",
          comingSoon: true,
        },
        {
          title: "Revenue Analytics",
          url: "/dashboard/monetization/analytics",
          comingSoon: true,
        },
      ],
    },
    {
      title: "Automation",
      icon: <Bot className='mr-2 w-4 h-4' />,
      items: [
        {
          title: "Post Rules",
          url: "/dashboard/automation/posts",
          comingSoon: true,
        },
        {
          title: "Cross-Posting",
          url: "/dashboard/automation/cross-posting",
          comingSoon: true,
        },
        {
          title: "Auto-Responses",
          url: "/dashboard/automation/responses",
          comingSoon: true,
        },
        {
          title: "Scheduled Tasks",
          url: "/dashboard/automation/tasks",
          comingSoon: true,
        },
      ],
    },
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

  // Helper functions with proper type annotations
  const isActiveLink = (url: string | undefined): boolean => {
    if (!url) return false;
    return pathname === url;
  };

  const isActiveGroup = (items: NavItem[] | undefined): boolean => {
    if (!items) return false;
    return items.some((item) => {
      if (item.items) {
        return isActiveGroup(item.items);
      }
      return pathname === item.url;
    });
  };

  return (
    <Sidebar variant='floating' className='overflow-x-hidden' {...props}>
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
              defaultOpen={
                !section.items?.length ? false : isActiveGroup(section.items)
              }
              className='px-2 group/collapsible'
            >
              <SidebarGroup>
                {!section.items?.length ? (
                  <SidebarGroupLabel asChild>
                    <Link
                      href={section.url ?? "#"}
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
                      <span className='truncate'>{section.title}</span>{" "}
                      {/* Add truncate here */}
                      <ChevronRight className='group-data-[state=open]/collapsible:rotate-90 ml-auto w-4 h-4 transition-transform shrink-0' />{" "}
                      {/* Add shrink-0 to prevent arrow from shrinking */}
                    </CollapsibleTrigger>
                  </SidebarGroupLabel>
                )}

                {section.items && section.items.length > 0 && (
                  <CollapsibleContent>
                    <SidebarGroupContent className='pr-2'>
                      <SidebarMenu>
                        {section.items.map((item) => (
                          <React.Fragment key={item.title}>
                            {item.items ? (
                              <SidebarMenuItem>
                                <Link
                                  href={item.url ?? "#"}
                                  className='flex items-center ml-4 px-2 py-2 font-medium text-sm hover:text-sidebar-accent-foreground truncate transition-colors' // Reduced ml-6 to ml-4
                                >
                                  {item.title}
                                </Link>
                                <SidebarMenu>
                                  {item.items.map((subItem) => (
                                    <SidebarMenuItem key={subItem.title}>
                                      {subItem.comingSoon ? (
                                        <div className='flex items-center ml-6 px-2 py-2 text-muted-foreground/40 truncate'>
                                          {" "}
                                          {/* Reduced ml-8 to ml-6 */}
                                          {subItem.title}
                                        </div>
                                      ) : (
                                        <SidebarMenuButton
                                          asChild
                                          isActive={isActiveLink(subItem.url)}
                                        >
                                          <Link
                                            href={subItem.url ?? "#"}
                                            className='ml-6 truncate' // Reduced ml-8 to ml-6
                                          >
                                            {subItem.title}
                                          </Link>
                                        </SidebarMenuButton>
                                      )}
                                    </SidebarMenuItem>
                                  ))}
                                </SidebarMenu>
                              </SidebarMenuItem>
                            ) : (
                              <SidebarMenuItem>
                                {item.comingSoon ? (
                                  <div className='ml-6 px-2 py-2 text-muted-foreground/40'>
                                    {item.title}
                                  </div>
                                ) : (
                                  <SidebarMenuButton
                                    asChild
                                    isActive={isActiveLink(item.url)}
                                  >
                                    <Link
                                      href={item.url ?? "#"}
                                      className='ml-6'
                                    >
                                      {item.title}
                                    </Link>
                                  </SidebarMenuButton>
                                )}
                              </SidebarMenuItem>
                            )}
                          </React.Fragment>
                        ))}
                      </SidebarMenu>
                    </SidebarGroupContent>
                  </CollapsibleContent>
                )}
              </SidebarGroup>
            </Collapsible>
          ))}
        </div>

        <div className='space-y-2 p-4'>
          <Button
            variant='default'
            className='flex justify-center items-center gap-2 w-full'
            onClick={() => router.push("/dashboard/content/manage/create")}
          >
            <PlusCircle className='w-4 h-4' />
            Create New
          </Button>
          <Button
            variant='secondary'
            className='flex justify-center items-center gap-2 w-full'
            onClick={() => router.push("/")}
          >
            <LogOut className='w-4 h-4' />
            Logout
          </Button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
