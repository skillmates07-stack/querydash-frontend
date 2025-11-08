'use client';

import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const [metrics, setMetrics] = useState({
    totalQueries: 0,
    activeUsers: 0,
    avgResponseTime: 0
  });

  useEffect(() => {
    // Mock data for now (later: fetch from API)
    setMetrics({
      totalQueries: 1247,
      activeUsers: 23,
      avgResponseTime: 124
    });
  }, []);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-4xl font-bold mb-2">Dashboard Overview</h1>
        <p className="text-gray-400">Real-time analytics for your data</p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Queries */}
        <div className="bg-secondary rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-400">Total Queries</h3>
            <span className="text-2xl">🔍</span>
          </div>
          <p className="text-3xl font-bold">{metrics.totalQueries.toLocaleString()}</p>
          <p className="text-sm text-success mt-2">↑ 12% from last week</p>
        </div>

        {/* Active Users */}
        <div className="bg-secondary rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-400">Active Users</h3>
            <span className="text-2xl">👥</span>
          </div>
          <p className="text-3xl font-bold">{metrics.activeUsers}</p>
          <p className="text-sm text-success mt-2">↑ 5 users online now</p>
        </div>

        {/* Avg Response Time */}
        <div className="bg-secondary rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-400">Avg Response Time</h3>
            <span className="text-2xl">⚡</span>
          </div>
          <p className="text-3xl font-bold">{metrics.avgResponseTime}ms</p>
          <p className="text-sm text-success mt-2">↓ 8% faster</p>
        </div>
      </div>

      {/* Recent Queries Section */}
      <div className="bg-secondary rounded-lg p-6 border border-gray-700">
        <h3 className="text-xl font-semibold mb-4">Recent Queries</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 bg-primary rounded-lg">
            <div>
              <p className="font-semibold">Show top 10 customers by revenue</p>
              <p className="text-sm text-gray-400">2 minutes ago</p>
            </div>
            <span className="px-3 py-1 bg-success/20 text-success rounded-full text-sm">
              Success
            </span>
          </div>
          <div className="flex items-center justify-between p-4 bg-primary rounded-lg">
            <div>
              <p className="font-semibold">Revenue trend last 30 days</p>
              <p className="text-sm text-gray-400">5 minutes ago</p>
            </div>
            <span className="px-3 py-1 bg-success/20 text-success rounded-full text-sm">
              Success
            </span>
          </div>
          <div className="flex items-center justify-between p-4 bg-primary rounded-lg">
            <div>
              <p className="font-semibold">User activity by region</p>
              <p className="text-sm text-gray-400">12 minutes ago</p>
            </div>
            <span className="px-3 py-1 bg-success/20 text-success rounded-full text-sm">
              Success
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
