'use client';

import { useState, useEffect } from 'react';
import {
  RiLineChartLine,
  RiBarChartBoxLine,
  RiPieChartLine,
  RiDownloadLine,
  RiRefreshLine,
  RiFilterLine
} from 'react-icons/ri';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('7d');
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const [revenueData, setRevenueData] = useState([
    { date: 'Mon', revenue: 4200, users: 234 },
    { date: 'Tue', revenue: 5100, users: 289 },
    { date: 'Wed', revenue: 4800, users: 267 },
    { date: 'Thu', revenue: 6200, users: 312 },
    { date: 'Fri', revenue: 7100, users: 345 },
    { date: 'Sat', revenue: 8400, users: 389 },
    { date: 'Sun', revenue: 6800, users: 298 }
  ]);

  const activityData = [
    { name: 'Homepage', value: 450, color: '#5b47fb' },
    { name: 'Pricing', value: 234, color: '#7c66ff' },
    { name: 'Dashboard', value: 189, color: '#3b82f6' },
    { name: 'Checkout', value: 89, color: '#8b5cf6' },
    { name: 'Other', value: 72, color: '#a8a8a8' }
  ];

  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      setRevenueData(prev => {
        const newData = [...prev];
        const lastPoint = newData[newData.length - 1];
        newData.shift();
        newData.push({
          date: 'Now',
          revenue: Math.max(3000, lastPoint.revenue + Math.floor(Math.random() * 1000 - 500)),
          users: Math.max(200, lastPoint.users + Math.floor(Math.random() * 50 - 25))
        });
        return newData;
      });
      setLastUpdated(new Date());
    }, 5000);

    return () => clearInterval(interval);
  }, [autoRefresh]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Analytics</h1>
          <p className="text-gray-400">Real-time business metrics</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 rounded-lg bg-[#1a1a1a] border border-gray-800 text-white focus:outline-none focus:border-accent"
          >
            <option value="24h">Last 24 hours</option>
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>

          <button
            onClick={() => setAutoRefresh(!autoRefresh)}
            className={`px-4 py-2 rounded-lg border transition-all ${
              autoRefresh
                ? 'bg-accent/10 border-accent text-accent'
                : 'bg-[#1a1a1a] border-gray-800 text-gray-400'
            }`}
          >
            <RiRefreshLine className={`text-xl ${autoRefresh ? 'animate-spin-slow' : ''}`} />
          </button>

          <button className="px-4 py-2 rounded-lg bg-[#1a1a1a] border border-gray-800 text-white hover:border-accent transition-all flex items-center gap-2">
            <RiDownloadLine />
            <span className="hidden sm:inline">Export</span>
          </button>
        </div>
      </div>

      {/* Last updated */}
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
        <span>Last updated: {lastUpdated.toLocaleTimeString()}</span>
      </div>

      {/* Revenue & Users Chart */}
      <div className="p-6 rounded-2xl bg-[#1a1a1a] border border-gray-800">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-white mb-1">Revenue & User Growth</h2>
            <p className="text-sm text-gray-400">Live updates every 5 seconds</p>
          </div>
          <RiLineChartLine className="text-2xl text-accent" />
        </div>

        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
            <XAxis dataKey="date" stroke="#a8a8a8" style={{ fontSize: '12px' }} />
            <YAxis stroke="#a8a8a8" style={{ fontSize: '12px' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1a1a1a',
                border: '1px solid #2a2a2a',
                borderRadius: '8px',
                color: '#ffffff'
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#5b47fb"
              strokeWidth={3}
              dot={{ fill: '#5b47fb', r: 5 }}
              activeDot={{ r: 7 }}
            />
            <Line
              type="monotone"
              dataKey="users"
              stroke="#10b981"
              strokeWidth={3}
              dot={{ fill: '#10b981', r: 5 }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Activity Distribution */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="p-6 rounded-2xl bg-[#1a1a1a] border border-gray-800">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-white mb-1">Page Distribution</h2>
              <p className="text-sm text-gray-400">Current active users</p>
            </div>
            <RiPieChartLine className="text-2xl text-accent" />
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={activityData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {activityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1a1a1a',
                  border: '1px solid #2a2a2a',
                  borderRadius: '8px',
                  color: '#ffffff'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Top Pages List */}
        <div className="p-6 rounded-2xl bg-[#1a1a1a] border border-gray-800">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-white mb-1">Top Pages</h2>
              <p className="text-sm text-gray-400">Most visited pages</p>
            </div>
            <RiBarChartBoxLine className="text-2xl text-accent" />
          </div>

          <div className="space-y-3">
            {activityData.map((page, i) => {
              const total = activityData.reduce((sum, p) => sum + p.value, 0);
              const percentage = ((page.value / total) * 100).toFixed(0);
              
              return (
                <div key={i} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm"
                        style={{ backgroundColor: page.color + '20', color: page.color }}
                      >
                        {i + 1}
                      </div>
                      <span className="text-white font-medium">{page.name}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-bold">{page.value}</p>
                      <p className="text-xs text-gray-500">{percentage}%</p>
                    </div>
                  </div>
                  <div className="w-full h-2 bg-[#0d0d0d] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%`, backgroundColor: page.color }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid md:grid-cols-3 gap-4">
        {[
          { label: 'Avg. Session', value: '4m 32s', change: '+12%', trend: 'up' },
          { label: 'Bounce Rate', value: '23.5%', change: '-8%', trend: 'down' },
          { label: 'Page Views', value: '12.4K', change: '+18%', trend: 'up' }
        ].map((metric, i) => (
          <div key={i} className="p-6 rounded-2xl bg-[#1a1a1a] border border-gray-800">
            <p className="text-sm text-gray-400 mb-2">{metric.label}</p>
            <p className="text-3xl font-bold text-white mb-2">{metric.value}</p>
            <span className={`text-sm font-semibold ${metric.trend === 'up' ? 'text-success' : 'text-danger'}`}>
              {metric.change} vs last period
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
