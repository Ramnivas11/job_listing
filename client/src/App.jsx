import { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Compass, MagnifyingGlass } from '@phosphor-icons/react';
import { useDebounce } from './hooks/useDebounce';
import { useJobs } from './hooks/useJobs';
import { useSavedJobs } from './hooks/useSavedJobs';

import SearchBar from './components/SearchBar';
import FilterBar from './components/FilterBar';
import SortDropdown from './components/SortDropdown';
import JobGrid from './components/JobGrid';
import Pagination from './components/Pagination';
import LoadingSpinner from './components/LoadingSpinner';
import EmptyState from './components/EmptyState';
import ErrorMessage from './components/ErrorMessage';
import JobDetail from './pages/JobDetail';

/* ── Listings page ───────────────────────────────────────── */
function JobListings() {
  const [searchInput, setSearchInput] = useState('');
  const debouncedSearch = useDebounce(searchInput, 500);

  const {
    jobs,
    pagination,
    message,
    location,
    type,
    experience,
    sort,
    isLoading,
    isSearching,
    error,
    hasActiveFilters,
    setLocation,
    setType,
    setExperience,
    setSort,
    goToPage,
    retry,
    clearFilters,
  } = useJobs(debouncedSearch);

  const { isSaved, toggleSave } = useSavedJobs();

  return (
    <main className="flex-1 py-8">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6">
        {/* Controls bar */}
        <div className="space-y-3 mb-8" id="controls-bar">
          <SearchBar
            value={searchInput}
            onChange={setSearchInput}
            isSearching={isSearching}
          />
          <div className="flex flex-wrap sm:flex-nowrap gap-3">
            <FilterBar
              location={location}
              type={type}
              experience={experience}
              onLocationChange={setLocation}
              onTypeChange={setType}
              onExperienceChange={setExperience}
              hasActiveFilters={hasActiveFilters}
              onClearFilters={clearFilters}
            />
            <SortDropdown value={sort} onChange={setSort} />
          </div>
        </div>

        {/* Results summary */}
        {!isLoading && !error && jobs.length > 0 && (
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
            <p className="text-sm text-slate-500 font-medium">
              Showing{' '}
              <span className="text-slate-900 font-semibold">{jobs.length}</span>
              {' '}of{' '}
              <span className="text-slate-900 font-semibold">{pagination.total}</span>
              {' '}job{pagination.total !== 1 ? 's' : ''}
              {debouncedSearch && (
                <span className="text-slate-400">
                  {' '}for &ldquo;{debouncedSearch}&rdquo;
                </span>
              )}
            </p>
            <p className="text-xs text-slate-400 font-medium hidden sm:block">
              Page {pagination.page} of {pagination.pages}
            </p>
          </div>
        )}

        {isLoading && <LoadingSpinner />}
        {!isLoading && error && <ErrorMessage message={error} onRetry={retry} />}
        {!isLoading && !error && jobs.length === 0 && <EmptyState message={message} />}

        {!isLoading && !error && jobs.length > 0 && (
          <>
            <JobGrid
              jobs={jobs}
              searchTerm={debouncedSearch}
              isSaved={isSaved}
              onToggleSave={toggleSave}
            />
            <Pagination pagination={pagination} onPageChange={goToPage} />
          </>
        )}
      </div>
    </main>
  );
}

/* ── Root layout with navbar + routing ───────────────────── */
export default function App() {
  const location = useLocation();
  const isDetailPage = location.pathname.startsWith('/job/');

  return (
    <div className="min-h-[100dvh] flex flex-col">
      {/* Global toast container — bottom-right, styled to design system */}
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            fontFamily: "'Outfit', system-ui, sans-serif",
          },
        }}
      />

      {/* Navbar */}
      <header
        className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl
                   border-b border-slate-200/60
                   shadow-[inset_0_-1px_0_rgba(255,255,255,0.6)]"
      >
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 group">
            <Compass
              size={28}
              weight="duotone"
              className="text-emerald-600 transition-transform duration-300 group-hover:rotate-12"
            />
            <span className="text-xl font-bold text-slate-900 tracking-tight">
              Job Explorer
            </span>
          </Link>
          <div className="flex items-center gap-4">
            {isDetailPage && (
              <Link
                to="/"
                className="flex items-center gap-1.5 text-sm text-slate-500 font-medium
                           hover:text-slate-900 transition-colors duration-150"
              >
                <MagnifyingGlass size={16} />
                <span className="hidden sm:inline">Browse jobs</span>
              </Link>
            )}
            <span className="text-sm text-slate-400 font-medium hidden md:block">
              Find your next role
            </span>
          </div>
        </div>
      </header>

      {/* Page routes */}
      <Routes>
        <Route path="/" element={<JobListings />} />
        <Route path="/job/:id" element={<JobDetail />} />
      </Routes>

      {/* Footer */}
      <footer className="border-t border-slate-100 py-6">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6">
          <p className="text-xs text-slate-400 text-center font-medium">
            Job Explorer &copy; {new Date().getFullYear()} &mdash; React + Express + MongoDB
          </p>
        </div>
      </footer>
    </div>
  );
}
