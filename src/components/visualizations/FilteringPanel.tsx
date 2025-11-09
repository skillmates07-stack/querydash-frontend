'use client';

import React from 'react';
import Select from 'react-select';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { X } from 'lucide-react';
import { useFiltering } from '@/contexts/FilteringContext';

export interface FilteringPanelProps {
  columns: string[];
  categoryOptions: Record<string, string[]>;
}

const Range = (Slider as any).Range;

export default function FilteringPanel({ columns, categoryOptions }: FilteringPanelProps) {
  const {
    filters,
    setSearch,
    setDateRange,
    setCategory,
    setNumericRange,
    clearFilters,
  } = useFiltering();

  // Example: handling the first numeric column for slider demo
  const numericColumns = columns.filter(
    col => !categoryOptions[col]
  );

  return (
    <nav className="flex flex-col gap-6 w-full p-4 bg-[#161a27] text-white rounded-lg shadow-md h-full">
      <div className="font-bold text-accent mb-2 text-lg flex gap-2 items-center">
        <span>Filters</span>
      </div>

      <div>
        <label className="mb-1 text-sm block text-gray-300">Search</label>
        <input
          type="search"
          className="w-full rounded bg-[#23283a] border border-gray-700 px-3 py-2 text-white text-sm focus:ring-2 focus:ring-accent outline-none"
          placeholder="Search all fields"
          value={filters.search || ''}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {Object.entries(categoryOptions).map(([field, options]) => (
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

      {numericColumns.length > 0 && (
        <div>
          <div className="mb-1 text-sm font-semibold text-gray-300 flex justify-between">
            <span>{numericColumns[0]} Range</span>
            <span>
              {filters.numericRanges?.[numericColumns[0]] ? filters.numericRanges[numericColumns[0]].join(' - ') : ''}
            </span>
          </div>
          <Range
            min={0}
            max={100}
            defaultValue={[0, 100]}
            allowCross={false}
            value={
              filters.numericRanges?.[numericColumns[0]] || [0, 100]
            }
            onChange={(value: [number, number]) => setNumericRange(numericColumns[0], value)}
            trackStyle={[{ backgroundColor: '#7c3aed' }]}
            handleStyle={[{ borderColor: '#7c3aed' }, { borderColor: '#7c3aed' }]}
            railStyle={{ backgroundColor: '#333' }}
          />
        </div>
      )}

      <div className="mt-auto flex justify-end items-center border-t border-gray-800 pt-3 gap-2">
        <button
          onClick={clearFilters}
          className="flex items-center px-3 py-1 bg-red-700 hover:bg-red-800 rounded text-sm font-bold"
        >
          <X size={16} className="mr-1" /> Clear All
        </button>
      </div>
    </nav>
  );
}
