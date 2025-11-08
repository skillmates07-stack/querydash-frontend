'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface DataSource {
  id: string;
  name: string;
  rows: number;
  columns: string[];
  data: any[];
}

interface Visualization {
  id: string;
  type: 'line' | 'bar' | 'pie' | 'area' | 'metric' | 'table';
  title: string;
  xAxis?: string;
  yAxis?: string;
  config: {
    color: string;
    showGrid: boolean;
    showLegend: boolean;
  };
}

interface VisualizationContextType {
  dataSources: DataSource[];
  activeDataSource: DataSource | null;
  visualizations: Visualization[];
  selectedViz: string | null;
  addDataSource: (source: DataSource) => void;
  setActiveDataSource: (id: string) => void;
  addVisualization: (type: Visualization['type']) => void;
  updateVisualization: (id: string, updates: Partial<Visualization>) => void;
  deleteVisualization: (id: string) => void;
  selectVisualization: (id: string | null) => void;
}

const VisualizationContext = createContext<VisualizationContextType | undefined>(undefined);

export function VisualizationProvider({ children }: { children: ReactNode }) {
  const [dataSources, setDataSources] = useState<DataSource[]>([]);
  const [activeDataSource, setActiveDataSourceState] = useState<DataSource | null>(null);
  const [visualizations, setVisualizations] = useState<Visualization[]>([]);
  const [selectedViz, setSelectedViz] = useState<string | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    const savedSources = localStorage.getItem('dataSources');
    const savedActive = localStorage.getItem('activeDataSource');
    const savedViz = localStorage.getItem('visualizations');

    if (savedSources) setDataSources(JSON.parse(savedSources));
    if (savedActive) setActiveDataSourceState(JSON.parse(savedActive));
    if (savedViz) setVisualizations(JSON.parse(savedViz));
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem('dataSources', JSON.stringify(dataSources));
  }, [dataSources]);

  useEffect(() => {
    if (activeDataSource) {
      localStorage.setItem('activeDataSource', JSON.stringify(activeDataSource));
    }
  }, [activeDataSource]);

  useEffect(() => {
    localStorage.setItem('visualizations', JSON.stringify(visualizations));
  }, [visualizations]);

  const addDataSource = (source: DataSource) => {
    setDataSources(prev => [...prev, source]);
    setActiveDataSourceState(source);
  };

  const setActiveDataSource = (id: string) => {
    const source = dataSources.find(s => s.id === id);
    if (source) setActiveDataSourceState(source);
  };

  const addVisualization = (type: Visualization['type']) => {
    const newViz: Visualization = {
      id: `viz-${Date.now()}`,
      type,
      title: `New ${type.charAt(0).toUpperCase() + type.slice(1)} Chart`,
      config: {
        color: '#5b47fb',
        showGrid: true,
        showLegend: true
      }
    };
    setVisualizations(prev => [...prev, newViz]);
    setSelectedViz(newViz.id);
  };

  const updateVisualization = (id: string, updates: Partial<Visualization>) => {
    setVisualizations(prev => prev.map(v => 
      v.id === id ? { ...v, ...updates } : v
    ));
  };

  const deleteVisualization = (id: string) => {
    setVisualizations(prev => prev.filter(v => v.id !== id));
    if (selectedViz === id) setSelectedViz(null);
  };

  const selectVisualization = (id: string | null) => {
    setSelectedViz(id);
  };

  return (
    <VisualizationContext.Provider
      value={{
        dataSources,
        activeDataSource,
        visualizations,
        selectedViz,
        addDataSource,
        setActiveDataSource,
        addVisualization,
        updateVisualization,
        deleteVisualization,
        selectVisualization
      }}
    >
      {children}
    </VisualizationContext.Provider>
  );
}

export function useVisualization() {
  const context = useContext(VisualizationContext);
  if (!context) {
    throw new Error('useVisualization must be used within VisualizationProvider');
  }
  return context;
}
