'use client';

import { motion } from 'framer-motion';
import {
  ShieldCheck,
  Lock,
  AlertTriangle,
  CheckCircle2,
  RefreshCw,
  Search,
  MoreVertical,
  ShieldAlert,
  Eye,
  User,
  Key,
} from 'lucide-react';
import {
  LineChart,
  Line,
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
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const securityEventsData = [
  { time: '10:00', count: 2 },
  { time: '10:05', count: 1 },
  { time: '10:10', count: 0 },
  { time: '10:15', count: 5 },
  { time: '10:20', count: 3 },
  { time: '10:25', count: 1 },
  { time: '10:30', count: 2 },
];

const securityEvents = [
  { id: 1, message: 'Failed SSH login attempt from 192.168.1.150', severity: 'warning', time: '2 min ago' },
  { id: 2, message: 'Unauthorized access attempt to /admin', severity: 'critical', time: '5 min ago' },
  { id: 3, message: 'Firewall rule updated', severity: 'info', time: '10 min ago' },
  { id: 4, message: 'User logged in successfully', severity: 'success', time: '15 min ago' },
  { id: 5, message: 'SSL certificate renewed', severity: 'success', time: '1 hour ago' },
];

const activeUsers = [
  { id: 1, name: 'Admin', email: 'admin@homelab.local', role: 'Administrator', status: 'online', lastActive: 'Now' },
  { id: 2, name: 'User', email: 'user@homelab.local', role: 'User', status: 'online', lastActive: '5 min ago' },
  { id: 3, name: 'Guest', email: 'guest@homelab.local', role: 'Guest', status: 'offline', lastActive: '2 days ago' },
];

export default function Security() {
  return (
    <AppLayout>
      <div className="p-8 space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Security</h1>
            <p className="text-zinc-500 mt-1">Security settings and logs</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <Input
                placeholder="Search security events..."
                className="pl-10 bg-zinc-900 border-zinc-800"
              />
            </div>
            <Button variant="default" className="bg-zinc-800 hover:bg-zinc-700">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>
        </motion.div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              label: 'Active Threats',
              value: '1',
              icon: ShieldAlert,
              color: 'from-orange-500 to-red-500',
              trend: 'Warning',
            },
            {
              label: 'Blocked Attacks',
              value: '24',
              icon: ShieldCheck,
              color: 'from-emerald-500 to-teal-500',
              trend: 'Last 24h',
            },
            {
              label: 'Active Users',
              value: '2',
              icon: User,
              color: 'from-blue-500 to-cyan-500',
              trend: 'Online',
            },
            {
              label: 'Firewall Rules',
              value: '42',
              icon: Lock,
              color: 'from-purple-500 to-pink-500',
              trend: 'Active',
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

        <Tabs defaultValue="events" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-zinc-900/50 border border-zinc-800">
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="events" className="mt-6 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="bg-zinc-900/50 border-zinc-800/50 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle>Security Events Over Time</CardTitle>
                  <CardDescription>Number of security events</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={securityEventsData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                        <XAxis dataKey="time" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                        <Tooltip
                          contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px' }}
                        />
                        <Line type="monotone" dataKey="count" stroke="#ef4444" strokeWidth={3} dot={false} />
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
                  <CardTitle>Recent Security Events</CardTitle>
                  <CardDescription>Latest security alerts</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {securityEvents.map((event) => (
                      <div key={event.id} className="flex items-start gap-3 p-4 rounded-xl bg-zinc-800/50">
                        <div
                          className={`mt-1 w-2 h-2 rounded-full ${
                            event.severity === 'critical'
                              ? 'bg-red-500'
                              : event.severity === 'warning'
                                ? 'bg-yellow-500'
                                : event.severity === 'success'
                                  ? 'bg-emerald-500'
                                  : 'bg-blue-500'
                          }`}
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="font-medium">{event.message}</p>
                            <Badge
                              className={
                                event.severity === 'critical'
                                  ? 'bg-red-500/10 text-red-500 border-red-500/20'
                                  : event.severity === 'warning'
                                    ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
                                    : event.severity === 'success'
                                      ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                                      : 'bg-blue-500/10 text-blue-500 border-blue-500/20'
                              }
                            >
                              {event.severity}
                            </Badge>
                          </div>
                          <p className="text-xs text-zinc-500 mt-1">{event.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="users" className="mt-6 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="bg-zinc-900/50 border-zinc-800/50 backdrop-blur-xl">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Active Users</CardTitle>
                    <CardDescription>Users with access</CardDescription>
                  </div>
                  <Button variant="default" className="bg-zinc-800 hover:bg-zinc-700">
                    <User className="w-4 h-4 mr-2" />
                    Add User
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {activeUsers.map((user, idx) => (
                      <div key={user.id} className="flex items-center justify-between p-4 rounded-xl bg-zinc-800/50">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-zinc-700">
                            <User className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="font-medium">{user.name}</h4>
                            <p className="text-xs text-zinc-500">{user.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="text-right">
                            <p className="text-sm font-medium">{user.role}</p>
                            <p className="text-xs text-zinc-500">{user.lastActive}</p>
                          </div>
                          <Badge
                            className={
                              user.status === 'online'
                                ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                                : 'bg-zinc-800 text-zinc-500 border-zinc-700/50'
                            }
                          >
                            {user.status}
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

          <TabsContent value="settings" className="mt-6 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {[
                { title: 'Firewall', description: 'Manage firewall rules', icon: ShieldCheck },
                { title: 'Two-Factor Auth', description: 'Enable 2FA for all users', icon: Key },
                { title: 'Access Logs', description: 'View access logs', icon: Eye },
                { title: 'SSL Certificates', description: 'Manage SSL certificates', icon: Lock },
              ].map((setting, idx) => {
                const Icon = setting.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <Card className="bg-zinc-900/50 border-zinc-800/50 backdrop-blur-xl">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Icon className="w-5 h-5" />
                          {setting.title}
                        </CardTitle>
                        <CardDescription>{setting.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button variant="default" className="bg-zinc-800 hover:bg-zinc-700">
                          Configure
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
