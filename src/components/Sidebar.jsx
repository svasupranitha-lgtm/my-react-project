import React from 'react';
import { BookOpen, BarChart3, Sparkles, LayoutDashboard } from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'notes', label: 'Notes & Videos', icon: BookOpen },
    { id: 'analytics', label: 'Academic & Attendance', icon: BarChart3 },
    { id: 'ai', label: 'AI Study Assistant', icon: Sparkles }
  ];

  return (
    <aside className="w-64 bg-slate-950 border-r border-slate-800 p-6 flex flex-col justify-between hidden md:flex min-h-screen">
      <div>
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center font-bold text-white text-xl shadow-lg">
            S
          </div>
          <div>
            <h1 className="text-lg font-bold text-white leading-none">ShikshaOS</h1>
            <span className="text-xs text-slate-400">Student Workspace</span>
          </div>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                    : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-800 text-xs text-slate-400">
        <p className="font-semibold text-slate-300 mb-1">B.Tech 3rd Semester</p>
        <p>Target GPA: 8.5+</p>
      </div>
    </aside>
  );
}