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
  'w-full min-h-[56px] pl-10 pr-9 py-4 bg-transparent border-none ' +
  'text-black cursor-pointer font-mono text-sm uppercase tracking-widest ' +
  'focus:outline-none focus:ring-0 focus:bg-[#E5E5E0] ' +
  'transition-colors duration-200 sharp-corners appearance-none';

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
      <div className="relative min-w-0 flex-1 border-b sm:border-b-0 sm:border-r border-[#111111]">
        <MapPin
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-black pointer-events-none"
          size={18}
          weight="bold"
        />
        <select
          id="filter-location"
          className={SELECT_BASE}
          value={location}
          onChange={(e) => onLocationChange(e.target.value)}
          aria-label="Filter by location"
        >
          <option value="">All Regions</option>
          {LOCATIONS.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
        <CaretDown
          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-black pointer-events-none"
          size={16}
          weight="bold"
        />
      </div>

      {/* Job type filter */}
      <div className="relative min-w-0 flex-1 border-b sm:border-b-0 sm:border-r border-[#111111]">
        <Briefcase
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-black pointer-events-none"
          size={18}
          weight="bold"
        />
        <select
          id="filter-type"
          className={SELECT_BASE}
          value={type}
          onChange={(e) => onTypeChange(e.target.value)}
          aria-label="Filter by job type"
        >
          <option value="">All Roles</option>
          {JOB_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        <CaretDown
          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-black pointer-events-none"
          size={16}
          weight="bold"
        />
      </div>

      {/* Experience level filter */}
      <div className="relative min-w-0 flex-1">
        <GraduationCap
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-black pointer-events-none"
          size={18}
          weight="bold"
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
          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-black pointer-events-none"
          size={16}
          weight="bold"
        />
      </div>

      {/* Clear filters button */}
      {hasActiveFilters && (
        <button
          id="clear-filters-btn"
          className="flex-shrink-0 flex items-center justify-center gap-2 px-4 py-4 min-h-[56px]
                     border-t sm:border-t-0 sm:border-l border-black bg-[#CC0000] text-white font-mono text-xs uppercase tracking-widest font-bold
                     hover:bg-black transition-colors"
          onClick={onClearFilters}
          aria-label="Clear all filters"
        >
          <X size={16} weight="bold" />
          <span className="hidden sm:inline">Reset</span>
        </button>
      )}
    </>
  );
}
