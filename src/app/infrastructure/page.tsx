'use client';

import { motion } from 'framer-motion';
import {
  Server,
  Cpu,
  MemoryStick,
  HardDrive,
  Play,
  Square,
  RotateCcw,
  MoreVertical,
  Plus,
} from 'lucide-react';

import { AppLayout } from '@/components/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const vms = [
  {
    id: 1,
    name: 'proxmox-server-01',
    status: 'running',
    cpu: '35%',
    ram: '8.2GB',
    storage: '40GB',
    os: 'Debian 12',
  },
  {
    id: 2,
    name: 'docker-host-01',
    status: 'running',
    cpu: '58%',
    ram: '16GB',
    storage: '120GB',
    os: 'Ubuntu 22.04',
  },
  {
    id: 3,
    name: 'home-assistant-vm',
    status: 'stopped',
    cpu: '0%',
    ram: '4GB',
    storage: '32GB',
    os: 'Home Assistant OS',
  },
];

export default function Infrastructure() {
  return (
    <AppLayout>
      <div className="p-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Infrastructure</h1>
            <p className="text-zinc-500 mt-1">Manage your virtual machines and servers</p>
          </div>
          <Button variant="default" className="bg-zinc-800 hover:bg-zinc-700">
            <Plus className="w-4 h-4 mr-2" />
            New VM
          </Button>
        </div>

        {/* VMs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {vms.map((vm, idx) => (
            <motion.div
              key={vm.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="bg-zinc-900/50 border-zinc-800/50 backdrop-blur-xl">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>{vm.name}</CardTitle>
                      <CardDescription>{vm.os}</CardDescription>
                    </div>
                    <Badge
                      className={
                        vm.status === 'running'
                          ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                          : 'bg-zinc-800 text-zinc-500 border-zinc-700/50'
                      }
                    >
                      {vm.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-3 rounded-lg bg-zinc-800/50">
                      <Cpu className="w-6 h-6 text-blue-500 mx-auto mb-1" />
                      <p className="text-lg font-bold">{vm.cpu}</p>
                      <p className="text-xs text-zinc-500">CPU</p>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-zinc-800/50">
                      <MemoryStick className="w-6 h-6 text-purple-500 mx-auto mb-1" />
                      <p className="text-lg font-bold">{vm.ram}</p>
                      <p className="text-xs text-zinc-500">RAM</p>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-zinc-800/50">
                      <HardDrive className="w-6 h-6 text-emerald-500 mx-auto mb-1" />
                      <p className="text-lg font-bold">{vm.storage}</p>
                      <p className="text-xs text-zinc-500">Storage</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button
                      variant="default"
                      className="flex-1 bg-zinc-800 hover:bg-zinc-700"
                      disabled={vm.status === 'running'}
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Start
                    </Button>
                    <Button
                      variant="default"
                      className="flex-1 bg-zinc-800 hover:bg-zinc-700"
                      disabled={vm.status === 'stopped'}
                    >
                      <Square className="w-4 h-4 mr-2" />
                      Stop
                    </Button>
                    <Button variant="default" className="bg-zinc-800 hover:bg-zinc-700">
                      <RotateCcw className="w-4 h-4 mr-2" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
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
