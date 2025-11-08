'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  RiPlugLine,
  RiDashboardLine,
  RiLineChartLine, 
  RiSearchLine,
  RiBellLine,
  RiUserLocationLine,
  RiSettings4Line,
  RiMenuLine,
  RiCloseLine,
  RiCheckboxCircleLine
} from 'react-icons/ri';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

const navigation = [
  { name: 'Overview', href: '/dashboard', icon: RiDashboardLine },
  { name: 'Analytics', href: '/dashboard/analytics', icon: RiLineChartLine },
  { name: 'Connectors', href: '/dashboard/connectors', icon: RiPlugLine }, // ← ADD THIS
  { name: 'Queries', href: '/dashboard/queries', icon: RiSearchLine },
  { name: 'Alerts', href: '/dashboard/alerts', icon: RiBellLine },
  { name: 'User Tracking', href: '/dashboard/tracking', icon: RiUserLocationLine },
  { name: 'Settings', href: '/dashboard/settings', icon: RiSettings4Line }
];

];
  return (
    <div className="min-h-screen bg-[#0a0f1e]">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-[#0f172a] border-r border-gray-800 z-50 transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center gap-3 p-6 border-b border-gray-800">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-blue-600 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">QueryDash</h2>
              <p className="text-xs text-gray-400">Enterprise</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all group ${
                    isActive
                      ? 'bg-accent/10 text-accent'
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <Icon className={`text-xl ${isActive ? 'text-accent' : 'text-gray-400 group-hover:text-white'}`} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* User section */}
          <div className="p-4 border-t border-gray-800">
            <div className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 cursor-pointer transition-colors group">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                JD
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-white group-hover:text-accent transition-colors">John Doe</p>
                <p className="text-xs text-gray-400">john@company.com</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-[#0f172a]/80 backdrop-blur-xl border-b border-gray-800">
          <div className="flex items-center justify-between px-4 py-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-white/5 transition-colors"
            >
              {sidebarOpen ? (
                <RiCloseLine className="w-6 h-6 text-white" />
              ) : (
                <RiMenuLine className="w-6 h-6 text-white" />
              )}
            </button>

            <div className="flex items-center gap-4">
              {/* Status indicator */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-success/10 border border-success/20">
                <RiCheckboxCircleLine className="w-4 h-4 text-success animate-pulse" />
                <span className="text-xs font-medium text-success">All Systems Operational</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}





