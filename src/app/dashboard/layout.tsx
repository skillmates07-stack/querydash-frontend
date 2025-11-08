'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  RiDashboardLine,
  RiLineChartLine,
  RiFolderOpenLine,
  RiEyeLine,
  RiNotification3Line,
  RiSettings4Line,
  RiMenuLine,
  RiCloseLine,
  RiLogoutBoxLine
} from 'react-icons/ri';
import { VisualizationProvider } from '@/contexts/VisualizationContext';
import { FilteringProvider } from '@/contexts/FilteringContext';

const navigation = [
  { name: 'Overview', href: '/dashboard', icon: RiDashboardLine, section: 'BI' },
  { name: 'Visualizations', href: '/dashboard/visualizations', icon: RiLineChartLine, section: 'BI' },
  { name: 'Data Sources', href: '/dashboard/data-sources', icon: RiFolderOpenLine, section: 'BI' },
  { name: 'Live Tracking', href: '/dashboard/tracking', icon: RiEyeLine, section: 'Monitor' },
  { name: 'Alerts', href: '/dashboard/alerts', icon: RiNotification3Line, section: 'Shared' },
  { name: 'Settings', href: '/dashboard/settings', icon: RiSettings4Line, section: 'Shared' }
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <FilteringProvider>
      <VisualizationProvider>
        <div className="flex h-screen bg-[#0a0f1e]">
          {/* Sidebar */}
          <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#0d0d0d] border-r border-gray-800 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}>
            <div className="flex flex-col h-full">
              {/* Logo */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-gray-800">
                <Link href="/dashboard" className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-purple-600 flex items-center justify-center shadow-lg shadow-accent/20">
                    <span className="text-xl font-bold text-white">Q</span>
                  </div>
                  <div>
                    <h1 className="text-lg font-bold text-white">QueryDash</h1>
                    <p className="text-xs text-gray-500">Enterprise</p>
                  </div>
                </Link>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="lg:hidden p-2 rounded-lg hover:bg-white/5"
                >
                  <RiCloseLine className="text-gray-400" />
                </button>
              </div>

              {/* Navigation */}
              <nav className="flex-1 px-3 py-4 overflow-y-auto">
                <div className="mb-6">
                  <p className="px-3 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Business Intelligence
                  </p>
                  <div className="space-y-1">
                    {navigation.filter(item => item.section === 'BI').map((item) => {
                      const Icon = item.icon;
                      const isActive = pathname === item.href;
                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                            isActive
                              ? 'bg-accent text-white shadow-lg shadow-accent/20'
                              : 'text-gray-400 hover:bg-white/5 hover:text-white'
                          }`}
                        >
                          <Icon className="text-xl flex-shrink-0" />
                          <span className="font-medium">{item.name}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>

                <div className="mb-6">
                  <p className="px-3 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Website Monitoring
                  </p>
                  <div className="space-y-1">
                    {navigation.filter(item => item.section === 'Monitor').map((item) => {
                      const Icon = item.icon;
                      const isActive = pathname === item.href;
                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                            isActive
                              ? 'bg-accent text-white shadow-lg shadow-accent/20'
                              : 'text-gray-400 hover:bg-white/5 hover:text-white'
                          }`}
                        >
                          <Icon className="text-xl flex-shrink-0" />
                          <span className="font-medium">{item.name}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>

                <div className="mb-6">
                  <p className="px-3 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    General
                  </p>
                  <div className="space-y-1">
                    {navigation.filter(item => item.section === 'Shared').map((item) => {
                      const Icon = item.icon;
                      const isActive = pathname === item.href;
                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                            isActive
                              ? 'bg-accent text-white shadow-lg shadow-accent/20'
                              : 'text-gray-400 hover:bg-white/5 hover:text-white'
                          }`}
                        >
                          <Icon className="text-xl flex-shrink-0" />
                          <span className="font-medium">{item.name}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </nav>

              {/* User Profile */}
              <div className="p-4 border-t border-gray-800">
                <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 cursor-pointer transition-all">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-purple-600 flex items-center justify-center">
                    <span className="text-sm font-bold text-white">JD</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">John Doe</p>
                    <p className="text-xs text-gray-500 truncate">john@company.com</p>
                  </div>
                  <RiLogoutBoxLine className="text-gray-400 flex-shrink-0" />
                </div>
              </div>
            </div>
          </div>

          {/* Mobile overlay */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* Main Content */}
          <div className="flex-1 flex flex-col lg:ml-64">
            {/* Mobile Header */}
            <div className="lg:hidden flex items-center justify-between px-6 py-4 bg-[#0d0d0d] border-b border-gray-800">
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 rounded-lg hover:bg-white/5"
              >
                <RiMenuLine className="text-2xl text-white" />
              </button>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-purple-600 flex items-center justify-center">
                  <span className="text-sm font-bold text-white">Q</span>
                </div>
                <h1 className="text-lg font-bold text-white">QueryDash</h1>
              </div>
              <div className="w-10" />
            </div>

            {/* Page Content with Filtering & Visualization Providers */}
            <main className="flex-1 overflow-auto">
              {children}
            </main>
          </div>
        </div>
      </VisualizationProvider>
    </FilteringProvider>
  );
}
