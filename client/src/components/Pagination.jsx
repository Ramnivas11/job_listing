import { CaretLeft, CaretRight } from '@phosphor-icons/react';

function getPageNumbers(currentPage, totalPages) {
  const pages = [];
  const delta = 2;
  const rangeStart = Math.max(2, currentPage - delta);
  const rangeEnd = Math.min(totalPages - 1, currentPage + delta);

  pages.push(1);
  if (rangeStart > 2) pages.push('ellipsis-start');
  for (let i = rangeStart; i <= rangeEnd; i++) pages.push(i);
  if (rangeEnd < totalPages - 1) pages.push('ellipsis-end');
  if (totalPages > 1) pages.push(totalPages);

  return pages;
}

export default function Pagination({ pagination, onPageChange }) {
  /* Support both {totalPages} and {pages} field shapes */
  const {
    page,
    pages: totalPages,
    total,
    limit,
    hasNextPage,
    hasPrevPage,
  } = pagination;

  if (!totalPages || totalPages <= 1) return null;

  const nums = getPageNumbers(page, totalPages);
  const startItem = (page - 1) * limit + 1;
  const endItem = Math.min(page * limit, total);

  return (
    <nav
      className="flex items-center justify-center gap-1.5 mt-10"
      aria-label="Job listings pagination"
      id="pagination"
    >
      {/* Previous */}
      <button
        className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium
                   border border-slate-200 bg-white text-slate-600
                   transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]
                   hover:bg-slate-50 hover:border-slate-300 active:scale-[0.96]
                   disabled:opacity-35 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-slate-200"
        disabled={!hasPrevPage}
        onClick={() => onPageChange(page - 1)}
        aria-label="Previous page"
      >
        <CaretLeft size={16} weight="bold" />
        <span className="hidden sm:inline">Prev</span>
      </button>

      {/* Page numbers */}
      {nums.map((p) => {
        if (typeof p === 'string') {
          return (
            <span key={p} className="w-10 h-10 flex items-center justify-center text-sm text-slate-400">
              ...
            </span>
          );
        }
        return (
          <button
            key={p}
            className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-semibold
                        transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.92]
                        ${
                          p === page
                            ? 'bg-emerald-600 text-white shadow-[0_2px_8px_rgba(16,185,129,0.3)]'
                            : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300'
                        }`}
            onClick={() => onPageChange(p)}
            aria-label={`Page ${p}`}
            aria-current={p === page ? 'page' : undefined}
          >
            {p}
          </button>
        );
      })}

      {/* Next */}
      <button
        className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium
                   border border-slate-200 bg-white text-slate-600
                   transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]
                   hover:bg-slate-50 hover:border-slate-300 active:scale-[0.96]
                   disabled:opacity-35 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-slate-200"
        disabled={!hasNextPage}
        onClick={() => onPageChange(page + 1)}
        aria-label="Next page"
      >
        <span className="hidden sm:inline">Next</span>
        <CaretRight size={16} weight="bold" />
      </button>

      <span className="ml-4 text-xs text-slate-400 font-medium hidden md:inline whitespace-nowrap">
        {startItem}&ndash;{endItem} of {total}
      </span>
    </nav>
  );
}
