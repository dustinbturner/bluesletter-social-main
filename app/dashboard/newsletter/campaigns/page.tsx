"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Monitor,
  Smartphone,
  Users,
  Clock,
  Send,
  Save,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

type CampaignStep = "details" | "content" | "audience" | "review";

interface CampaignData {
  title: string;
  subject: string;
  previewText: string;
  content: string;
  scheduledFor?: Date;
  audienceType: "all" | "segment";
  segment?: string;
}

export default function CreateCampaign() {
  const router = useRouter();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState<CampaignStep>("details");
  const [previewMode, setPreviewMode] = useState<"desktop" | "mobile">(
    "desktop"
  );
  const [isSaving, setIsSaving] = useState(false);
  const [isScheduling, setIsScheduling] = useState(false);

  const [campaign, setCampaign] = useState<CampaignData>({
    title: "",
    subject: "",
    previewText: "",
    content: "",
    audienceType: "all",
  });

  const steps: { id: CampaignStep; title: string }[] = [
    { id: "details", title: "Campaign Details" },
    { id: "content", title: "Email Content" },
    { id: "audience", title: "Select Audience" },
    { id: "review", title: "Review & Schedule" },
  ];

  const handleSaveDraft = async () => {
    setIsSaving(true);
    try {
      // API call to save draft
      toast({
        title: "Draft Saved",
        description: "Your campaign has been saved as a draft.",
      });
      router.push("/dashboard/newsletter/campaigns");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error: unknown) {
      toast({
        title: "Error",
        description: "Failed to save draft. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleSchedule = async () => {
    setIsScheduling(true);
    try {
      // API call to schedule campaign
      toast({
        title: "Campaign Scheduled",
        description: "Your campaign has been scheduled successfully.",
      });
      router.push("/dashboard/newsletter/campaigns");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error: unknown) {
      toast({
        title: "Error",
        description: "Failed to schedule campaign. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsScheduling(false);
    }
  };

  return (
    <div className='space-y-6 p-6'>
      {/* Progress Steps */}
      <div className='flex space-x-4'>
        {steps.map((step, index) => (
          <div
            key={step.id}
            className='flex items-center'
            onClick={() => setCurrentStep(step.id)}
          >
            <div
              className={cn(
                "flex items-center justify-center w-8 h-8 rounded-full border-2",
                currentStep === step.id
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-muted text-muted-foreground"
              )}
            >
              {index + 1}
            </div>
            <span className='ml-2 font-medium text-sm'>{step.title}</span>
            {index < steps.length - 1 && (
              <ChevronRight className='ml-4 w-4 h-4 text-muted-foreground' />
            )}
          </div>
        ))}
      </div>

      <div className='gap-6 grid grid-cols-1 md:grid-cols-2'>
        {/* Left Side - Form */}
        <div className='space-y-6'>
          {currentStep === "details" && (
            <Card>
              <CardHeader>
                <CardTitle>Campaign Details</CardTitle>
                <CardDescription>
                  Set up the basic information for your campaign
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='space-y-2'>
                  <Label htmlFor='title'>Campaign Name</Label>
                  <Input
                    id='title'
                    value={campaign.title}
                    onChange={(e) =>
                      setCampaign({ ...campaign, title: e.target.value })
                    }
                    placeholder='Summer Newsletter 2024'
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='subject'>Email Subject</Label>
                  <Input
                    id='subject'
                    value={campaign.subject}
                    onChange={(e) =>
                      setCampaign({ ...campaign, subject: e.target.value })
                    }
                    placeholder='Your Monthly Update'
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='previewText'>Preview Text</Label>
                  <Input
                    id='previewText'
                    value={campaign.previewText}
                    onChange={(e) =>
                      setCampaign({ ...campaign, previewText: e.target.value })
                    }
                    placeholder='A brief preview of your email content...'
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {currentStep === "content" && (
            <Card>
              <CardHeader className='flex flex-row justify-between items-center space-y-0 pb-2'>
                <div className='space-y-1'>
                  <CardTitle>Email Content</CardTitle>
                  <CardDescription>
                    Write and design your email content
                  </CardDescription>
                </div>
                <div className='flex items-center space-x-2'>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => setPreviewMode("desktop")}
                    className={previewMode === "desktop" ? "bg-muted" : ""}
                  >
                    <Monitor className='w-4 h-4' />
                  </Button>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => setPreviewMode("mobile")}
                    className={previewMode === "mobile" ? "bg-muted" : ""}
                  >
                    <Smartphone className='w-4 h-4' />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={campaign.content}
                  onChange={(e) =>
                    setCampaign({ ...campaign, content: e.target.value })
                  }
                  placeholder='Write your email content here...'
                  className='min-h-[400px]'
                />
              </CardContent>
            </Card>
          )}

          {currentStep === "audience" && (
            <Card>
              <CardHeader>
                <CardTitle>Select Audience</CardTitle>
                <CardDescription>
                  Choose who will receive this campaign
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='space-y-2'>
                  <Label>Audience Type</Label>
                  <Select
                    value={campaign.audienceType}
                    onValueChange={(value: "all" | "segment") =>
                      setCampaign({ ...campaign, audienceType: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder='Select audience type' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='all'>All Subscribers</SelectItem>
                      <SelectItem value='segment'>Specific Segment</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {campaign.audienceType === "segment" && (
                  <div className='space-y-2'>
                    <Label>Segment</Label>
                    <Select
                      value={campaign.segment}
                      onValueChange={(value) =>
                        setCampaign({ ...campaign, segment: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder='Select segment' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='paid'>Paid Subscribers</SelectItem>
                        <SelectItem value='free'>Free Subscribers</SelectItem>
                        <SelectItem value='inactive'>
                          Inactive Subscribers
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div className='pt-4'>
                  <div className='flex items-center space-x-2 text-muted-foreground'>
                    <Users className='w-4 h-4' />
                    <span className='text-sm'>
                      {campaign.audienceType === "all"
                        ? "1,234 subscribers will receive this campaign"
                        : "567 subscribers in this segment"}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {currentStep === "review" && (
            <Card>
              <CardHeader>
                <CardTitle>Review & Schedule</CardTitle>
                <CardDescription>
                  Review your campaign and set up scheduling
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-6'>
                <div className='space-y-4'>
                  <div>
                    <Label>Scheduling</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant='outline'
                          className={cn(
                            "w-full justify-start text-left font-normal mt-1",
                            !campaign.scheduledFor && "text-muted-foreground"
                          )}
                        >
                          <Clock className='mr-2 w-4 h-4' />
                          {campaign.scheduledFor
                            ? campaign.scheduledFor.toLocaleDateString()
                            : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className='p-0 w-auto' align='start'>
                        <Calendar
                          mode='single'
                          selected={campaign.scheduledFor}
                          onSelect={(date) =>
                            setCampaign({ ...campaign, scheduledFor: date })
                          }
                          disabled={(date) =>
                            date < new Date() ||
                            date < new Date(new Date().setHours(0, 0, 0, 0))
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className='space-y-2 p-4 border rounded-lg'>
                    <h4 className='font-medium'>Campaign Summary</h4>
                    <div className='space-y-1 text-sm'>
                      <p>
                        <span className='text-muted-foreground'>Subject:</span>{" "}
                        {campaign.subject}
                      </p>
                      <p>
                        <span className='text-muted-foreground'>Audience:</span>{" "}
                        {campaign.audienceType === "all"
                          ? "All Subscribers"
                          : `Segment: ${campaign.segment}`}
                      </p>
                      <p>
                        <span className='text-muted-foreground'>
                          Scheduled for:
                        </span>{" "}
                        {campaign.scheduledFor
                          ? campaign.scheduledFor.toLocaleDateString()
                          : "Not scheduled"}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Navigation Buttons */}
          <div className='flex justify-between mt-6'>
            <Button
              variant='outline'
              onClick={() => router.back()}
              className='gap-2'
            >
              <ArrowLeft className='w-4 h-4' /> Back
            </Button>
            <div className='flex gap-2'>
              <Button
                variant='outline'
                onClick={handleSaveDraft}
                disabled={isSaving}
              >
                <Save className='mr-2 w-4 h-4' />
                {isSaving ? "Saving..." : "Save Draft"}
              </Button>
              {currentStep === "review" ? (
                <Button
                  onClick={handleSchedule}
                  disabled={isScheduling || !campaign.scheduledFor}
                >
                  <Send className='mr-2 w-4 h-4' />
                  {isScheduling ? "Scheduling..." : "Schedule Campaign"}
                </Button>
              ) : (
                <Button
                  onClick={() =>
                    setCurrentStep(
                      steps[steps.findIndex((s) => s.id === currentStep) + 1].id
                    )
                  }
                >
                  Next <ChevronRight className='ml-2 w-4 h-4' />
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Right Side - Preview */}
        <div className='md:block hidden'>
          <Card className='h-full'>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
              <CardDescription>
                See how your campaign will look to subscribers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className={cn(
                  "border rounded-lg mx-auto transition-all",
                  previewMode === "desktop" ? "w-full" : "w-[375px]"
                )}
              >
                <div className='p-4 border-b'>
                  <div className='font-medium'>
                    {campaign.subject || "Subject"}
                  </div>
                  <div className='text-muted-foreground text-sm'>
                    {campaign.previewText || "Preview text"}
                  </div>
                </div>
                <div className='p-4 max-w-none prose'>
                  {campaign.content || "Email content will appear here..."}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
