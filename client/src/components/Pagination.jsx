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
      className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0 mt-16 pt-8 border-t-4 border-black"
      aria-label="Pagination"
      id="pagination"
    >
      <div className="flex items-center gap-2">
        {/* Previous */}
        <button
          className="flex items-center gap-2 h-12 px-4 font-mono text-sm font-bold uppercase tracking-widest
                     border-2 border-black bg-white text-black
                     hover:bg-black hover:text-white transition-colors sharp-corners
                     disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-black"
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
              <span key={p} className="w-12 h-12 flex items-center justify-center font-mono text-black font-bold">
                ...
              </span>
            );
          }
          return (
            <button
              key={p}
              className={`w-12 h-12 flex items-center justify-center font-mono font-bold text-sm border-2 border-black sharp-corners transition-colors
                          ${
                            p === page
                              ? 'bg-black text-white'
                              : 'bg-white text-black hover:bg-neutral-200'
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
          className="flex items-center gap-2 h-12 px-4 font-mono text-sm font-bold uppercase tracking-widest
                     border-2 border-black bg-white text-black
                     hover:bg-black hover:text-white transition-colors sharp-corners
                     disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-black"
          disabled={!hasNextPage}
          onClick={() => onPageChange(page + 1)}
          aria-label="Next page"
        >
          <span className="hidden sm:inline">Next</span>
          <CaretRight size={16} weight="bold" />
        </button>
      </div>

      <span className="font-mono text-xs text-neutral-500 font-bold uppercase tracking-widest flex items-center gap-2">
        Volume {startItem}&ndash;{endItem}
        <span className="text-[#CC0000] border-l-2 border-black pl-2">Total {total}</span>
      </span>
    </nav>
  );
}
