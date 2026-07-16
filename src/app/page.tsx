'use client';

import { motion } from 'framer-motion';
import {
  Cpu,
  Thermometer,
  MemoryStick,
  HardDrive,
  Server,
  AlertCircle,
  PlayCircle,
  RefreshCw,
  MoreVertical,
  Search,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';

import { AppLayout } from '@/components/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

const cpuData = [
  { time: '10:00', value: 35 },
  { time: '10:05', value: 42 },
  { time: '10:10', value: 38 },
  { time: '10:15', value: 55 },
  { time: '10:20', value: 48 },
  { time: '10:25', value: 52 },
  { time: '10:30', value: 45 },
];

const networkData = [
  { time: '10:00', download: 45, upload: 12 },
  { time: '10:05', download: 52, upload: 18 },
  { time: '10:10', download: 38, upload: 10 },
  { time: '10:15', download: 68, upload: 25 },
  { time: '10:20', download: 72, upload: 30 },
  { time: '10:25', download: 55, upload: 20 },
  { time: '10:30', download: 60, upload: 22 },
];

const alerts = [
  { id: 1, title: 'Disk Almost Full', severity: 'warning', time: '2 min ago' },
  { id: 2, title: 'High CPU Temperature', severity: 'critical', time: '5 min ago' },
  { id: 3, title: 'Backup Completed', severity: 'success', time: '10 min ago' },
];

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
];

export default function Home() {
  return (
    <AppLayout>
      <div className="p-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Mission Control</h1>
            <p className="text-zinc-500 mt-1">All systems operational</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <Input
                placeholder="Command Center: try 'restart jellyfin'..."
                className="pl-10 bg-zinc-900 border-zinc-800"
              />
            </div>
            <Button variant="default" className="bg-zinc-800 hover:bg-zinc-700">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>

        {/* System Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              label: 'CPU Usage',
              value: '45%',
              icon: Cpu,
              color: 'from-blue-500 to-cyan-500',
              trend: '+2.4%',
            },
            {
              label: 'Temperature',
              value: '68°C',
              icon: Thermometer,
              color: 'from-orange-500 to-red-500',
              trend: '-1.2°C',
            },
            {
              label: 'RAM Usage',
              value: '12.8GB',
              icon: MemoryStick,
              color: 'from-purple-500 to-pink-500',
              trend: '64%',
            },
            {
              label: 'Disk Usage',
              value: '1.2TB',
              icon: HardDrive,
              color: 'from-emerald-500 to-teal-500',
              trend: '72%',
            },
          ].map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="bg-zinc-900/50 border-zinc-800/50 backdrop-blur-xl">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-zinc-500">{stat.label}</p>
                        <h3 className="text-3xl font-bold mt-2">{stat.value}</h3>
                        <p className="text-sm text-emerald-500 mt-1">{stat.trend}</p>
                      </div>
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="bg-zinc-900/50 border-zinc-800/50 backdrop-blur-xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>CPU Utilization</CardTitle>
                    <CardDescription>Last 30 minutes</CardDescription>
                  </div>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={cpuData}>
                      <defs>
                        <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                      <XAxis dataKey="time" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                      <Tooltip
                        contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px' }}
                      />
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#3b82f6"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#colorCpu)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="bg-zinc-900/50 border-zinc-800/50 backdrop-blur-xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Network Traffic</CardTitle>
                    <CardDescription>Download & Upload</CardDescription>
                  </div>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={networkData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                      <XAxis dataKey="time" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                      <Tooltip
                        contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px' }}
                      />
                      <Line type="monotone" dataKey="download" stroke="#8b5cf6" strokeWidth={3} dot={false} />
                      <Line type="monotone" dataKey="upload" stroke="#10b981" strokeWidth={3} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Alerts & Containers Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="bg-zinc-900/50 border-zinc-800/50 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  Alerts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {alerts.map((alert) => (
                  <div key={alert.id} className="flex items-start gap-3 p-3 rounded-lg bg-zinc-800/50">
                    <div
                      className={`w-2 h-2 rounded-full mt-2 ${
                        alert.severity === 'critical'
                          ? 'bg-red-500'
                          : alert.severity === 'warning'
                          ? 'bg-yellow-500'
                          : 'bg-emerald-500'
                      }`}
                    />
                    <div className="flex-1">
                      <p className="font-medium">{alert.title}</p>
                      <p className="text-xs text-zinc-500 mt-1">{alert.time}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="lg:col-span-2"
          >
            <Card className="bg-zinc-900/50 border-zinc-800/50 backdrop-blur-xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Containers</CardTitle>
                    <CardDescription>{containers.length} running</CardDescription>
                  </div>
                  <Button variant="default" className="bg-zinc-800 hover:bg-zinc-700">
                    <PlayCircle className="w-4 h-4 mr-2" />
                    New Container
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {containers.map((container) => (
                    <div key={container.id} className="flex items-center justify-between p-4 rounded-xl bg-zinc-800/50">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-zinc-700">
                          <Server className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-medium">{container.name}</h4>
                          <p className="text-xs text-zinc-500">{container.image}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
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
                        <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">
                          {container.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </AppLayout>
  );
}
