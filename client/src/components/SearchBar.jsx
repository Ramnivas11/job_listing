import { MagnifyingGlass, CircleNotch } from '@phosphor-icons/react';

/**
 * SearchBar -- debounced search input for job title / company / skills.
 * Accepts isSearching prop to show an inline loading indicator.
 */
export default function SearchBar({ value, onChange, isSearching }) {
  return (
    <div className="relative w-full">
      {isSearching ? (
        <CircleNotch
          className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500 animate-spin pointer-events-none"
          size={20}
        />
      ) : (
        <MagnifyingGlass
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
          size={20}
        />
      )}
      <input
        id="search-input"
        type="text"
        className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl
                   text-slate-900 placeholder:text-slate-400
                   focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500
                   transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
                   shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
        placeholder="Search by title, company, or skill..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Search jobs by title, company or skill"
        autoComplete="off"
        spellCheck={false}
      />
      {isSearching && (
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-medium">
          Searching...
        </span>
      )}
    </div>
  );
}
