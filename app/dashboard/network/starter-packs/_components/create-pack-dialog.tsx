// app/dashboard/network/starter-packs/_components/create-pack-dialog.tsx
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
import { Search, Plus, X } from "lucide-react";

// We define a schema for pack creation validation
const packFormSchema = z.object({
  name: z.string().min(3).max(50),
  description: z.string().max(280),
  visibility: z.enum(["public", "private"]),
  category: z.string().min(1),
  topics: z.array(z.string()).min(1).max(5),
  autoUpdate: z.boolean(),
  accounts: z
    .array(
      z.object({
        did: z.string(),
        handle: z.string(),
        displayName: z.string(),
      })
    )
    .min(1),
  feeds: z.array(
    z.object({
      uri: z.string(),
      name: z.string(),
    })
  ),
});

type PackFormValues = z.infer<typeof packFormSchema>;

interface CreatePackDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreatePackDialog({
  open,
  onOpenChange,
}: CreatePackDialogProps) {
  const [activeTab, setActiveTab] = React.useState("basics");
  const [selectedTopics, setSelectedTopics] = React.useState<string[]>([]);
  const [topicInput, setTopicInput] = React.useState("");

  // Initialize form with default values
  const form = useForm<PackFormValues>({
    resolver: zodResolver(packFormSchema),
    defaultValues: {
      name: "",
      description: "",
      visibility: "public",
      category: "",
      topics: [],
      autoUpdate: true,
      accounts: [],
      feeds: [],
    },
  });

  // Handle topic addition
  const handleAddTopic = () => {
    if (topicInput && selectedTopics.length < 5) {
      setSelectedTopics([...selectedTopics, topicInput]);
      form.setValue("topics", [...selectedTopics, topicInput]);
      setTopicInput("");
    }
  };

  // Handle topic removal
  const handleRemoveTopic = (topic: string) => {
    const newTopics = selectedTopics.filter((t) => t !== topic);
    setSelectedTopics(newTopics);
    form.setValue("topics", newTopics);
  };

  async function onSubmit(values: PackFormValues) {
    try {
      // Here we would integrate with the AT Protocol to create the pack
      console.log("Creating starter pack:", values);
      onOpenChange(false);
    } catch (error) {
      console.error("Error creating starter pack:", error);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[625px]'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Create Starter Pack</DialogTitle>
              <DialogDescription>
                Create a curated collection of accounts and feeds for others to
                follow
              </DialogDescription>
            </DialogHeader>

            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className='mt-4'
            >
              <TabsList className='grid grid-cols-3 w-full'>
                <TabsTrigger value='basics'>Basic Info</TabsTrigger>
                <TabsTrigger value='accounts'>Accounts</TabsTrigger>
                <TabsTrigger value='feeds'>Feeds</TabsTrigger>
              </TabsList>

              <ScrollArea className='mt-4 pr-4 h-[400px]'>
                <TabsContent value='basics' className='space-y-4'>
                  {/* Basic Information Fields */}
                  <FormField
                    control={form.control}
                    name='name'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pack Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder='Tech Enthusiasts 2024'
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          A descriptive name for your starter pack
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
                            placeholder='Describe what followers can expect from this pack'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Topics Section */}
                  <FormItem>
                    <FormLabel>Topics</FormLabel>
                    <div className='flex gap-2'>
                      <Input
                        value={topicInput}
                        onChange={(e) => setTopicInput(e.target.value)}
                        placeholder='Add a topic'
                      />
                      <Button
                        type='button'
                        onClick={handleAddTopic}
                        disabled={selectedTopics.length >= 5}
                      >
                        <Plus className='w-4 h-4' />
                      </Button>
                    </div>
                    <div className='flex flex-wrap gap-2 mt-2'>
                      {selectedTopics.map((topic) => (
                        <Badge
                          key={topic}
                          variant='secondary'
                          className='flex items-center gap-1'
                        >
                          {topic}
                          <button
                            onClick={() => handleRemoveTopic(topic)}
                            className='ml-1 hover:text-destructive'
                          >
                            <X className='w-3 h-3' />
                          </button>
                        </Badge>
                      ))}
                    </div>
                    <FormDescription>
                      Add up to 5 topics to help others discover your pack
                    </FormDescription>
                  </FormItem>

                  <div className='gap-4 grid grid-cols-2'>
                    <FormField
                      control={form.control}
                      name='visibility'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Visibility</FormLabel>
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
                          <FormDescription>
                            Who can discover this pack
                          </FormDescription>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name='autoUpdate'
                      render={({ field }) => (
                        <FormItem className='flex flex-row justify-between items-center p-4 border rounded-lg'>
                          <div className='space-y-0.5'>
                            <FormLabel>Auto Updates</FormLabel>
                            <FormDescription>
                              Automatically update pack content
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
                  </div>
                </TabsContent>

                <TabsContent value='accounts' className='space-y-4'>
                  {/* Account Selection UI - To be implemented */}
                  <div className='space-y-4'>
                    <div className='relative'>
                      <Search className='top-2.5 left-2 absolute w-4 h-4 text-muted-foreground' />
                      <Input
                        placeholder='Search accounts...'
                        className='pl-8'
                      />
                    </div>
                    <div className='text-muted-foreground text-sm'>
                      Selected accounts will appear here
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value='feeds' className='space-y-4'>
                  {/* Feed Selection UI - To be implemented */}
                  <div className='space-y-4'>
                    <div className='relative'>
                      <Search className='top-2.5 left-2 absolute w-4 h-4 text-muted-foreground' />
                      <Input placeholder='Search feeds...' className='pl-8' />
                    </div>
                    <div className='text-muted-foreground text-sm'>
                      Selected feeds will appear here
                    </div>
                  </div>
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
              <Button type='submit'>Create Pack</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
