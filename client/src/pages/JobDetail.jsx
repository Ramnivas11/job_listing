import { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import {
  ArrowLeft,
  MapPin,
  CalendarBlank,
  BookmarkSimple,
  PaperPlaneTilt,
  CheckCircle,
  Briefcase,
  GraduationCap,
  CurrencyDollar,
  Tag,
} from '@phosphor-icons/react';
import { fetchJobById } from '../api/jobs';
import { useSavedJobs } from '../hooks/useSavedJobs';
import { useAppliedJobs } from '../hooks/useAppliedJobs';

function formatSalary(salary) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(salary);
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

function getTypeBadge(type) {
  const base =
    'inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ring-1 ring-inset';
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
    'inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ring-1 ring-inset';
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

function DetailSkeleton() {
  return (
    <div className="max-w-3xl mx-auto px-4 md:px-6 py-10 space-y-6">
      <div className="skeleton-shimmer h-4 w-24 rounded-md" />
      <div className="bg-white border border-slate-200/60 rounded-2xl p-8 space-y-5">
        <div className="skeleton-shimmer h-7 w-2/3 rounded-md" />
        <div className="skeleton-shimmer h-4 w-1/3 rounded-md" />
        <div className="flex gap-2">
          <div className="skeleton-shimmer h-6 w-20 rounded-full" />
          <div className="skeleton-shimmer h-6 w-20 rounded-full" />
        </div>
        <div className="border-t border-slate-100 pt-5 space-y-2">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="skeleton-shimmer h-4 rounded-md" style={{ width: `${85 - i * 5}%` }} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function JobDetail() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { isSaved, toggleSave } = useSavedJobs();
  const { hasApplied, applyToJob } = useAppliedJobs();

  const loadJob = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await fetchJobById(id);
      setJob(result.data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          'Could not load this job listing.'
      );
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadJob();
    window.scrollTo({ top: 0 });
  }, [loadJob]);

  const applied = job ? hasApplied(job._id) : false;

  const handleApply = () => {
    if (!job || applied) return;

    applyToJob(job._id);

    toast.success(`Applied to ${job.title} at ${job.company}!`, {
      duration: 4000,
      position: 'bottom-right',
      style: {
        background: '#ffffff',
        color: '#0f172a',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        padding: '14px 18px',
        fontSize: '14px',
        fontWeight: '500',
        boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
      },
      iconTheme: {
        primary: '#059669',
        secondary: '#ffffff',
      },
    });

    if (job.applyUrl) {
      window.open(job.applyUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleSaveToggle = () => {
    const wasSaved = isSaved(job._id);
    toggleSave(job._id);
    toast(wasSaved ? 'Removed from saved jobs' : 'Saved to your list', {
      duration: 2500,
      position: 'bottom-right',
      icon: wasSaved ? '🔖' : '✓',
      style: {
        background: '#ffffff',
        color: '#0f172a',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        padding: '12px 16px',
        fontSize: '13px',
        fontWeight: '500',
        boxShadow: '0 4px_16px rgba(0,0,0,0.06)',
      },
    });
  };

  if (isLoading) return <DetailSkeleton />;

  if (error) {
    return (
      <div className="max-w-3xl mx-auto px-4 md:px-6 py-20 text-center">
        <p className="text-slate-900 font-semibold text-lg mb-2">Could not load this job</p>
        <p className="text-slate-500 text-sm mb-6">{error}</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 hover:text-emerald-700"
        >
          <ArrowLeft size={16} />
          Back to listings
        </Link>
      </div>
    );
  }

  if (!job) return null;

  return (
    <div className="max-w-3xl mx-auto px-4 md:px-6 py-8 animate-card-enter">
      {/* Back link */}
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500
                   hover:text-slate-900 transition-colors duration-150 mb-6"
      >
        <ArrowLeft size={16} />
        All jobs
      </Link>

      {/* Main card */}
      <div className="bg-white border border-slate-200/60 rounded-2xl overflow-hidden
                      shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
        {/* Header */}
        <div className="p-8 border-b border-slate-100">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight leading-tight mb-1">
                {job.title}
              </h1>
              <p className="text-base font-semibold text-emerald-600">{job.company}</p>
            </div>
            <button
              className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full
                         border border-slate-200 bg-white
                         transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]
                         hover:bg-slate-50 hover:border-slate-300 active:scale-[0.92]"
              onClick={handleSaveToggle}
              aria-label={isSaved(job._id) ? 'Remove from saved' : 'Save this job'}
            >
              <BookmarkSimple
                size={20}
                weight={isSaved(job._id) ? 'fill' : 'regular'}
                className={isSaved(job._id) ? 'text-emerald-600' : 'text-slate-400'}
              />
            </button>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2 mt-4">
            <span className="flex items-center gap-1.5 text-sm text-slate-500">
              <MapPin size={15} className="text-slate-400" />
              {job.location}
            </span>
            <span className={getTypeBadge(job.type)}>{job.type}</span>
            {job.experience && (
              <span className={getExperienceBadge(job.experience)}>{job.experience}</span>
            )}
          </div>
        </div>

        {/* Metadata grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-0 divide-x divide-y divide-slate-100 border-b border-slate-100">
          <div className="flex flex-col p-5 gap-1">
            <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              <CurrencyDollar size={14} /> Salary
            </span>
            <span className="text-lg font-bold text-emerald-600 tracking-tight">
              {formatSalary(job.salary)}
            </span>
            <span className="text-xs text-slate-400">per year</span>
          </div>
          <div className="flex flex-col p-5 gap-1">
            <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              <Briefcase size={14} /> Type
            </span>
            <span className="text-sm font-semibold text-slate-900">{job.type}</span>
          </div>
          <div className="flex flex-col p-5 gap-1">
            <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              <GraduationCap size={14} /> Experience
            </span>
            <span className="text-sm font-semibold text-slate-900">{job.experience || '—'}</span>
          </div>
          <div className="col-span-2 sm:col-span-3 flex flex-col p-5 gap-1">
            <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              <CalendarBlank size={14} /> Posted
            </span>
            <span className="text-sm font-semibold text-slate-900">{formatDate(job.createdAt)}</span>
          </div>
        </div>

        {/* Skills */}
        {job.skills && job.skills.length > 0 && (
          <div className="p-8 border-b border-slate-100">
            <h2 className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
              <Tag size={14} />
              Skills Required
            </h2>
            <div className="flex flex-wrap gap-2">
              {job.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-slate-50 border border-slate-200 rounded-lg
                             text-sm text-slate-700 font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Description */}
        <div className="p-8 border-b border-slate-100">
          <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
            Job Description
          </h2>
          <p className="text-slate-600 leading-relaxed text-[0.95rem]">{job.description}</p>
        </div>

        {/* Apply section */}
        <div className="p-8 flex items-center justify-between gap-4 flex-wrap">
          <p className="text-sm text-slate-500">
            {applied
              ? 'Your application has been recorded.'
              : 'Ready to take the next step?'}
          </p>
          <button
            id="apply-button"
            disabled={applied}
            onClick={handleApply}
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold
                        transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]
                        active:scale-[0.96]
                        ${
                          applied
                            ? 'bg-slate-100 text-slate-500 cursor-not-allowed'
                            : 'bg-emerald-600 text-white hover:bg-emerald-700 hover:shadow-[0_4px_12px_rgba(16,185,129,0.3)] active:-translate-y-[1px]'
                        }`}
            aria-label={applied ? 'Already applied to this job' : 'Apply to this job'}
          >
            {applied ? (
              <>
                <CheckCircle size={18} weight="fill" />
                Already Applied
              </>
            ) : (
              <>
                <PaperPlaneTilt size={18} weight="bold" />
                Apply Now
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
