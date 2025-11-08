'use client';

import {
  RiLineChartLine,
  RiBarChartBoxLine,
  RiPieChart2Line,
  RiTableLine,
  RiNumbersLine
} from 'react-icons/ri';

const chartTypes = [
  { type: 'line', icon: RiLineChartLine, name: 'Line', color: '#5b47fb' },
  { type: 'bar', icon: RiBarChartBoxLine, name: 'Bar', color: '#3b82f6' },
  { type: 'area', icon: RiLineChartLine, name: 'Area', color: '#10b981' },
  { type: 'pie', icon: RiPieChart2Line, name: 'Pie', color: '#f59e0b' },
  { type: 'metric', icon: RiNumbersLine, name: 'Metric', color: '#ef4444' },
  { type: 'table', icon: RiTableLine, name: 'Table', color: '#8b5cf6' }
];

interface ChartTypeSelectorProps {
  onSelect: (type: string) => void;
  disabled?: boolean;
}

export default function ChartTypeSelector({ onSelect, disabled }: ChartTypeSelectorProps) {
  return (
    <div className="mb-6">
      <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
        Chart Types
      </h3>
      <div className="grid grid-cols-2 gap-2">
        {chartTypes.map((chart) => {
          const Icon = chart.icon;
          return (
            <button
              key={chart.type}
              onClick={() => onSelect(chart.type)}
              disabled={disabled}
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
  );
}
