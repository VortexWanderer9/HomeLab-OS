'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Terminal as TerminalIcon, Play, Square, RotateCcw, Copy, Maximize2, X } from 'lucide-react';

import { AppLayout } from '@/components/AppLayout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const initialHistory = [
  { type: 'output', content: 'Welcome to HomeLab OS Terminal' },
  { type: 'output', content: 'Type "help" for available commands' },
];

export default function TerminalPage() {
  const [history, setHistory] = useState(initialHistory);
  const [input, setInput] = useState('');
  const [activeTab, setActiveTab] = useState('shell-1');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newHistory = [...history, { type: 'input', content: input }];
    setHistory(newHistory);

    const command = input.trim().toLowerCase();
    let output = '';

    switch (command) {
      case 'help':
        output = 'Available commands:\nhelp - Show this help\nclear - Clear terminal\nwhoami - Show current user\nuptime - Show system uptime\ndate - Show current date';
        break;
      case 'clear':
        setHistory(initialHistory);
        setInput('');
        return;
      case 'whoami':
        output = 'admin';
        break;
      case 'uptime':
        output = ' 14:32:01 up 14 days,  2:35,  1 user,  load average: 0.45, 0.38, 0.35';
        break;
      case 'date':
        output = new Date().toString();
        break;
      default:
        output = `Command not found: ${command}`;
    }

    setHistory([...newHistory, { type: 'output', content: output }]);
    setInput('');
  };

  return (
    <AppLayout>
      <div className="p-8 space-y-8 h-full flex flex-col">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Terminal</h1>
            <p className="text-zinc-500 mt-1">Web-based terminal</p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="default" className="bg-zinc-800 hover:bg-zinc-700">
              <RotateCcw className="w-4 h-4 mr-2" />
              New Terminal
            </Button>
          </div>
        </motion.div>

        {/* Terminal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex-1 bg-zinc-950 rounded-xl border border-zinc-800 overflow-hidden flex flex-col"
        >
          {/* Tab Bar */}
          <div className="bg-zinc-900 border-b border-zinc-800 p-2 flex items-center justify-between">
            <Tabs defaultValue="shell-1" value={activeTab} onValueChange={setActiveTab} className="flex-1">
              <TabsList className="bg-zinc-800">
                <TabsTrigger value="shell-1" className="flex items-center gap-2">
                  <TerminalIcon className="w-4 h-4" />
                  shell-1
                </TabsTrigger>
              </TabsList>
            </Tabs>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MinusIcon className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Maximize2 className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Terminal Content */}
          <div className="flex-1 p-4 overflow-y-auto font-mono text-sm">
            {history.map((line, idx) => (
              <div key={idx} className="mb-1">
                {line.type === 'input' && (
                  <span className="text-emerald-500">admin@homelab:~$ </span>
                )}
                <span className={line.type === 'input' ? 'text-white' : 'text-zinc-300'}>
                  {line.content}
                </span>
              </div>
            ))}
            <form onSubmit={handleCommand} className="flex items-center gap-2">
              <span className="text-emerald-500">admin@homelab:~$ </span>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-white"
                autoFocus
              />
            </form>
            <div ref={bottomRef} />
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
}

function MinusIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
    </svg>
  );
}
