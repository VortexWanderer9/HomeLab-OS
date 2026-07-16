'use client';

import {
  LayoutDashboard,
  Server,
  HardDrive,
  Cpu,
  Activity,
  Wifi,
  ShieldCheck,
  Settings,
  Terminal,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/infrastructure', label: 'Infrastructure', icon: Server },
  { path: '/containers', label: 'Containers', icon: Cpu },
  { path: '/storage', label: 'Storage', icon: HardDrive },
  { path: '/network', label: 'Network', icon: Wifi },
  { path: '/monitoring', label: 'Monitoring', icon: Activity },
  { path: '/security', label: 'Security', icon: ShieldCheck },
  { path: '/terminal', label: 'Terminal', icon: Terminal },
  { path: '/settings', label: 'Settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-zinc-900/80 border-r border-zinc-800/50 backdrop-blur-xl flex flex-col h-full">
      <div className="p-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <Terminal className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-xl tracking-tight">HomeLab OS</h1>
            <p className="text-xs text-zinc-500">Mission Control</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium ${
                isActive
                  ? 'bg-zinc-800 text-white border border-zinc-700/50'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
              }`}
            >
              <Icon className="w-5 h-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-zinc-800/50">
        <div className="bg-zinc-800/50 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600" />
              <div className="text-sm">
                <p className="font-medium">Admin</p>
                <p className="text-xs text-zinc-500">Online</p>
              </div>
            </div>
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
          </div>
        </div>
      </div>
    </div>
  );
}
