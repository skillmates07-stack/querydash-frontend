import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard - QueryDash',
  description: 'Real-time analytics dashboard'
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-primary">
      {/* Dashboard Sidebar */}
      <aside className="fixed left-0 top-0 h-screen w-64 bg-secondary border-r border-gray-700 p-6">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-accent">QueryDash</h2>
          <p className="text-sm text-gray-400">Dashboard</p>
        </div>
        
        <nav className="space-y-2">
          <a href="/dashboard" className="block px-4 py-2 rounded-lg bg-accent/10 text-accent font-semibold">
            📊 Overview
          </a>
          <a href="/dashboard/queries" className="block px-4 py-2 rounded-lg hover:bg-secondary text-gray-300 hover:text-white">
            🔍 Queries
          </a>
          <a href="/dashboard/alerts" className="block px-4 py-2 rounded-lg hover:bg-secondary text-gray-300 hover:text-white">
            🔔 Alerts
          </a>
          <a href="/dashboard/users" className="block px-4 py-2 rounded-lg hover:bg-secondary text-gray-300 hover:text-white">
            👥 User Tracking
          </a>
          <a href="/dashboard/settings" className="block px-4 py-2 rounded-lg hover:bg-secondary text-gray-300 hover:text-white">
            ⚙️ Settings
          </a>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="ml-64 p-8">
        {children}
      </main>
    </div>
  );
}
