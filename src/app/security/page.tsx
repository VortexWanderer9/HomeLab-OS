'use client';

import { AppLayout } from '@/components/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Security() {
  return (
    <AppLayout>
      <div className="p-8 space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Security</h1>
          <p className="text-zinc-500 mt-1">Security settings and logs</p>
        </div>
        <Card className="bg-zinc-900/50 border-zinc-800/50 backdrop-blur-xl">
          <CardHeader>
            <CardTitle>Security Dashboard</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-zinc-500">Security interface coming soon...</p>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
