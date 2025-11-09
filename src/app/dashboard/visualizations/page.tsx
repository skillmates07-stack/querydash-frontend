'use client';

import { useState } from 'react';
import { useVisualization } from '@/contexts/VisualizationContext';
import { useFiltering } from '@/contexts/FilteringContext';
import FilteringPanel from '@/components/visualizations/FilteringPanel';
import DataSourceManager from '@/components/visualizations/DataSourceManager';
import ChartTypeSelector from '@/components/visualizations/ChartTypeSelector';
import VisualizationCard from '@/components/visualizations/VisualizationCard';
import ConfigurationPanel from '@/components/visualizations/ConfigurationPanel';
import { LayoutGrid, SlidersHorizontal } from 'lucide-react';

interface DataSource {
  columns: string[];
  data: Record<string, any>[];
  rows?: number;
  name?: string;
}

function getCategoryOptions(dataSource?: DataSource | null) {
  if (!dataSource) return {};
  const options: Record<string, string[]> = {};
  dataSource.columns.forEach((col) => {
    const uniques = new Set(dataSource.data.slice(0, 200).map(row => String(row[col])));
    if (uniques.size > 1 && uniques.size < 30) {
      options[col] = Array.from(uniques);
    }
  });
  return options;
}

type Row = Record<string, any>;
interface Filters {
  search?: string;
  dateRange: { start: Date | null; end: Date | null };
  categories: Record<string, string[]>;
}

function applyFilters(data: Row[], filters: Filters, columns: string[]): Row[] {
  let filtered = [...data];
  if (filters.search?.trim()) {
    const search = filters.search.trim().toLowerCase();
    filtered = filtered.filter(row =>
      columns.some(col => String(row[col] || '').toLowerCase().includes(search))
    );
  }
  if (filters.dateRange.start || filters.dateRange.end) {
    filtered = filtered.filter(row => {
      const dt = new Date(row['Sale_Date']);
      if (filters.dateRange.start && dt < filters.dateRange.start) return false;
      if (filters.dateRange.end && dt > filters.dateRange.end) return false;
      return true;
    });
  }
  for (const [field, sels] of Object.entries(filters.categories)) {
    if (sels && sels.length > 0) {
      filtered = filtered.filter(row => sels.includes(String(row[field])));
    }
  }
  return filtered;
}

export default function VisualizationsPage() {
  const { activeDataSource, visualizations } = useVisualization();
  const { filters } = useFiltering();
  const [leftDrawerOpen, setLeftDrawerOpen] = useState(false);
  const [rightDrawerOpen, setRightDrawerOpen] = useState(true);
  const categoryOptions = getCategoryOptions(activeDataSource ?? undefined);

  return (
    <div className="flex h-screen overflow-hidden bg-[#0e1121]">
      {/* LEFT SIDEBAR - Data Source & Chart Selector */}
      <aside className={`fixed top-0 left-0 bottom-0 z-40 w-72 bg-[#161a27] border-r border-gray-800 p-4 flex flex-col gap-6 transition-transform lg:transform-none lg:relative lg:translate-x-0 ${leftDrawerOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <button 
          aria-label="Close left sidebar"
          onClick={() => setLeftDrawerOpen(false)}
          className="lg:hidden mb-2 self-end p-2 rounded text-accent hover:bg-accent/10 transition"
        >
          <SlidersHorizontal className="w-6 h-6" />
        </button>
        <DataSourceManager />
        {activeDataSource && <ChartTypeSelector />}
      </aside>

      {/* Toggle button for left drawer (mobile) */}
      {!leftDrawerOpen && (
        <button
          aria-label="Open left sidebar"
          onClick={() => setLeftDrawerOpen(true)}
          className="fixed top-24 left-4 p-3 rounded-full bg-accent text-white shadow-lg z-50 lg:hidden"
        >
          <SlidersHorizontal className="w-6 h-6" />
        </button>
      )}

      {/* MAIN CANVAS - Visualizations */}
      <main className="flex-1 flex flex-col overflow-hidden min-w-0 p-6">
        {!activeDataSource ? (
          <div className="flex flex-col items-center justify-center h-full text-center max-w-md mx-auto p-4 text-white">
            <LayoutGrid className="w-16 h-16 mb-4 text-accent" />
            <h2 className="text-3xl font-bold mb-2">Upload Data to Get Started</h2>
            <p className="text-gray-400 text-lg">Select or upload a data source from the left panel</p>
          </div>
        ) : visualizations.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center max-w-md mx-auto p-4 text-white">
            <h2 className="text-2xl font-bold mb-2">Create Your First Visualization</h2>
            <p className="text-gray-400">Select a chart type from the left panel to begin</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 overflow-auto">
            {visualizations.map(viz => (
              <VisualizationCard 
                key={viz.id} 
                visualization={viz} 
                data={applyFilters(activeDataSource.data, filters, activeDataSource.columns)}
              />
            ))}
          </div>
        )}
      </main>

      {/* RIGHT SIDEBAR - Filters Panel */}
      {activeDataSource && (
        <aside className={`fixed top-0 right-0 bottom-0 z-40 w-80 bg-[#161a27] border-l border-gray-800 p-4 flex flex-col gap-4 overflow-auto transition-transform lg:transform-none lg:relative lg:translate-x-0 ${rightDrawerOpen ? "translate-x-0" : "translate-x-full"}`}>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-bold text-white">Filters</h3>
            <button 
              aria-label="Close filters sidebar"
              onClick={() => setRightDrawerOpen(false)}
              className="lg:hidden p-2 rounded text-accent hover:bg-accent/10 transition"
            >
              <SlidersHorizontal className="w-5 h-5" />
            </button>
          </div>
          <FilteringPanel columns={activeDataSource.columns} categoryOptions={categoryOptions} />
        </aside>
      )}

      {/* Toggle button for right drawer (mobile) */}
      {!rightDrawerOpen && activeDataSource && (
        <button
          aria-label="Open filters sidebar"
          onClick={() => setRightDrawerOpen(true)}
          className="fixed top-24 right-4 p-3 rounded-full bg-accent text-white shadow-lg z-50 lg:hidden"
        >
          <SlidersHorizontal className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}
