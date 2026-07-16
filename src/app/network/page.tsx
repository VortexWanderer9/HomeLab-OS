'use client';

import { AppLayout } from '@/components/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Network() {
  return (
    <AppLayout>
      <div className="p-8 space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Network</h1>
          <p className="text-zinc-500 mt-1">Monitor your network traffic and devices</p>
        </div>
        <Card className="bg-zinc-900/50 border-zinc-800/50 backdrop-blur-xl">
          <CardHeader>
            <CardTitle>Network Dashboard</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-zinc-500">Network monitoring interface coming soon...</p>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
