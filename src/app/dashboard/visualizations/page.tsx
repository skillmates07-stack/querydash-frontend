'use client';

import { useState, useEffect } from 'react';
import {
  RiDatabase2Line,
  RiLineChartLine,
  RiBarChartBoxLine,
  RiPieChart2Line,
  RiTableLine,
  RiNumbersLine,
  RiCloseLine,
  RiSaveLine,
  RiShareLine,
  RiDownloadLine,
  RiFilterLine,
  RiLayoutGridLine
} from 'react-icons/ri';
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

interface DataSource {
  name: string;
  rows: number;
  columns: string[];
  data: any[];
}

interface Visualization {
  id: string;
  type: 'line' | 'bar' | 'pie' | 'area' | 'metric' | 'table';
  title: string;
  xAxis?: string;
  yAxis?: string;
  config: {
    color: string;
    showGrid: boolean;
    showLegend: boolean;
  };
}

const CHART_COLORS = ['#5b47fb', '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

export default function VisualizationsPage() {
  const [dataSource, setDataSource] = useState<DataSource | null>(null);
  const [visualizations, setVisualizations] = useState<Visualization[]>([]);
  const [selectedViz, setSelectedViz] = useState<string | null>(null);
  const [showDataPanel, setShowDataPanel] = useState(true);
  const [showConfigPanel, setShowConfigPanel] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('activeDataSource');
    if (saved) {
      setDataSource(JSON.parse(saved));
    }
  }, []);

  const addVisualization = (type: Visualization['type']) => {
    const newViz: Visualization = {
      id: `viz-${Date.now()}`,
      type,
      title: `New ${type.charAt(0).toUpperCase() + type.slice(1)} Chart`,
      config: {
        color: CHART_COLORS[0],
        showGrid: true,
        showLegend: true
      }
    };
    setVisualizations([...visualizations, newViz]);
    setSelectedViz(newViz.id);
    setShowConfigPanel(true);
  };

  const updateVisualization = (id: string, updates: Partial<Visualization>) => {
    setVisualizations(visualizations.map(v => 
      v.id === id ? { ...v, ...updates } : v
    ));
  };

  const deleteVisualization = (id: string) => {
    setVisualizations(visualizations.filter(v => v.id !== id));
    if (selectedViz === id) {
      setSelectedViz(null);
      setShowConfigPanel(false);
    }
  };

  const renderChart = (viz: Visualization) => {
    if (!dataSource || !viz.xAxis || !viz.yAxis) {
      return (
        <div className="h-full flex items-center justify-center text-gray-500">
          <div className="text-center">
            <RiDatabase2Line className="text-5xl mx-auto mb-3 opacity-50" />
            <p className="text-sm">Configure X and Y axes</p>
          </div>
        </div>
      );
    }

    const chartData = dataSource.data.slice(0, 20);

    switch (viz.type) {
      case 'line':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              {viz.config.showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />}
              <XAxis dataKey={viz.xAxis} stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1a1a1a', 
                  border: '1px solid #2a2a2a',
                  borderRadius: '8px'
                }} 
              />
              {viz.config.showLegend && <Legend />}
              <Line 
                type="monotone" 
                dataKey={viz.yAxis} 
                stroke={viz.config.color} 
                strokeWidth={3}
                dot={{ fill: viz.config.color, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        );

      case 'bar':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              {viz.config.showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />}
              <XAxis dataKey={viz.xAxis} stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1a1a1a', 
                  border: '1px solid #2a2a2a',
                  borderRadius: '8px'
                }} 
              />
              {viz.config.showLegend && <Legend />}
              <Bar dataKey={viz.yAxis} fill={viz.config.color} radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        );

      case 'area':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              {viz.config.showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />}
              <XAxis dataKey={viz.xAxis} stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1a1a1a', 
                  border: '1px solid #2a2a2a',
                  borderRadius: '8px'
                }} 
              />
              {viz.config.showLegend && <Legend />}
              <Area 
                type="monotone" 
                dataKey={viz.yAxis} 
                stroke={viz.config.color}
                fill={viz.config.color}
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        );

      case 'pie': {
        const xKey = viz.xAxis;
        const yKey = viz.yAxis;

        const pieData = chartData.slice(0, 6).map((item, index) => ({
          name: String(item[xKey] || 'Unknown'),
          value: parseFloat(String(item[yKey])) || 0
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
      }

      case 'metric': {
        const yMetricKey = viz.yAxis;
        const metricValue = chartData.reduce((sum, item) => 
          sum + (parseFloat(String(item[yMetricKey])) || 0), 0
        );
        
        return (
          <div className="h-full flex flex-col items-center justify-center">
            <p className="text-sm text-gray-400 mb-2">{viz.yAxis}</p>
            <p className="text-6xl font-bold" style={{ color: viz.config.color }}>
              {metricValue.toLocaleString()}
            </p>
          </div>
        );
      }

      case 'table': {
        const xTableKey = viz.xAxis;
        const yTableKey = viz.yAxis;

        return (
          <div className="h-full overflow-auto">
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-[#1a1a1a]">
                <tr>
                  <th className="text-left p-3 font-semibold text-gray-300 border-b border-gray-800">
                    {viz.xAxis}
                  </th>
                  <th className="text-left p-3 font-semibold text-gray-300 border-b border-gray-800">
                    {viz.yAxis}
                  </th>
                </tr>
              </thead>
              <tbody>
                {chartData.map((row, i) => (
                  <tr key={i} className="border-b border-gray-800/50 hover:bg-white/5">
                    <td className="p-3 text-gray-300">{String(row[xTableKey] || '-')}</td>
                    <td className="p-3 text-gray-300">{String(row[yTableKey] || '-')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }

      default:
        return null;
    }
  };

  const selectedVisualization = visualizations.find(v => v.id === selectedViz);

  return (
    <div className="h-screen flex flex-col bg-[#0a0f1e]">
      {/* Top Toolbar */}
      <div className="flex items-center justify-between px-6 py-4 bg-[#0d0d0d] border-b border-gray-800">
        <div className="flex items-center gap-4">
          <RiLayoutGridLine className="text-2xl text-accent" />
          <h1 className="text-xl font-bold text-white">Visualizations</h1>
          {dataSource && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-accent/10 border border-accent/20">
              <RiDatabase2Line className="text-accent" />
              <span className="text-sm text-accent font-medium">{dataSource.name}</span>
              <span className="text-xs text-gray-500">• {dataSource.rows} rows</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all">
            <RiFilterLine className="text-white" />
          </button>
          <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all">
            <RiDownloadLine className="text-white" />
          </button>
          <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all">
            <RiShareLine className="text-white" />
          </button>
          <button className="px-6 py-2 rounded-lg bg-accent text-white hover:bg-accent/90 transition-all flex items-center gap-2">
            <RiSaveLine />
            <span>Save</span>
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Data Fields */}
        {showDataPanel && (
          <div className="w-80 bg-[#0d0d0d] border-r border-gray-800 overflow-y-auto">
            <div className="p-6">
              {/* Chart Types */}
              <div className="mb-6">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                  Chart Types
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { type: 'line', icon: RiLineChartLine, name: 'Line', color: '#5b47fb' },
                    { type: 'bar', icon: RiBarChartBoxLine, name: 'Bar', color: '#3b82f6' },
                    { type: 'area', icon: RiLineChartLine, name: 'Area', color: '#10b981' },
                    { type: 'pie', icon: RiPieChart2Line, name: 'Pie', color: '#f59e0b' },
                    { type: 'metric', icon: RiNumbersLine, name: 'Metric', color: '#ef4444' },
                    { type: 'table', icon: RiTableLine, name: 'Table', color: '#8b5cf6' }
                  ].map((chart) => {
                    const Icon = chart.icon;
                    return (
                      <button
                        key={chart.type}
                        onClick={() => addVisualization(chart.type as any)}
                        disabled={!dataSource}
                        className="flex flex-col items-center gap-2 p-4 rounded-xl bg-[#1a1a1a] border border-gray-800 hover:border-accent/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: chart.color + '20' }}
                        >
                          <Icon className="text-xl" style={{ color: chart.color }} />
                        </div>
                        <span className="text-xs font-medium text-white">{chart.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Data Fields */}
              {dataSource ? (
                <div>
                  <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                    Fields ({dataSource.columns.length})
                  </h3>
                  <div className="space-y-1">
                    {dataSource.columns.map((column, i) => (
                      <div
                        key={i}
                        className="px-3 py-2 rounded-lg bg-accent/10 border border-accent/20 text-accent text-sm font-medium cursor-move hover:bg-accent/20 transition-all"
                      >
                        {column}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <RiDatabase2Line className="text-5xl text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-500 mb-4">No data source loaded</p>
                  <a
                    href="/dashboard/data-sources"
                    className="px-4 py-2 rounded-lg bg-accent text-white hover:bg-accent/90 transition-all inline-block"
                  >
                    Load Data
                  </a>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Main Canvas */}
        <div className="flex-1 overflow-auto p-6">
          {visualizations.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center max-w-md">
                <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-accent/20 to-purple-500/20 border border-accent/30 flex items-center justify-center">
                  <RiLineChartLine className="text-5xl text-accent" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-3">
                  Create Your First Visualization
                </h2>
                <p className="text-gray-400 mb-6">
                  {!dataSource 
                    ? 'Load a data source to get started' 
                    : 'Select a chart type from the left panel'}
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 auto-rows-fr">
              {visualizations.map((viz) => (
                <div
                  key={viz.id}
                  onClick={() => {
                    setSelectedViz(viz.id);
                    setShowConfigPanel(true);
                  }}
                  className={`p-6 rounded-2xl bg-[#1a1a1a] border-2 transition-all cursor-pointer ${
                    selectedViz === viz.id 
                      ? 'border-accent shadow-xl shadow-accent/20' 
                      : 'border-gray-800 hover:border-gray-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <input
                      type="text"
                      value={viz.title}
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) => updateVisualization(viz.id, { title: e.target.value })}
                      className="text-lg font-bold bg-transparent text-white border-none focus:outline-none"
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteVisualization(viz.id);
                      }}
                      className="p-2 rounded-lg bg-danger/10 hover:bg-danger/20 transition-all"
                    >
                      <RiCloseLine className="text-danger" />
                    </button>
                  </div>

                  <div className="h-80 rounded-lg bg-[#0d0d0d]">
                    {renderChart(viz)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Panel - Configuration */}
        {showConfigPanel && selectedVisualization && (
          <div className="w-80 bg-[#0d0d0d] border-l border-gray-800 overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-semibold text-white">Configuration</h3>
                <button
                  onClick={() => setShowConfigPanel(false)}
                  className="p-1 rounded hover:bg-white/10 transition-all"
                >
                  <RiCloseLine className="text-gray-400" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    X Axis
                  </label>
                  <select
                    value={selectedVisualization.xAxis || ''}
                    onChange={(e) => updateVisualization(selectedViz!, { xAxis: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg bg-[#1a1a1a] border border-gray-800 text-white focus:outline-none focus:border-accent"
                  >
                    <option value="">Select field...</option>
                    {dataSource?.columns.map((col, i) => (
                      <option key={i} value={col}>{col}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    Y Axis
                  </label>
                  <select
                    value={selectedVisualization.yAxis || ''}
                    onChange={(e) => updateVisualization(selectedViz!, { yAxis: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg bg-[#1a1a1a] border border-gray-800 text-white focus:outline-none focus:border-accent"
                  >
                    <option value="">Select field...</option>
                    {dataSource?.columns.map((col, i) => (
                      <option key={i} value={col}>{col}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    Color
                  </label>
                  <div className="grid grid-cols-6 gap-2">
                    {CHART_COLORS.map((color) => (
                      <button
                        key={color}
                        onClick={() => updateVisualization(selectedViz!, { 
                          config: { ...selectedVisualization.config, color }
                        })}
                        className={`w-10 h-10 rounded-lg border-2 transition-all ${
                          selectedVisualization.config.color === color 
                            ? 'border-white scale-110' 
                            : 'border-transparent'
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedVisualization.config.showGrid}
                      onChange={(e) => updateVisualization(selectedViz!, {
                        config: { ...selectedVisualization.config, showGrid: e.target.checked }
                      })}
                      className="w-4 h-4 rounded bg-[#1a1a1a] border-gray-800"
                    />
                    <span className="text-sm text-white">Show Grid</span>
                  </label>

                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedVisualization.config.showLegend}
                      onChange={(e) => updateVisualization(selectedViz!, {
                        config: { ...selectedVisualization.config, showLegend: e.target.checked }
                      })}
                      className="w-4 h-4 rounded bg-[#1a1a1a] border-gray-800"
                    />
                    <span className="text-sm text-white">Show Legend</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
