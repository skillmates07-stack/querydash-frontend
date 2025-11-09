'use client';

import { useState } from 'react';

interface ConfigurationPanelProps {
  columns: string[];
  config: {
    type: string;
    xField?: string;
    yField?: string;
    color: string;
    showGrid: boolean;
    showLegend: boolean;
  };
  onChange: (newConfig: any) => void;
}

const CHART_TYPES = [
  { value: 'bar', label: 'Bar' },
  { value: 'line', label: 'Line' },
  { value: 'area', label: 'Area' },
  { value: 'pie', label: 'Pie' },
  { value: 'metric', label: 'Metric' },
  { value: 'table', label: 'Table' }
];

export default function ConfigurationPanel({ columns, config, onChange }: ConfigurationPanelProps) {
  return (
    <div className="space-y-4 text-white p-3 bg-[#181c29] rounded-md shadow">
      <div>
        <label className="block mb-1 text-xs font-bold text-gray-400">Chart Type</label>
        <select
          className="w-full rounded p-2 bg-[#23283a] border border-gray-700 text-sm"
          value={config.type}
          onChange={e => onChange({ ...config, type: e.target.value })}
        >
          {CHART_TYPES.map(opt => (<option key={opt.value} value={opt.value}>{opt.label}</option>))}
        </select>
      </div>
      <div>
        <label className="block mb-1 text-xs font-bold text-gray-400">X Axis</label>
        <select
          className="w-full rounded p-2 bg-[#23283a] border border-gray-700 text-sm"
          value={config.xField || ""}
          onChange={e => onChange({ ...config, xField: e.target.value })}
        >
          <option value="">(Select column)</option>
          {columns.map(col => (<option key={col} value={col}>{col}</option>))}
        </select>
      </div>
      <div>
        <label className="block mb-1 text-xs font-bold text-gray-400">Y Axis</label>
        <select
          className="w-full rounded p-2 bg-[#23283a] border border-gray-700 text-sm"
          value={config.yField || ""}
          onChange={e => onChange({ ...config, yField: e.target.value })}
        >
          <option value="">(Select column)</option>
          {columns.map(col => (<option key={col} value={col}>{col}</option>))}
        </select>
      </div>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={config.showGrid}
          onChange={e => onChange({ ...config, showGrid: e.target.checked })}
        />
        <span className="text-xs">Grid</span>
        <input
          type="checkbox"
          checked={config.showLegend}
          onChange={e => onChange({ ...config, showLegend: e.target.checked })}
        />
        <span className="text-xs">Legend</span>
      </div>
      <div>
        <label className="block mb-1 text-xs font-bold text-gray-400">Color</label>
        <input
          type="color"
          value={config.color}
          onChange={e => onChange({ ...config, color: e.target.value })}
          className="w-8 h-8 border rounded"
        />
      </div>
    </div>
  );
}
