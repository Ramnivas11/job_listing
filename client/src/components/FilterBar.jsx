import { MapPin, Briefcase, GraduationCap, CaretDown, X } from '@phosphor-icons/react';

const LOCATIONS = [
  'San Francisco',
  'New York',
  'Los Angeles',
  'Seattle',
  'Austin',
  'Boston',
  'Chicago',
  'Remote',
  'Denver',
  'Washington DC',
  'Portland',
  'Miami',
  'Dallas',
  'Atlanta',
  'Cupertino',
  'Phoenix',
  'Detroit',
];

const JOB_TYPES = ['Full-time', 'Part-time', 'Remote'];
const EXPERIENCE_LEVELS = ['Entry-level', 'Mid-level', 'Senior', 'Lead'];

const SELECT_BASE =
  'w-full pl-10 pr-9 py-3 bg-white border border-slate-200 rounded-xl ' +
  'text-slate-700 cursor-pointer text-sm font-medium ' +
  'focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 ' +
  'transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ' +
  'shadow-[0_1px_3px_rgba(0,0,0,0.04)]';

export default function FilterBar({
  location,
  type,
  experience,
  onLocationChange,
  onTypeChange,
  onExperienceChange,
  hasActiveFilters,
  onClearFilters,
}) {
  return (
    <>
      {/* Location filter */}
      <div className="relative min-w-0 flex-1">
        <MapPin
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
          size={18}
        />
        <select
          id="filter-location"
          className={SELECT_BASE}
          value={location}
          onChange={(e) => onLocationChange(e.target.value)}
          aria-label="Filter by location"
        >
          <option value="">All Locations</option>
          {LOCATIONS.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
        <CaretDown
          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
          size={16}
          weight="bold"
        />
      </div>

      {/* Job type filter */}
      <div className="relative min-w-0 flex-1">
        <Briefcase
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
          size={18}
        />
        <select
          id="filter-type"
          className={SELECT_BASE}
          value={type}
          onChange={(e) => onTypeChange(e.target.value)}
          aria-label="Filter by job type"
        >
          <option value="">All Types</option>
          {JOB_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        <CaretDown
          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
          size={16}
          weight="bold"
        />
      </div>

      {/* Experience level filter */}
      <div className="relative min-w-0 flex-1">
        <GraduationCap
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
          size={18}
        />
        <select
          id="filter-experience"
          className={SELECT_BASE}
          value={experience}
          onChange={(e) => onExperienceChange(e.target.value)}
          aria-label="Filter by experience level"
        >
          <option value="">All Levels</option>
          {EXPERIENCE_LEVELS.map((lvl) => (
            <option key={lvl} value={lvl}>
              {lvl}
            </option>
          ))}
        </select>
        <CaretDown
          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
          size={16}
          weight="bold"
        />
      </div>

      {/* Clear filters button — only visible when filters are active */}
      {hasActiveFilters && (
        <button
          id="clear-filters-btn"
          className="flex-shrink-0 flex items-center gap-1.5 px-4 py-3 rounded-xl
                     border border-slate-200 bg-white text-slate-600 text-sm font-medium
                     transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]
                     hover:bg-red-50 hover:border-red-200 hover:text-red-600
                     active:scale-[0.96]"
          onClick={onClearFilters}
          aria-label="Clear all filters"
        >
          <X size={16} weight="bold" />
          <span className="hidden sm:inline">Clear</span>
        </button>
      )}
    </>
  );
}
