'use client';

import { motion } from 'framer-motion';
import {
  HardDrive,
  Database,
  Activity,
  MoreVertical,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

import { AppLayout } from '@/components/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const storageData = [
  { name: 'Media', used: 1200, total: 2000 },
  { name: 'Backups', used: 800, total: 1500 },
  { name: 'Documents', used: 150, total: 500 },
  { name: 'Docker', used: 300, total: 500 },
];

const drives = [
  {
    id: 1,
    name: 'nvme0n1',
    health: 'Good',
    temperature: '42°C',
    used: '1.8TB',
    total: '2TB',
  },
  {
    id: 2,
    name: 'sda',
    health: 'Good',
    temperature: '38°C',
    used: '1.5TB',
    total: '4TB',
  },
  {
    id: 3,
    name: 'sdb',
    health: 'Warning',
    temperature: '45°C',
    used: '1TB',
    total: '2TB',
  },
];

export default function Storage() {
  return (
    <AppLayout>
      <div className="p-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Storage</h1>
            <p className="text-zinc-500 mt-1">Manage your storage pools and drives</p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="default" className="bg-zinc-800 hover:bg-zinc-700">
              <Database className="w-4 h-4 mr-2" />
              New Pool
            </Button>
          </div>
        </div>

        {/* Storage Overview Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="bg-zinc-900/50 border-zinc-800/50 backdrop-blur-xl">
            <CardHeader>
              <CardTitle>Storage Usage</CardTitle>
              <CardDescription>Used space per storage pool</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={storageData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                    <XAxis dataKey="name" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px' }}
                    />
                    <Bar dataKey="used" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Drives List */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {drives.map((drive, idx) => (
            <motion.div
              key={drive.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="bg-zinc-900/50 border-zinc-800/50 backdrop-blur-xl">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <HardDrive className="w-5 h-5" />
                      {drive.name}
                    </CardTitle>
                    <Badge
                      className={
                        drive.health === 'Good'
                          ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                          : 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
                      }
                    >
                      {drive.health}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-zinc-500">Temperature</p>
                      <p className="text-lg font-bold">{drive.temperature}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-zinc-500">Usage</p>
                      <p className="text-lg font-bold">{drive.used} / {drive.total}</p>
                    </div>
                  </div>
                  <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500" style={{ width: '75%' }} />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
