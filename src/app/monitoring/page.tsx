'use client';

import { motion } from 'framer-motion';
import {
  Activity,
  Server,
  Database,
  Wifi,
  AlertTriangle,
  CheckCircle2,
  Clock,
  RefreshCw,
  Filter,
} from 'lucide-react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

import { AppLayout } from '@/components/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const CPUData = [
  { time: '00:00', value: 35, load: 1.2 },
  { time: '04:00', value: 28, load: 0.9 },
  { time: '08:00', value: 45, load: 1.8 },
  { time: '12:00', value: 72, load: 2.5 },
  { time: '16:00', value: 58, load: 2.1 },
  { time: '20:00', value: 42, load: 1.5 },
  { time: '23:59', value: 38, load: 1.3 },
];

const memoryData = [
  { time: '00:00', used: 8.2, cached: 3.1, free: 2.7 },
  { time: '04:00', used: 6.8, cached: 4.2, free: 3.0 },
  { time: '08:00', used: 9.5, cached: 3.5, free: 1.0 },
  { time: '12:00', used: 12.2, cached: 2.8, free: 0.2 },
  { time: '16:00', used: 10.8, cached: 3.2, free: 0.4 },
  { time: '20:00', used: 8.9, cached: 3.8, free: 0.7 },
  { time: '23:59', used: 8.5, cached: 3.4, free: 2.1 },
];

const networkData = [
  { name: 'eth0', download: 850, upload: 120 },
  { name: 'wlan0', download: 420, upload: 85 },
  { name: 'docker0', download: 1200, upload: 350 },
];

const diskData = [
  { mount: '/', used: 180, total: 250 },
  { mount: '/data', used: 1200, total: 2000 },
  { mount: '/backup', used: 850, total: 1500 },
];

const services = [
  { name: 'Docker', status: 'healthy', uptime: '14d 2h 35m', cpu: '2.4%', memory: '1.2GB' },
  { name: 'Prometheus', status: 'healthy', uptime: '14d 2h 35m', cpu: '0.8%', memory: '256MB' },
  { name: 'Grafana', status: 'healthy', uptime: '14d 2h 35m', cpu: '0.5%', memory: '128MB' },
  { name: 'PostgreSQL', status: 'warning', uptime: '14d 2h 35m', cpu: '5.2%', memory: '384MB' },
  { name: 'Pi-hole', status: 'healthy', uptime: '14d 2h 35m', cpu: '0.3%', memory: '64MB' },
];

