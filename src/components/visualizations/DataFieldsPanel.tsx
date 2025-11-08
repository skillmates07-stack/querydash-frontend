'use client';

import { RiDatabase2Line } from 'react-icons/ri';

interface DataFieldsPanelProps {
  columns: string[];
  hasData: boolean;
}

export default function DataFieldsPanel({ columns, hasData }: DataFieldsPanelProps) {
  if (!hasData) {
    return (
      <div className="text-center py-12">
        <RiDatabase2Line className="text-5xl text-gray-600 mx-auto mb-4" />
        <p className="text-gray-500 mb-4">No data source loaded</p>
        <a
          href="/dashboard/data-sources"
          className="px-4 py-2 rounded-lg bg-accent text-white hover:bg-accent/90 transition-all inline-block"
        >
          Load Data
        </a>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
        Fields ({columns.length})
      </h3>
      <div className="space-y-1">
        {columns.map((column, i) => (
          <div
            key={i}
            className="px-3 py-2 rounded-lg bg-accent/10 border border-accent/20 text-accent text-sm font-medium cursor-move hover:bg-accent/20 transition-all"
          >
            {column}
          </div>
        ))}
      </div>
    </div>
  );
}
