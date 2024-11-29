// app/components/dialogs/schedule-dialog.tsx

"use client";

import React from "react";
import { Clock, Globe, ArrowRightToLine } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ScheduleDialogProps {
  open: boolean;
  onClose: () => void;
  onSchedule: (scheduleData: ScheduleData) => void;
}

interface ScheduleData {
  date: Date;
  time: string;
  timezone: string;
  frequency?: "once" | "daily" | "weekly";
}

export default function ScheduleDialog({
  open,
  onClose,
  onSchedule,
}: ScheduleDialogProps) {
  const [date, setDate] = React.useState<Date>(new Date());
  const [time, setTime] = React.useState("09:00");
  const [frequency, setFrequency] = React.useState<"once" | "daily" | "weekly">(
    "once"
  );

  // Generate time options in 15-minute intervals
  const timeOptions = React.useMemo(() => {
    const options = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const formattedHour = hour.toString().padStart(2, "0");
        const formattedMinute = minute.toString().padStart(2, "0");
        options.push(`${formattedHour}:${formattedMinute}`);
      }
    }
    return options;
  }, []);

  // Format date for display
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className='max-w-xl'>
        <DialogHeader>
          <DialogTitle>Schedule Post</DialogTitle>
          <DialogDescription>
            Choose when you want your post to be published
          </DialogDescription>
        </DialogHeader>

        <div className='gap-6 grid py-4'>
          {/* Date and Time Selection */}
          <div className='gap-4 grid lg:grid-cols-2'>
            <div>
              <label className='block mb-2 font-medium text-sm'>Date</label>
              <Calendar
                mode='single'
                selected={date}
                onSelect={(date) => date && setDate(date)}
                initialFocus
                className='border rounded-md'
              />
            </div>

            <div className='space-y-4'>
              <div>
                <label className='block mb-2 font-medium text-sm'>Time</label>
                <Select value={time} onValueChange={setTime}>
                  <SelectTrigger>
                    <SelectValue placeholder='Select time' />
                  </SelectTrigger>
                  <SelectContent>
                    {timeOptions.map((timeOption) => (
                      <SelectItem key={timeOption} value={timeOption}>
                        {timeOption}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className='block mb-2 font-medium text-sm'>
                  Frequency
                </label>
                <Select
                  value={frequency}
                  onValueChange={(value: "once" | "daily" | "weekly") =>
                    setFrequency(value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder='Select frequency' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='once'>Once</SelectItem>
                    <SelectItem value='daily'>Daily</SelectItem>
                    <SelectItem value='weekly'>Weekly</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className='block mb-2 font-medium text-sm'>
                  Timezone
                </label>
                <Select defaultValue='UTC'>
                  <SelectTrigger>
                    <SelectValue placeholder='Select timezone' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='UTC'>UTC</SelectItem>
                    <SelectItem value='local'>Local Time</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Schedule Summary Card */}
          <Card>
            <CardContent className='p-4'>
              <h3 className='mb-2 font-medium'>Schedule Summary</h3>
              <div className='space-y-2 text-sm'>
                <div className='flex items-center gap-2'>
                  <Clock className='w-4 h-4 text-muted-foreground' />
                  <span>
                    First post: {formatDate(date)} at {time}
                  </span>
                </div>
                {frequency !== "once" && (
                  <div className='flex items-center gap-2'>
                    <ArrowRightToLine className='w-4 h-4 text-muted-foreground' />
                    <span>Repeats {frequency}</span>
                  </div>
                )}
                <div className='flex items-center gap-2'>
                  <Globe className='w-4 h-4 text-muted-foreground' />
                  <span>UTC timezone</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className='flex justify-end gap-2'>
            <Button variant='outline' onClick={onClose}>
              Cancel
            </Button>
            <Button
              onClick={() =>
                onSchedule({ date, time, timezone: "UTC", frequency })
              }
            >
              Schedule Post
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
