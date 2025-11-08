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

    // Real-time simulation
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
        <h1 className="text-3xl font-bold mb-2" style={{ color: '#ffffff' }}>
          Dashboard Overview
        </h1>
        <p style={{ color: '#a8a8a8' }}>Real-time analytics and insights</p>
      </div>

      {/* Metrics grid */}
      <div ref={metricsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          const TrendIcon = metric.trend === 'up' ? RiArrowUpLine : RiArrowDownLine;
          return (
            <div
              key={metric.id}
              className={`metric-card group relative p-6 rounded-2xl bg-gradient-to-br ${metric.color} border transition-all duration-300 cursor-pointer overflow-hidden`}
              style={{ borderColor: '#2a2a2a' }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent/0 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative z-10">
                {/* Icon and trend */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'rgba(255, 255, 255, 0.05)' }}>
                    <Icon className="text-2xl" style={{ color: '#ffffff' }} />
                  </div>
                  <div
                    className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold`}
                    style={{
                      background: metric.trend === 'up' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                      color: metric.trend === 'up' ? '#10b981' : '#ef4444'
                    }}
                  >
                    <TrendIcon className="text-sm" />
                    <span>{metric.change}</span>
                  </div>
                </div>

                {/* Label */}
                <p className="text-sm mb-2" style={{ color: '#a8a8a8' }}>{metric.label}</p>

                {/* Value */}
                <p className="text-3xl font-bold" style={{ color: '#ffffff' }}>{metric.value}</p>

                {/* Live indicator */}
                <div className="flex items-center gap-2 mt-3">
                  <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#10b981' }} />
                  <span className="text-xs" style={{ color: '#666666' }}>Live</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent queries */}
      <div className="rounded-2xl p-6" style={{ 
        background: 'linear-gradient(135deg, rgba(26, 26, 26, 0.8) 0%, rgba(15, 23, 42, 0.8) 100%)',
        border: '1px solid #2a2a2a'
      }}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold" style={{ color: '#ffffff' }}>Recent Queries</h2>
          <button className="text-sm transition-colors flex items-center gap-1" style={{ color: '#5b47fb' }}>
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
                className="flex items-center justify-between p-4 rounded-xl border transition-all cursor-pointer group"
                style={{ 
                  background: 'rgba(15, 23, 42, 0.5)',
                  borderColor: '#2a2a2a'
                }}
              >
                <div className="flex items-center gap-4 flex-1">
                  <RiSearchLine className="text-xl group-hover:text-[#5b47fb] transition-colors" style={{ color: '#a8a8a8' }} />
                  <div className="flex-1">
                    <p className="font-medium mb-1 group-hover:text-[#5b47fb] transition-colors" style={{ color: '#ffffff' }}>
                      {query.text}
                    </p>
                    <p className="text-sm" style={{ color: '#666666' }}>{query.time}</p>
                  </div>
                </div>
                <div
                  className="flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold"
                  style={{
                    background: query.status === 'success' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                    color: query.status === 'success' ? '#10b981' : '#ef4444'
                  }}
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
            gradient: 'linear-gradient(135deg, rgba(91, 71, 251, 0.1) 0%, rgba(91, 71, 251, 0.05) 100%)',
            border: '#5b47fb'
          },
          {
            icon: RiDashboardLine,
            title: 'Create Dashboard',
            desc: 'Build custom view',
            gradient: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(139, 92, 246, 0.05) 100%)',
            border: '#8b5cf6'
          },
          {
            icon: RiBellLine,
            title: 'Set Alert',
            desc: 'Monitor metrics',
            gradient: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(245, 158, 11, 0.05) 100%)',
            border: '#f59e0b'
          }
        ].map((action, i) => {
          const ActionIcon = action.icon;
          return (
            <button
              key={i}
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
                <ActionIcon className="text-2xl" style={{ color: '#ffffff' }} />
              </div>
              <div>
                <h3 className="font-semibold mb-1" style={{ color: '#ffffff' }}>{action.title}</h3>
                <p className="text-sm" style={{ color: '#a8a8a8' }}>{action.desc}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
