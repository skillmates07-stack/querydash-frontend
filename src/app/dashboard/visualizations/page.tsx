'use client';

import { useVisualization } from '@/contexts/VisualizationContext';
import { useFiltering } from '@/contexts/FilteringContext';
import FilteringPanel from '@/components/visualizations/FilteringPanel';
import DataSourceManager from '@/components/visualizations/DataSourceManager';
import ChartTypeSelector from '@/components/visualizations/ChartTypeSelector';
import VisualizationCard from '@/components/visualizations/VisualizationCard';
import ConfigurationPanel from '@/components/visualizations/ConfigurationPanel';
import { LayoutGrid, Save, SlidersHorizontal } from 'lucide-react';
import { useState } from 'react';

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
  const categoryOptions = getCategoryOptions(activeDataSource ?? undefined);

  // For mobile sidebar toggle
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Responsive grid layout: [sidebar][main][config]
  return (
    <div className="h-screen min-h-0 flex flex-col bg-[#0a0f1e]">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-6 py-4 bg-[#0d0d0d] border-b border-gray-800">
        <div className="flex items-center gap-4">
          <LayoutGrid className="w-6 h-6 text-accent" />
          <h1 className="text-xl font-bold text-white">Visualizations</h1>
          {activeDataSource && (
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-accent/10 border border-accent/20">
              <span className="text-sm text-accent font-medium">{activeDataSource.name}</span>
              <span className="text-xs text-gray-500">• {activeDataSource.rows} rows</span>
            </div>
          )}
        </div>
        <button className="px-6 py-2 rounded-lg bg-accent text-white hover:bg-accent/90 flex items-center gap-2 shadow-lg shadow-accent/20 transition">
          <Save className="w-4 h-4" />
          <span className="hidden sm:inline">Save Dashboard</span>
        </button>
      </div>

      {/* Main dashboard grid: sidebar | workspace | config */}
      <div className="flex-1 flex min-h-0 overflow-hidden">
        {/* Collapsible Left Drawer: upload and chart type */}
        <div className={`fixed z-30 bg-[#161a27] border-r border-gray-800 top-0 left-0 h-full w-72 lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out
          ${drawerOpen ? '' : '-translate-x-full'} lg:!block`}>
          <div className="h-full flex flex-col p-4 gap-8 min-w-0">
            <button
              onClick={() => setDrawerOpen(false)}
              className="lg:hidden mb-2 p-2 text-sm text-accent self-end"
              aria-label="Close menu"
            >
              <SlidersHorizontal className="w-5 h-5" />
            </button>
            <DataSourceManager />
            {activeDataSource && <ChartTypeSelector />}
          </div>
        </div>
        {/* Drawer Open Trigger */}
        {!drawerOpen && (
          <button
            onClick={() => setDrawerOpen(true)}
            className="lg:hidden fixed z-30 top-24 left-2 p-2 rounded-lg bg-accent text-white shadow-lg hover:bg-accent/80"
            aria-label="Open menu"
          >
            <SlidersHorizontal className="w-6 h-6" />
          </button>
        )}

        {/* Central Visualizations Workspace */}
        <main className="flex-1 flex flex-col min-w-0 overflow-hidden px-1.5 bg-[#0e1121]">
          {/* Filters Panel */}
          {activeDataSource && (
            <div className="w-full flex-shrink-0 flex flex-row overflow-x-auto gap-3 p-3 bg-[#181c29] border-b border-accent/20 min-h-[64px]">
              <FilteringPanel
                columns={activeDataSource.columns}
                categoryOptions={categoryOptions}
              />
            </div>
          )}

          {/* Visualization Grid/Empty */}
          <div className="flex-1 w-full overflow-auto flex items-center justify-center py-4 px-2">
            {!activeDataSource ? (
              <div className="text-center max-w-md mx-auto">
                <LayoutGrid className="w-12 h-12 text-accent mx-auto mb-5" />
                <h2 className="text-3xl font-bold text-white mb-1">Upload Data to Get Started</h2>
                <p className="text-gray-400 text-lg">Select or upload a data source from the left panel</p>
              </div>
            ) : visualizations.length === 0 ? (
              <div className="text-center max-w-md mx-auto">
                <h2 className="text-2xl font-bold text-white mb-1">Create Your First Visualization</h2>
                <p className="text-gray-400">Select a chart type from the left panel to begin</p>
              </div>
            ) : (
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
                {visualizations.map((viz) => (
                  <VisualizationCard key={viz.id} visualization={viz} data={applyFilters(
                    activeDataSource.data, filters, activeDataSource.columns
                  )} />
                ))}
              </div>
            )}
          </div>
        </main>

        {/* Right Panel: Configuration */}
        <div className="hidden xl:flex w-80 max-w-xs flex-shrink-0 bg-[#161a27] border-l border-gray-800 flex-col p-4">
          <ConfigurationPanel />
        </div>
      </div>
    </div>
  );
}
