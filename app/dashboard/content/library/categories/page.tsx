// app/dashboard/library/categories/page.tsx
"use client";

import * as React from "react";
import { Plus, Hash, MoreVertical, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Category {
  id: string;
  name: string;
  description: string;
  color: string;
  count: number;
  tags: string[];
  createdAt: Date;
}

export default function CategoriesPage() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [createDialogOpen, setCreateDialogOpen] = React.useState(false);
  const [editingCategory, setEditingCategory] = React.useState<Category | null>(
    null
  );
  const [newTagInput, setNewTagInput] = React.useState("");
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);

  // Example categories data
  const categories: Category[] = [
    {
      id: "1",
      name: "Tech Updates",
      description: "Content about technology news and updates",
      color: "#3B82F6",
      count: 24,
      tags: ["tech", "news", "updates", "software"],
      createdAt: new Date("2024-01-15"),
    },
    {
      id: "2",
      name: "Tutorials",
      description: "How-to guides and educational content",
      color: "#10B981",
      count: 15,
      tags: ["education", "guides", "learning"],
      createdAt: new Date("2024-01-16"),
    },
    // Add more categories...
  ];

  const handleCreateCategory = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle category creation
    setCreateDialogOpen(false);
    setSelectedTags([]);
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
    setSelectedTags(category.tags);
    setCreateDialogOpen(true);
  };

  const handleDeleteCategory = (categoryId: string) => {
    // Handle category deletion
    console.log("Deleting category:", categoryId);
  };

  const handleAddTag = () => {
    if (newTagInput && !selectedTags.includes(newTagInput)) {
      setSelectedTags([...selectedTags, newTagInput]);
      setNewTagInput("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setSelectedTags(selectedTags.filter((t) => t !== tag));
  };

  // Predefined colors for categories
  const colorOptions = [
    "#3B82F6", // Blue
    "#10B981", // Green
    "#F59E0B", // Yellow
    "#EF4444", // Red
    "#8B5CF6", // Purple
    "#EC4899", // Pink
    "#6366F1", // Indigo
    "#14B8A6", // Teal
  ];

  return (
    <div className='flex flex-col gap-6 p-6'>
      {/* Header */}
      <div className='flex justify-between items-center mb-8'>
        <div>
          <h1 className='font-semibold text-2xl tracking-tight'>Categories</h1>
          <p className='text-muted-foreground'>
            Organize your content with categories and tags
          </p>
        </div>
        <Button onClick={() => setCreateDialogOpen(true)}>
          <Plus className='mr-2 w-4 h-4' />
          Create Category
        </Button>
      </div>

      {/* Search */}
      <div className='flex items-center gap-4'>
        <div className='relative flex-1'>
          <Input
            placeholder='Search categories...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='max-w-sm'
          />
        </div>
      </div>

      {/* Categories Grid */}
      <div className='gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
        {categories.map((category) => (
          <Card key={category.id}>
            <CardHeader>
              <CardTitle className='flex justify-between items-center'>
                <div className='flex items-center gap-2'>
                  <div
                    className='rounded-full w-3 h-3'
                    style={{ backgroundColor: category.color }}
                  />
                  <span>{category.name}</span>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant='ghost' size='icon'>
                      <MoreVertical className='w-4 h-4' />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      onClick={() => handleEditCategory(category)}
                    >
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => handleDeleteCategory(category.id)}
                      className='text-destructive'
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardTitle>
              <CardDescription>{category.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                <div className='flex items-center gap-2 text-muted-foreground text-sm'>
                  <Hash className='w-4 h-4' />
                  <span>{category.count} items</span>
                </div>
                <div className='flex flex-wrap gap-2'>
                  {category.tags.map((tag) => (
                    <Badge key={tag} variant='secondary'>
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Create/Edit Category Dialog */}
      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent className='sm:max-w-[425px]'>
          <form onSubmit={handleCreateCategory}>
            <DialogHeader>
              <DialogTitle>
                {editingCategory ? "Edit Category" : "Create Category"}
              </DialogTitle>
              <DialogDescription>
                Organize your content with custom categories
              </DialogDescription>
            </DialogHeader>

            <div className='space-y-4 my-6'>
              <div className='space-y-2'>
                <label className='font-medium text-sm'>Name</label>
                <Input
                  placeholder='Category name'
                  defaultValue={editingCategory?.name}
                />
              </div>

              <div className='space-y-2'>
                <label className='font-medium text-sm'>Description</label>
                <Input
                  placeholder='Brief description'
                  defaultValue={editingCategory?.description}
                />
              </div>

              <div className='space-y-2'>
                <label className='font-medium text-sm'>Color</label>
                <div className='flex flex-wrap gap-2'>
                  {colorOptions.map((color) => (
                    <button
                      key={color}
                      type='button'
                      className={`w-6 h-6 rounded-full cursor-pointer transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                        editingCategory?.color === color
                          ? "ring-2 ring-offset-2"
                          : ""
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() => {
                        if (editingCategory) {
                          setEditingCategory({ ...editingCategory, color });
                        }
                      }}
                    />
                  ))}
                </div>
              </div>

              <div className='space-y-2'>
                <label className='font-medium text-sm'>Tags</label>
                <div className='flex gap-2'>
                  <Input
                    placeholder='Add tags...'
                    value={newTagInput}
                    onChange={(e) => setNewTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddTag();
                      }
                    }}
                  />
                  <Button type='button' onClick={handleAddTag}>
                    Add
                  </Button>
                </div>
                <ScrollArea className='h-20'>
                  <div className='flex flex-wrap gap-2'>
                    {selectedTags.map((tag) => (
                      <Badge
                        key={tag}
                        variant='secondary'
                        className='flex items-center gap-1'
                      >
                        {tag}
                        <button
                          onClick={() => handleRemoveTag(tag)}
                          className='ml-1 hover:text-destructive'
                        >
                          <X className='w-3 h-3' />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </ScrollArea>
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
                {editingCategory ? "Save Changes" : "Create Category"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
