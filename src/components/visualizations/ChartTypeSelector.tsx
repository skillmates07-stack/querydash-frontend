'use client';

import { useVisualization } from '@/contexts/VisualizationContext';
import {
  RiLineChartLine,
  RiBarChartBoxLine,
  RiPieChart2Line,
  RiTableLine,
  RiNumbersLine,
  RiStackLine
} from 'react-icons/ri';

const chartTypes = [
  { 
    type: 'line', 
    icon: RiLineChartLine, 
    name: 'Line Chart', 
    color: '#5b47fb',
    description: 'Show trends over time'
  },
  { 
    type: 'bar', 
    icon: RiBarChartBoxLine, 
    name: 'Bar Chart', 
    color: '#3b82f6',
    description: 'Compare categories'
  },
  { 
    type: 'area', 
    icon: RiStackLine, 
    name: 'Area Chart', 
    color: '#10b981',
    description: 'Show volume over time'
  },
  { 
    type: 'pie', 
    icon: RiPieChart2Line, 
    name: 'Pie Chart', 
    color: '#f59e0b',
    description: 'Show proportions'
  },
  { 
    type: 'metric', 
    icon: RiNumbersLine, 
    name: 'Metric Card', 
    color: '#ef4444',
    description: 'Display key numbers'
  },
  { 
    type: 'table', 
    icon: RiTableLine, 
    name: 'Data Table', 
    color: '#8b5cf6',
    description: 'Show raw data'
  }
];

export default function ChartTypeSelector() {
  const { addVisualization } = useVisualization();

  return (
    <div className="p-6 border-t border-gray-800">
      <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
        Add Visualization
      </h3>
      <div className="grid grid-cols-2 gap-3">
        {chartTypes.map((chart) => {
          const Icon = chart.icon;
          return (
            <button
              key={chart.type}
              onClick={() => addVisualization(chart.type as any)}
              className="group p-4 rounded-xl bg-[#1a1a1a] border border-gray-800 hover:border-accent/50 transition-all text-left"
            >
              <div className="flex items-center gap-3 mb-2">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: chart.color + '20' }}
                >
                  <Icon className="text-xl" style={{ color: chart.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white truncate">{chart.name}</p>
                  <p className="text-xs text-gray-500 truncate">{chart.description}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
