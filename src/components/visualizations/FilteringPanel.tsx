'use client';
import { useFiltering } from '@/contexts/FilteringContext';
import { Calendar, Search, Filter, X } from 'lucide-react';

export default function FilteringPanel({ columns, categoryOptions }:{
  columns: string[];
  categoryOptions: Record<string, string[]>;
}) {
  const { filters, setDateRange, setCategory, setSearch, clearFilters } = useFiltering();

  return (
    <nav className="flex flex-nowrap items-center gap-3 min-w-0 w-full">
      {/* Filter label */}
      <div className="flex items-center gap-2">
        <Filter className="w-5 h-5 text-accent" />
        <span className="font-semibold text-accent">Filters</span>
      </div>
      {/* Search fields */}
      <div className="relative">
        <input
          className="pl-9 pr-3 py-2 rounded bg-[#23283a] border border-gray-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-accent transition w-44"
          placeholder="Search (any field)..."
          value={filters.search}
          onChange={e => setSearch(e.target.value)}
        />
        <Search className="absolute top-2.5 left-2 w-4 h-4 text-gray-400" />
      </div>
      {/* Date inputs */}
      <div className="flex items-center gap-1">
        <Calendar className="w-4 h-4 text-gray-400" />
        <input
          type="date"
          className="bg-[#23283a] border border-gray-800 rounded px-2 py-2 text-white text-xs w-28 mr-1"
          value={filters.dateRange.start ? filters.dateRange.start.toISOString().slice(0,10) : ''}
          onChange={e => setDateRange({
            start: e.target.value ? new Date(e.target.value) : null,
            end: filters.dateRange.end
          })}
        />
        <span className="text-gray-400">to</span>
        <input
          type="date"
          className="bg-[#23283a] border border-gray-800 rounded px-2 py-2 text-white text-xs w-28"
          value={filters.dateRange.end ? filters.dateRange.end.toISOString().slice(0,10) : ''}
          onChange={e => setDateRange({
            start: filters.dateRange.start,
            end: e.target.value ? new Date(e.target.value) : null
          })}
        />
      </div>
      {/* Category filters */}
      {Object.keys(categoryOptions).map(field => (
        <select
          multiple
          key={field}
          value={filters.categories[field] || []}
          onChange={e =>
            setCategory(
              field,
              Array.from(e.target.selectedOptions).map(opt => opt.value)
            )
          }
          className="bg-[#23283a] border border-gray-800 rounded px-2 py-2 text-white text-xs"
        >
          <option value="" disabled>{field}</option>
          {categoryOptions[field].map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      ))}
      {/* Clear All */}
      <button
        onClick={clearFilters}
        className="flex items-center px-3 py-1.5 bg-danger/10 border border-danger/40 text-danger rounded-lg hover:bg-danger/20 transition ml-2"
        aria-label="Clear all filters"
      >
        <X className="w-4 h-4 mr-1" />
        Clear All
      </button>
    </nav>
  );
}
