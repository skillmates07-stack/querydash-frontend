'use client';

import { useVisualization } from '@/contexts/VisualizationContext';
import ChartRenderer from './ChartRenderer';
import { X, Settings2 } from 'lucide-react';

interface VisualizationCardProps {
  visualization: any;
}

export default function VisualizationCard({ visualization }: VisualizationCardProps) {
  const { 
    updateVisualization, 
    deleteVisualization, 
    selectVisualization, 
    selectedViz, 
    activeDataSource 
  } = useVisualization();

  return (
    <div
      onClick={() => selectVisualization(visualization.id)}
      className={`p-6 rounded-2xl transition-all cursor-pointer ${
        selectedViz === visualization.id 
          ? 'bg-[#1a1a1a] border-2 border-accent shadow-xl shadow-accent/20' 
          : 'bg-[#1a1a1a] border-2 border-gray-800 hover:border-gray-700'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <input
          type="text"
          value={visualization.title}
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => updateVisualization(visualization.id, { title: e.target.value })}
          className="text-lg font-bold bg-transparent text-white border-none focus:outline-none w-full"
          placeholder="Chart Title"
        />
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              selectVisualization(visualization.id);
            }}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all"
          >
            <Settings2 className="w-4 h-4 text-white" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              deleteVisualization(visualization.id);
            }}
            className="p-2 rounded-lg bg-danger/10 hover:bg-danger/20 transition-all"
          >
            <X className="w-4 h-4 text-danger" />
          </button>
        </div>
      </div>

      {/* Chart */}
      <div className="h-80 rounded-lg bg-[#0d0d0d] overflow-hidden">
        <ChartRenderer 
          type={visualization.type}
          data={activeDataSource?.data || []}
          xAxis={visualization.xAxis}
          yAxis={visualization.yAxis}
          config={visualization.config}
        />
      </div>

      {/* Axes Info */}
      {(visualization.xAxis || visualization.yAxis) && (
        <div className="mt-4 flex gap-2 text-sm">
          {visualization.xAxis && (
            <div className="px-3 py-1 rounded-lg bg-accent/10 text-accent border border-accent/20">
              X: {visualization.xAxis}
            </div>
          )}
          {visualization.yAxis && (
            <div className="px-3 py-1 rounded-lg bg-accent/10 text-accent border border-accent/20">
              Y: {visualization.yAxis}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
