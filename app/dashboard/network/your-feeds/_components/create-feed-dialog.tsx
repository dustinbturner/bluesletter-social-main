// app/dashboard/network/your-feeds/_components/create-feed-dialog.tsx
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
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";

// We define a schema for form validation
const feedFormSchema = z.object({
  name: z.string().min(3).max(50),
  description: z.string().max(280),
  visibility: z.enum(["public", "private"]),
  updateInterval: z.number().min(5).max(60),
  rules: z.object({
    include: z.array(z.string()),
    exclude: z.array(z.string()),
    languages: z.array(z.string()),
    mediaTypes: z.array(z.string()),
  }),
  advanced: z.object({
    enableMlFiltering: z.boolean(),
    contentScoring: z.boolean(),
    userReputation: z.boolean(),
  }),
});

// Infer TypeScript type from schema
type FeedFormValues = z.infer<typeof feedFormSchema>;

interface CreateFeedDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateFeedDialog({
  open,
  onOpenChange,
}: CreateFeedDialogProps) {
  const [activeTab, setActiveTab] = React.useState("basic");

  // Initialize form with default values
  const form = useForm<FeedFormValues>({
    resolver: zodResolver(feedFormSchema),
    defaultValues: {
      name: "",
      description: "",
      visibility: "public",
      updateInterval: 15,
      rules: {
        include: [],
        exclude: [],
        languages: ["en"],
        mediaTypes: [],
      },
      advanced: {
        enableMlFiltering: true,
        contentScoring: true,
        userReputation: false,
      },
    },
  });

  async function onSubmit(values: FeedFormValues) {
    try {
      // Here we would integrate with the AT Protocol to create the feed
      console.log("Creating feed:", values);

      // Example AT Protocol integration
      // const feedGenerator = await agent.createFeedGenerator({
      //   displayName: values.name,
      //   description: values.description,
      //   avatar: avatar, // Would need to handle avatar upload
      //   labels: constructLabelsFromRules(values.rules)
      // });

      onOpenChange(false);
    } catch (error) {
      console.error("Error creating feed:", error);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[625px]'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Create New Feed</DialogTitle>
              <DialogDescription>
                Create a custom feed generator for your followers
              </DialogDescription>
            </DialogHeader>

            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className='mt-4'
            >
              <TabsList className='grid grid-cols-3 w-full'>
                <TabsTrigger value='basic'>Basic Info</TabsTrigger>
                <TabsTrigger value='rules'>Feed Rules</TabsTrigger>
                <TabsTrigger value='advanced'>Advanced</TabsTrigger>
              </TabsList>

              <ScrollArea className='mt-4 pr-4 h-[400px]'>
                <TabsContent value='basic' className='space-y-4'>
                  <FormField
                    control={form.control}
                    name='name'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Feed Name</FormLabel>
                        <FormControl>
                          <Input placeholder='My Custom Feed' {...field} />
                        </FormControl>
                        <FormDescription>
                          A descriptive name for your feed
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='description'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder='What kind of content will this feed contain?'
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Help others understand what they&apos;ll find in this
                          feed
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className='gap-4 grid grid-cols-2'>
                    <FormField
                      control={form.control}
                      name='visibility'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Visibility</FormLabel>
                          <div className='space-y-2'>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder='Select visibility' />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value='public'>Public</SelectItem>
                                <SelectItem value='private'>Private</SelectItem>
                              </SelectContent>
                            </Select>
                            {field.value && (
                              <Badge
                                variant={
                                  field.value === "public"
                                    ? "default"
                                    : "secondary"
                                }
                              >
                                {field.value.charAt(0).toUpperCase() +
                                  field.value.slice(1)}
                              </Badge>
                            )}
                          </div>
                          <FormDescription>
                            Who can see this feed
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name='updateInterval'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Update Interval</FormLabel>
                          <Select
                            onValueChange={(value) =>
                              field.onChange(parseInt(value))
                            }
                            defaultValue={field.value.toString()}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder='Select interval' />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value='5'>5 minutes</SelectItem>
                              <SelectItem value='15'>15 minutes</SelectItem>
                              <SelectItem value='30'>30 minutes</SelectItem>
                              <SelectItem value='60'>1 hour</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            How often to refresh feed content
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </TabsContent>

                <TabsContent value='rules' className='space-y-4'>
                  <div className='space-y-4'>
                    <div className='flex gap-2 mb-4'>
                      <Badge variant='outline'>0 Include Rules</Badge>
                      <Badge variant='outline'>0 Exclude Rules</Badge>
                    </div>
                    <FormItem>
                      <FormLabel>Include Content</FormLabel>
                      <FormDescription>
                        Add users, hashtags, or keywords to include
                      </FormDescription>
                      {/* Rule builder component would go here */}
                    </FormItem>

                    <FormItem>
                      <FormLabel>Exclude Content</FormLabel>
                      <FormDescription>
                        Add filters to exclude specific content
                      </FormDescription>
                      {/* Exclusion rule builder would go here */}
                    </FormItem>
                  </div>
                </TabsContent>

                <TabsContent value='advanced' className='space-y-4'>
                  <FormField
                    control={form.control}
                    name='advanced.enableMlFiltering'
                    render={({ field }) => (
                      <FormItem className='flex flex-row justify-between items-center p-4 border rounded-lg'>
                        <div className='space-y-0.5'>
                          <FormLabel className='text-base'>
                            ML-based Content Filtering
                          </FormLabel>
                          <FormDescription>
                            Use machine learning to improve content relevance
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
                    name='advanced.contentScoring'
                    render={({ field }) => (
                      <FormItem className='flex flex-row justify-between items-center p-4 border rounded-lg'>
                        <div className='space-y-0.5'>
                          <FormLabel className='text-base'>
                            Content Scoring
                          </FormLabel>
                          <FormDescription>
                            Score and rank content based on engagement patterns
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
              <Button type='submit'>Create Feed</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
