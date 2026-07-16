'use client';

import { AppLayout } from '@/components/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Terminal() {
  return (
    <AppLayout>
      <div className="p-8 space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Terminal</h1>
          <p className="text-zinc-500 mt-1">Web-based terminal</p>
        </div>
        <Card className="bg-zinc-900/50 border-zinc-800/50 backdrop-blur-xl">
          <CardHeader>
            <CardTitle>Terminal</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-zinc-500">Terminal interface coming soon...</p>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
