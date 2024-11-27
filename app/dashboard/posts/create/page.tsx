// src/app/dashboard/posts/create-post/page.tsx

"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Calendar } from "lucide-react";
import { format } from "date-fns";
import { nanoid } from "nanoid";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

// import { BskyAgent, AppBskyFeedPost } from "@atproto/api";

export default function CreatePost() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [publishedAt, setPublishedAt] = useState<Date>();
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const { toast } = useToast();

  const maxCharactersPerPost = 300;

  const [threadPosts, setThreadPosts] = useState<string[]>([]);

  useEffect(() => {
    const posts = splitContentIntoPosts(content, maxCharactersPerPost);
    setThreadPosts(posts);
  }, [content]);

  const generateSlug = (title: string) => {
    return (
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "") +
      "-" +
      nanoid(6)
    );
  };

  const handleSave = async (publish: boolean = false) => {
    const actionType = publish ? setIsPublishing : setIsSaving;
    actionType(true);

    try {
      const post = {
        title,
        content,
        excerpt: excerpt || content.slice(0, 160) + "...",
        slug: generateSlug(title),
        published: publish,
        published_at: publish
          ? new Date().toISOString()
          : publishedAt?.toISOString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        threadPosts,
      };

      console.log("Attempting to save post:", post);

      // Comment out agent-related code
      // if (publish && agent) {
      //   // Ensure the agent is authenticated
      //   if (!agent.session) {
      //     throw new Error("Not authenticated with Bluesky");
      //   }

      //   const blueskyResponse = await postToBluesky(agent, post.threadPosts);

      //   console.log("Bluesky post response:", blueskyResponse);

      //   toast({
      //     title: "Success",
      //     description: "Your post has been published to Bluesky.",
      //   });
      // } else if (publish) {
      //   throw new Error("Bluesky agent not available.");
      // }

      router.push("/dashboard/posts");
    } catch (error) {
      console.error("Failed to save post:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Failed to save the post. Please try again.",
        variant: "destructive",
      });
    } finally {
      actionType(false);
    }
  };

  // Comment out the postToBluesky function
  // async function postToBluesky(agent: BskyAgent, threadPosts: string[]) {
  //   let parentPostUri: string | undefined;
  //   let parentPostCid: string | undefined;

  //   try {
  //     for (const content of threadPosts) {
  //       const postRecord: AppBskyFeedPost.Record = {
  //         $type: "app.bsky.feed.post",
  //         text: content,
  //         createdAt: new Date().toISOString(),
  //       };

  //       if (parentPostUri && parentPostCid) {
  //         postRecord.reply = {
  //           root: {
  //             cid: parentPostCid,
  //             uri: parentPostUri,
  //           },
  //           parent: {
  //             cid: parentPostCid,
  //             uri: parentPostUri,
  //           },
  //         };
  //       }

  //       const response = await agent.post(postRecord);

  //       parentPostUri = response.uri;
  //       parentPostCid = response.cid;
  //     }

  //     return { parentPostUri, parentPostCid };
  //   } catch (error) {
  //     console.error("Error posting to Bluesky:", error);
  //     throw error;
  //   }
  // }

  const splitContentIntoPosts = (
    content: string,
    maxLength: number
  ): string[] => {
    const words = content.split(" ");
    const posts = [];
    let currentPost = "";

    for (const word of words) {
      if ((currentPost + " " + word).trim().length <= maxLength) {
        currentPost = (currentPost + " " + word).trim();
      } else {
        posts.push(currentPost);
        currentPost = word;
      }
    }
    if (currentPost) {
      posts.push(currentPost);
    }
    return posts;
  };

  const totalCharacters = content.length;

  return (
    <div className='space-y-4 py-6 w-full overflow-x-hidden'>
      <div className='flex md:flex-row flex-col gap-6 max-w-full overflow-x-hidden'>
        {/* Left Side: Post Form */}
        <div className='flex-1 min-w-0'>
          <Card>
            <CardHeader>
              <CardTitle>Create New Post</CardTitle>
              <CardDescription>
                Write your post and either save as draft or publish immediately.
              </CardDescription>
            </CardHeader>

            <CardContent className='space-y-6'>
              <div className='space-y-2'>
                <Label htmlFor='title'>Title</Label>
                <Input
                  id='title'
                  placeholder='Post title'
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='content'>Content</Label>
                <Textarea
                  id='content'
                  placeholder='Write your post content here...'
                  className='min-h-[200px] resize-none'
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
                <div
                  className={cn("text-sm text-right", {
                    "text-red-500": totalCharacters > maxCharactersPerPost,
                    "text-muted-foreground":
                      totalCharacters <= maxCharactersPerPost,
                  })}
                >
                  Total Characters: {totalCharacters}
                </div>
              </div>

              <div className='space-y-2'>
                <Label htmlFor='excerpt'>Excerpt (optional)</Label>
                <Textarea
                  id='excerpt'
                  placeholder='A brief summary of your post...'
                  className='h-24 resize-none'
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                />
              </div>

              <div className='flex items-center gap-4'>
                <Label>Schedule publication (optional)</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant='outline'
                      className={publishedAt ? "text-primary" : ""}
                    >
                      <Calendar className='mr-2 w-4 h-4' />
                      {publishedAt ? format(publishedAt, "PPP") : "Choose date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className='p-0 w-auto' align='start'>
                    <CalendarComponent
                      mode='single'
                      selected={publishedAt}
                      onSelect={setPublishedAt}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </CardContent>

            <CardFooter className='flex justify-between'>
              <Button
                variant='outline'
                onClick={() => router.push("/dashboard/drafts")}
              >
                Cancel
              </Button>
              <div className='flex gap-2'>
                <Button
                  variant='outline'
                  onClick={() => handleSave(false)}
                  disabled={isSaving || isPublishing || !title || !content}
                >
                  {isSaving ? "Saving..." : "Save as Draft"}
                </Button>
                <Button
                  onClick={() => handleSave(true)}
                  disabled={isSaving || isPublishing || !title || !content}
                >
                  {isPublishing ? "Publishing..." : "Publish Now"}
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>

        {/* Right Side: Live Preview */}
        <div className='flex-1 min-w-0'>
          <Card className='h-full'>
            <CardHeader className='flex justify-between items-center'>
              <CardTitle>Live Preview</CardTitle>
              {threadPosts.length > 1 && (
                <span className='text-muted-foreground text-sm'>
                  Thread ({threadPosts.length} posts)
                </span>
              )}
            </CardHeader>
            <CardContent className='space-y-4'>
              {threadPosts.map((postContent, index) => (
                <div
                  key={index}
                  className='bg-background p-4 border rounded-md'
                >
                  <div className='flex justify-between items-center'>
                    <span className='font-medium text-muted-foreground text-sm'>
                      Post {index + 1}
                    </span>
                    <span
                      className={cn("text-xs", {
                        "text-red-500":
                          postContent.length > maxCharactersPerPost,
                        "text-muted-foreground":
                          postContent.length <= maxCharactersPerPost,
                      })}
                    >
                      {postContent.length}/{maxCharactersPerPost} characters
                    </span>
                  </div>
                  <p className='mt-2 text-sm break-all whitespace-pre-wrap'>
                    {postContent}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
