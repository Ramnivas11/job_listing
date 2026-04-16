import { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import {
  ArrowLeft,
  MapPin,
  CalendarBlank,
  BookmarkSimple,
  NewspaperClipping,
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

function DetailSkeleton() {
  return (
    <div className="max-w-screen-lg mx-auto px-4 md:px-6 py-12 space-y-6">
      <div className="skeleton-shimmer h-4 w-32 border border-black" />
      <div className="border border-black bg-[#F9F9F7] p-8 space-y-5">
        <div className="skeleton-shimmer h-12 w-2/3 border border-black" />
        <div className="skeleton-shimmer h-6 w-1/3 border border-black" />
        <div className="flex gap-2">
          <div className="skeleton-shimmer h-8 w-24 border border-black" />
          <div className="skeleton-shimmer h-8 w-24 border border-black" />
        </div>
        <div className="border-t border-black pt-5 space-y-2">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="skeleton-shimmer h-5 border border-black" style={{ width: `${95 - i * 5}%` }} />
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

    toast.success(`Application registered: ${job.company}`, {
      duration: 4000,
      position: 'bottom-right',
    });

    if (job.applyUrl) {
      window.open(job.applyUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleSaveToggle = () => {
    const wasSaved = isSaved(job._id);
    toggleSave(job._id);
    toast(wasSaved ? 'Dossier Removed' : 'Dossier Saved', {
      duration: 2500,
      position: 'bottom-right',
    });
  };

  if (isLoading) return <DetailSkeleton />;

  if (error) {
    return (
      <div className="max-w-screen-md mx-auto px-4 md:px-6 py-32 text-center border-x border-b border-black">
        <p className="font-serif text-3xl font-black mb-4">Print Error</p>
        <p className="font-body text-neutral-600 mb-8 max-w-sm mx-auto">{error}</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 font-sans uppercase text-xs font-bold tracking-widest text-[#111111] underline underline-offset-4 decoration-2 decoration-black hover:bg-black hover:text-[#F9F9F7] px-4 py-2 transition-all"
        >
          &larr; Return to Index
        </Link>
      </div>
    );
  }

  if (!job) return null;

  return (
    <div className="max-w-screen-lg mx-auto px-4 md:px-6 py-12">
      {/* Back link */}
      <Link
        to="/"
        className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#111111] hover:bg-black hover:text-[#F9F9F7] px-3 py-2 transition-all border border-transparent border-b-black mb-8"
      >
        <ArrowLeft size={16} weight="bold" />
        Return to Full Index
      </Link>

      {/* Main Container - The "Article" */}
      <article className="border-[3px] border-black bg-[#F9F9F7] relative">
        <div className="newsprint-texture absolute inset-0 z-0 opacity-30 pointer-events-none"></div>
        
        {/* Header */}
        <header className="relative z-10 border-b-[3px] border-black p-8 md:p-12">
          <div className="mb-4">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#CC0000] border-b-2 border-[#CC0000] pb-1">
              {job.company}
            </span>
          </div>
          
          <div className="flex flex-col md:flex-row items-start justify-between gap-6 md:gap-12">
            <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl font-black text-black leading-[0.9] tracking-tighter">
              {job.title}
            </h1>
            
            <button
              className="md:mt-2 flex-shrink-0 w-16 h-16 flex items-center justify-center border-[3px] border-black bg-transparent
                         transition-colors duration-200 hover:bg-black group/btn sharp-corners"
              onClick={handleSaveToggle}
              aria-label={isSaved(job._id) ? 'Remove from saved' : 'Save this job'}
            >
              <BookmarkSimple
                size={28}
                weight={isSaved(job._id) ? 'fill' : 'bold'}
                className={`transition-colors ${isSaved(job._id) ? 'text-[#CC0000]' : 'text-black group-hover/btn:text-[#F9F9F7]'}`}
              />
            </button>
          </div>
          
          {/* Top-level Meta */}
          <div className="flex flex-wrap items-center gap-3 mt-10 font-mono text-xs uppercase tracking-widest font-semibold">
            <span className="border-2 border-black px-3 py-1.5 flex items-center gap-2 bg-[#111111] text-[#F9F9F7]">
              <MapPin size={16} weight="bold" />
              {job.location}
            </span>
            <span className="border-2 border-black px-3 py-1.5 bg-white text-black">{job.type}</span>
            <span className="flex items-center gap-2 px-3 py-1.5 ml-auto text-neutral-500">
              <CalendarBlank size={16} weight="bold" />
              Published: {formatDate(job.createdAt)}
            </span>
          </div>
        </header>

        {/* Info Grid */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 border-b-2 border-black">
          <div className="p-6 md:p-8 border-b md:border-b-0 md:border-r border-black">
            <span className="block font-mono text-xs uppercase tracking-widest text-neutral-500 mb-2">Compensation</span>
            <div className="font-sans text-2xl md:text-3xl font-black text-black">{formatSalary(job.salary)} <span className="text-sm font-bold text-neutral-400">/yr</span></div>
          </div>
          <div className="p-6 md:p-8 border-b md:border-b-0 md:border-r border-black">
            <span className="block font-mono text-xs uppercase tracking-widest text-neutral-500 mb-2">Role Type</span>
            <div className="font-serif text-xl md:text-2xl font-bold text-black">{job.type}</div>
          </div>
          <div className="p-6 md:p-8">
            <span className="block font-mono text-xs uppercase tracking-widest text-neutral-500 mb-2">Seniority</span>
            <div className="font-serif text-xl md:text-2xl font-bold text-black">{job.experience || 'Not Specified'}</div>
          </div>
        </div>

        {/* Content Section */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12">
          {/* Main Description */}
          <div className="lg:col-span-8 p-8 md:p-12 lg:border-r-2 border-black">
            <h2 className="font-sans text-xl font-black uppercase tracking-tight border-b-4 border-black inline-block mb-8">
              Role Abstract
            </h2>
            <div className="font-body text-base sm:text-lg text-black leading-[1.8] text-justify">
               {/* Drop cap effect applied to the first letter of the description */}
               <span className="float-left text-7xl font-serif font-black leading-[0.8] pr-3 pt-2 text-black">
                {job.description.charAt(0)}
               </span>
               {job.description.slice(1)}
            </div>
            
            {/* Action Area */}
            <div className="mt-16 pt-12 border-t-2 border-black">
              <p className="font-mono text-xs uppercase tracking-widest font-bold mb-6">
                {applied ? 'Application Processed' : 'Formal Action Required'}
              </p>
              <button
                id="apply-button"
                disabled={applied}
                onClick={handleApply}
                className={`w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 
                            font-mono text-sm font-bold uppercase tracking-widest border-[3px]
                            transition-colors duration-200 sharp-corners
                            ${
                              applied
                                ? 'bg-neutral-200 border-neutral-400 text-neutral-500 cursor-not-allowed'
                                : 'bg-[#CC0000] border-[#CC0000] text-white hover:bg-black hover:border-black hover:text-[#F9F9F7]'
                            }`}
              >
                {applied ? (
                  <>
                    <CheckCircle size={20} weight="bold" />
                    Dossier Submitted
                  </>
                ) : (
                  <>
                    <NewspaperClipping size={20} weight="bold" />
                    Submit Application
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 p-8 md:p-12 border-t-2 lg:border-t-0 border-black bg-white">
            <h3 className="font-sans text-sm font-black uppercase tracking-widest text-[#CC0000] mb-6 flex items-center gap-2">
              <Tag size={16} weight="bold" />
              Required Competencies
            </h3>
            
            {job.skills && job.skills.length > 0 ? (
               <ul className="flex flex-col gap-0 border-t border-black">
                {job.skills.map((skill) => (
                  <li
                    key={skill}
                    className="py-3 px-1 font-mono text-sm font-bold uppercase tracking-widest text-black border-b border-black"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="font-body text-neutral-500 italic">No specific competencies listed.</p>
            )}
            
            <div className="mt-16 p-6 border-2 border-black bg-[#111111] text-[#F9F9F7]">
               <h4 className="font-serif text-xl font-bold mb-4">About {job.company}</h4>
               <p className="font-sans text-sm leading-relaxed text-neutral-300">
                 An independent entity seeking qualified individuals. Thorough background checks may be conducted. 
               </p>
            </div>
          </aside>
        </div>
      </article>
    </div>
  );
}
