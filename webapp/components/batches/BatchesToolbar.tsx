import React from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Search, Plus, Filter, Grid, List } from 'lucide-react';

interface BatchesToolbarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filters: {
    standard: string;
    status: string;
    teacher: string;
  };
  onFilterChange: (name: string, value: string) => void;
  viewMode: 'Grid' | 'List';
  onViewModeChange: (mode: 'Grid' | 'List') => void;
  onCreateClick: () => void;
  teachers: string[];
}

export const BatchesToolbar: React.FC<BatchesToolbarProps> = ({
  searchTerm,
  onSearchChange,
  filters,
  onFilterChange,
  viewMode,
  onViewModeChange,
  onCreateClick,
  teachers,
}) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col xl:flex-row gap-6 justify-between items-start xl:items-center">
        <div className="relative w-full xl:w-96 shadow-soft rounded-[24px] bg-white group transition-all ring-1 ring-gray-100 hover:ring-brand-blue/30 overflow-hidden">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-brand-blue transition-colors" />
          <Input 
            placeholder="Search by batch name, teacher, standard..." 
            className="pl-11 border-none bg-transparent shadow-none h-14 font-medium text-sm"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap items-center gap-4 w-full xl:w-auto">
          <div className="flex items-center bg-bg-soft/50 p-1.5 rounded-2xl border border-gray-100 shadow-sm">
            <button 
              onClick={() => onViewModeChange('Grid')}
              className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all ${viewMode === 'Grid' ? 'bg-white text-brand-blue shadow-soft' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button 
              onClick={() => onViewModeChange('List')}
              className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all ${viewMode === 'List' ? 'bg-white text-brand-blue shadow-soft' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
          <Button onClick={onCreateClick} className="h-14 px-8 rounded-2xl gap-2 font-black text-sm uppercase tracking-widest shadow-brand-blue/20">
            <Plus className="w-5 h-5" /> Create Batch
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <FilterSelect 
          value={filters.standard} 
          options={['All Standards', 'Std 9', 'Std 10', 'Std 11', 'Std 12']} 
          onChange={(val) => onFilterChange('standard', val)}
        />
        <FilterSelect 
          value={filters.status} 
          options={['All', 'Active', 'Full', 'Upcoming', 'Inactive']} 
          onChange={(val) => onFilterChange('status', val)}
        />
        <FilterSelect 
          value={filters.teacher} 
          options={['All Teachers', ...teachers]} 
          onChange={(val) => onFilterChange('teacher', val)}
        />
        {(filters.standard !== 'All Standards' || filters.status !== 'All' || filters.teacher !== 'All Teachers') && (
          <button 
            onClick={() => {
              onFilterChange('standard', 'All Standards');
              onFilterChange('status', 'All');
              onFilterChange('teacher', 'All Teachers');
            }}
            className="text-xs font-black text-brand-blue uppercase tracking-widest ml-2 hover:underline"
          >
            Clear Filters
          </button>
        )}
      </div>
    </div>
  );
};

const FilterSelect = ({ value, options, onChange }: { value: string; options: string[]; onChange: (val: string) => void }) => (
  <div className="relative group">
    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-brand-blue transition-colors">
      <Filter className="w-3 h-3" />
    </div>
    <select 
      className="appearance-none h-11 pl-10 pr-10 rounded-2xl border border-gray-50 bg-white shadow-soft text-[11px] font-black uppercase tracking-widest text-text-slate focus:outline-none focus:ring-4 focus:ring-brand-blue/10 focus:border-brand-blue/30 transition-all cursor-pointer"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
    </select>
  </div>
);
