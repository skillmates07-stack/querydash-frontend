'use client';
import { useFiltering } from '@/contexts/FilteringContext';
import { Filter, Calendar, Search, X } from 'lucide-react';

interface MultiSelectDropdownProps {
  field: string;
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
}

function MultiSelectDropdown({ field, options, selected, onChange }: MultiSelectDropdownProps) {
  return (
    <div className="flex flex-col w-full">
      <label className="text-sm font-semibold text-gray-300 mb-2">{field}</label>
      <select
        multiple
        value={selected}
        onChange={e =>
          onChange(Array.from(e.target.selectedOptions).map(opt => opt.value))
        }
        className="rounded bg-[#23283a] border border-gray-700 text-white text-sm px-3 py-2 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-accent"
      >
        {options.map(opt => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}

interface DateRangePickerProps {
  start: Date | null;
  end: Date | null;
  onChange: (dates: { start: Date | null; end: Date | null }) => void;
}

function DateRangePicker({ start, end, onChange }: DateRangePickerProps) {
  return (
    <div className="flex flex-col w-full">
      <label className="text-sm font-semibold text-gray-300 mb-2 flex items-center gap-2">
        <Calendar className="w-4 h-4" />
        Date Range
      </label>
      <div className="flex flex-col gap-2">
        <input
          type="date"
          className="bg-[#23283a] border border-gray-700 rounded px-3 py-2 text-white text-sm w-full focus:outline-none focus:ring-2 focus:ring-accent"
          value={start ? start.toISOString().slice(0,10) : ''}
          onChange={e => onChange({
            start: e.target.value ? new Date(e.target.value) : null,
            end
          })}
          placeholder="Start date"
        />
        <input
          type="date"
          className="bg-[#23283a] border border-gray-700 rounded px-3 py-2 text-white text-sm w-full focus:outline-none focus:ring-2 focus:ring-accent"
          value={end ? end.toISOString().slice(0,10) : ''}
          onChange={e => onChange({
            start,
            end: e.target.value ? new Date(e.target.value) : null
          })}
          placeholder="End date"
        />
      </div>
    </div>
  );
}

interface FilteringPanelProps {
  columns: string[];
  categoryOptions: Record<string, string[]>;
}

export default function FilteringPanel({ columns, categoryOptions }: FilteringPanelProps) {
  const { filters, setDateRange, setCategory, setSearch, clearFilters } = useFiltering();

  return (
    <div className="flex flex-col gap-6">
      {/* Search */}
      <div className="flex flex-col w-full">
        <label className="text-sm font-semibold text-gray-300 mb-2 flex items-center gap-2">
          <Search className="w-4 h-4" />
          Search
        </label>
        <input
          className="px-3 py-2 rounded bg-[#23283a] border border-gray-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-accent transition w-full"
          placeholder="Search all fields..."
          value={filters.search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* Date Range */}
      <DateRangePicker
        start={filters.dateRange.start}
        end={filters.dateRange.end}
        onChange={setDateRange}
      />

      {/* Category Filters */}
      {Object.keys(categoryOptions).map(field => (
        <MultiSelectDropdown
          key={field}
          field={field}
          options={categoryOptions[field]}
          selected={filters.categories[field] || []}
          onChange={sel => setCategory(field, sel)}
        />
      ))}

      {/* Clear All */}
      <button
        onClick={clearFilters}
        className="flex items-center justify-center gap-2 px-4 py-2 bg-red-600/20 border border-red-500/40 text-red-400 rounded-lg hover:bg-red-600/30 transition w-full font-semibold"
        aria-label="Clear all filters"
      >
        <X className="w-4 h-4" />
        Clear All Filters
      </button>
    </div>
  );
}
