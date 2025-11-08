'use client';

import { useEffect, useState } from 'react';
import { RiMoneyDollarCircleLine, RiUserLine, RiSearchLine, RiFlashlightLine } from 'react-icons/ri';

export default function DashboardPage() {
  const [metrics, setMetrics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/dashboards/metrics`);
        const result = await response.json();
        
        if (result.success) {
          setMetrics(result.data);
        }
      } catch (error) {
        console.error('Failed to fetch metrics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
    const interval = setInterval(fetchMetrics, 5000); // Refresh every 5 seconds
    
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-white">Loading real-time data...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard Overview</h1>
        <p className="text-gray-400">Real-time analytics from your database</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          icon={RiMoneyDollarCircleLine}
          label="Daily Revenue"
          value={`$${(metrics?.daily_revenue || 0).toLocaleString()}`}
          change="+12.5%"
          trend="up"
        />
        <MetricCard
          icon={RiUserLine}
          label="Total Users"
          value={metrics?.total_users || 0}
          change="+5.2%"
          trend="up"
        />
        <MetricCard
          icon={RiSearchLine}
          label="Total Queries"
          value={metrics?.total_queries || 0}
          change="+23%"
          trend="up"
        />
        <MetricCard
          icon={RiFlashlightLine}
          label="Avg Response"
          value={`${metrics?.avg_response_time || 0}ms`}
          change="-8%"
          trend="down"
        />
      </div>
    </div>
  );
}

function MetricCard({ icon: Icon, label, value, change, trend }: any) {
  return (
    <div className="p-6 rounded-2xl bg-gradient-to-br from-[#1a1a1a] to-[#0f172a] border border-gray-800 hover:border-accent/50 transition-all">
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
          <Icon className="text-2xl text-white" />
        </div>
        <span className={`text-sm font-semibold ${trend === 'up' ? 'text-success' : 'text-danger'}`}>
          {change}
        </span>
      </div>
      <p className="text-sm text-gray-400 mb-2">{label}</p>
      <p className="text-3xl font-bold text-white">{value}</p>
      <div className="flex items-center gap-2 mt-3">
        <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
        <span className="text-xs text-gray-600">Live</span>
      </div>
    </div>
  );
}
