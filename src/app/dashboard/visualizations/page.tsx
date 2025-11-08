'use client';

import { useVisualization } from '@/contexts/VisualizationContext';
import DataSourceManager from '@/components/visualizations/DataSourceManager';
import ChartTypeSelector from '@/components/visualizations/ChartTypeSelector';
import VisualizationCard from '@/components/visualizations/VisualizationCard';
import ConfigurationPanel from '@/components/visualizations/ConfigurationPanel';
import { LayoutGrid, Save } from 'lucide-react';

export default function VisualizationsPage() {
  const { activeDataSource, visualizations } = useVisualization();

  return (
    <div className="h-screen flex flex-col bg-[#0a0f1e]">
      {/* Top Toolbar */}
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
        <button className="px-6 py-2 rounded-lg bg-accent text-white hover:bg-accent/90 transition-all flex items-center gap-2 shadow-lg shadow-accent/20">
          <Save className="w-4 h-4" />
          <span className="hidden sm:inline">Save Dashboard</span>
        </button>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Data & Charts */}
        <div className="w-80 bg-[#0d0d0d] border-r border-gray-800 overflow-y-auto">
          <DataSourceManager />
          {activeDataSource && <ChartTypeSelector />}
        </div>

        {/* Main Canvas */}
        <div className="flex-1 p-8 overflow-auto">
          {!activeDataSource ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center max-w-md">
                <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-accent/20 to-purple-500/20 border border-accent/30 flex items-center justify-center">
                  <LayoutGrid className="w-12 h-12 text-accent" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-3">Upload Data to Get Started</h2>
                <p className="text-gray-400 text-lg">Select or upload a data source from the left panel</p>
              </div>
            </div>
          ) : visualizations.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center max-w-md">
                <h2 className="text-2xl font-bold text-white mb-3">Create Your First Visualization</h2>
                <p className="text-gray-400">Select a chart type from the left panel to begin</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {visualizations.map((viz) => (
                <VisualizationCard key={viz.id} visualization={viz} />
              ))}
            </div>
          )}
        </div>

        {/* Right Panel - Configuration */}
        <ConfigurationPanel />
      </div>
    </div>
  );
}
