'use client';

import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

interface Metric {
  id: string;
  label: string;
  value: string | number;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  icon: string;
}

interface Query {
  id: string;
  text: string;
  time: string;
  status: 'success' | 'error' | 'pending';
}

export default function DashboardPage() {
  const [metrics, setMetrics] = useState<Metric[]>([
    {
      id: '1',
      label: 'Total Revenue',
      value: '$8,247',
      change: '+12.5%',
      trend: 'up',
      icon: '💰'
    },
    {
      id: '2',
      label: 'Active Users',
      value: '1,234',
      change: '+5.2%',
      trend: 'up',
      icon: '👥'
    },
    {
      id: '3',
      label: 'Queries Today',
      value: '847',
      change: '+23%',
      trend: 'up',
      icon: '🔍'
    },
    {
      id: '4',
      label: 'Response Time',
      value: '124ms',
      change: '-8%',
      trend: 'down',
      icon: '⚡'
    }
  ]);

  const [recentQueries, setRecentQueries] = useState<Query[]>([
    {
      id: '1',
      text: 'Show top 10 customers by revenue',
      time: '2 minutes ago',
      status: 'success'
    },
    {
      id: '2',
      text: 'Revenue trend last 30 days',
      time: '5 minutes ago',
      status: 'success'
    },
    {
      id: '3',
      text: 'User activity by region',
      time: '12 minutes ago',
      status: 'success'
    }
  ]);

  const metricsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate metrics cards on load
    if (metricsRef.current) {
      gsap.from(metricsRef.current.querySelectorAll('.metric-card'), {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.5,
        ease: 'power3.out'
      });
    }

    // Simulate real-time updates every 5 seconds
    const interval = setInterval(() => {
      setMetrics((prev) =>
        prev.map((metric) => {
          if (metric.id === '2') {
            // Update active users randomly
            const newValue = Math.floor(1200 + Math.random() * 100);
            return { ...metric, value: newValue.toLocaleString() };
          }
          if (metric.id === '4') {
            // Update response time randomly
            const newValue = Math.floor(100 + Math.random() * 50);
            return { ...metric, value: `${newValue}ms` };
          }
          return metric;
        })
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard Overview</h1>
        <p className="text-gray-400">Real-time analytics and insights</p>
      </div>

      {/* Metrics grid */}
      <div ref={metricsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric) => (
          <div
            key={metric.id}
            className="metric-card group relative p-6 rounded-2xl bg-gradient-to-br from-[#1a1f35] to-[#0f172a] border border-gray-800 hover:border-accent/50 transition-all duration-300 cursor-pointer overflow-hidden"
          >
            {/* Background glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent/0 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="relative z-10">
              {/* Icon and trend */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl">{metric.icon}</span>
                <span
                  className={`text-sm font-semibold ${
                    metric.trend === 'up'
                      ? 'text-success'
                      : metric.trend === 'down'
                      ? 'text-danger'
                      : 'text-gray-400'
                  }`}
                >
                  {metric.change}
                </span>
              </div>

              {/* Label */}
              <p className="text-sm text-gray-400 mb-2">{metric.label}</p>

              {/* Value */}
              <p className="text-3xl font-bold text-white">{metric.value}</p>

              {/* Live indicator */}
              <div className="flex items-center gap-2 mt-3">
                <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                <span className="text-xs text-gray-500">Live</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent queries */}
      <div className="rounded-2xl bg-gradient-to-br from-[#1a1f35] to-[#0f172a] border border-gray-800 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Recent Queries</h2>
          <button className="text-sm text-accent hover:text-accent/80 transition-colors">
            View All →
          </button>
        </div>

        <div className="space-y-3">
          {recentQueries.map((query) => (
            <div
              key={query.id}
              className="flex items-center justify-between p-4 rounded-xl bg-[#0f172a]/50 border border-gray-800 hover:border-accent/30 transition-colors cursor-pointer group"
            >
              <div className="flex-1">
                <p className="text-white font-medium mb-1 group-hover:text-accent transition-colors">
                  {query.text}
                </p>
                <p className="text-sm text-gray-500">{query.time}</p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  query.status === 'success'
                    ? 'bg-success/10 text-success'
                    : query.status === 'error'
                    ? 'bg-danger/10 text-danger'
                    : 'bg-warning/10 text-warning'
                }`}
              >
                {query.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid md:grid-cols-3 gap-4">
        <button className="flex items-center gap-4 p-6 rounded-2xl bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20 hover:border-accent/50 transition-all duration-300 group text-left">
          <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
            🔍
          </div>
          <div>
            <h3 className="text-white font-semibold mb-1">New Query</h3>
            <p className="text-sm text-gray-400">Ask a question</p>
          </div>
        </button>

        <button className="flex items-center gap-4 p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 to-purple-500/5 border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 group text-left">
          <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
            📊
          </div>
          <div>
            <h3 className="text-white font-semibold mb-1">Create Dashboard</h3>
            <p className="text-sm text-gray-400">Build custom view</p>
          </div>
        </button>

        <button className="flex items-center gap-4 p-6 rounded-2xl bg-gradient-to-br from-orange-500/10 to-orange-500/5 border border-orange-500/20 hover:border-orange-500/50 transition-all duration-300 group text-left">
          <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
            🔔
          </div>
          <div>
            <h3 className="text-white font-semibold mb-1">Set Alert</h3>
            <p className="text-sm text-gray-400">Monitor metrics</p>
          </div>
        </button>
      </div>
    </div>
  );
}
