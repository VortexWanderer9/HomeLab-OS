'use client';

import { motion } from 'framer-motion';
import {
  Server,
  Play,
  Square,
  RotateCcw,
  Terminal,
  HardDrive,
  Activity,
  MoreVertical,
  Plus,
} from 'lucide-react';

import { AppLayout } from '@/components/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const containers = [
  {
    id: 1,
    name: 'jellyfin',
    status: 'running',
    cpu: '12%',
    ram: '4.2GB',
    ports: '8096, 8920',
    image: 'jellyfin/jellyfin:latest',
  },
  {
    id: 2,
    name: 'pi-hole',
    status: 'running',
    cpu: '3%',
    ram: '256MB',
    ports: '53, 80',
    image: 'pihole/pihole:latest',
  },
  {
    id: 3,
    name: 'homeassistant',
    status: 'running',
    cpu: '8%',
    ram: '1.8GB',
    ports: '8123',
    image: 'homeassistant/home-assistant:latest',
  },
  {
    id: 4,
    name: 'grafana',
    status: 'running',
    cpu: '5%',
    ram: '512MB',
    ports: '3000',
    image: 'grafana/grafana:latest',
  },
  {
    id: 5,
    name: 'prometheus',
    status: 'stopped',
    cpu: '0%',
    ram: '0MB',
    ports: '9090',
    image: 'prom/prometheus:latest',
  },
];

export default function Containers() {
  return (
    <AppLayout>
      <div className="p-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Containers</h1>
            <p className="text-zinc-500 mt-1">Manage your Docker containers</p>
          </div>
          <Button variant="default" className="bg-zinc-800 hover:bg-zinc-700">
            <Plus className="w-4 h-4 mr-2" />
            New Container
          </Button>
        </div>

        {/* Containers List */}
        <div className="space-y-4">
          {containers.map((container, idx) => (
            <motion.div
              key={container.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="bg-zinc-900/50 border-zinc-800/50 backdrop-blur-xl">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-zinc-800">
                        <Server className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="flex items-center gap-3">
                          <h4 className="font-bold text-lg">{container.name}</h4>
                          <Badge
                            className={
                              container.status === 'running'
                                ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                                : 'bg-zinc-800 text-zinc-500 border-zinc-700/50'
                            }
                          >
                            {container.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-zinc-500">{container.image}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-8">
                      <div className="text-right">
                        <p className="text-sm font-medium">{container.cpu}</p>
                        <p className="text-xs text-zinc-500">CPU</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{container.ram}</p>
                        <p className="text-xs text-zinc-500">RAM</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{container.ports}</p>
                        <p className="text-xs text-zinc-500">Ports</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="default" className="bg-zinc-800 hover:bg-zinc-700">
                          <Activity className="w-4 h-4 mr-2" />
                          Stats
                        </Button>
                        <Button variant="default" className="bg-zinc-800 hover:bg-zinc-700">
                          <Terminal className="w-4 h-4 mr-2" />
                          Logs
                        </Button>
                        <Button
                          variant="default"
                          className="bg-zinc-800 hover:bg-zinc-700"
                          disabled={container.status === 'running'}
                        >
                          <Play className="w-4 h-4 mr-2" />
                        </Button>
                        <Button
                          variant="default"
                          className="bg-zinc-800 hover:bg-zinc-700"
                          disabled={container.status === 'stopped'}
                        >
                          <Square className="w-4 h-4 mr-2" />
                        </Button>
                        <Button
                          variant="default"
                          className="bg-zinc-800 hover:bg-zinc-700"
                        >
                          <RotateCcw className="w-4 h-4 mr-2" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
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
