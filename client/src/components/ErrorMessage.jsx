import { WarningCircle, ArrowClockwise } from '@phosphor-icons/react';

/**
 * ErrorMessage -- displayed when the API call fails.
 * Includes a retry button with tactile feedback.
 */
export default function ErrorMessage({ message, onRetry }) {
  return (
    <div
      className="flex flex-col items-center justify-center py-20 px-4"
      id="error-state"
      role="alert"
    >
      <div className="w-20 h-20 rounded-2xl bg-red-50 border border-red-200/60
                      flex items-center justify-center mb-6">
        <WarningCircle size={36} weight="regular" className="text-red-400" />
      </div>
      <h2 className="text-xl font-semibold text-slate-900 tracking-tight mb-1.5">
        Something went wrong
      </h2>
      <p className="text-sm text-slate-500 leading-relaxed max-w-[44ch] text-center mb-6">
        {message || 'We could not load job listings right now. Please check your connection and try again.'}
      </p>
      <button
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl
                   bg-emerald-600 text-white text-sm font-semibold
                   transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]
                   hover:bg-emerald-700 hover:shadow-[0_4px_12px_rgba(16,185,129,0.3)]
                   active:scale-[0.96] active:-translate-y-[1px]"
        onClick={onRetry}
        id="retry-button"
      >
        <ArrowClockwise size={18} weight="bold" />
        Try Again
      </button>
    </div>
  );
}
