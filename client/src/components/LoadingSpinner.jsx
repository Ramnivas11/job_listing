/**
 * LoadingSpinner -- skeleton card loaders matching the 2-column grid layout.
 * Uses shimmer animation per skill Rule 5 (skeletal loaders, not generic spinners).
 */

function SkeletonCard() {
  return (
    <div className="bg-white border border-slate-200/60 rounded-2xl p-6 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 space-y-2">
          <div className="skeleton-shimmer h-5 w-3/5 rounded-md" />
          <div className="skeleton-shimmer h-3.5 w-2/5 rounded-md" />
        </div>
        <div className="skeleton-shimmer h-9 w-9 rounded-full flex-shrink-0" />
      </div>
      <div className="flex items-center gap-3">
        <div className="skeleton-shimmer h-4 w-28 rounded-md" />
        <div className="skeleton-shimmer h-5 w-20 rounded-full" />
      </div>
      <div className="space-y-1.5">
        <div className="skeleton-shimmer h-3.5 w-full rounded-md" />
        <div className="skeleton-shimmer h-3.5 w-full rounded-md" />
        <div className="skeleton-shimmer h-3.5 w-3/4 rounded-md" />
      </div>
      <div className="flex items-center justify-between pt-4 mt-auto border-t border-slate-100">
        <div className="skeleton-shimmer h-6 w-24 rounded-md" />
        <div className="skeleton-shimmer h-3.5 w-16 rounded-md" />
      </div>
    </div>
  );
}

export default function LoadingSpinner() {
  return (
    <div id="loading-state">
      <div className="flex items-center gap-2.5 mb-6">
        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-breathe" />
        <p className="text-sm text-slate-400 font-medium">Loading opportunities...</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    </div>
  );
}
