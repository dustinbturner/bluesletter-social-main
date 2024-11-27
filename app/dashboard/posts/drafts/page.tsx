// src/app/dashboard/posts/drafts/page.tsx

"use client";

import React from "react";

import { format } from "date-fns";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { RefreshCcw, Plus, Edit2, Trash2, ExternalLink } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";

// Define the Post type
type Post = {
  id: string;
  title: string;
  published_at: string | null;
  updated_at: string;
  bluesky_post_uri: string | null;
};

export default function PostsList() {
  const [posts, setPosts] = React.useState<Post[]>([
    {
      id: "1",
      title: "Demo Post 1",
      published_at: "2023-10-01T12:00:00Z",
      updated_at: "2023-10-01T12:00:00Z",
      bluesky_post_uri: "demo-uri-1",
    },
    {
      id: "2",
      title: "Demo Post 2",
      published_at: null,
      updated_at: "2023-10-02T12:00:00Z",
      bluesky_post_uri: null,
    },
    // Add more dummy posts as needed
  ]);
  const [isSyncing, setIsSyncing] = React.useState(false);
  const [lastSyncAt, setLastSyncAt] = React.useState<Date | null>(null);
  const router = useRouter();
  const { toast } = useToast();

  const handleSync = async () => {
    setIsSyncing(true);

    try {
      // Simulate sync process
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setLastSyncAt(new Date()); // Update last sync time

      toast({
        title: "Sync Complete",
        description: `Successfully synced posts`,
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to sync posts";
      toast({
        title: "Sync Failed",
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsSyncing(false);
    }
  };

  const handleDelete = async (postId: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      setPosts(posts.filter((post) => post.id !== postId));
      toast({
        title: "Post Deleted",
        description: "The post has been successfully deleted.",
      });
    } catch (error) {
      console.error("Delete error:", error);
      toast({
        title: "Delete Failed",
        description: "Failed to delete the post. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Adjusted filtering logic to use published_at
  const publishedPosts = posts.filter((post) => !!post.published_at);
  const draftPosts = posts.filter((post) => !post.published_at);

  const PostsTable = ({
    posts,
    type,
  }: {
    posts: Post[];
    type: "published" | "drafts";
  }) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className='w-[40%]'>Title</TableHead>
          <TableHead className='w-[30%]'>
            {type === "published" ? "Published Date" : "Last Updated"}
          </TableHead>
          <TableHead className='w-[30%]'>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {posts.length === 0 ? (
          <TableRow>
            <TableCell
              colSpan={3}
              className='text-center text-muted-foreground'
            >
              No {type} posts found
            </TableCell>
          </TableRow>
        ) : (
          posts.map((post) => (
            <TableRow key={post.id}>
              <TableCell className='font-medium'>
                {post.bluesky_post_uri && (
                  <span className='inline-block bg-blue-400 mr-2 rounded-full w-2 h-2' />
                )}
                {post.title}
              </TableCell>
              <TableCell>
                {type === "published" && post.published_at
                  ? format(new Date(post.published_at), "PPP")
                  : format(new Date(post.updated_at), "PPP")}
              </TableCell>
              <TableCell>
                <div className='flex items-center gap-2'>
                  <Button
                    variant='ghost'
                    size='icon'
                    onClick={() =>
                      router.push(`/dashboard/posts/${post.id}/edit`)
                    }
                  >
                    <Edit2 className='w-4 h-4' />
                    <span className='sr-only'>Edit</span>
                  </Button>

                  {post.bluesky_post_uri && (
                    <Button variant='ghost' size='icon' asChild>
                      <a
                        href={`https://bsky.app/profile/demo-handle/post/${encodeURIComponent(
                          post.bluesky_post_uri
                        )}`}
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        <ExternalLink className='w-4 h-4' />
                        <span className='sr-only'>View on Bluesky</span>
                      </a>
                    </Button>
                  )}

                  <Button
                    variant='ghost'
                    size='icon'
                    onClick={() => handleDelete(post.id)}
                  >
                    <Trash2 className='w-4 h-4' />
                    <span className='sr-only'>Delete</span>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );

  return (
    <div className='py-6 container'>
      <Card>
        <CardHeader>
          <div className='flex justify-between items-center'>
            <div>
              <CardTitle>Posts</CardTitle>
              <CardDescription>
                Manage your Bluesky posts and drafts
              </CardDescription>
            </div>
            <div className='flex items-center gap-2'>
              <Button
                variant='outline'
                size='sm'
                onClick={handleSync}
                disabled={isSyncing}
              >
                <RefreshCcw
                  className={cn("mr-2 h-4 w-4", isSyncing && "animate-spin")}
                />
                {isSyncing ? "Syncing..." : "Sync from Bluesky"}
              </Button>
              <Button asChild>
                <Link href='/dashboard/posts/create'>
                  <Plus className='mr-2 w-4 h-4' />
                  New Post
                </Link>
              </Button>
            </div>
          </div>
          {lastSyncAt && (
            <p className='mt-2 text-muted-foreground text-sm'>
              Last synced: {format(lastSyncAt, "PPP p")}
            </p>
          )}
        </CardHeader>
        <CardContent>
          <Tabs defaultValue='published'>
            <TabsList className='mb-4'>
              <TabsTrigger value='published'>
                Published ({publishedPosts.length})
              </TabsTrigger>
              <TabsTrigger value='drafts'>
                Drafts ({draftPosts.length})
              </TabsTrigger>
            </TabsList>
            <TabsContent value='published'>
              <PostsTable posts={publishedPosts} type='published' />
            </TabsContent>
            <TabsContent value='drafts'>
              <PostsTable posts={draftPosts} type='drafts' />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
