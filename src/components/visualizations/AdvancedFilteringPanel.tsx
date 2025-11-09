'use client';

import React from 'react';
import Select from 'react-select';
import { Range } from 'rc-slider';
import { useFiltering } from '@/contexts/FilteringContext';
import { Calendar, Search, Filter, X } from 'lucide-react';
import 'rc-slider/assets/index.css';

interface OptionType {
  label: string;
  value: string;
}

interface AdvancedFilteringPanelProps {
  columns: string[];
  categoryOptions: Record<string, string[]>;
  numericOptions: string[]; // columns with numeric data to show sliders for
}

export default function AdvancedFilteringPanel({
  columns,
  categoryOptions,
  numericOptions,
}: AdvancedFilteringPanelProps) {
  const {
    filters,
    setSearch,
    setDateRange,
    setCategory,
    setNumericRange,
    clearFilters,
  } = useFiltering();

  // Helper to build react-select options
  const buildOptions = (arr: string[]) =>
    arr.map((v) => ({ label: v, value: v }));

  return (
    <nav className="flex flex-col gap-6 w-full p-4 bg-[#161a27] text-white rounded-lg shadow-md">
      {/* Header */}
      <div className="flex items-center gap-2 font-bold text-accent mb-2">
        <Filter size={20} />
        <span>Filters</span>
      </div>

      {/* Search input */}
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
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Date Range picker */}
      <div>
        <div className="flex items-center mb-1 gap-2 text-sm text-gray-300">
          <Calendar size={16} />
          Date Range
        </div>
        <div className="flex gap-2">
          <input
            type="date"
            className="w-1/2 rounded bg-[#23283a] border border-gray-700 px-3 py-2 text-white text-sm focus:ring-2 focus:ring-accent outline-none"
            value={filters.dateRange.start ? filters.dateRange.start.toISOString().slice(0, 10) : ''}
            onChange={(e) =>
              setDateRange({ start: e.target.value ? new Date(e.target.value) : null, end: filters.dateRange.end })
            }
          />
          <input
            type="date"
            className="w-1/2 rounded bg-[#23283a] border border-gray-700 px-3 py-2 text-white text-sm focus:ring-2 focus:ring-accent outline-none"
            value={filters.dateRange.end ? filters.dateRange.end.toISOString().slice(0, 10) : ''}
            onChange={(e) =>
              setDateRange({ start: filters.dateRange.start, end: e.target.value ? new Date(e.target.value) : null })
            }
          />
        </div>
      </div>

      {/* Category multi-selects */}
      {Object.entries(categoryOptions).map(([field, options]) => (
        <div key={field}>
          <div className="mb-1 text-sm font-semibold text-gray-300">{field}</div>
          <Select
            isMulti
            options={buildOptions(options)}
            value={filters.categories[field]?.map((val) => ({ label: val, value: val })) || []}
            onChange={(selectedOptions) =>
              setCategory(
                field,
                selectedOptions ? selectedOptions.map((opt) => opt.value) : []
              )
            }
            className="w-full text-black"
            placeholder={`Select ${field}`}
            noOptionsMessage={() => 'No options'}
          />
        </div>
      ))}

      {/* Numeric range sliders */}
      {numericOptions.map((field) => {
        const [min, max] = filters.numericRanges?.[field]?.length === 2
          ? filters.numericRanges[field]
          : [0, 100]; // fallback range
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
              onChange={(value) => setNumericRange(field, value as [number, number])}
              trackStyle={[{ backgroundColor: '#7c3aed' }]}
              handleStyle={[
                { borderColor: '#7c3aed' },
                { borderColor: '#7c3aed' }
              ]}
              railStyle={{ backgroundColor: '#333' }}
            />
          </div>
        );
      })}

      {/* Clear all filters button */}
      <button
        onClick={clearFilters}
        className="flex justify-center gap-2 items-center px-4 py-2 bg-red-700 hover:bg-red-800 rounded font-semibold text-white mt-4"
      >
        <X size={20} />
        Clear All Filters
      </button>
    </nav>
  );
}
