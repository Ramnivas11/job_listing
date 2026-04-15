import { ArrowsDownUp, CaretDown } from '@phosphor-icons/react';

const SORT_OPTIONS = [
  { value: 'date_desc', label: 'Newest First' },
  { value: 'date_asc', label: 'Oldest First' },
  { value: 'salary_desc', label: 'Salary: High to Low' },
  { value: 'salary_asc', label: 'Salary: Low to High' },
];

export default function SortDropdown({ value, onChange }) {
  return (
    <div className="relative min-w-0 flex-1">
      <ArrowsDownUp
        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
        size={18}
      />
      <select
        id="sort-select"
        className="w-full pl-10 pr-9 py-3 bg-white border border-slate-200 rounded-xl
                   text-slate-700 cursor-pointer
                   focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500
                   transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
                   shadow-[0_1px_3px_rgba(0,0,0,0.04)]
                   text-sm font-medium"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Sort jobs"
      >
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <CaretDown
        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
        size={16}
        weight="bold"
      />
    </div>
  );
}
