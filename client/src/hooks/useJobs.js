import { useState, useEffect, useCallback, useRef } from 'react';
import { fetchJobs } from '../api/jobs';

/**
 * useJobs — manages all job listing state: fetching, filters,
 * pagination, sorting, loading, and error handling.
 *
 * Response shape from API:
 * { success, total, page, pages, hasNextPage, hasPrevPage, message, data }
 */
export function useJobs(debouncedSearch) {
  const [jobs, setJobs] = useState([]);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    pages: 0,
    hasNextPage: false,
    hasPrevPage: false,
  });
  const [message, setMessage] = useState('');

  const [page, setPage] = useState(1);
  const [location, setLocation] = useState('');
  const [type, setType] = useState('');
  const [experience, setExperience] = useState('');
  const [sort, setSort] = useState('date_desc');

  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState(null);

  /* Track whether filters/search changed so we can reset page */
  const prevFiltersRef = useRef({ search: debouncedSearch, location, type, experience, sort });

  /* Reset page to 1 when any filter changes */
  useEffect(() => {
    const prev = prevFiltersRef.current;
    if (
      prev.search !== debouncedSearch ||
      prev.location !== location ||
      prev.type !== type ||
      prev.experience !== experience ||
      prev.sort !== sort
    ) {
      setPage(1);
      prevFiltersRef.current = { search: debouncedSearch, location, type, experience, sort };
    }
  }, [debouncedSearch, location, type, experience, sort]);

  const loadJobs = useCallback(async () => {
    setIsLoading(true);
    setIsSearching(!!debouncedSearch);
    setError(null);

    try {
      const result = await fetchJobs({
        page,
        limit: 10,
        search: debouncedSearch,
        location,
        type,
        experience,
        sort,
      });

      setJobs(result.data || []);
      setPagination({
        total: result.total ?? 0,
        page: result.page ?? 1,
        limit: 10,
        pages: result.pages ?? 0,
        hasNextPage: result.hasNextPage ?? false,
        hasPrevPage: result.hasPrevPage ?? false,
      });
      setMessage(result.message || '');
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        'An unexpected error occurred while fetching jobs.';
      setError(errorMessage);
      setJobs([]);
      setPagination({ total: 0, page: 1, limit: 10, pages: 0, hasNextPage: false, hasPrevPage: false });
    } finally {
      setIsLoading(false);
      setIsSearching(false);
    }
  }, [page, debouncedSearch, location, type, experience, sort]);

  useEffect(() => {
    loadJobs();
  }, [loadJobs]);

  const goToPage = useCallback((newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const retry = useCallback(() => {
    loadJobs();
  }, [loadJobs]);

  const clearFilters = useCallback(() => {
    setLocation('');
    setType('');
    setExperience('');
    setSort('date_desc');
    setPage(1);
  }, []);

  const hasActiveFilters = !!(location || type || experience || sort !== 'date_desc');

  return {
    jobs,
    pagination,
    message,
    page,
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
  };
}
