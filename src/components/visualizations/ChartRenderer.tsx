'use client';

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { RiDatabase2Line } from 'react-icons/ri';

const CHART_COLORS = ['#5b47fb', '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

interface ChartRendererProps {
  type: string;
  data: any[];
  xAxis?: string;
  yAxis?: string;
  config: {
    color: string;
    showGrid: boolean;
    showLegend: boolean;
  };
}

export default function ChartRenderer({ type, data, xAxis, yAxis, config }: ChartRendererProps) {
  if (!xAxis || !yAxis) {
    return (
      <div className="h-full flex items-center justify-center text-gray-500">
        <div className="text-center">
          <RiDatabase2Line className="text-5xl mx-auto mb-3 opacity-50" />
          <p className="text-sm">Configure X and Y axes</p>
        </div>
      </div>
    );
  }

  const chartData = data.slice(0, 20);

  switch (type) {
    case 'line':
      return (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            {config.showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />}
            <XAxis dataKey={xAxis} stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1a1a1a', 
                border: '1px solid #2a2a2a',
                borderRadius: '8px'
              }} 
            />
            {config.showLegend && <Legend />}
            <Line 
              type="monotone" 
              dataKey={yAxis} 
              stroke={config.color} 
              strokeWidth={3}
              dot={{ fill: config.color, r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      );

    case 'bar':
      return (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            {config.showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />}
            <XAxis dataKey={xAxis} stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1a1a1a', 
                border: '1px solid #2a2a2a',
                borderRadius: '8px'
              }} 
            />
            {config.showLegend && <Legend />}
            <Bar dataKey={yAxis} fill={config.color} radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      );

    case 'area':
      return (
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            {config.showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />}
            <XAxis dataKey={xAxis} stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1a1a1a', 
                border: '1px solid #2a2a2a',
                borderRadius: '8px'
              }} 
            />
            {config.showLegend && <Legend />}
            <Area 
              type="monotone" 
              dataKey={yAxis} 
              stroke={config.color}
              fill={config.color}
              fillOpacity={0.3}
            />
          </AreaChart>
        </ResponsiveContainer>
      );

    case 'pie':
      const pieData = chartData.slice(0, 6).map((item, index) => ({
        name: item[xAxis],
        value: parseFloat(item[yAxis]) || 0
      }));

      return (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={(entry) => entry.name}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      );

    case 'metric':
      const metricValue = chartData.reduce((sum, item) => 
        sum + (parseFloat(item[yAxis]) || 0), 0
      );
      return (
        <div className="h-full flex flex-col items-center justify-center">
          <p className="text-sm text-gray-400 mb-2">{yAxis}</p>
          <p className="text-6xl font-bold" style={{ color: config.color }}>
            {metricValue.toLocaleString()}
          </p>
        </div>
      );

    case 'table':
      return (
        <div className="h-full overflow-auto">
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-[#1a1a1a]">
              <tr>
                <th className="text-left p-3 font-semibold text-gray-300 border-b border-gray-800">
                  {xAxis}
                </th>
                <th className="text-left p-3 font-semibold text-gray-300 border-b border-gray-800">
                  {yAxis}
                </th>
              </tr>
            </thead>
            <tbody>
              {chartData.map((row, i) => (
                <tr key={i} className="border-b border-gray-800/50 hover:bg-white/5">
                  <td className="p-3 text-gray-300">{row[xAxis]}</td>
                  <td className="p-3 text-gray-300">{row[yAxis]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    default:
      return null;
  }
}
