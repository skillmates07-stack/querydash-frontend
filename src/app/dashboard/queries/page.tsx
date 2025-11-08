'use client';

import { useState } from 'react';
import { RiSearchLine, RiTimeLine, RiStarLine, RiPlayLine } from 'react-icons/ri';

export default function QueriesPage() {
  const [queryInput, setQueryInput] = useState('');
  const [savedQueries] = useState([
    { id: '1', text: 'Show top 10 customers by revenue', saved: true, lastRun: '2 min ago' },
    { id: '2', text: 'Revenue trend last 30 days', saved: true, lastRun: '5 min ago' },
    { id: '3', text: 'User activity by region', saved: false, lastRun: '12 min ago' }
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Queries</h1>
        <p className="text-gray-400">Ask questions in plain English</p>
      </div>

      {/* Query input */}
      <div className="p-6 rounded-2xl bg-[#1a1a1a] border border-gray-800">
        <div className="flex gap-3">
          <input
            type="text"
            value={queryInput}
            onChange={(e) => setQueryInput(e.target.value)}
            placeholder="Ask a question... (e.g., Show top 10 customers by revenue)"
            className="flex-1 px-4 py-3 rounded-lg bg-[#0d0d0d] border border-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-accent"
          />
          <button className="px-6 py-3 rounded-lg bg-accent text-white hover:bg-accent/90 transition-all flex items-center gap-2">
            <RiPlayLine />
            Run Query
          </button>
        </div>
      </div>

      {/* Saved queries */}
      <div className="space-y-3">
        <h2 className="text-xl font-bold text-white">Saved Queries</h2>
        {savedQueries.map((query) => (
          <div key={query.id} className="p-4 rounded-xl bg-[#1a1a1a] border border-gray-800 hover:border-accent/30 transition-all flex items-center justify-between group">
            <div className="flex items-center gap-4">
              <RiSearchLine className="text-xl text-gray-400" />
              <div>
                <p className="text-white font-medium">{query.text}</p>
                <p className="text-sm text-gray-500 flex items-center gap-2">
                  <RiTimeLine className="text-xs" />
                  Last run: {query.lastRun}
                </p>
              </div>
            </div>
            {query.saved && <RiStarLine className="text-xl text-accent" />}
          </div>
        ))}
      </div>
    </div>
  );
}
