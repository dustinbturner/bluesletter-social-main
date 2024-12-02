"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  UserCircle,
  AtSign,
  Mail,
  CreditCard,
  KeyRound,
  ArrowRight,
  Bell,
  Shield,
  Palette,
  Languages,
  HelpCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// We define an interface for our settings sections to ensure type safety
interface SettingSection {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  badge?: {
    text: string;
    variant?: "default" | "secondary" | "destructive" | "outline";
  };
  items?: {
    title: string;
    description: string;
  }[];
}

export default function SettingsDashboard() {
  const router = useRouter();

  // Define our settings sections with their respective properties
  const settingSections: SettingSection[] = [
    {
      title: "Profile & Account",
      description: "Manage your personal information and account preferences",
      icon: <UserCircle className='w-5 h-5' />,
      href: "/dashboard/settings/profile",
      items: [
        {
          title: "Personal Information",
          description: "Update your name, bio, and profile picture",
        },
        {
          title: "Account Settings",
          description: "Manage your account security and preferences",
        },
      ],
    },
    {
      title: "Bluesky Connection",
      description: "Configure your Bluesky account integration and permissions",
      icon: <AtSign className='w-5 h-5' />,
      href: "/dashboard/settings/bluesky",
      badge: {
        text: "Connected",
        variant: "outline",
      },
      items: [
        {
          title: "Connection Status",
          description: "View and manage your Bluesky connection",
        },
        {
          title: "Posting Permissions",
          description: "Configure how Bluesletter interacts with your account",
        },
      ],
    },
    {
      title: "Newsletter Settings",
      description: "Customize your newsletter appearance and delivery settings",
      icon: <Mail className='w-5 h-5' />,
      href: "/dashboard/settings/newsletter",
      items: [
        {
          title: "Newsletter Design",
          description: "Customize your newsletter template and branding",
        },
        {
          title: "Delivery Settings",
          description: "Configure sending schedule and preferences",
        },
      ],
    },
    {
      title: "Billing & Plans",
      description: "Manage your subscription, billing information, and usage",
      icon: <CreditCard className='w-5 h-5' />,
      href: "/dashboard/settings/billing",
      badge: {
        text: "Pro Plan",
        variant: "default",
      },
    },
    {
      title: "API & Integrations",
      description: "Access API keys and manage third-party integrations",
      icon: <KeyRound className='w-5 h-5' />,
      href: "/dashboard/settings/api",
    },
    {
      title: "Notifications",
      description: "Configure your email and in-app notification preferences",
      icon: <Bell className='w-5 h-5' />,
      href: "/dashboard/settings/notifications",
    },
    {
      title: "Privacy & Security",
      description: "Manage your privacy settings and security preferences",
      icon: <Shield className='w-5 h-5' />,
      href: "/dashboard/settings/privacy",
    },
    {
      title: "Appearance",
      description: "Customize your dashboard theme and display preferences",
      icon: <Palette className='w-5 h-5' />,
      href: "/dashboard/settings/appearance",
    },
    {
      title: "Language & Region",
      description: "Set your preferred language and regional settings",
      icon: <Languages className='w-5 h-5' />,
      href: "/dashboard/settings/language",
    },
  ];

  return (
    <div className='flex flex-col gap-6 p-6'>
      {/* Header */}
      <div className='flex justify-between items-center mb-4'>
        <div>
          <h1 className='font-semibold text-2xl tracking-tight'>Settings</h1>
          <p className='text-muted-foreground'>
            Manage your account settings and preferences
          </p>
        </div>
        <Button variant='outline' asChild>
          <a
            href='https://docs.bluesletter.app/settings'
            target='_blank'
            rel='noopener noreferrer'
          >
            <HelpCircle className='mr-2 w-4 h-4' />
            Settings Guide
          </a>
        </Button>
      </div>

      {/* Settings Grid */}
      <div className='gap-4 grid grid-cols-1 md:grid-cols-2'>
        {settingSections.map((section) => (
          <Card
            key={section.title}
            className='hover:border-primary/50 transition-colors cursor-pointer'
            onClick={() => router.push(section.href)}
          >
            <CardHeader>
              <div className='flex items-start gap-4'>
                <div className='bg-primary/5 p-2 rounded-lg text-primary'>
                  {section.icon}
                </div>
                <div className='flex-1 space-y-1'>
                  <div className='flex items-center gap-2'>
                    <CardTitle className='text-lg'>{section.title}</CardTitle>
                    {section.badge && (
                      <Badge variant={section.badge.variant}>
                        {section.badge.text}
                      </Badge>
                    )}
                  </div>
                  <CardDescription>{section.description}</CardDescription>
                </div>
                <Button variant='ghost' size='icon'>
                  <ArrowRight className='w-4 h-4' />
                </Button>
              </div>
            </CardHeader>
            {section.items && (
              <CardContent>
                <div className='space-y-4'>
                  {section.items.map((item) => (
                    <div key={item.title} className='space-y-1'>
                      <h4 className='font-medium text-sm'>{item.title}</h4>
                      <p className='text-muted-foreground text-sm'>
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
