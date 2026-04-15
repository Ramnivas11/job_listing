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

function getTypeBadge(type) {
  const base =
    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide ring-1 ring-inset';
  switch (type) {
    case 'Full-time':
      return `${base} bg-emerald-50 text-emerald-700 ring-emerald-600/20`;
    case 'Part-time':
      return `${base} bg-amber-50 text-amber-700 ring-amber-600/20`;
    case 'Remote':
      return `${base} bg-sky-50 text-sky-700 ring-sky-600/20`;
    default:
      return `${base} bg-slate-50 text-slate-600 ring-slate-500/20`;
  }
}

function getExperienceBadge(experience) {
  const base =
    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide ring-1 ring-inset';
  switch (experience) {
    case 'Entry-level':
      return `${base} bg-violet-50 text-violet-700 ring-violet-600/20`;
    case 'Mid-level':
      return `${base} bg-blue-50 text-blue-700 ring-blue-600/20`;
    case 'Senior':
      return `${base} bg-orange-50 text-orange-700 ring-orange-600/20`;
    case 'Lead':
      return `${base} bg-rose-50 text-rose-700 ring-rose-600/20`;
    default:
      return `${base} bg-slate-50 text-slate-600 ring-slate-500/20`;
  }
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

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)}mo ago`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function JobCard({ job, searchTerm, isSaved, onToggleSave, index }) {
  return (
    <article
      className="animate-card-enter group
                 bg-white border border-slate-200/60 rounded-2xl p-6
                 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
                 hover:-translate-y-0.5 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.08)] hover:border-slate-300/80
                 active:scale-[0.98]
                 flex flex-col gap-4"
      style={{ animationDelay: `${index * 70}ms` }}
      id={`job-card-${job._id}`}
    >
      {/* Header: title + company + save */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h2 className="text-[1.05rem] font-semibold text-slate-900 tracking-tight leading-snug">
            {highlightText(job.title, searchTerm)}
          </h2>
          <p className="text-sm font-medium text-emerald-600 mt-0.5 truncate">
            {highlightText(job.company, searchTerm)}
          </p>
        </div>
        <button
          className="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-full
                     transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]
                     hover:bg-slate-100 active:scale-[0.9]"
          onClick={() => onToggleSave(job._id)}
          aria-label={isSaved ? 'Remove from saved jobs' : 'Save this job'}
        >
          <BookmarkSimple
            size={20}
            weight={isSaved ? 'fill' : 'regular'}
            className={isSaved ? 'text-emerald-600' : 'text-slate-400'}
          />
        </button>
      </div>

      {/* Meta: location + badges */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="flex items-center gap-1.5 text-sm text-slate-500">
          <MapPin size={14} className="text-slate-400 flex-shrink-0" />
          {job.location}
        </span>
        <span className={getTypeBadge(job.type)}>{job.type}</span>
        {job.experience && (
          <span className={getExperienceBadge(job.experience)}>{job.experience}</span>
        )}
      </div>

      {/* Skills */}
      {job.skills && job.skills.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {job.skills.slice(0, 5).map((skill) => (
            <span
              key={skill}
              className="px-2.5 py-0.5 bg-slate-50 border border-slate-200 rounded-md
                         text-xs text-slate-600 font-medium"
            >
              {skill}
            </span>
          ))}
          {job.skills.length > 5 && (
            <span className="px-2.5 py-0.5 text-xs text-slate-400 font-medium">
              +{job.skills.length - 5} more
            </span>
          )}
        </div>
      )}

      {/* Description */}
      <p className="text-sm text-slate-500 leading-relaxed line-clamp-2 flex-1">
        {job.description}
      </p>

      {/* Footer: salary + date + view link */}
      <div className="flex items-center justify-between pt-3 mt-auto border-t border-slate-100 gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-base font-bold text-emerald-600 tracking-tight whitespace-nowrap">
            {formatSalary(job.salary)}
          </span>
          <span className="flex items-center gap-1 text-xs text-slate-400 font-medium whitespace-nowrap">
            <CalendarBlank size={13} />
            {formatDate(job.createdAt)}
          </span>
        </div>
        <Link
          to={`/job/${job._id}`}
          className="flex-shrink-0 flex items-center gap-1 text-xs font-semibold text-emerald-600
                     hover:text-emerald-700 transition-colors duration-150
                     group/link"
          aria-label={`View details for ${job.title}`}
        >
          View
          <ArrowRight
            size={14}
            className="transition-transform duration-200 group-hover/link:translate-x-0.5"
          />
        </Link>
      </div>
    </article>
  );
}
