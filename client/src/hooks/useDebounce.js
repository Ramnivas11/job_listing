import { useState, useEffect, useRef } from 'react';

/**
 * useDebounce — returns a debounced version of the input value.
 * The returned value only updates after the specified delay (ms)
 * has passed without further changes.
 *
 * @param {*} value — the raw, fast-changing value
 * @param {number} delay — debounce delay in milliseconds (default 500)
 * @returns {*} — the debounced value
 */
export function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timerRef.current);
    };
  }, [value, delay]);

  return debouncedValue;
}
