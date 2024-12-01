// app/dashboard/network/lists/_components/create-list-dialog.tsx
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
import { Search, Plus, X, Users, Globe } from "lucide-react";

// We define a schema for list creation validation
const listFormSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must be less than 50 characters"),
  description: z
    .string()
    .max(280, "Description must be less than 280 characters"),
  visibility: z.enum(["public", "private"]),
  categories: z
    .array(z.string())
    .min(1, "Add at least one category")
    .max(3, "Maximum 3 categories"),
  members: z
    .array(
      z.object({
        did: z.string(),
        handle: z.string(),
        displayName: z.string().optional(),
      })
    )
    .optional(),
});

type ListFormValues = z.infer<typeof listFormSchema>;

interface CreateListDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateListDialog({
  open,
  onOpenChange,
}: CreateListDialogProps) {
  const [activeTab, setActiveTab] = React.useState("basics");
  const [categoryInput, setCategoryInput] = React.useState("");
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>(
    []
  );
  const [memberSearchQuery, setMemberSearchQuery] = React.useState("");

  // Initialize form with default values
  const form = useForm<ListFormValues>({
    resolver: zodResolver(listFormSchema),
    defaultValues: {
      name: "",
      description: "",
      visibility: "public",
      categories: [],
      members: [],
    },
  });

  // Handle category addition
  const handleAddCategory = () => {
    if (categoryInput && selectedCategories.length < 3) {
      const newCategory = categoryInput.trim();
      setSelectedCategories([...selectedCategories, newCategory]);
      form.setValue("categories", [...selectedCategories, newCategory]);
      setCategoryInput("");
    }
  };

  // Handle category removal
  const handleRemoveCategory = (category: string) => {
    const newCategories = selectedCategories.filter((c) => c !== category);
    setSelectedCategories(newCategories);
    form.setValue("categories", newCategories);
  };

  // Handle form submission
  async function onSubmit(values: ListFormValues) {
    try {
      // Here we would integrate with AT Protocol
      console.log("Creating list:", values);
      onOpenChange(false);
    } catch (error) {
      console.error("Error creating list:", error);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[625px]'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Create List</DialogTitle>
              <DialogDescription>
                Create a new list to organize and share accounts
              </DialogDescription>
            </DialogHeader>

            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className='mt-4'
            >
              <TabsList className='grid grid-cols-2 w-full'>
                <TabsTrigger value='basics'>Basic Info</TabsTrigger>
                <TabsTrigger value='members'>Members</TabsTrigger>
              </TabsList>

              <ScrollArea className='mt-4 pr-4 h-[400px]'>
                <TabsContent value='basics' className='space-y-4'>
                  {/* Basic Information Fields */}
                  <FormField
                    control={form.control}
                    name='name'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>List Name</FormLabel>
                        <FormControl>
                          <Input placeholder='Tech Journalists' {...field} />
                        </FormControl>
                        <FormDescription>
                          Choose a descriptive name for your list
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
                            placeholder='What kind of accounts will be in this list?'
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Help others understand the purpose of this list
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

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
                            <SelectItem value='public'>
                              <div className='flex items-center gap-2'>
                                <Globe className='w-4 h-4' />
                                <span>Public</span>
                              </div>
                            </SelectItem>
                            <SelectItem value='private'>
                              <div className='flex items-center gap-2'>
                                <Users className='w-4 h-4' />
                                <span>Private</span>
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          {field.value === "public"
                            ? "Anyone can find and follow this list"
                            : "Only you can see this list"}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Categories Section */}
                  <FormItem>
                    <FormLabel>Categories</FormLabel>
                    <div className='flex gap-2'>
                      <Input
                        value={categoryInput}
                        onChange={(e) => setCategoryInput(e.target.value)}
                        placeholder='Add a category'
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            handleAddCategory();
                          }
                        }}
                      />
                      <Button
                        type='button'
                        onClick={handleAddCategory}
                        disabled={selectedCategories.length >= 3}
                      >
                        <Plus className='w-4 h-4' />
                      </Button>
                    </div>
                    <div className='flex flex-wrap gap-2 mt-2'>
                      {selectedCategories.map((category) => (
                        <Badge
                          key={category}
                          variant='secondary'
                          className='flex items-center gap-1'
                        >
                          {category}
                          <button
                            onClick={() => handleRemoveCategory(category)}
                            className='ml-1 hover:text-destructive'
                          >
                            <X className='w-3 h-3' />
                          </button>
                        </Badge>
                      ))}
                    </div>
                    <FormDescription>
                      Add up to 3 categories to help others discover your list
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                </TabsContent>

                <TabsContent value='members' className='space-y-4'>
                  {/* Member Search and Selection */}
                  <div className='space-y-4'>
                    <div className='relative'>
                      <Search className='top-2.5 left-2 absolute w-4 h-4 text-muted-foreground' />
                      <Input
                        placeholder='Search accounts...'
                        value={memberSearchQuery}
                        onChange={(e) => setMemberSearchQuery(e.target.value)}
                        className='pl-8'
                      />
                    </div>
                    <div className='text-muted-foreground text-sm'>
                      Search for accounts to add to your list
                    </div>
                    {/* Member results would be rendered here */}
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
              <Button type='submit'>Create List</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
