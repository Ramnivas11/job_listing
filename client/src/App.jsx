import { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { NewspaperClipping, MagnifyingGlass } from '@phosphor-icons/react';
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
    <main className="flex-1">
      {/* Hero Section */}
      <section className="border-b-4 border-black bg-[#111111] text-[#F9F9F7] py-16 lg:py-24 px-4 md:px-6 relative overflow-hidden">
        <div className="newsprint-texture absolute inset-0 z-0"></div>
        <div className="max-w-screen-xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-8xl leading-[0.9] tracking-tighter mb-6">
              The Daily<br />Job Explorer.
            </h1>
            <p className="font-body text-lg max-w-xl leading-relaxed text-neutral-300">
              Your authoritative source for career advancement. Rigorously vetted opportunities for the modern professional.
            </p>
          </div>
          <div className="lg:col-span-4 flex flex-col justify-end">
            <div className="border-l-4 border-[#CC0000] pl-4">
              <span className="block font-mono text-xs uppercase tracking-widest text-[#CC0000] mb-2">Notice</span>
              <p className="font-sans text-sm leading-tight text-neutral-300">
                Data refreshed constantly. Filter by role, experience, and location to find the perfect fit.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-screen-xl mx-auto px-4 md:px-6 py-12">
        {/* Controls bar */}
        <div className="border-b-2 border-black pb-8 mb-8" id="controls-bar">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-0 lg:border-2 border-black bg-[#F9F9F7]">
            <div className="lg:col-span-4 lg:border-r-2 border-black">
              <SearchBar
                value={searchInput}
                onChange={setSearchInput}
                isSearching={isSearching}
              />
            </div>
            <div className="lg:col-span-6 flex flex-col sm:flex-row lg:border-r-2 border-black">
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
            </div>
            <div className="lg:col-span-2">
              <SortDropdown value={sort} onChange={setSort} />
            </div>
          </div>
        </div>

        {/* Results summary */}
        {!isLoading && !error && jobs.length > 0 && (
          <div className="flex items-end justify-between mb-8 border-b-2 border-black pb-2">
            <h2 className="font-sans uppercase text-sm font-bold tracking-widest">
              Latest Editions ({jobs.length} of {pagination.total})
            </h2>
            <p className="font-mono text-xs uppercase tracking-widest hidden sm:block">
              Page {pagination.page} / {pagination.pages}
            </p>
          </div>
        )}

        {isLoading && <LoadingSpinner />}
        {!isLoading && error && <ErrorMessage message={error} onRetry={retry} />}
        {!isLoading && !error && jobs.length === 0 && <EmptyState message={message} />}

        {!isLoading && !error && jobs.length > 0 && (
          <div className="pb-16 border-b-4 border-black">
            <JobGrid
              jobs={jobs}
              searchTerm={debouncedSearch}
              isSaved={isSaved}
              onToggleSave={toggleSave}
            />
            <Pagination pagination={pagination} onPageChange={goToPage} />
          </div>
        )}
      </div>
    </main>
  );
}

/* ── Root layout with navbar + routing ───────────────────── */
export default function App() {
  const location = useLocation();
  const isDetailPage = location.pathname.startsWith('/job/');
  const currentDate = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="min-h-[100dvh] flex flex-col bg-[#F9F9F7] text-[#111111]">
      {/* Global toast container */}
      <Toaster
        position="bottom-right"
        toastOptions={{
          className: 'sharp-corners',
          style: {
            fontFamily: "'Inter', sans-serif",
            background: '#111111',
            color: '#F9F9F7',
            border: '2px solid #111111',
            borderRadius: '0px',
            boxShadow: '4px 4px 0px 0px #111111',
          },
        }}
      />

      {/* Masthead */}
      <header className="border-b-4 border-black bg-[#F9F9F7] sticky top-0 z-40">
        {/* Top-bar: Edition Metadata */}
        <div className="border-b-2 border-black">
          <div className="max-w-screen-xl mx-auto px-4 md:px-6 h-10 flex items-center justify-between font-mono text-[10px] sm:text-xs uppercase tracking-widest">
            <span>Vol. 1 &mdash; {currentDate}</span>
            <span className="hidden sm:inline">The Career Publication of Record</span>
            <span>Est. 2026</span>
          </div>
        </div>

        {/* Main Header */}
        <div className="max-w-screen-xl mx-auto px-4 md:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <Link to="/" className="flex items-center gap-4 group">
             <div className="w-14 h-14 flex items-center justify-center border-2 border-black bg-black text-[#F9F9F7] group-hover:bg-[#F9F9F7] group-hover:text-black transition-colors">
               <NewspaperClipping size={32} weight="light" />
             </div>
             <span className="font-serif text-4xl sm:text-5xl font-black tracking-tighter uppercase">Job Explorer</span>
          </Link>
          
          <div className="flex items-center gap-4 sm:border-l-2 border-black sm:pl-6 w-full sm:w-auto justify-center sm:justify-start">
            {isDetailPage ? (
              <Link
                to="/"
                className="font-sans uppercase text-xs font-bold tracking-widest text-[#111111] underline underline-offset-4 decoration-2 decoration-[#CC0000] hover:bg-black hover:text-[#F9F9F7] px-3 py-2 transition-all border-2 border-transparent hover:border-black"
              >
                &larr; Back to Listings
              </Link>
            ) : (
              <span className="font-mono text-xs uppercase tracking-widest font-semibold flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-[#CC0000] border border-black inline-block"></span>
                Daily Edition
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Page routes */}
      <Routes>
        <Route path="/" element={<JobListings />} />
        <Route path="/job/:id" element={<JobDetail />} />
      </Routes>

      {/* Footer */}
      <footer className="bg-[#F9F9F7] py-16">
        <div className="max-w-screen-xl mx-auto px-4 md:px-6 border-t-8 border-black pt-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 font-sans text-sm">
            <div className="md:col-span-5">
              <h3 className="font-serif text-3xl font-black mb-4 uppercase tracking-tighter">Job Explorer</h3>
              <p className="font-body text-lg text-neutral-800 leading-relaxed max-w-sm">
                The authoritative directory of modern opportunities. Published continuously, refined relentlessly.
              </p>
            </div>
            <div className="md:col-span-7 md:text-right flex flex-col justify-between">
              <div className="font-mono text-xs uppercase tracking-widest text-neutral-500 space-y-2 mb-8 md:mb-0">
                <p>Vol 1.0 &mdash; Digital Edition</p>
                <p>Printed in the digital ether.</p>
              </div>
              <p className="font-mono text-xs uppercase tracking-widest font-bold text-black mt-auto">
                &copy; {new Date().getFullYear()} Job Explorer Desk. All Rights Reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