const alertHistory = [
  { id: 1, message: 'High CPU temperature detected (78°C)', severity: 'warning', time: '10:23 AM' },
  { id: 2, message: 'Disk usage on /data is above 80%', severity: 'critical', time: '09:45 AM' },
  { id: 3, message: 'Docker service restarted', severity: 'info', time: '08:12 AM' },
  { id: 4, message: 'Network latency increased', severity: 'warning', time: '07:30 AM' },
  { id: 5, message: 'Backup completed successfully', severity: 'success', time: '03:00 AM' },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function Monitoring() {
  return (
    <AppLayout>
      <div className="p-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Monitoring</h1>
            <p className="text-zinc-500 mt-1">Advanced monitoring and metrics</p>
          </div>
          <div className="flex items-center gap-4">
            <Select defaultValue="1h">
              <SelectTrigger className="w-32 bg-zinc-900 border-zinc-800">
                <SelectValue placeholder="Time Range" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border-zinc-800">
                <SelectItem value="1h">Last Hour</SelectItem>
                <SelectItem value="6h">Last 6 Hours</SelectItem>
                <SelectItem value="1d">Last Day</SelectItem>
                <SelectItem value="7d">Last 7 Days</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="default" className="bg-zinc-800 hover:bg-zinc-700">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              label: 'CPU Load',
              value: '1.85',
              icon: Activity,
              color: 'from-blue-500 to-cyan-500',
              trend: '↓ 12%',
            },
            {
              label: 'Memory Usage',
              value: '9.2 GB',
              icon: Database,
              color: 'from-purple-500 to-pink-500',
              trend: '68%',
            },
            {
              label: 'Network Throughput',
              value: '2.4 Gbps',
              icon: Wifi,
              color: 'from-green-500 to-emerald-500',
              trend: '↑ 8%',
            },
            {
              label: 'Active Alerts',
              value: '3',
              icon: AlertTriangle,
              color: 'from-orange-500 to-red-500',
              trend: '1 critical',
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

        <Tabs defaultValue="system" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-zinc-900/50 border border-zinc-800">
            <TabsTrigger value="system">System</TabsTrigger>
            <TabsTrigger value="network">Network</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
          </TabsList>

          <TabsContent value="system" className="mt-6 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="bg-zinc-900/50 border-zinc-800/50 backdrop-blur-xl">
                  <CardHeader>
                    <CardTitle>CPU & Load</CardTitle>
                    <CardDescription>CPU usage and system load over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={CPUData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                          <XAxis dataKey="time" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                          <YAxis stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                          <Tooltip
                            contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px' }}
                          />
                          <Line type="monotone" dataKey="value" stroke="#0088FE" strokeWidth={3} dot={false} />
                          <Line type="monotone" dataKey="load" stroke="#00C49F" strokeWidth={3} dot={false} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="bg-zinc-900/50 border-zinc-800/50 backdrop-blur-xl">
                  <CardHeader>
                    <CardTitle>Memory</CardTitle>
                    <CardDescription>Used, cached, and free memory</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={memoryData}>
                          <defs>
                            <linearGradient id="colorUsed" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                              <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
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
                            dataKey="used"
                            stroke="#8b5cf6"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorUsed)"
                          />
                          <Area type="monotone" dataKey="cached" stroke="#f59e0b" strokeWidth={2} fill="transparent" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="bg-zinc-900/50 border-zinc-800/50 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle>Disk Usage</CardTitle>
                  <CardDescription>Usage per mount point</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={diskData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                        <XAxis dataKey="mount" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                        <Tooltip
                          contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px' }}
                        />
                        <Bar dataKey="used" fill="#00C49F" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="network" className="mt-6 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="bg-zinc-900/50 border-zinc-800/50 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle>Network Interfaces</CardTitle>
                  <CardDescription>Traffic across interfaces</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={networkData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={(props) =>
                            `${props.payload.name}: ${props.payload.download}MB/s`
                          }
                          outerRadius={120}
                          fill="#8884d8"
                          dataKey="download"
                        >
                          {networkData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px' }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="services" className="mt-6 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="bg-zinc-900/50 border-zinc-800/50 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle>Services Status</CardTitle>
                  <CardDescription>Health and resource usage of services</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {services.map((service, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 rounded-xl bg-zinc-800/50">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-zinc-700">
                            <Server className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="font-medium">{service.name}</h4>
                            <p className="text-xs text-zinc-500 flex items-center gap-2">
                              <Clock className="w-3 h-3" />
                              Uptime: {service.uptime}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="text-right">
                            <p className="text-sm font-medium">{service.cpu}</p>
                            <p className="text-xs text-zinc-500">CPU</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium">{service.memory}</p>
                            <p className="text-xs text-zinc-500">Memory</p>
                          </div>
                          <Badge
                            className={
                              service.status === 'healthy'
                                ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                                : 'bg-orange-500/10 text-orange-500 border-orange-500/20'
                            }
                          >
                            {service.status === 'healthy' ? (
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                            ) : (
                              <AlertTriangle className="w-3 h-3 mr-1" />
                            )}
                            {service.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="alerts" className="mt-6 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="bg-zinc-900/50 border-zinc-800/50 backdrop-blur-xl">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Alert History</CardTitle>
                    <CardDescription>Recent alerts and notifications</CardDescription>
                  </div>
                  <Button variant="default" className="bg-zinc-800 hover:bg-zinc-700">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {alertHistory.map((alert) => (
                      <div key={alert.id} className="flex items-start gap-3 p-4 rounded-xl bg-zinc-800/50">
                        <div
                          className={`mt-1 w-2 h-2 rounded-full ${
                            alert.severity === 'critical'
                              ? 'bg-red-500'
                              : alert.severity === 'warning'
                                ? 'bg-yellow-500'
                                : alert.severity === 'success'
                                  ? 'bg-emerald-500'
                                  : 'bg-blue-500'
                          }`}
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="font-medium">{alert.message}</p>
                            <Badge
                              className={
                                alert.severity === 'critical'
                                  ? 'bg-red-500/10 text-red-500 border-red-500/20'
                                  : alert.severity === 'warning'
                                    ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
                                    : alert.severity === 'success'
                                      ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                                      : 'bg-blue-500/10 text-blue-500 border-blue-500/20'
                              }
                            >
                              {alert.severity}
                            </Badge>
                          </div>
                          <p className="text-xs text-zinc-500 mt-1">{alert.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
