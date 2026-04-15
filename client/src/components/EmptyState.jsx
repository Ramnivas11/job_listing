import { Tray } from '@phosphor-icons/react';

/**
 * EmptyState -- displayed when the API returns zero results.
 * Beautifully composed with guidance on how to populate data.
 */
export default function EmptyState({ message }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4" id="empty-state">
      <div className="w-20 h-20 rounded-2xl bg-slate-100 border-2 border-dashed border-slate-200
                      flex items-center justify-center mb-6">
        <Tray size={36} weight="regular" className="text-slate-300" />
      </div>
      <h2 className="text-xl font-semibold text-slate-900 tracking-tight mb-1.5">
        No jobs found
      </h2>
      <p className="text-sm text-slate-500 leading-relaxed max-w-[40ch] text-center">
        {message || 'Try adjusting your search terms or clearing some filters to widen results.'}
      </p>
    </div>
  );
}
