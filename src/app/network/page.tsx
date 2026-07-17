'use client';

import { motion } from 'framer-motion';
import {
  Wifi,
  Globe,
  Server,
  Activity,
  ShieldCheck,
  RefreshCw,
  Plus,
  Search,
  MoreVertical,
  ArrowUpRight,
  ArrowDownRight,
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
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const networkTrafficData = [
  { time: '10:00', download: 85, upload: 22 },
  { time: '10:05', download: 92, upload: 28 },
  { time: '10:10', download: 78, upload: 18 },
  { time: '10:15', download: 120, upload: 35 },
  { time: '10:20', download: 132, upload: 40 },
  { time: '10:25', download: 105, upload: 30 },
  { time: '10:30', download: 110, upload: 32 },
];

const devices = [
  { id: 1, name: 'Proxmox Server', ip: '192.168.1.100', status: 'connected', type: 'server', bandwidth: '1Gbps' },
  { id: 2, name: 'NAS', ip: '192.168.1.101', status: 'connected', type: 'server', bandwidth: '1Gbps' },
  { id: 3, name: 'Laptop', ip: '192.168.1.150', status: 'connected', type: 'device', bandwidth: '500Mbps' },
  { id: 4, name: 'Phone', ip: '192.168.1.200', status: 'connected', type: 'device', bandwidth: '300Mbps' },
  { id: 5, name: 'Smart TV', ip: '192.168.1.180', status: 'disconnected', type: 'device', bandwidth: '0Mbps' },
];

const interfaces = [
  { id: 1, name: 'eth0', type: 'Ethernet', status: 'up', ip: '192.168.1.100', mac: '00:1A:2B:3C:4D:5E', rx: '2.4TB', tx: '1.2TB' },
  { id: 2, name: 'docker0', type: 'Bridge', status: 'up', ip: '172.17.0.1', mac: '02:42:AC:11:00:01', rx: '800GB', tx: '650GB' },
  { id: 3, name: 'wg0', type: 'WireGuard', status: 'up', ip: '10.0.0.1', mac: 'N/A', rx: '150GB', tx: '120GB' },
];

export default function Network() {
  return (
    <AppLayout>
      <div className="p-8 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Network</h1>
            <p className="text-zinc-500 mt-1">Monitor your network traffic and devices</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <Input
                placeholder="Search devices..."
                className="pl-10 bg-zinc-900 border-zinc-800"
              />
            </div>
            <Button variant="default" className="bg-zinc-800 hover:bg-zinc-700">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              label: 'Download Speed',
              value: '124 Mbps',
              icon: ArrowDownRight,
              color: 'from-blue-500 to-cyan-500',
              trend: '+8%',
            },
            {
              label: 'Upload Speed',
              value: '32 Mbps',
              icon: ArrowUpRight,
              color: 'from-purple-500 to-pink-500',
              trend: '+3%',
            },
            {
              label: 'Connected Devices',
              value: '4',
              icon: Wifi,
              color: 'from-emerald-500 to-teal-500',
              trend: 'Total: 5',
            },
            {
              label: 'Active Interfaces',
              value: '3',
              icon: Server,
              color: 'from-orange-500 to-red-500',
              trend: 'All up',
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

        <Tabs defaultValue="traffic" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-zinc-900/50 border border-zinc-800">
            <TabsTrigger value="traffic">Traffic</TabsTrigger>
            <TabsTrigger value="devices">Devices</TabsTrigger>
            <TabsTrigger value="interfaces">Interfaces</TabsTrigger>
          </TabsList>

          <TabsContent value="traffic" className="mt-6 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="bg-zinc-900/50 border-zinc-800/50 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle>Network Traffic</CardTitle>
                  <CardDescription>Download and upload over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={networkTrafficData}>
                        <defs>
                          <linearGradient id="colorDownload" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                          </linearGradient>
                          <linearGradient id="colorUpload" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
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
                          dataKey="download"
                          stroke="#3b82f6"
                          strokeWidth={3}
                          fillOpacity={1}
                          fill="url(#colorDownload)"
                        />
                        <Area
                          type="monotone"
                          dataKey="upload"
                          stroke="#10b981"
                          strokeWidth={3}
                          fillOpacity={1}
                          fill="url(#colorUpload)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="devices" className="mt-6 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="bg-zinc-900/50 border-zinc-800/50 backdrop-blur-xl">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Connected Devices</CardTitle>
                    <CardDescription>Devices on your network</CardDescription>
                  </div>
                  <Button variant="default" className="bg-zinc-800 hover:bg-zinc-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Device
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {devices.map((device, idx) => (
                      <div key={device.id} className="flex items-center justify-between p-4 rounded-xl bg-zinc-800/50">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-zinc-700">
                            {device.type === 'server' ? <Server className="w-5 h-5" /> : <Wifi className="w-5 h-5" />}
                          </div>
                          <div>
                            <h4 className="font-medium">{device.name}</h4>
                            <p className="text-xs text-zinc-500">{device.ip}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="text-right">
                            <p className="text-sm font-medium">{device.bandwidth}</p>
                            <p className="text-xs text-zinc-500">Bandwidth</p>
                          </div>
                          <Badge
                            className={
                              device.status === 'connected'
                                ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                                : 'bg-zinc-800 text-zinc-500 border-zinc-700/50'
                            }
                          >
                            {device.status}
                          </Badge>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="interfaces" className="mt-6 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {interfaces.map((iface, idx) => (
                <motion.div
                  key={iface.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Card className="bg-zinc-900/50 border-zinc-800/50 backdrop-blur-xl">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle>{iface.name}</CardTitle>
                          <CardDescription>{iface.type}</CardDescription>
                        </div>
                        <Badge
                          className={
                            iface.status === 'up'
                              ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                              : 'bg-zinc-800 text-zinc-500 border-zinc-700/50'
                          }
                        >
                          {iface.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-zinc-500">IP Address</p>
                          <p className="text-sm font-medium">{iface.ip}</p>
                        </div>
                        <div>
                          <p className="text-sm text-zinc-500">MAC Address</p>
                          <p className="text-sm font-medium">{iface.mac}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-zinc-500">RX</p>
                          <p className="text-sm font-medium">{iface.rx}</p>
                        </div>
                        <div>
                          <p className="text-sm text-zinc-500">TX</p>
                          <p className="text-sm font-medium">{iface.tx}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
