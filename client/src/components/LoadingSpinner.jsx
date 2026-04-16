function SkeletonCard() {
  return (
    <div className="border-r-2 border-b-2 border-black bg-[#F9F9F7] p-6 sm:p-8 flex flex-col gap-6 sharp-corners animate-pulse">
      <div className="flex justify-between gap-4 border-b border-black pb-4">
        <div className="flex-1 space-y-4">
          <div className="skeleton-shimmer h-8 w-3/4 border border-black" />
          <div className="skeleton-shimmer h-4 w-1/3 border border-black" />
        </div>
        <div className="skeleton-shimmer h-12 w-12 border-2 border-black" />
      </div>
      <div className="flex gap-2">
        <div className="skeleton-shimmer h-6 w-24 border border-black" />
        <div className="skeleton-shimmer h-6 w-24 border border-black" />
      </div>
      <div className="space-y-3">
        <div className="skeleton-shimmer h-3 w-full border border-black" />
        <div className="skeleton-shimmer h-3 w-full border border-black" />
        <div className="skeleton-shimmer h-3 w-5/6 border border-black" />
      </div>
      <div className="mt-auto border-t border-black pt-4 flex justify-between items-end">
        <div className="skeleton-shimmer h-8 w-32 border border-black" />
        <div className="skeleton-shimmer h-5 w-24 border border-black" />
      </div>
    </div>
  );
}

export default function LoadingSpinner() {
  return (
    <div id="loading-state" className="border-t-4 border-black pt-12">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-4 h-4 bg-[#CC0000] border-2 border-black animate-breathe" />
        <p className="font-mono text-sm uppercase tracking-widest font-bold text-black flex items-center">
          Awaiting Transmission <span className="tracking-[3px] ml-1 text-base">...</span>
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 border-l-2 border-t-2 border-black">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    </div>
  );
}
