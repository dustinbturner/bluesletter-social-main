// app/dashboard/settings/profile/page.tsx

"use client";

import React, { useState } from "react";
import { Camera, Globe, AtSign, Mail, Check, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

// Types for our profile data
interface ProfileData {
  name: string;
  username: string;
  email: string;
  bio: string;
  avatar: string;
  website: string;
  language: string;
  timezone: string;
  emailNotifications: {
    newsletters: boolean;
    updates: boolean;
    marketing: boolean;
  };
  privacy: {
    profileVisible: boolean;
    showEmail: boolean;
  };
}

export default function ProfileSettings() {
  const router = useRouter();
  const { toast } = useToast();
  const [isDirty, setIsDirty] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Example initial profile data - would come from your API
  const [profile, setProfile] = useState<ProfileData>({
    name: "Alex Johnson",
    username: "alexjohnson",
    email: "alex@example.com",
    bio: "Writer, creator, and Bluesky enthusiast. Sharing thoughts on technology and digital culture.",
    avatar: "/placeholder/100/100",
    website: "https://alexjohnson.com",
    language: "en",
    timezone: "America/New_York",
    emailNotifications: {
      newsletters: true,
      updates: true,
      marketing: false,
    },
    privacy: {
      profileVisible: true,
      showEmail: false,
    },
  });

  // Handler for profile image upload
  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Handle image upload - this is where you'd integrate with your storage solution
      // For now, we'll just simulate it
      toast({
        title: "Avatar Updated",
        description: "Your profile picture has been updated successfully.",
      });
    }
  };

  // Handler for form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: "Profile Updated",
        description: "Your profile changes have been saved successfully.",
      });
      setIsDirty(false);
    } catch (error: unknown) {
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className='flex flex-col gap-6 p-6'>
      {/* Header with back button */}
      <div className='flex items-center gap-4 mb-4'>
        <Button
          variant='ghost'
          size='icon'
          onClick={() => router.push("/dashboard/settings")}
        >
          <ArrowLeft className='w-4 h-4' />
        </Button>
        <div>
          <h1 className='font-semibold text-2xl tracking-tight'>
            Profile & Account
          </h1>
          <p className='text-muted-foreground'>
            Manage your personal information and preferences
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className='space-y-6'>
        {/* Profile Information Section */}
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>
              Update your personal information and public profile
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-6'>
            {/* Avatar Upload */}
            <div className='flex items-center gap-6'>
              <div className='relative'>
                <img
                  src={profile.avatar}
                  alt='Profile'
                  className='rounded-full w-20 h-20 object-cover'
                />
                <Label
                  htmlFor='avatar-upload'
                  className='-right-2 -bottom-2 absolute bg-primary hover:bg-primary/90 p-1.5 rounded-full text-primary-foreground cursor-pointer'
                >
                  <Camera className='w-4 h-4' />
                </Label>
                <Input
                  id='avatar-upload'
                  type='file'
                  accept='image/*'
                  className='hidden'
                  onChange={handleAvatarUpload}
                />
              </div>
              <div className='flex-1 space-y-1'>
                <h4 className='font-medium text-sm'>Profile Picture</h4>
                <p className='text-muted-foreground text-sm'>
                  Upload a new profile picture. Recommended size: 400x400px.
                </p>
              </div>
            </div>

            <Separator />

            {/* Basic Information */}
            <div className='gap-4 grid md:grid-cols-2'>
              <div className='space-y-2'>
                <Label htmlFor='name'>Display Name</Label>
                <Input
                  id='name'
                  value={profile.name}
                  onChange={(e) => {
                    setProfile({ ...profile, name: e.target.value });
                    setIsDirty(true);
                  }}
                />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='username'>Username</Label>
                <div className='relative'>
                  <span className='top-2.5 left-3 absolute text-muted-foreground'>
                    <AtSign className='w-4 h-4' />
                  </span>
                  <Input
                    id='username'
                    value={profile.username}
                    className='pl-9'
                    onChange={(e) => {
                      setProfile({ ...profile, username: e.target.value });
                      setIsDirty(true);
                    }}
                  />
                </div>
              </div>

              <div className='space-y-2'>
                <Label htmlFor='email'>Email Address</Label>
                <div className='relative'>
                  <span className='top-2.5 left-3 absolute text-muted-foreground'>
                    <Mail className='w-4 h-4' />
                  </span>
                  <Input
                    id='email'
                    type='email'
                    value={profile.email}
                    className='pl-9'
                    onChange={(e) => {
                      setProfile({ ...profile, email: e.target.value });
                      setIsDirty(true);
                    }}
                  />
                </div>
              </div>

              <div className='space-y-2'>
                <Label htmlFor='website'>Website</Label>
                <div className='relative'>
                  <span className='top-2.5 left-3 absolute text-muted-foreground'>
                    <Globe className='w-4 h-4' />
                  </span>
                  <Input
                    id='website'
                    value={profile.website}
                    className='pl-9'
                    onChange={(e) => {
                      setProfile({ ...profile, website: e.target.value });
                      setIsDirty(true);
                    }}
                  />
                </div>
              </div>
            </div>

            <div className='space-y-2'>
              <Label htmlFor='bio'>Bio</Label>
              <Textarea
                id='bio'
                value={profile.bio}
                onChange={(e) => {
                  setProfile({ ...profile, bio: e.target.value });
                  setIsDirty(true);
                }}
                className='min-h-[100px]'
              />
              <p className='text-muted-foreground text-xs'>
                Write a brief bio to introduce yourself to other users.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Preferences Section */}
        <Card>
          <CardHeader>
            <CardTitle>Preferences</CardTitle>
            <CardDescription>
              Customize your account settings and preferences
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-6'>
            <div className='gap-4 grid md:grid-cols-2'>
              <div className='space-y-2'>
                <Label htmlFor='language'>Language</Label>
                <Select
                  value={profile.language}
                  onValueChange={(value) => {
                    setProfile({ ...profile, language: value });
                    setIsDirty(true);
                  }}
                >
                  <SelectTrigger id='language'>
                    <SelectValue placeholder='Select language' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='en'>English</SelectItem>
                    <SelectItem value='es'>Spanish</SelectItem>
                    <SelectItem value='fr'>French</SelectItem>
                    <SelectItem value='de'>German</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className='space-y-2'>
                <Label htmlFor='timezone'>Timezone</Label>
                <Select
                  value={profile.timezone}
                  onValueChange={(value) => {
                    setProfile({ ...profile, timezone: value });
                    setIsDirty(true);
                  }}
                >
                  <SelectTrigger id='timezone'>
                    <SelectValue placeholder='Select timezone' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='America/New_York'>
                      Eastern Time
                    </SelectItem>
                    <SelectItem value='America/Chicago'>
                      Central Time
                    </SelectItem>
                    <SelectItem value='America/Denver'>
                      Mountain Time
                    </SelectItem>
                    <SelectItem value='America/Los_Angeles'>
                      Pacific Time
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Email Notifications */}
        <Card>
          <CardHeader>
            <CardTitle>Email Notifications</CardTitle>
            <CardDescription>
              Choose which emails you&apos;d like to receive
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='flex justify-between items-center'>
              <div className='space-y-0.5'>
                <Label>Newsletter Updates</Label>
                <p className='text-muted-foreground text-sm'>
                  Receive updates about your newsletter performance
                </p>
              </div>
              <Switch
                checked={profile.emailNotifications.newsletters}
                onCheckedChange={(checked) => {
                  setProfile({
                    ...profile,
                    emailNotifications: {
                      ...profile.emailNotifications,
                      newsletters: checked,
                    },
                  });
                  setIsDirty(true);
                }}
              />
            </div>

            <Separator />

            <div className='flex justify-between items-center'>
              <div className='space-y-0.5'>
                <Label>Product Updates</Label>
                <p className='text-muted-foreground text-sm'>
                  Get notified about new features and improvements
                </p>
              </div>
              <Switch
                checked={profile.emailNotifications.updates}
                onCheckedChange={(checked) => {
                  setProfile({
                    ...profile,
                    emailNotifications: {
                      ...profile.emailNotifications,
                      updates: checked,
                    },
                  });
                  setIsDirty(true);
                }}
              />
            </div>

            <Separator />

            <div className='flex justify-between items-center'>
              <div className='space-y-0.5'>
                <Label>Marketing Communications</Label>
                <p className='text-muted-foreground text-sm'>
                  Receive tips, trends, and insights about digital publishing
                </p>
              </div>
              <Switch
                checked={profile.emailNotifications.marketing}
                onCheckedChange={(checked) => {
                  setProfile({
                    ...profile,
                    emailNotifications: {
                      ...profile.emailNotifications,
                      marketing: checked,
                    },
                  });
                  setIsDirty(true);
                }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Privacy Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Privacy Settings</CardTitle>
            <CardDescription>
              Control your profile visibility and data sharing preferences
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='flex justify-between items-center'>
              <div className='space-y-0.5'>
                <Label>Public Profile</Label>
                <p className='text-muted-foreground text-sm'>
                  Make your profile visible to other users
                </p>
              </div>
              <Switch
                checked={profile.privacy.profileVisible}
                onCheckedChange={(checked) => {
                  setProfile({
                    ...profile,
                    privacy: {
                      ...profile.privacy,
                      profileVisible: checked,
                    },
                  });
                  setIsDirty(true);
                }}
              />
            </div>

            <Separator />

            <div className='flex justify-between items-center'>
              <div className='space-y-0.5'>
                <Label>Show Email Address</Label>
                <p className='text-muted-foreground text-sm'>
                  Display your email address on your public profile
                </p>
              </div>
              <Switch
                checked={profile.privacy.showEmail}
                onCheckedChange={(checked) => {
                  setProfile({
                    ...profile,
                    privacy: {
                      ...profile.privacy,
                      showEmail: checked,
                    },
                  });
                  setIsDirty(true);
                }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className='flex justify-end gap-4'>
          <Button
            type='button'
            variant='outline'
            onClick={() => router.push("/dashboard/settings")}
          >
            Cancel
          </Button>
          <Button
            type='submit'
            disabled={!isDirty || isSaving}
            className='min-w-[100px]'
          >
            {isSaving ? (
              "Saving..."
            ) : (
              <>
                <Check className='mr-2 w-4 h-4' />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
