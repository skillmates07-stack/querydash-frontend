'use client';

import { RiCloseLine } from 'react-icons/ri';

interface Visualization {
  id: string;
  type: string;
  title: string;
  xAxis?: string;
  yAxis?: string;
  config: {
    color: string;
    showGrid: boolean;
    showLegend: boolean;
  };
}

interface ConfigurationPanelProps {
  visualization: Visualization;
  columns: string[];
  onUpdate: (updates: Partial<Visualization>) => void;
  onClose: () => void;
}

const CHART_COLORS = ['#5b47fb', '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

export default function ConfigurationPanel({ 
  visualization, 
  columns, 
  onUpdate, 
  onClose 
}: ConfigurationPanelProps) {
  return (
    <div className="w-80 bg-[#0d0d0d] border-l border-gray-800 overflow-y-auto">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-sm font-semibold text-white">Configuration</h3>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-white/10 transition-all"
          >
            <RiCloseLine className="text-gray-400" />
          </button>
        </div>

        <div className="space-y-4">
          {/* X Axis */}
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              X Axis
            </label>
            <select
              value={visualization.xAxis || ''}
              onChange={(e) => onUpdate({ xAxis: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-[#1a1a1a] border border-gray-800 text-white focus:outline-none focus:border-accent"
            >
              <option value="">Select field...</option>
              {columns.map((col, i) => (
                <option key={i} value={col}>{col}</option>
              ))}
            </select>
          </div>

          {/* Y Axis */}
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Y Axis
            </label>
            <select
              value={visualization.yAxis || ''}
              onChange={(e) => onUpdate({ yAxis: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-[#1a1a1a] border border-gray-800 text-white focus:outline-none focus:border-accent"
            >
              <option value="">Select field...</option>
              {columns.map((col, i) => (
                <option key={i} value={col}>{col}</option>
              ))}
            </select>
          </div>

          {/* Color Picker */}
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Color
            </label>
            <div className="grid grid-cols-6 gap-2">
              {CHART_COLORS.map((color) => (
                <button
                  key={color}
                  onClick={() => onUpdate({ 
                    config: { ...visualization.config, color }
                  })}
                  className={`w-10 h-10 rounded-lg border-2 transition-all ${
                    visualization.config.color === color 
                      ? 'border-white scale-110' 
                      : 'border-transparent'
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          {/* Toggles */}
          <div className="space-y-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={visualization.config.showGrid}
                onChange={(e) => onUpdate({
                  config: { ...visualization.config, showGrid: e.target.checked }
                })}
                className="w-4 h-4 rounded bg-[#1a1a1a] border-gray-800"
              />
              <span className="text-sm text-white">Show Grid</span>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={visualization.config.showLegend}
                onChange={(e) => onUpdate({
                  config: { ...visualization.config, showLegend: e.target.checked }
                })}
                className="w-4 h-4 rounded bg-[#1a1a1a] border-gray-800"
              />
              <span className="text-sm text-white">Show Legend</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
