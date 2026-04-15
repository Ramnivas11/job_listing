import JobCard from './JobCard';

/**
 * JobGrid -- renders a responsive 2-column grid of job cards.
 * Uses CSS Grid per skill Rule (Grid over Flex-Math).
 * 3-column equal layout is banned; we use 2-column for desktop.
 */
export default function JobGrid({ jobs, searchTerm, isSaved, onToggleSave }) {
  return (
    <div
      className="grid grid-cols-1 lg:grid-cols-2 gap-5"
      id="job-grid"
    >
      {jobs.map((job, index) => (
        <JobCard
          key={job._id}
          job={job}
          searchTerm={searchTerm}
          isSaved={isSaved(job._id)}
          onToggleSave={onToggleSave}
          index={index}
        />
      ))}
    </div>
  );
}
