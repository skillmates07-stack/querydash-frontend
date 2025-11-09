'use client';

import { useMemo } from 'react';
import ChartRenderer from './ChartRenderer';
import Skeleton from '@/components/ui/Skeleton';
import { useFiltering } from '@/contexts/FilteringContext';

interface VisualizationCardProps {
  visualization: {
    id: string;
    type: string; // 'bar', 'line', 'area', 'pie', 'matrix', 'metric', 'table', etc
    xField?: string;
    yField?: string;
    groupField?: string;
    config: any;
  };
  data: Record<string, any>[];
}

export default function VisualizationCard({ visualization, data }: VisualizationCardProps) {
  const { filters } = useFiltering();
  const filteredData = useMemo(() => data, [data]);

  return (
    <div className="p-6 bg-[#181c29] rounded-xl shadow flex flex-col items-stretch min-h-[320px] transition-all">
      <div className="font-bold text-lg text-white mb-2">{visualization.type.toUpperCase()} Chart</div>
      {!filteredData ? (
        <Skeleton className="h-48 w-full rounded-lg" />
      ) : filteredData.length === 0 ? (
        <div className="text-gray-400 py-10 text-center">No data matches current filters.</div>
      ) : (
        <ChartRenderer
          type={visualization.type}
          data={filteredData}
          xAxis={visualization.xField}
          yAxis={visualization.yField}
          config={visualization.config || {
            color: "#6366f1",
            showGrid: true,
            showLegend: true
          }}
        />
      )}
    </div>
  );
}
