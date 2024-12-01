// app/dashboard/content/manage/layout.tsx
"use client";

import { ReactNode } from "react";

export default function ContentManageLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className='flex flex-col'>
      {/* Simple wrapper for consistent padding and spacing */}
      <div className='flex-1'>{children}</div>
    </div>
  );
}
