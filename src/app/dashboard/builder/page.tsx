'use client';

import { useState, useRef, useEffect } from 'react';
import {
  RiLineChartLine,
  RiBarChartBoxLine,
  RiPieChartLine,
  RiTableLine,
  RiNumbersLine,
  RiUploadCloudLine,
  RiFileExcelLine,
  RiFileLine,
  RiCloseLine,
  RiSaveLine,
  RiEyeLine,
  RiAddLine,
  RiDeleteBin6Line,
  RiSettings4Line
} from 'react-icons/ri';

interface Widget {
  id: string;
  type: 'line' | 'bar' | 'pie' | 'metric' | 'table';
  title: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export default function BuilderPage() {
  const [dashboardName, setDashboardName] = useState('Untitled Dashboard');
  const [widgets, setWidgets] = useState<Widget[]>([]);
  const [dataSource, setDataSource] = useState<any>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load data from localStorage if available
  useEffect(() => {
    const saved = localStorage.getItem('activeDataSource');
    if (saved) {
      setDataSource(JSON.parse(saved));
    }
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);

    try {
      const file = files[0];
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/dashboards/upload`, {
        method: 'POST',
        body: formData
      });

      const result = await response.json();

      if (result.success) {
        const newData = {
          id: result.data.id,
          name: result.data.name,
          rows: result.data.rows,
          columns: result.data.columns,
          data: result.data.preview
        };
        
        setDataSource(newData);
        localStorage.setItem('activeDataSource', JSON.stringify(newData));
        alert(`✅ ${file.name} uploaded! ${result.data.rows} rows loaded.`);
      } else {
        alert(`❌ Upload failed: ${result.error}`);
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('❌ Upload failed. Please try again.');
    } finally {
      setUploading(false);
      if (e.target) e.target.value = '';
    }
  };

  const addWidget = (type: Widget['type']) => {
    const newWidget: Widget = {
      id: `widget-${Date.now()}`,
      type,
      title: `New ${type} Chart`,
      x: 0,
      y: widgets.length * 300,
      width: 6,
      height: 300
    };
    setWidgets([...widgets, newWidget]);
  };

  const deleteWidget = (id: string) => {
    setWidgets(widgets.filter(w => w.id !== id));
  };

  const widgetTypes = [
    { type: 'line', icon: RiLineChartLine, name: 'Line Chart', color: '#5b47fb' },
    { type: 'bar', icon: RiBarChartBoxLine, name: 'Bar Chart', color: '#3b82f6' },
    { type: 'pie', icon: RiPieChartLine, name: 'Pie Chart', color: '#8b5cf6' },
    { type: 'metric', icon: RiNumbersLine, name: 'Metric Card', color: '#10b981' },
    { type: 'table', icon: RiTableLine, name: 'Data Table', color: '#f59e0b' }
  ];

  return (
    <div className="h-screen flex flex-col bg-[#0a0f1e]">
      {/* Top Toolbar */}
      <div className="flex items-center justify-between px-6 py-4 bg-[#0d0d0d] border-b border-gray-800">
        <div className="flex items-center gap-4">
          <RiLineChartLine className="text-2xl text-accent" />
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
        {/* Left Sidebar - Widgets */}
        <div className="w-80 bg-[#0d0d0d] border-r border-gray-800 overflow-y-auto">
          <div className="p-6">
            {/* Data Upload Section */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Data Source
              </h3>
              
              {!dataSource ? (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="p-6 rounded-xl border-2 border-dashed border-gray-800 hover:border-accent/50 cursor-pointer transition-all text-center"
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".xlsx,.xls,.csv"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  {uploading ? (
                    <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                  ) : (
                    <RiUploadCloudLine className="text-4xl text-accent mx-auto mb-3" />
                  )}
                  <p className="text-sm text-white font-medium mb-1">
                    {uploading ? 'Uploading...' : 'Upload Data'}
                  </p>
                  <p className="text-xs text-gray-500">Excel or CSV</p>
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-[#1a1a1a] border border-gray-800">
                  <div className="flex items-center gap-3 mb-3">
                    <RiFileExcelLine className="text-2xl text-accent" />
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-medium truncate">{dataSource.name}</p>
                      <p className="text-xs text-gray-500">{dataSource.rows} rows</p>
                    </div>
                  </div>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full px-3 py-1.5 rounded-lg bg-white/5 text-sm text-white hover:bg-white/10 transition-all"
                  >
                    Change Data
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".xlsx,.xls,.csv"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>
              )}
            </div>

            {/* Widget Types */}
            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Add Widget
              </h3>
              <div className="space-y-2">
                {widgetTypes.map((widget, i) => {
                  const Icon = widget.icon;
                  return (
                    <button
                      key={i}
                      onClick={() => addWidget(widget.type as any)}
                      disabled={!dataSource}
                      className="w-full flex items-center gap-3 p-3 rounded-xl bg-[#1a1a1a] border border-gray-800 hover:border-accent/50 transition-all text-left group disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform"
                        style={{ backgroundColor: widget.color + '20' }}
                      >
                        <Icon className="text-xl" style={{ color: widget.color }} />
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-medium">{widget.name}</p>
                        <p className="text-xs text-gray-500">Click to add</p>
                      </div>
                      <RiAddLine className="text-gray-600 group-hover:text-accent" />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Data Preview */}
            {dataSource && (
              <div className="mt-6 pt-6 border-t border-gray-800">
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                  Columns ({dataSource.columns?.length || 0})
                </h3>
                <div className="space-y-1 max-h-64 overflow-y-auto">
                  {dataSource.columns?.map((col: string, i: number) => (
                    <div
                      key={i}
                      className="px-3 py-2 rounded-lg bg-accent/10 border border-accent/20 text-accent text-sm"
                    >
                      {col}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main Canvas */}
        <div className="flex-1 overflow-auto p-8">
          {widgets.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center max-w-md">
                <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-accent/20 to-purple-500/20 border border-accent/30 flex items-center justify-center">
                  <RiLineChartLine className="text-5xl text-accent" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  Start Building Your Dashboard
                </h3>
                <p className="text-gray-400 mb-6">
                  {!dataSource 
                    ? 'Upload data from the left sidebar to get started' 
                    : 'Add widgets from the left sidebar to create custom visualizations'}
                </p>
                {!dataSource && (
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-6 py-3 rounded-lg bg-accent text-white hover:bg-accent/90 transition-all inline-flex items-center gap-2"
                  >
                    <RiUploadCloudLine />
                    Upload Data
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-12 gap-4">
              {widgets.map((widget) => {
                const widgetType = widgetTypes.find(w => w.type === widget.type);
                const Icon = widgetType?.icon || RiLineChartLine;

                return (
                  <div
                    key={widget.id}
                    className="col-span-6 group"
                  >
                    <div className="h-80 p-6 rounded-2xl bg-[#1a1a1a] border-2 border-gray-800 hover:border-accent/30 transition-all">
                      {/* Widget Header */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
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
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all">
                            <RiSettings4Line className="text-white" />
                          </button>
                          <button
                            onClick={() => deleteWidget(widget.id)}
                            className="p-2 rounded-lg bg-danger/10 hover:bg-danger/20 transition-all"
                          >
                            <RiDeleteBin6Line className="text-danger" />
                          </button>
                        </div>
                      </div>

                      {/* Widget Content */}
                      <div className="flex items-center justify-center h-56 rounded-lg bg-[#0d0d0d] border border-gray-800">
                        <div className="text-center">
                          <Icon className="text-4xl text-gray-600 mx-auto mb-2" />
                          <p className="text-sm text-gray-500">Configure data source</p>
                          <p className="text-xs text-gray-600 mt-1">Drag columns to visualize</p>
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
    </div>
  );
}
