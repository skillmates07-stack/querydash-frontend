'use client';

import { useMemo } from 'react';
import { BarChart, LineChart, PieChart, AreaChart, MatrixChart } from './ChartRenderer';
import { Skeleton } from '@/components/ui/Skeleton';
import { useFiltering } from '@/contexts/FilteringContext';

interface VisualizationCardProps {
  visualization: {
    id: string;
    type: string; // 'bar', 'line', 'area', 'pie', 'matrix', etc
    xField: string;
    yField: string;
    groupField?: string;
    config?: any;
  };
  data: Record<string, any>[];
}

export default function VisualizationCard({ visualization, data }: VisualizationCardProps) {
  const { filters } = useFiltering();

  // Memoize filteredData for performance in large dashboards
  const filteredData = useMemo(() => data, [data]);

  // Dynamically select chart type
  let ChartComponent;
  switch (visualization.type) {
    case 'bar':
      ChartComponent = BarChart;
      break;
    case 'line':
      ChartComponent = LineChart;
      break;
    case 'area':
      ChartComponent = AreaChart;
      break;
    case 'pie':
      ChartComponent = PieChart;
      break;
    case 'matrix':
      ChartComponent = MatrixChart;
      break;
    default:
      ChartComponent = () => <div>Unknown chart type</div>;
  }

  return (
    <div className="p-6 bg-[#181c29] rounded-xl shadow flex flex-col items-stretch min-h-[320px] transition-all">
      <div className="font-bold text-lg text-white mb-2">{visualization.type.toUpperCase()} Chart</div>
      {!filteredData ? (
        <Skeleton className="h-48 w-full rounded-lg" />
      ) : filteredData.length === 0 ? (
        <div className="text-gray-400 py-10 text-center">No data matches current filters.</div>
      ) : (
        <ChartComponent
          data={filteredData}
          xField={visualization.xField}
          yField={visualization.yField}
          groupField={visualization.groupField}
          config={visualization.config}
        />
      )}
    </div>
  );
}
