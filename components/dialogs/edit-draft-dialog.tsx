// components/dialogs/edit-draft-dialog.tsx
"use client";

import React from "react";
import { ImagePlus, Link2, AtSign, Hash } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

interface EditDraftDialogProps {
  open: boolean;
  onClose: () => void;
  draft: {
    id: string;
    title: string;
    content: string;
    type: "post" | "thread";
  };
  onSave: (draftData: { title: string; content: string }) => void;
}

export default function EditDraftDialog({
  open,
  onClose,
  draft,
  onSave,
}: EditDraftDialogProps) {
  const [title, setTitle] = React.useState(draft.title);
  const [content, setContent] = React.useState(draft.content);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className='p-0 max-w-3xl h-[80vh]'>
        <DialogHeader className='px-6 py-4'>
          <DialogTitle>Edit Draft</DialogTitle>
        </DialogHeader>

        <div className='flex flex-col gap-4 px-6 pb-6 h-[calc(80vh-70px)] overflow-hidden'>
          <Input
            placeholder='Draft title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='focus-visible:ring-1 focus-visible:ring-ring'
          />

          <div className='flex items-center gap-2'>
            <Button variant='ghost' size='icon' className='hover:bg-accent'>
              <ImagePlus className='w-4 h-4' />
            </Button>
            <Button variant='ghost' size='icon' className='hover:bg-accent'>
              <Link2 className='w-4 h-4' />
            </Button>
            <Button variant='ghost' size='icon' className='hover:bg-accent'>
              <AtSign className='w-4 h-4' />
            </Button>
            <Button variant='ghost' size='icon' className='hover:bg-accent'>
              <Hash className='w-4 h-4' />
            </Button>
          </div>

          <Separator />

          <div className='flex-1 min-h-0'>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className='focus-visible:ring-1 focus-visible:ring-ring h-full resize-none'
              placeholder='Start writing your draft...'
            />
          </div>

          <div className='flex justify-end gap-2 pt-2'>
            <Button variant='outline' onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={() => onSave({ title, content })}>
              Save Draft
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
