'use client';

import React, { useMemo } from 'react';
import Select from 'react-select';
import { Range } from 'rc-slider';
import { Calendar, Search, Filter, X } from 'lucide-react';
import { useFiltering } from '@/contexts/FilteringContext';
import 'rc-slider/assets/index.css';

interface FilteringPanelProps {
  schema: {
    categorical: Record<string, string[]>;
    numerical: string[];
    date: string[];
    hierarchy?: string[][]; // [['Region','City'], ...] for cascading
  };
  onApply?: () => void;
}

export default function FilteringPanel({ schema, onApply }: FilteringPanelProps) {
  const {
    filters,
    setSearch,
    setDateRange,
    setCategory,
    setNumericRange,
    clearFilters,
  } = useFiltering();

  // Build cascading options for hierarchy, update child on parent select
  // Example: If Region is picked, only show Cities in that Region

  return (
    <nav className="flex flex-col gap-6 w-full p-4 bg-[#161a27] text-white rounded-lg shadow-md h-full">
      <div className="flex items-center gap-2 font-bold text-accent mb-2">
        <Filter size={20} />
        <span>Advanced Filters</span>
      </div>
      {/* Search Global */}
      <div>
        <div className="flex items-center mb-1 gap-2 text-sm text-gray-300">
          <Search size={16} />
          Search
        </div>
        <input
          type="search"
          aria-label="Search all fields"
          className="w-full rounded bg-[#23283a] border border-gray-700 px-3 py-2 text-white text-sm focus:ring-2 focus:ring-accent outline-none"
          placeholder="Search all fields"
          value={filters.search || ''}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* Date Slicer (can be repeated for multiple date fields) */}
      {schema.date && schema.date.map((dateField) => (
        <div key={dateField}>
          <div className="flex items-center mb-1 gap-2 text-sm text-gray-300">
            <Calendar size={16} /> {dateField}
          </div>
          <div className="flex gap-2">
            <input
              type="date"
              className="w-1/2 rounded bg-[#23283a] border border-gray-700 px-3 py-2 text-white text-sm focus:ring-2 focus:ring-accent outline-none"
              value={filters.dateRange.start ? filters.dateRange.start.toISOString().slice(0, 10) : ''}
              onChange={e => setDateRange({ start: e.target.value ? new Date(e.target.value) : null, end: filters.dateRange.end })}
            />
            <input
              type="date"
              className="w-1/2 rounded bg-[#23283a] border border-gray-700 px-3 py-2 text-white text-sm focus:ring-2 focus:ring-accent outline-none"
              value={filters.dateRange.end ? filters.dateRange.end.toISOString().slice(0, 10) : ''}
              onChange={e => setDateRange({ start: filters.dateRange.start, end: e.target.value ? new Date(e.target.value) : null })}
            />
          </div>
        </div>
      ))}

      {/* Cascading/Hierarchical categorical selects */}
      {schema.hierarchy && schema.hierarchy.map(([parent, child]) => (
        <div key={parent + '-' + child}>
          <div className="mb-1 text-sm font-semibold text-gray-300">{parent}</div>
          <Select
            isMulti
            options={schema.categorical[parent]?.map(v => ({ label: v, value: v })) || []}
            value={filters.categories[parent]?.map(v => ({ label: v, value: v })) || []}
            onChange={opts => setCategory(parent, opts ? opts.map(opt => opt.value) : [])}
            className="w-full text-black mb-1"
            placeholder={`Select ${parent}`}
            noOptionsMessage={() => 'No options'}
          />
          <div className="mb-1 text-sm font-semibold text-gray-300">{child}</div>
          <Select
            isMulti
            options={
              schema.categorical[child]
                ?.filter(childVal => {
                  // Optionally filter children by selected parent
                  if (!filters.categories[parent] || filters.categories[parent].length === 0) return true;
                  // Insert logic for your data relationship to filter children
                  return true; // replace with an actual filter if possible
                })
                .map(v => ({ label: v, value: v })) || []
            }
            value={filters.categories[child]?.map(v => ({ label: v, value: v })) || []}
            onChange={opts => setCategory(child, opts ? opts.map(opt => opt.value) : [])}
            className="w-full text-black"
            placeholder={`Select ${child}`}
            noOptionsMessage={() => 'No options'}
          />
        </div>
      ))}

      {/* Regular categorical fields not in hierarchy */}
      {Object.entries(schema.categorical).filter(([k]) =>
        !schema.hierarchy?.flat() || !schema.hierarchy.flat().includes(k)
      ).map(([field, options]) => (
        <div key={field}>
          <div className="mb-1 text-sm font-semibold text-gray-300">{field}</div>
          <Select
            isMulti
            options={options.map(v => ({ label: v, value: v }))}
            value={filters.categories[field]?.map(v => ({ label: v, value: v })) || []}
            onChange={opts => setCategory(field, opts ? opts.map(opt => opt.value) : [])}
            className="w-full text-black"
            placeholder={`Select ${field}`}
            noOptionsMessage={() => 'No options'}
          />
        </div>
      ))}

      {/* Numerical fields */}
      {schema.numerical.map(field => {
        const [min, max] = filters.numericRanges?.[field]?.length === 2
          ? filters.numericRanges[field]
          : [0, 100];
        return (
          <div key={field}>
            <div className="mb-1 text-sm font-semibold text-gray-300 flex justify-between">
              <span>{field} Range</span>
              <span>{min} - {max}</span>
            </div>
            <Range
              min={0}
              max={max * 1.5}
              allowCross={false}
              value={[min, max]}
              onChange={(value: [number, number]) => setNumericRange(field, value)}
              trackStyle={[{ backgroundColor: '#7c3aed' }]}
              handleStyle={[{ borderColor: '#7c3aed' }, { borderColor: '#7c3aed' }]}
              railStyle={{ backgroundColor: '#333' }}
            />
          </div>
        );
      })}

      {/* Sticky Bottom Bar actions */}
      <div className="mt-auto flex justify-between items-center border-t border-gray-800 pt-3 gap-2">
        <button
          onClick={clearFilters}
          className="flex items-center px-3 py-1 bg-red-700 hover:bg-red-800 rounded text-sm font-bold"
        >
          <X size={16} className="mr-1" /> Clear All
        </button>
        {onApply && (
          <button
            onClick={onApply}
            className="flex items-center px-4 py-2 bg-accent hover:bg-indigo-700 rounded text-sm font-bold"
          >
            Apply
          </button>
        )}
      </div>
    </nav>
  );
}
