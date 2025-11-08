'use client';

import { useVisualization } from '@/contexts/VisualizationContext';
import { X, Settings2, Palette, Eye, EyeOff } from 'lucide-react';

const CHART_COLORS = [
  { name: 'Purple', value: '#5b47fb' },
  { name: 'Blue', value: '#3b82f6' },
  { name: 'Green', value: '#10b981' },
  { name: 'Orange', value: '#f59e0b' },
  { name: 'Red', value: '#ef4444' },
  { name: 'Pink', value: '#ec4899' }
];

export default function ConfigurationPanel() {
  const { 
    selectedViz, 
    visualizations, 
    updateVisualization, 
    selectVisualization,
    activeDataSource 
  } = useVisualization();

  if (!selectedViz) return null;

  const visualization = visualizations.find(v => v.id === selectedViz);
  if (!visualization) return null;

  return (
    <div className="w-80 bg-[#0d0d0d] border-l border-gray-800 overflow-y-auto">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Settings2 className="w-5 h-5 text-accent" />
            <h3 className="text-sm font-semibold text-white">Configuration</h3>
          </div>
          <button
            onClick={() => selectVisualization(null)}
            className="p-1.5 rounded-lg hover:bg-white/10 transition-all"
          >
            <X className="w-4 h-4 text-gray-400" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Data Mapping */}
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              X Axis
            </label>
            <select
              value={visualization.xAxis || ''}
              onChange={(e) => updateVisualization(selectedViz, { xAxis: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg bg-[#1a1a1a] border border-gray-800 text-white text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
            >
              <option value="">Select field...</option>
              {activeDataSource?.columns.map((col, i) => (
                <option key={i} value={col}>{col}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Y Axis
            </label>
            <select
              value={visualization.yAxis || ''}
              onChange={(e) => updateVisualization(selectedViz, { yAxis: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg bg-[#1a1a1a] border border-gray-800 text-white text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
            >
              <option value="">Select field...</option>
              {activeDataSource?.columns.map((col, i) => (
                <option key={i} value={col}>{col}</option>
              ))}
            </select>
          </div>

          {/* Color Palette */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Palette className="w-4 h-4 text-gray-400" />
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Color
              </label>
            </div>
            <div className="grid grid-cols-6 gap-2">
              {CHART_COLORS.map((color) => (
                <button
                  key={color.value}
                  onClick={() => updateVisualization(selectedViz, { 
                    config: { ...visualization.config, color: color.value }
                  })}
                  className={`w-10 h-10 rounded-lg transition-all ${
                    visualization.config.color === color.value 
                      ? 'ring-2 ring-white ring-offset-2 ring-offset-[#0d0d0d] scale-110' 
                      : 'hover:scale-105'
                  }`}
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          {/* Display Options */}
          <div>
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 block">
              Display Options
            </label>
            <div className="space-y-3">
              <label className="flex items-center gap-3 p-3 rounded-lg bg-[#1a1a1a] border border-gray-800 hover:border-gray-700 cursor-pointer transition-all group">
                <input
                  type="checkbox"
                  checked={visualization.config.showGrid}
                  onChange={(e) => updateVisualization(selectedViz, {
                    config: { ...visualization.config, showGrid: e.target.checked }
                  })}
                  className="w-4 h-4 rounded bg-[#0d0d0d] border-gray-700 text-accent focus:ring-accent focus:ring-offset-0"
                />
                <div className="flex items-center gap-2 flex-1">
                  {visualization.config.showGrid ? (
                    <Eye className="w-4 h-4 text-accent" />
                  ) : (
                    <EyeOff className="w-4 h-4 text-gray-500" />
                  )}
                  <span className="text-sm text-white group-hover:text-accent transition-colors">
                    Show Grid Lines
                  </span>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3 rounded-lg bg-[#1a1a1a] border border-gray-800 hover:border-gray-700 cursor-pointer transition-all group">
                <input
                  type="checkbox"
                  checked={visualization.config.showLegend}
                  onChange={(e) => updateVisualization(selectedViz, {
                    config: { ...visualization.config, showLegend: e.target.checked }
                  })}
                  className="w-4 h-4 rounded bg-[#0d0d0d] border-gray-700 text-accent focus:ring-accent focus:ring-offset-0"
                />
                <div className="flex items-center gap-2 flex-1">
                  {visualization.config.showLegend ? (
                    <Eye className="w-4 h-4 text-accent" />
                  ) : (
                    <EyeOff className="w-4 h-4 text-gray-500" />
                  )}
                  <span className="text-sm text-white group-hover:text-accent transition-colors">
                    Show Legend
                  </span>
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
