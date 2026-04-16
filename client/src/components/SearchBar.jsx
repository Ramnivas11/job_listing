import { MagnifyingGlass, CircleNotch } from '@phosphor-icons/react';

export default function SearchBar({ value, onChange, isSearching }) {
  return (
    <div className="relative w-full h-full flex flex-col justify-center bg-transparent group focus-within:bg-[#E5E5E0] transition-colors sharp-corners">
      {isSearching ? (
        <CircleNotch
          className="absolute left-4 text-black animate-spin pointer-events-none"
          size={20}
        />
      ) : (
        <MagnifyingGlass
          className="absolute left-4 text-black pointer-events-none"
          size={20}
          weight="bold"
        />
      )}
      <input
        id="search-input"
        type="text"
        className="w-full h-full min-h-[56px] pl-12 pr-4 py-4 bg-transparent border-none
                   text-black placeholder:text-neutral-500 font-mono text-sm uppercase tracking-wider
                   focus:outline-none focus:ring-0 sharp-corners"
        placeholder="Search by title, company..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Search jobs"
        autoComplete="off"
        spellCheck={false}
      />
      {isSearching && (
        <span className="absolute right-4 text-[10px] text-neutral-500 font-mono uppercase tracking-widest">
          Searching
        </span>
      )}
    </div>
  );
}
