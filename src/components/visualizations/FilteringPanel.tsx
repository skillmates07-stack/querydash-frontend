'use client';
import { useFiltering } from '@/contexts/FilteringContext';
import { Filter, Calendar, Search, X } from 'lucide-react';

// Add TypeScript props interfaces
interface MultiSelectDropdownProps {
  field: string;
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
}

// Modular Multi-Select Dropdown with types
function MultiSelectDropdown({ field, options, selected, onChange }: MultiSelectDropdownProps) {
  return (
    <div className="flex flex-col min-w-[140px]">
      <label className="text-xs text-gray-400 mb-1">{field}</label>
      <select
        multiple
        value={selected}
        onChange={e =>
          onChange(Array.from(e.target.selectedOptions).map(opt => opt.value))
        }
        className="rounded bg-[#23283a] border border-gray-800 text-white text-xs px-2 py-2"
      >
        {options.map(opt => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}

// Date range picker with types
interface DateRangePickerProps {
  start: Date | null;
  end: Date | null;
  onChange: (dates: { start: Date | null; end: Date | null }) => void;
}

function DateRangePicker({ start, end, onChange }: DateRangePickerProps) {
  return (
    <div className="flex items-center gap-1">
      <Calendar className="w-4 h-4 text-gray-400" />
      <input
        type="date"
        className="bg-[#23283a] border border-gray-800 rounded px-2 py-2 text-white text-xs w-28"
        value={start ? start.toISOString().slice(0,10) : ''}
        onChange={e => onChange({
          start: e.target.value ? new Date(e.target.value) : null,
          end
        })}
      />
      <span className="text-gray-400 mx-1">to</span>
      <input
        type="date"
        className="bg-[#23283a] border border-gray-800 rounded px-2 py-2 text-white text-xs w-28"
        value={end ? end.toISOString().slice(0,10) : ''}
        onChange={e => onChange({
          start,
          end: e.target.value ? new Date(e.target.value) : null
        })}
      />
    </div>
  );
}

// Exported FilteringPanel with types
interface FilteringPanelProps {
  columns: string[];
  categoryOptions: Record<string, string[]>;
}

export default function FilteringPanel({ columns, categoryOptions }: FilteringPanelProps) {
  const { filters, setDateRange, setCategory, setSearch, clearFilters } = useFiltering();

  return (
    <nav className="sticky flex flex-nowrap items-center gap-3 w-full bg-[#181c29] p-3 rounded-lg shadow-md z-30">
      {/* Filter label */}
      <div className="flex items-center gap-2 font-bold text-accent">
        <Filter className="w-5 h-5" />
        <span>Filters</span>
      </div>
      {/* Search */}
      <div className="relative">
        <input
          className="pl-8 pr-3 py-2 rounded bg-[#23283a] border border-gray-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-accent transition w-44"
          placeholder="Search..."
          value={filters.search}
          onChange={e => setSearch(e.target.value)}
        />
        <Search className="absolute top-2.5 left-2 w-4 h-4 text-gray-400" />
      </div>
      {/* Date range */}
      <DateRangePicker
        start={filters.dateRange.start}
        end={filters.dateRange.end}
        onChange={setDateRange}
      />
      {/* Category filters */}
      {Object.keys(categoryOptions).map(field => (
        <MultiSelectDropdown
          key={field}
          field={field}
          options={categoryOptions[field]}
          selected={filters.categories[field] || []}
          onChange={sel => setCategory(field, sel)}
        />
      ))}
      {/* Clear all filters */}
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
