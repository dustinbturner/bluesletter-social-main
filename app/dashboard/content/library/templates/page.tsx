// app/dashboard/library/templates/page.tsx
"use client";

import * as React from "react";
import { Plus, FileText, Copy, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

interface Template {
  id: string;
  title: string;
  description: string;
  content: string;
  type: "post" | "thread" | "newsletter";
  category: string;
  usageCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export default function TemplatesPage() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedType, setSelectedType] = React.useState<string>("all");
  const [createDialogOpen, setCreateDialogOpen] = React.useState(false);
  const [editingTemplate, setEditingTemplate] = React.useState<Template | null>(
    null
  );

  // Example templates data - would come from your backend
  const templates: Template[] = [
    {
      id: "1",
      title: "Weekly Update Thread",
      description: "Template for weekly progress updates and announcements",
      content:
        "This week's highlights:\n\n1. [Achievement]\n2. [Update]\n3. [News]",
      type: "thread",
      category: "Updates",
      usageCount: 12,
      createdAt: new Date("2024-01-15"),
      updatedAt: new Date("2024-01-15"),
    },
    // Add more templates...
  ];

  const handleCreateTemplate = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle template creation
    setCreateDialogOpen(false);
  };

  const handleEditTemplate = (template: Template) => {
    setEditingTemplate(template);
    setCreateDialogOpen(true);
  };

  const handleDeleteTemplate = (templateId: string) => {
    // Handle template deletion
    console.log("Deleting template:", templateId);
  };

  const handleDuplicateTemplate = (template: Template) => {
    // Handle template duplication
    console.log("Duplicating template:", template.id);
  };

  return (
    <div className='flex flex-col gap-6 p-6'>
      {/* Header */}
      <div className='flex justify-between items-center mb-8'>
        <div>
          <h1 className='font-semibold text-2xl tracking-tight'>
            Content Templates
          </h1>
          <p className='text-muted-foreground'>
            Create and manage reusable content templates
          </p>
        </div>
        <Button onClick={() => setCreateDialogOpen(true)}>
          <Plus className='mr-2 w-4 h-4' />
          Create Template
        </Button>
      </div>

      {/* Filters */}
      <div className='flex md:flex-row flex-col md:items-center gap-4'>
        <div className='relative flex-1'>
          <Input
            placeholder='Search templates...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='max-w-sm'
          />
        </div>

        <Select value={selectedType} onValueChange={setSelectedType}>
          <SelectTrigger className='w-[150px]'>
            <FileText className='mr-2 w-4 h-4' />
            <SelectValue placeholder='Type' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>All Types</SelectItem>
            <SelectItem value='post'>Posts</SelectItem>
            <SelectItem value='thread'>Threads</SelectItem>
            <SelectItem value='newsletter'>Newsletters</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Templates Grid */}
      <div className='gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
        {templates.map((template) => (
          <Card key={template.id}>
            <CardHeader>
              <CardTitle className='flex justify-between items-start'>
                <span className='truncate'>{template.title}</span>
                <Badge variant='secondary'>{template.type}</Badge>
              </CardTitle>
              <CardDescription>{template.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <pre className='bg-muted p-4 rounded-md max-h-32 text-sm whitespace-pre-wrap overflow-hidden'>
                {template.content}
              </pre>
            </CardContent>
            <CardFooter className='flex justify-between items-center'>
              <div className='text-muted-foreground text-sm'>
                Used {template.usageCount} times
              </div>
              <div className='flex gap-2'>
                <Button
                  variant='ghost'
                  size='icon'
                  onClick={() => handleDuplicateTemplate(template)}
                >
                  <Copy className='w-4 h-4' />
                </Button>
                <Button
                  variant='ghost'
                  size='icon'
                  onClick={() => handleEditTemplate(template)}
                >
                  <Pencil className='w-4 h-4' />
                </Button>
                <Button
                  variant='ghost'
                  size='icon'
                  onClick={() => handleDeleteTemplate(template.id)}
                >
                  <Trash2 className='w-4 h-4' />
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Create/Edit Template Dialog */}
      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent className='sm:max-w-[625px]'>
          <form onSubmit={handleCreateTemplate}>
            <DialogHeader>
              <DialogTitle>
                {editingTemplate ? "Edit Template" : "Create Template"}
              </DialogTitle>
              <DialogDescription>
                Create a reusable template for your content
              </DialogDescription>
            </DialogHeader>

            <div className='space-y-4 my-6'>
              <div className='space-y-2'>
                <label className='font-medium text-sm'>Title</label>
                <Input
                  placeholder='Template title'
                  defaultValue={editingTemplate?.title}
                />
              </div>

              <div className='space-y-2'>
                <label className='font-medium text-sm'>Description</label>
                <Input
                  placeholder='Brief description'
                  defaultValue={editingTemplate?.description}
                />
              </div>

              <div className='space-y-2'>
                <label className='font-medium text-sm'>Type</label>
                <Select defaultValue={editingTemplate?.type || "post"}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='post'>Post</SelectItem>
                    <SelectItem value='thread'>Thread</SelectItem>
                    <SelectItem value='newsletter'>Newsletter</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className='space-y-2'>
                <label className='font-medium text-sm'>Content</label>
                <Textarea
                  placeholder='Template content...'
                  className='min-h-[200px] font-mono'
                  defaultValue={editingTemplate?.content}
                />
              </div>
            </div>

            <DialogFooter>
              <Button
                type='button'
                variant='outline'
                onClick={() => setCreateDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type='submit'>
                {editingTemplate ? "Save Changes" : "Create Template"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
