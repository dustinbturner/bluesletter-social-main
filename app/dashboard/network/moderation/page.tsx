// app/dashboard/network/moderation/page.tsx
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
import { Switch } from "@/components/ui/switch";
import {
  Search,
  Shield,
  Bell,
  EyeOff,
  Settings,
  UserMinus,
  AlertTriangle,
  Filter,
} from "lucide-react";
import { ModerationSettingsDialog } from "./_components/moderation-settings-dialog";

export default function Moderation() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [activeTab, setActiveTab] = React.useState("blocked");
  const [settingsOpen, setSettingsOpen] = React.useState(false);

  // Example moderation data - would come from AT Protocol
  const blockedAccounts = [
    {
      id: "1",
      handle: "spam.bsky.social",
      reason: "Spam",
      dateBlocked: "2024-01-15T10:00:00Z",
      reports: 5,
    },
    {
      id: "2",
      handle: "harmful.bsky.social",
      reason: "Harassment",
      dateBlocked: "2024-01-14T15:00:00Z",
      reports: 3,
    },
  ];

  const mutedAccounts = [
    {
      id: "3",
      handle: "noisy.bsky.social",
      reason: "Excessive posting",
      dateMuted: "2024-01-15T08:00:00Z",
      duration: "24h",
    },
  ];

  return (
    <div className='flex flex-col gap-6 p-6'>
      <ModerationSettingsDialog
        open={settingsOpen}
        onOpenChange={setSettingsOpen}
      />
      {/* Header */}
      <div className='flex justify-between items-center mb-8'>
        <div>
          <h1 className='font-semibold text-2xl tracking-tight'>Moderation</h1>
          <p className='text-muted-foreground'>
            Manage your content filters and moderation settings
          </p>
        </div>
        <Button size='sm' onClick={() => setSettingsOpen(true)}>
          <Settings className='mr-2 w-4 h-4' />
          Moderation Settings
        </Button>
      </div>

      {/* Quick Actions Cards */}
      <div className='gap-4 grid md:grid-cols-3'>
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2 font-medium text-base'>
              <Shield className='w-4 h-4 text-muted-foreground' />
              Content Filtering
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              <div className='flex justify-between items-center'>
                <div className='space-y-0.5'>
                  <div className='text-sm'>Adult Content</div>
                  <div className='text-muted-foreground text-xs'>
                    Filter NSFW content
                  </div>
                </div>
                <Switch />
              </div>
              <div className='flex justify-between items-center'>
                <div className='space-y-0.5'>
                  <div className='text-sm'>Spam Detection</div>
                  <div className='text-muted-foreground text-xs'>
                    Enhanced spam filtering
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2 font-medium text-base'>
              <AlertTriangle className='w-4 h-4 text-muted-foreground' />
              Reports
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-2'>
              <div className='font-bold text-2xl'>8</div>
              <p className='text-muted-foreground text-sm'>
                Active reports requiring attention
              </p>
              <Button variant='outline' size='sm' className='mt-2 w-full'>
                View Reports
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2 font-medium text-base'>
              <Bell className='w-4 h-4 text-muted-foreground' />
              Notification Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              <div className='flex justify-between items-center'>
                <div className='space-y-0.5'>
                  <div className='text-sm'>Mentions</div>
                  <div className='text-muted-foreground text-xs'>
                    From non-followers
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
              <div className='flex justify-between items-center'>
                <div className='space-y-0.5'>
                  <div className='text-sm'>Replies</div>
                  <div className='text-muted-foreground text-xs'>
                    From non-followers
                  </div>
                </div>
                <Switch />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Moderation Lists */}
      <Card>
        <CardHeader>
          <div className='flex md:flex-row flex-col justify-between md:items-center gap-4'>
            <div>
              <CardTitle>Account Management</CardTitle>
              <CardDescription>
                Manage blocked and muted accounts
              </CardDescription>
            </div>
            <div className='flex gap-2'>
              <div className='relative flex-1 md:w-64'>
                <Search className='top-2.5 left-2 absolute w-4 h-4 text-muted-foreground' />
                <Input
                  placeholder='Search accounts...'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className='pl-8'
                />
              </div>
              <Button variant='outline' size='icon'>
                <Filter className='w-4 h-4' />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value='blocked'>
                <UserMinus className='mr-2 w-4 h-4' />
                Blocked
              </TabsTrigger>
              <TabsTrigger value='muted'>
                <EyeOff className='mr-2 w-4 h-4' />
                Muted
              </TabsTrigger>
            </TabsList>

            <TabsContent value='blocked' className='space-y-4 mt-4'>
              {blockedAccounts.map((account) => (
                <div
                  key={account.id}
                  className='flex justify-between items-center p-4 border rounded-lg'
                >
                  <div className='flex items-center gap-4'>
                    <div>
                      <div className='font-medium'>{account.handle}</div>
                      <div className='text-muted-foreground text-sm'>
                        Blocked on{" "}
                        {new Date(account.dateBlocked).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className='flex items-center gap-4'>
                    <Badge variant='secondary'>{account.reason}</Badge>
                    <Button variant='outline' size='sm'>
                      Unblock
                    </Button>
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value='muted' className='space-y-4 mt-4'>
              {mutedAccounts.map((account) => (
                <div
                  key={account.id}
                  className='flex justify-between items-center p-4 border rounded-lg'
                >
                  <div className='flex items-center gap-4'>
                    <div>
                      <div className='font-medium'>{account.handle}</div>
                      <div className='text-muted-foreground text-sm'>
                        Muted for {account.duration} on{" "}
                        {new Date(account.dateMuted).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className='flex items-center gap-4'>
                    <Badge variant='secondary'>{account.reason}</Badge>
                    <Button variant='outline' size='sm'>
                      Unmute
                    </Button>
                  </div>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
