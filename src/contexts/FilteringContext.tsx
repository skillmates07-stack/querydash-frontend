'use client';
import { createContext, useContext, useState, useCallback } from 'react';

type FilterState = {
  dateRange: { start: Date | null; end: Date | null };
  categories: Record<string, string[]>;
  search: string;
};

const defaultFilterState: FilterState = {
  dateRange: { start: null, end: null },
  categories: {},
  search: '',
};

const FilteringContext = createContext<{
  filters: FilterState;
  setDateRange: (range: { start: Date | null; end: Date | null }) => void;
  setCategory: (field: string, selected: string[]) => void;
  setSearch: (text: string) => void;
  clearFilters: () => void;
} | null>(null);

export function FilteringProvider({ children }: { children: React.ReactNode }) {
  const [filters, setFilters] = useState<FilterState>(defaultFilterState);

  const setDateRange = useCallback((range: { start: Date | null; end: Date | null }) => {
    setFilters((prev) => ({ ...prev, dateRange: range }));
  }, []);

  const setCategory = useCallback((field: string, selected: string[]) => {
    setFilters((prev) => ({
      ...prev,
      categories: { ...prev.categories, [field]: selected }
    }));
  }, []);

  const setSearch = useCallback((text: string) => {
    setFilters((prev) => ({ ...prev, search: text }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters(defaultFilterState);
  }, []);

  return (
    <FilteringContext.Provider value={{ filters, setDateRange, setCategory, setSearch, clearFilters }}>
      {children}
    </FilteringContext.Provider>
  );
}

export function useFiltering() {
  const ctx = useContext(FilteringContext);
  if (!ctx) throw new Error('useFiltering() must be used inside FilteringProvider');
  return ctx;
}
