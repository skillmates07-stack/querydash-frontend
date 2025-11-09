import { createContext, useContext, useState } from 'react';

interface FilterState {
  search: string;
  dateRange: { start: Date | null; end: Date | null };
  categories: Record<string, string[]>;
  numericRanges: Record<string, [number, number]>;
}

interface FilteringContextValue {
  filters: FilterState;
  setSearch: (s: string) => void;
  setDateRange: (r: { start: Date | null; end: Date | null }) => void;
  setCategory: (field: string, values: string[]) => void;
  setNumericRange: (field: string, range: [number, number]) => void;
  clearFilters: () => void;
}

const FilteringContext = createContext<FilteringContextValue | undefined>(undefined);

export function FilteringProvider({ children }: { children: React.ReactNode }) {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    dateRange: { start: null, end: null },
    categories: {},
    numericRanges: {}
  });

  const setSearch = (search: string) => setFilters(f => ({ ...f, search }));
  const setDateRange = (dateRange: { start: Date | null; end: Date | null }) =>
    setFilters(f => ({ ...f, dateRange }));
  const setCategory = (field: string, values: string[]) =>
    setFilters(f => ({ ...f, categories: { ...f.categories, [field]: values } }));
  const setNumericRange = (field: string, range: [number, number]) =>
    setFilters(f => ({ ...f, numericRanges: { ...f.numericRanges, [field]: range } }));
  const clearFilters = () =>
    setFilters({
      search: '',
      dateRange: { start: null, end: null },
      categories: {},
      numericRanges: {}
    });

  return (
    <FilteringContext.Provider
      value={{ filters, setSearch, setDateRange, setCategory, setNumericRange, clearFilters }}
    >
      {children}
    </FilteringContext.Provider>
  );
}

export function useFiltering() {
  const context = useContext(FilteringContext);
  if (!context) throw new Error('useFiltering must be used within FilteringProvider');
  return context;
}
