import { ArrowsDownUp, CaretDown } from '@phosphor-icons/react';

const SORT_OPTIONS = [
  { value: 'date_desc', label: 'Newest Edition' },
  { value: 'date_asc', label: 'Oldest Edition' },
  { value: 'salary_desc', label: 'Highest Compensation' },
  { value: 'salary_asc', label: 'Lowest Compensation' },
];

export default function SortDropdown({ value, onChange }) {
  return (
    <div className="relative min-w-0 flex-1 h-full">
      <ArrowsDownUp
        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-black pointer-events-none"
        size={18}
        weight="bold"
      />
      <select
        id="sort-select"
        className="w-full h-full min-h-[56px] pl-10 pr-9 py-4 bg-transparent border-none
                   text-black cursor-pointer font-mono text-sm uppercase tracking-widest
                   focus:outline-none focus:ring-0 focus:bg-[#E5E5E0]
                   transition-colors duration-200 sharp-corners appearance-none"
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
        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-black pointer-events-none"
        size={16}
        weight="bold"
      />
    </div>
  );
}
