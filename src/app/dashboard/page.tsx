'use client';

import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import {
  RiMoneyDollarCircleLine,
  RiUserLine,
  RiSearchLine,
  RiFlashlightLine,
  RiArrowUpLine,
  RiArrowDownLine,
  RiCheckboxCircleLine,
  RiErrorWarningLine,
  RiDashboardLine,
  RiBellLine
} from 'react-icons/ri';

interface Metric {
  id: string;
  label: string;
  value: string | number;
  change: string;
  trend: 'up' | 'down';
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

interface Query {
  id: string;
  text: string;
  time: string;
  status: 'success' | 'error';
}

export default function DashboardPage() {
  const [metrics, setMetrics] = useState<Metric[]>([
    {
      id: '1',
      label: 'Total Revenue',
      value: '$8,247',
      change: '+12.5%',
      trend: 'up',
      icon: RiMoneyDollarCircleLine,
      color: 'from-green-500/20 to-emerald-500/20'
    },
    {
      id: '2',
      label: 'Active Users',
      value: '1,234',
      change: '+5.2%',
      trend: 'up',
      icon: RiUserLine,
      color: 'from-blue-500/20 to-cyan-500/20'
    },
    {
      id: '3',
      label: 'Queries Today',
      value: '847',
      change: '+23%',
      trend: 'up',
      icon: RiSearchLine,
      color: 'from-purple-500/20 to-pink-500/20'
    },
    {
      id: '4',
      label: 'Response Time',
      value: '124ms',
      change: '-8%',
      trend: 'down',
      icon: RiFlashlightLine,
      color: 'from-orange-500/20 to-red-500/20'
    }
  ]);

  const [recentQueries, setRecentQueries] = useState<Query[]>([
    { id: '1', text: 'Show top 10 customers by revenue', time: '2 minutes ago', status: 'success' },
    { id: '2', text: 'Revenue trend last 30 days', time: '5 minutes ago', status: 'success' },
    { id: '3', text: 'User activity by region', time: '12 minutes ago', status: 'success' }
  ]);

  const metricsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (metricsRef.current) {
      gsap.from(metricsRef.current.querySelectorAll('.metric-card'), {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.5,
        ease: 'power3.out'
      });
    }

    const interval = setInterval(() => {
      setMetrics((prev) =>
        prev.map((metric) => {
          if (metric.id === '2') {
            const newValue = Math.floor(1200 + Math.random() * 100);
            return { ...metric, value: newValue.toLocaleString() };
          }
          if (metric.id === '4') {
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
        <h1 className="text-3xl font-bold text-white mb-2">
          Dashboard Overview
        </h1>
        <p className="text-gray-400">Real-time analytics and insights</p>
      </div>

      {/* Metrics grid */}
      <div ref={metricsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          const TrendIcon = metric.trend === 'up' ? RiArrowUpLine : RiArrowDownLine;
          return (
            <div
              key={metric.id}
              className={`metric-card group relative p-6 rounded-2xl bg-gradient-to-br ${metric.color} border border-gray-800 hover:border-accent/50 transition-all duration-300 cursor-pointer overflow-hidden`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent/0 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative z-10">
                {/* Icon and trend */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
                    <Icon className="text-2xl text-white" />
                  </div>
                  <div
                    className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${
                      metric.trend === 'up' ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'
                    }`}
                  >
                    <TrendIcon className="text-sm" />
                    <span>{metric.change}</span>
                  </div>
                </div>

                {/* Label */}
                <p className="text-sm text-gray-400 mb-2">{metric.label}</p>

                {/* Value */}
                <p className="text-3xl font-bold text-white">{metric.value}</p>

                {/* Live indicator */}
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
          {recentQueries.map((query) => {
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
                <div
                  className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${
                    query.status === 'success' ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'
                  }`}
                >
                  <StatusIcon className="text-sm" />
                  <span>{query.status}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid md:grid-cols-3 gap-4">
        {[
          {
            icon: RiSearchLine,
            title: 'New Query',
            desc: 'Ask a question',
            color: 'from-accent/10 to-accent/5 border-accent/20 hover:border-accent/50'
          },
          {
            icon: RiDashboardLine,
            title: 'Create Dashboard',
            desc: 'Build custom view',
            color: 'from-purple-500/10 to-purple-500/5 border-purple-500/20 hover:border-purple-500/50'
          },
          {
            icon: RiBellLine,
            title: 'Set Alert',
            desc: 'Monitor metrics',
            color: 'from-orange-500/10 to-orange-500/5 border-orange-500/20 hover:border-orange-500/50'
          }
        ].map((action, i) => {
          const ActionIcon = action.icon;
          return (
            <button
              key={i}
              className={`flex items-center gap-4 p-6 rounded-2xl bg-gradient-to-br ${action.color} border transition-all duration-300 group text-left`}
            >
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                <ActionIcon className="text-2xl text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">{action.title}</h3>
                <p className="text-sm text-gray-400">{action.desc}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
