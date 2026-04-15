import { useState, useCallback } from 'react';

const STORAGE_KEY = 'job_explorer_applied';

/**
 * useAppliedJobs — tracks which job IDs the user has applied to.
 * Persisted in localStorage under "job_explorer_applied".
 */
export function useAppliedJobs() {
  const [appliedIds, setAppliedIds] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? new Set(JSON.parse(stored)) : new Set();
    } catch {
      return new Set();
    }
  });

  const applyToJob = useCallback((id) => {
    setAppliedIds((prev) => {
      const next = new Set(prev);
      next.add(id);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
      } catch {
        /* localStorage unavailable in private browsing */
      }
      return next;
    });
  }, []);

  const hasApplied = useCallback(
    (id) => appliedIds.has(id),
    [appliedIds]
  );

  return { hasApplied, applyToJob };
}
