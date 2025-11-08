'use client';

import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import {
  RiMoneyDollarCircleLine,
  RiUserLine,
  RiSearchLine,
  RiFlashlightLine,
  RiArrowUpLine,
  RiCheckboxCircleLine,
  RiErrorWarningLine
  RiLineChartLine
} from 'react-icons/ri';

interface MetricsData {
  daily_revenue: number;
  active_users: number;
  queries_today: number;
  avg_response_time: number;
}

interface Query {
  id: string;
  text: string;
  time: string;
  status: 'success' | 'error';
}

export default function DashboardPage() {
  const [metrics, setMetrics] = useState<MetricsData | null>(null);
  const [recentQueries, setRecentQueries] = useState<Query[]>([]);
  const [loading, setLoading] = useState(true);
  const metricsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate on load
    if (metricsRef.current) {
      gsap.from(metricsRef.current.querySelectorAll('.metric-card'), {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.5,
        ease: 'power3.out'
      });
    }

    // Fetch real data
    const fetchData = async () => {
      try {
        // Fetch metrics
        const metricsRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/dashboards/metrics`);
        const metricsData = await metricsRes.json();
        
        // Fetch recent queries
        const queriesRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/dashboards/queries/recent`);
        const queriesData = await queriesRes.json();
        
        if (metricsData.success) {
          setMetrics(metricsData.data);
        }
        
        if (queriesData.success) {
          setRecentQueries(queriesData.data);
        }
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    
    // Refresh every 5 seconds
    const interval = setInterval(fetchData, 5000);
    
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const metricsDisplay = [
    {
      id: '1',
      label: 'Total Revenue',
      value: `$${(metrics?.daily_revenue || 0).toLocaleString()}`,
      change: '+12.5%',
      trend: 'up',
      icon: RiMoneyDollarCircleLine,
      color: 'from-green-500/20 to-emerald-500/20'
    },
    {
      id: '2',
      label: 'Active Users',
      value: (metrics?.active_users || 0).toLocaleString(),
      change: '+5.2%',
      trend: 'up',
      icon: RiUserLine,
      color: 'from-blue-500/20 to-cyan-500/20'
    },
    {
      id: '3',
      label: 'Queries Today',
      value: (metrics?.queries_today || 0).toLocaleString(),
      change: '+23%',
      trend: 'up',
      icon: RiSearchLine,
      color: 'from-purple-500/20 to-pink-500/20'
    },
    {
      id: '4',
      label: 'Response Time',
      value: `${Math.round(metrics?.avg_response_time || 0)}ms`,
      change: '-8%',
      trend: 'down',
      icon: RiFlashlightLine,
      color: 'from-orange-500/20 to-red-500/20'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard Overview</h1>
        <p className="text-gray-400">Real-time analytics and insights</p>
      </div>

      {/* Metrics grid */}
      <div ref={metricsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metricsDisplay.map((metric) => {
          const Icon = metric.icon;
          const TrendIcon = RiArrowUpLine;
          return (
            <div
              key={metric.id}
              className={`metric-card group relative p-6 rounded-2xl bg-gradient-to-br ${metric.color} border border-gray-800 hover:border-accent/50 transition-all duration-300 cursor-pointer overflow-hidden`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent/0 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
                    <Icon className="text-2xl text-white" />
                  </div>
                  <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${
                    metric.trend === 'up' ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'
                  }`}>
                    <TrendIcon className="text-sm" />
                    <span>{metric.change}</span>
                  </div>
                </div>

                <p className="text-sm text-gray-400 mb-2">{metric.label}</p>
                <p className="text-3xl font-bold text-white">{metric.value}</p>

                <div className="flex items-center gap-2 mt-3">
                  <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                  <span className="text-xs text-gray-600">Live</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent queries */}
      <div className="rounded-2xl bg-gradient-to-br from-[#1a1a1a] to-[#0f172a] border border-gray-800 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Recent Queries</h2>
          <button className="text-sm text-accent hover:text-accent/80 transition-colors flex items-center gap-1">
            View All
            <RiArrowUpLine className="rotate-90" />
          </button>
        </div>

        <div className="space-y-3">
          {recentQueries.length > 0 ? (
            recentQueries.map((query) => {
              const StatusIcon = query.status === 'success' ? RiCheckboxCircleLine : RiErrorWarningLine;
              return (
                <div
                  key={query.id}
                  className="flex items-center justify-between p-4 rounded-xl bg-[#0f172a]/50 border border-gray-800 hover:border-accent/30 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <RiSearchLine className="text-xl text-gray-400 group-hover:text-accent transition-colors" />
                    <div className="flex-1">
                      <p className="text-white font-medium mb-1 group-hover:text-accent transition-colors">
                        {query.text}
                      </p>
                      <p className="text-sm text-gray-600">{query.time}</p>
                    </div>
                  </div>
                  <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${
                    query.status === 'success' ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'
                  }`}>
                    <StatusIcon className="text-sm" />
                    <span>{query.status}</span>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-gray-500 text-center py-4">No recent queries</p>
          )}
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid md:grid-cols-3 gap-4">
        {[
          {
            icon: RiSearchLine,
            title: 'New Query',
            desc: 'Ask a question',
            href: '/dashboard/queries',
            gradient: 'linear-gradient(135deg, rgba(91, 71, 251, 0.1) 0%, rgba(91, 71, 251, 0.05) 100%)',
            border: '#5b47fb'
          },
          {
            icon: RiLineChartLine,
            title: 'View Analytics',
            desc: 'Live charts',
            href: '/dashboard/analytics',
            gradient: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(139, 92, 246, 0.05) 100%)',
            border: '#8b5cf6'
          },
          {
            icon: RiBellLine,
            title: 'Set Alert',
            desc: 'Monitor metrics',
            href: '/dashboard/alerts',
            gradient: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(245, 158, 11, 0.05) 100%)',
            border: '#f59e0b'
          }
        ].map((action, i) => {
          const ActionIcon = action.icon;
          return (
            <a
              key={i}
              href={action.href}
              className="flex items-center gap-4 p-6 rounded-2xl border transition-all duration-300 group text-left"
              style={{
                background: action.gradient,
                borderColor: action.border + '33'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = action.border + '80';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = action.border + '33';
              }}
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform" style={{ background: 'rgba(255, 255, 255, 0.05)' }}>
                <ActionIcon className="text-2xl text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">{action.title}</h3>
                <p className="text-sm text-gray-400">{action.desc}</p>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}

