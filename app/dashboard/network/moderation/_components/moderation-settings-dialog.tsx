// app/dashboard/network/moderation/_components/moderation-settings-dialog.tsx
"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, X, Shield, Bell, Filter } from "lucide-react";

// Define a schema for all moderation settings
const moderationSettingsSchema = z.object({
  contentFilters: z.object({
    adultContent: z.boolean(),
    spamDetection: z.boolean(),
    sensitiveContent: z.boolean(),
    contentWarnings: z.boolean(),
  }),
  notificationFilters: z.object({
    mentionsFromNonFollowers: z.boolean(),
    repliesFromNonFollowers: z.boolean(),
    quotesFromNonFollowers: z.boolean(),
    dmFromNonFollowers: z.boolean(),
  }),
  automatedRules: z.object({
    autoMuteNewAccounts: z.boolean(),
    autoFilterSpamKeywords: z.boolean(),
    autoHideBlockedReplies: z.boolean(),
  }),
  wordFilters: z.array(z.string()),
  defaultMuteDuration: z.string(),
  reportThreshold: z.number().min(1).max(100),
});

type ModerationSettingsValues = z.infer<typeof moderationSettingsSchema>;

interface ModerationSettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ModerationSettingsDialog({
  open,
  onOpenChange,
}: ModerationSettingsDialogProps) {
  const [activeTab, setActiveTab] = React.useState("content");
  const [wordFilter, setWordFilter] = React.useState("");
  const [wordFilters, setWordFilters] = React.useState<string[]>([]);

  // Initialize the form with default values that represent common moderation preferences
  const form = useForm<ModerationSettingsValues>({
    resolver: zodResolver(moderationSettingsSchema),
    defaultValues: {
      contentFilters: {
        adultContent: true,
        spamDetection: true,
        sensitiveContent: true,
        contentWarnings: true,
      },
      notificationFilters: {
        mentionsFromNonFollowers: false,
        repliesFromNonFollowers: false,
        quotesFromNonFollowers: false,
        dmFromNonFollowers: true,
      },
      automatedRules: {
        autoMuteNewAccounts: false,
        autoFilterSpamKeywords: true,
        autoHideBlockedReplies: true,
      },
      wordFilters: [],
      defaultMuteDuration: "24h",
      reportThreshold: 3,
    },
  });

  // Handle adding new word filters
  const handleAddWordFilter = () => {
    if (wordFilter && wordFilters.length < 50) {
      const newFilters = [...wordFilters, wordFilter.toLowerCase()];
      setWordFilters(newFilters);
      form.setValue("wordFilters", newFilters);
      setWordFilter("");
    }
  };

  // Handle removing word filters
  const handleRemoveWordFilter = (filter: string) => {
    const newFilters = wordFilters.filter((f) => f !== filter);
    setWordFilters(newFilters);
    form.setValue("wordFilters", newFilters);
  };

  // Handle form submission with AT Protocol integration
  async function onSubmit(values: ModerationSettingsValues) {
    try {
      // Here we would integrate with AT Protocol to update moderation settings
      console.log("Updating moderation settings:", values);
      onOpenChange(false);
    } catch (error) {
      console.error("Error updating moderation settings:", error);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[625px]'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Moderation Settings</DialogTitle>
              <DialogDescription>
                Configure your content filtering and moderation preferences
              </DialogDescription>
            </DialogHeader>

            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className='mt-4'
            >
              <TabsList className='grid grid-cols-3 w-full'>
                <TabsTrigger value='content'>
                  <Shield className='mr-2 w-4 h-4' />
                  Content
                </TabsTrigger>
                <TabsTrigger value='notifications'>
                  <Bell className='mr-2 w-4 h-4' />
                  Notifications
                </TabsTrigger>
                <TabsTrigger value='automation'>
                  <Filter className='mr-2 w-4 h-4' />
                  Automation
                </TabsTrigger>
              </TabsList>

              <ScrollArea className='mt-4 pr-4 h-[400px]'>
                <TabsContent value='content' className='space-y-4'>
                  {/* Content Filtering Section */}
                  <div className='space-y-4'>
                    {/* Content Filter Toggles */}
                    <FormField
                      control={form.control}
                      name='contentFilters.adultContent'
                      render={({ field }) => (
                        <FormItem className='flex flex-row justify-between items-center p-4 border rounded-lg'>
                          <div className='space-y-0.5'>
                            <FormLabel>Adult Content Filter</FormLabel>
                            <FormDescription>
                              Automatically filter NSFW content
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    {/* Word Filters Section */}
                    <FormItem>
                      <FormLabel>Word Filters</FormLabel>
                      <div className='flex gap-2'>
                        <Input
                          value={wordFilter}
                          onChange={(e) => setWordFilter(e.target.value)}
                          placeholder='Add words to filter'
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              handleAddWordFilter();
                            }
                          }}
                        />
                        <Button
                          type='button'
                          onClick={handleAddWordFilter}
                          disabled={wordFilters.length >= 50}
                        >
                          <Plus className='w-4 h-4' />
                        </Button>
                      </div>
                      <div className='flex flex-wrap gap-2 mt-2'>
                        {wordFilters.map((filter) => (
                          <Badge
                            key={filter}
                            variant='secondary'
                            className='flex items-center gap-1'
                          >
                            {filter}
                            <button
                              onClick={() => handleRemoveWordFilter(filter)}
                              className='ml-1 hover:text-destructive'
                            >
                              <X className='w-3 h-3' />
                            </button>
                          </Badge>
                        ))}
                      </div>
                      <FormDescription>
                        Add words or phrases to filter from your feed
                      </FormDescription>
                    </FormItem>
                  </div>
                </TabsContent>

                <TabsContent value='notifications' className='space-y-4'>
                  {/* Notification Settings */}
                  <FormField
                    control={form.control}
                    name='notificationFilters.mentionsFromNonFollowers'
                    render={({ field }) => (
                      <FormItem className='flex flex-row justify-between items-center p-4 border rounded-lg'>
                        <div className='space-y-0.5'>
                          <FormLabel>Mentions from Non-followers</FormLabel>
                          <FormDescription>
                            Filter mentions from accounts you don&apos;t follow
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='defaultMuteDuration'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Default Mute Duration</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder='Select duration' />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value='1h'>1 hour</SelectItem>
                            <SelectItem value='24h'>24 hours</SelectItem>
                            <SelectItem value='7d'>7 days</SelectItem>
                            <SelectItem value='30d'>30 days</SelectItem>
                            <SelectItem value='permanent'>Permanent</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Default duration when muting accounts
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                </TabsContent>

                <TabsContent value='automation' className='space-y-4'>
                  {/* Automated Moderation Rules */}
                  <FormField
                    control={form.control}
                    name='automatedRules.autoMuteNewAccounts'
                    render={({ field }) => (
                      <FormItem className='flex flex-row justify-between items-center p-4 border rounded-lg'>
                        <div className='space-y-0.5'>
                          <FormLabel>Auto-mute New Accounts</FormLabel>
                          <FormDescription>
                            Automatically mute interactions from new accounts
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='reportThreshold'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Report Threshold</FormLabel>
                        <FormControl>
                          <Input
                            type='number'
                            min={1}
                            max={100}
                            {...field}
                            onChange={(event) =>
                              field.onChange(+event.target.value)
                            }
                          />
                        </FormControl>
                        <FormDescription>
                          Number of reports before content is automatically
                          hidden
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                </TabsContent>
              </ScrollArea>
            </Tabs>

            <DialogFooter className='mt-6'>
              <Button
                type='button'
                variant='outline'
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type='submit'>Save Changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
