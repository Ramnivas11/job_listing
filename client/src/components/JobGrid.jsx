import JobCard from './JobCard';

export default function JobGrid({ jobs, searchTerm, isSaved, onToggleSave }) {
  return (
    <div
      className="grid grid-cols-1 lg:grid-cols-2 border-l-2 border-t-2 border-black"
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
