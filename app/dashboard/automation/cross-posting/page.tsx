"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Page() {
  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Page Title</CardTitle>
          <CardDescription>Page description goes here</CardDescription>
        </CardHeader>
        <CardContent>
          Content goes here
        </CardContent>
      </Card>
    </div>
  );
}
