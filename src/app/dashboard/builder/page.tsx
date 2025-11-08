'use client';

import { useState } from 'react';
import {
  RiAddLine,
  RiLayoutGridLine,
  RiLineChartLine,
  RiBarChartBoxLine,
  RiPieChartLine,
  RiNumbersLine,
  RiTableLine,
  RiSaveLine,
  RiEyeLine,
  RiDeleteBin6Line,
  RiSettings4Line,
  RiDragMoveLine
} from 'react-icons/ri';

interface Widget {
  id: string;
  type: 'chart' | 'metric' | 'table';
  title: string;
  size: 'small' | 'medium' | 'large';
  position: { x: number; y: number };
}

export default function DashboardBuilderPage() {
  const [widgets, setWidgets] = useState<Widget[]>([]);
  const [selectedWidget, setSelectedWidget] = useState<string | null>(null);
  const [dashboardName, setDashboardName] = useState('Untitled Dashboard');

  const widgetTemplates = [
    { type: 'chart', icon: RiLineChartLine, name: 'Line Chart', color: '#5b47fb' },
    { type: 'chart', icon: RiBarChartBoxLine, name: 'Bar Chart', color: '#3b82f6' },
    { type: 'chart', icon: RiPieChartLine, name: 'Pie Chart', color: '#8b5cf6' },
    { type: 'metric', icon: RiNumbersLine, name: 'Metric Card', color: '#10b981' },
    { type: 'table', icon: RiTableLine, name: 'Data Table', color: '#f59e0b' }
  ];

  const addWidget = (type: string) => {
    const newWidget: Widget = {
      id: `widget-${Date.now()}`,
      type: type as any,
      title: `New ${type}`,
      size: 'medium',
      position: { x: 0, y: widgets.length * 100 }
    };
    setWidgets([...widgets, newWidget]);
  };

  const removeWidget = (id: string) => {
    setWidgets(widgets.filter(w => w.id !== id));
    if (selectedWidget === id) setSelectedWidget(null);
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Top toolbar */}
      <div className="flex items-center justify-between px-6 py-4 bg-[#0d0d0d] border-b border-gray-800">
        <div className="flex items-center gap-4">
          <RiLayoutGridLine className="text-2xl text-accent" />
          <input
            type="text"
            value={dashboardName}
            onChange={(e) => setDashboardName(e.target.value)}
            className="text-xl font-bold bg-transparent text-white border-none focus:outline-none focus:border-b-2 focus:border-accent"
          />
        </div>

        <div className="flex items-center gap-3">
          <button className="px-4 py-2 rounded-lg bg-[#1a1a1a] border border-gray-800 text-white hover:border-accent transition-all flex items-center gap-2">
            <RiEyeLine />
            <span>Preview</span>
          </button>
          <button className="px-6 py-2 rounded-lg bg-accent text-white hover:bg-accent/90 transition-all flex items-center gap-2 shadow-lg shadow-accent/20">
            <RiSaveLine />
            <span>Save Dashboard</span>
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Left sidebar - Widget templates */}
        <div className="w-80 bg-[#0d0d0d] border-r border-gray-800 overflow-y-auto">
          <div className="p-6">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
              Add Widget
            </h3>

            <div className="space-y-3">
              {widgetTemplates.map((template, i) => {
                const Icon = template.icon;
                return (
                  <button
                    key={i}
                    onClick={() => addWidget(template.type)}
                    className="w-full flex items-center gap-4 p-4 rounded-xl bg-[#1a1a1a] border border-gray-800 hover:border-accent/50 transition-all group"
                  >
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform"
                      style={{ backgroundColor: template.color + '20' }}
                    >
                      <Icon className="text-2xl" style={{ color: template.color }} />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-medium text-white">{template.name}</p>
                      <p className="text-xs text-gray-500">Click to add</p>
                    </div>
                    <RiAddLine className="text-xl text-gray-600 group-hover:text-accent transition-colors" />
                  </button>
                );
              })}
            </div>

            {/* Pro tip */}
            <div className="mt-8 p-4 rounded-xl bg-gradient-to-br from-accent/10 to-purple-500/10 border border-accent/20">
              <div className="flex items-start gap-3">
                <div className="text-2xl">💡</div>
                <div>
                  <p className="text-sm font-medium text-white mb-1">Pro Tip</p>
                  <p className="text-xs text-gray-400">
                    Drag widgets to rearrange. Click to configure data sources.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main canvas */}
        <div className="flex-1 bg-[#0a0f1e] overflow-auto">
          <div className="p-8 min-h-full">
            {widgets.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center max-w-md">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-accent/20 to-purple-500/20 border border-accent/30 flex items-center justify-center">
                    <RiLayoutGridLine className="text-5xl text-accent" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">
                    Start Building Your Dashboard
                  </h3>
                  <p className="text-gray-400 mb-6">
                    Add widgets from the left sidebar to create custom visualizations. 
                    Drag to arrange and click to configure.
                  </p>
                  <button
                    onClick={() => addWidget('chart')}
                    className="px-6 py-3 rounded-lg bg-accent text-white hover:bg-accent/90 transition-all inline-flex items-center gap-2"
                  >
                    <RiAddLine />
                    Add First Widget
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-12 gap-4">
                {widgets.map((widget) => {
                  const Icon = widget.type === 'chart' 
                    ? RiLineChartLine 
                    : widget.type === 'metric' 
                    ? RiNumbersLine 
                    : RiTableLine;

                  const sizeClasses = {
                    small: 'col-span-4',
                    medium: 'col-span-6',
                    large: 'col-span-12'
                  };

                  return (
                    <div
                      key={widget.id}
                      className={`${sizeClasses[widget.size]} group`}
                      onClick={() => setSelectedWidget(widget.id)}
                    >
                      <div
                        className={`h-64 p-6 rounded-2xl bg-[#1a1a1a] border-2 transition-all cursor-move ${
                          selectedWidget === widget.id
                            ? 'border-accent shadow-xl shadow-accent/20'
                            : 'border-gray-800 hover:border-gray-700'
                        }`}
                      >
                        {/* Widget header */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <RiDragMoveLine className="text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <Icon className="text-xl text-accent" />
                            <input
                              type="text"
                              value={widget.title}
                              onChange={(e) => {
                                const updated = widgets.map(w =>
                                  w.id === widget.id ? { ...w, title: e.target.value } : w
                                );
                                setWidgets(updated);
                              }}
                              className="bg-transparent text-white font-medium focus:outline-none"
                            />
                          </div>
                          <div className="flex items-center gap-2">
                            <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all opacity-0 group-hover:opacity-100">
                              <RiSettings4Line className="text-white" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                removeWidget(widget.id);
                              }}
                              className="p-2 rounded-lg bg-danger/10 hover:bg-danger/20 transition-all opacity-0 group-hover:opacity-100"
                            >
                              <RiDeleteBin6Line className="text-danger" />
                            </button>
                          </div>
                        </div>

                        {/* Widget placeholder content */}
                        <div className="flex items-center justify-center h-40 rounded-lg bg-[#0d0d0d] border border-gray-800">
                          <div className="text-center">
                            <Icon className="text-4xl text-gray-600 mx-auto mb-2" />
                            <p className="text-sm text-gray-500">Configure data source</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right sidebar - Widget settings */}
        {selectedWidget && (
          <div className="w-80 bg-[#0d0d0d] border-l border-gray-800 overflow-y-auto">
            <div className="p-6">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
                Widget Settings
              </h3>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Widget Size
                  </label>
                  <select
                    className="w-full px-4 py-2 rounded-lg bg-[#1a1a1a] border border-gray-800 text-white focus:outline-none focus:border-accent"
                    value={widgets.find(w => w.id === selectedWidget)?.size}
                    onChange={(e) => {
                      const updated = widgets.map(w =>
                        w.id === selectedWidget ? { ...w, size: e.target.value as any } : w
                      );
                      setWidgets(updated);
                    }}
                  >
                    <option value="small">Small (4 columns)</option>
                    <option value="medium">Medium (6 columns)</option>
                    <option value="large">Large (12 columns)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Data Source
                  </label>
                  <select className="w-full px-4 py-2 rounded-lg bg-[#1a1a1a] border border-gray-800 text-white focus:outline-none focus:border-accent">
                    <option>Select connector...</option>
                    <option>Stripe</option>
                    <option>PostgreSQL</option>
                    <option>Shopify</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Metric
                  </label>
                  <select className="w-full px-4 py-2 rounded-lg bg-[#1a1a1a] border border-gray-800 text-white focus:outline-none focus:border-accent">
                    <option>Select metric...</option>
                    <option>Revenue</option>
                    <option>Users</option>
                    <option>Orders</option>
                  </select>
                </div>

                <button className="w-full px-4 py-3 rounded-lg bg-accent text-white hover:bg-accent/90 transition-all">
                  Apply Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
