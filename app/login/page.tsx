// app/login/page.tsx
"use server";

import { getSessionAgent } from "@/context";
import { getContext } from "@/instrumentation";
import * as Profile from "@/lexicon/types/app/bsky/actor/profile";
import { MainNav } from "@/components/Navbar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

export default async function LoginPage() {
  const ctx = getContext();
  const agent = await getSessionAgent(ctx);

  // Show login form if not authenticated
  if (!agent) {
    return (
      <div className='flex flex-col min-h-screen'>
        <MainNav />
        <div className='flex flex-1 justify-center items-center p-4'>
          <Card className='w-full max-w-md'>
            <CardHeader>
              <CardTitle>Welcome Back</CardTitle>
              <CardDescription>
                Sign in with your Bluesky account to continue
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form action='/api/login' method='post'>
                <div className='gap-4 grid'>
                  <Input
                    name='handle'
                    placeholder='Enter your handle (e.g., alice.bsky.social)'
                    type='text'
                    autoCapitalize='none'
                    autoComplete='username'
                    autoCorrect='off'
                    required
                  />
                  <Button type='submit'>Sign In with Bluesky</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Fetch profile data if authenticated
  const handle = await ctx.resolver.resolveDidToHandle(agent.did!);
  const { data: profileRecord } = await agent.com.atproto.repo.getRecord({
    repo: agent.assertDid,
    collection: "app.bsky.actor.profile",
    rkey: "self",
  });

  const profile =
    Profile.isRecord(profileRecord.value) &&
    Profile.validateRecord(profileRecord.value).success
      ? profileRecord.value
      : null;

  // Show profile if authenticated
  return (
    <div className='flex flex-col min-h-screen'>
      <MainNav />
      <div className='flex flex-1 justify-center items-center p-4'>
        <Card className='w-full max-w-md'>
          <CardHeader>
            <CardTitle className='text-center'>
              <span className='bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500 text-transparent'>
                {handle}
              </span>
            </CardTitle>
            {profile?.displayName && (
              <CardDescription className='text-center text-lg'>
                {profile.displayName}
              </CardDescription>
            )}
          </CardHeader>
          <CardContent>
            {profile?.description && (
              <p className='text-center text-muted-foreground'>
                {profile.description}
              </p>
            )}
          </CardContent>
          <CardFooter className='flex justify-center'>
            <form action='/logout' method='post'>
              <Button variant='outline' type='submit'>
                Sign Out
              </Button>
            </form>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
