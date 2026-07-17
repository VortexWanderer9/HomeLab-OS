'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import {
  Settings,
  User,
  Bell,
  Palette,
  Globe,
  Database,
  Server,
  Save,
  RefreshCw,
  ChevronRight,
  Check,
} from 'lucide-react';

import { AppLayout } from '@/components/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

export default function SettingsPage() {
  const [name, setName] = useState('Admin');
  const [email, setEmail] = useState('admin@homelab.local');
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [compactMode, setCompactMode] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState('Dark');
  const [alertsEnabled, setAlertsEnabled] = useState(true);
  const [updatesEnabled, setUpdatesEnabled] = useState(true);
  const [backupsEnabled, setBackupsEnabled] = useState(true);
  const [hostname, setHostname] = useState('homelab-server');
  const [domain, setDomain] = useState('homelab.local');
  const [saveMessage, setSaveMessage] = useState('');

  const handleSave = () => {
    setSaveMessage('Settings saved successfully!');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const themes = [
    { name: 'Dark', color: 'bg-zinc-900' },
    { name: 'Light', color: 'bg-white' },
    { name: 'System', color: 'bg-gradient-to-br from-zinc-900 to-white' },
  ];

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
            <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
            <p className="text-zinc-500 mt-1">Configure HomeLab OS</p>
          </div>
          <div className="flex items-center gap-4">
            {saveMessage && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-emerald-500 text-sm font-medium flex items-center gap-2"
              >
                <Check className="w-4 h-4" />
                {saveMessage}
              </motion.span>
            )}
            <Button onClick={handleSave} variant="default" className="bg-zinc-800 hover:bg-zinc-700">
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </motion.div>

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-zinc-900/50 border border-zinc-800">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="network">Network</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="mt-6 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="bg-zinc-900/50 border-zinc-800/50 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Profile
                  </CardTitle>
                  <CardDescription>Update your profile information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-zinc-800 border-zinc-700"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="admin@homelab.local"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-zinc-800 border-zinc-700"
                    />
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
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Preferences
                  </CardTitle>
                  <CardDescription>Customize your experience</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Auto-refresh</p>
                      <p className="text-sm text-zinc-500">Automatically refresh data</p>
                    </div>
                    <Switch checked={autoRefresh} onCheckedChange={setAutoRefresh} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Compact mode</p>
                      <p className="text-sm text-zinc-500">Use compact interface</p>
                    </div>
                    <Switch checked={compactMode} onCheckedChange={setCompactMode} />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="appearance" className="mt-6 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="bg-zinc-900/50 border-zinc-800/50 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="w-5 h-5" />
                    Theme
                  </CardTitle>
                  <CardDescription>Choose your theme</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    {themes.map((theme) => (
                      <button
                        key={theme.name}
                        onClick={() => setSelectedTheme(theme.name)}
                        className={`p-4 rounded-xl border transition-all ${
                          selectedTheme === theme.name
                            ? 'border-blue-500 bg-zinc-800/50'
                            : 'border-zinc-700 hover:border-zinc-600'
                        }`}
                      >
                        <div className={`w-full h-16 rounded-lg ${theme.color} mb-2`} />
                        <p className="text-sm font-medium">{theme.name}</p>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="notifications" className="mt-6 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="bg-zinc-900/50 border-zinc-800/50 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="w-5 h-5" />
                    Notification Settings
                  </CardTitle>
                  <CardDescription>Configure what notifications you receive</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Alerts</p>
                      <p className="text-sm text-zinc-500">Get notified about security alerts</p>
                    </div>
                    <Switch checked={alertsEnabled} onCheckedChange={setAlertsEnabled} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Updates</p>
                      <p className="text-sm text-zinc-500">Get notified about system updates</p>
                    </div>
                    <Switch checked={updatesEnabled} onCheckedChange={setUpdatesEnabled} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Backups</p>
                      <p className="text-sm text-zinc-500">Get notified about backup status</p>
                    </div>
                    <Switch checked={backupsEnabled} onCheckedChange={setBackupsEnabled} />
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
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="w-5 h-5" />
                    Network Settings
                  </CardTitle>
                  <CardDescription>Configure network preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="hostname">Hostname</Label>
                    <Input
                      id="hostname"
                      placeholder="homelab-server"
                      value={hostname}
                      onChange={(e) => setHostname(e.target.value)}
                      className="bg-zinc-800 border-zinc-700"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="domain">Domain</Label>
                    <Input
                      id="domain"
                      placeholder="homelab.local"
                      value={domain}
                      onChange={(e) => setDomain(e.target.value)}
                      className="bg-zinc-800 border-zinc-700"
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="system" className="mt-6 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="bg-zinc-900/50 border-zinc-800/50 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Server className="w-5 h-5" />
                    System Info
                  </CardTitle>
                  <CardDescription>View system information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-zinc-500">Version</p>
                      <p className="font-medium">HomeLab OS 1.0.0</p>
                    </div>
                    <div>
                      <p className="text-sm text-zinc-500">Uptime</p>
                      <p className="font-medium">14 days, 2 hours</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="bg-zinc-900/50 border-zinc-800/50 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="w-5 h-5" />
                    Actions
                  </CardTitle>
                  <CardDescription>System actions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="default" className="bg-zinc-800 hover:bg-zinc-700 w-full justify-between">
                    Check for updates
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                  <Button variant="default" className="bg-zinc-800 hover:bg-zinc-700 w-full justify-between">
                    Restart system
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                  <Button variant="default" className="bg-zinc-800 hover:bg-zinc-700 w-full justify-between">
                    Factory reset
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
