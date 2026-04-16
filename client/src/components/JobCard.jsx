import { Link } from 'react-router-dom';
import { MapPin, CalendarBlank, BookmarkSimple, ArrowRight } from '@phosphor-icons/react';

function highlightText(text, keyword) {
  if (!keyword || !keyword.trim()) return text;

  const escaped = keyword.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escaped})`, 'gi');
  const parts = text.split(regex);

  let matched = false;
  return parts.map((part, i) => {
    if (!matched && regex.test(part)) {
      regex.lastIndex = 0;
      matched = true;
      return (
        <mark key={i} className="search-highlight">
          {part}
        </mark>
      );
    }
    regex.lastIndex = 0;
    return part;
  });
}

function formatSalary(salary) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(salary);
}

function formatDate(dateStr) {
  const date = new Date(dateStr);
  const now = new Date();
  const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Published Today';
  if (diffDays === 1) return 'Yesterday\'s Edition';
  if (diffDays < 7) return `Vol. -${diffDays}D`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function JobCard({ job, searchTerm, isSaved, onToggleSave, index }) {
  return (
    <article
      className="group bg-[#F9F9F7] border-r-2 border-b-2 border-black p-6 sm:p-8
                 transition-colors duration-200 hover:bg-[#F0F0F0]
                 flex flex-col gap-6 sharp-corners"
      id={`job-card-${job._id}`}
    >
      {/* Header: title + company + save */}
      <div className="flex items-start justify-between gap-4 border-b border-black pb-4">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl sm:text-3xl font-serif font-black text-black leading-tight mb-2">
            {highlightText(job.title, searchTerm)}
          </h2>
          <p className="font-mono text-xs uppercase tracking-widest font-bold text-black">
            {highlightText(job.company, searchTerm)}
          </p>
        </div>
        <button
          className="flex-shrink-0 w-12 h-12 flex items-center justify-center border-2 border-black bg-transparent 
                     transition-colors duration-200 hover:bg-black group/btn sharp-corners"
          onClick={() => onToggleSave(job._id)}
          aria-label={isSaved ? 'Remove from saved jobs' : 'Save this job'}
        >
          <BookmarkSimple
            size={24}
            weight={isSaved ? 'fill' : 'bold'}
            className={`transition-colors ${isSaved ? 'text-[#CC0000]' : 'text-black group-hover/btn:text-[#F9F9F7]'}`}
          />
        </button>
      </div>

      {/* Meta: location + badges */}
      <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] sm:text-xs uppercase tracking-widest font-semibold">
        <span className="border border-black px-2 py-1 flex items-center gap-1.5 bg-[#111111] text-[#F9F9F7]">
          <MapPin size={14} weight="bold" />
          {job.location}
        </span>
        <span className="border border-black px-2 py-1 bg-white text-black">{job.type}</span>
        {job.experience && (
          <span className="border border-black px-2 py-1 bg-white text-black">{job.experience}</span>
        )}
      </div>

      {/* Description */}
      <p className="font-body text-[15px] sm:text-base text-neutral-800 leading-relaxed line-clamp-3 text-justify flex-1">
        {job.description}
      </p>

      {/* Footer: salary + date + view link */}
      <div className="flex flex-wrap sm:flex-nowrap items-end justify-between pt-4 mt-auto border-t border-black gap-4">
        <div className="flex flex-col gap-1 w-full sm:w-auto">
          <span className="font-sans font-black text-xl sm:text-2xl text-black tracking-tight">
            {formatSalary(job.salary)}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#CC0000] flex items-center gap-1 font-bold">
            <CalendarBlank size={14} weight="bold" />
            {formatDate(job.createdAt)}
          </span>
        </div>
        <Link
          to={`/job/${job._id}`}
          className="w-full sm:w-auto flex-shrink-0 flex items-center justify-center gap-2 border-b-2 border-transparent 
                     font-sans text-xs uppercase font-bold tracking-widest text-black 
                     transition-all hover:border-black py-1"
          aria-label={`Read full brief for ${job.title}`}
        >
          Read Brief
          <ArrowRight size={16} weight="bold" />
        </Link>
      </div>
    </article>
  );
}
