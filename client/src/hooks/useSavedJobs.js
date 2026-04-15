import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'jobscout_saved_jobs';

/**
 * useSavedJobs — persists saved job IDs in localStorage.
 * Provides toggle, check, and clear helpers.
 */
export function useSavedJobs() {
  const [savedIds, setSavedIds] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  /* Persist to localStorage whenever savedIds changes */
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(savedIds));
    } catch {
      /* localStorage full or unavailable — silently ignore */
    }
  }, [savedIds]);

  const toggleSave = useCallback((jobId) => {
    setSavedIds((prev) => {
      if (prev.includes(jobId)) {
        return prev.filter((id) => id !== jobId);
      }
      return [...prev, jobId];
    });
  }, []);

  const isSaved = useCallback(
    (jobId) => savedIds.includes(jobId),
    [savedIds]
  );

  const clearAll = useCallback(() => {
    setSavedIds([]);
  }, []);

  return { savedIds, toggleSave, isSaved, clearAll };
}
