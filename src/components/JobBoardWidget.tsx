import { useEffect, useState } from 'react';
import { Briefcase, MapPin, Clock, ExternalLink } from 'lucide-react';
import { JobPost } from '../types';
import { jobPostsApi } from '../services/api';
import { JobDisclaimer } from './JobDisclaimer';

export function JobBoardWidget() {
  const [jobs, setJobs] = useState<JobPost[]>([]);

  useEffect(() => {
    jobPostsApi.getLatest(5).then(setJobs).catch(console.error);
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <Briefcase className="w-6 h-6 text-emerald-600" />
        <h2 className="text-2xl font-bold text-gray-900">Latest Job Opportunities</h2>
      </div>

      <div className="space-y-4 mb-6">
        {jobs.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No jobs available at the moment</p>
        ) : (
          jobs.map((job) => (
            <div
              key={job.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {job.job_title}
                  </h3>

                  <div className="space-y-1 text-sm mb-3">
                    <div className="flex items-center gap-2 text-gray-700">
                      <span className="font-semibold">{job.company_name}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      {job.location}
                    </div>
                    <div
                      className={`flex items-center gap-2 font-semibold ${
                        job.is_urgent ? 'text-red-600' : 'text-gray-600'
                      }`}
                    >
                      <Clock className="w-4 h-4" />
                      Deadline: {new Date(job.deadline).toLocaleDateString()}
                    </div>
                  </div>

                  <p className="text-gray-700 text-sm line-clamp-2 mb-3">
                    {job.description}
                  </p>

                  <a
                    href={job.apply_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-semibold text-sm"
                  >
                    Apply Now
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

                {job.is_urgent && (
                  <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-semibold whitespace-nowrap">
                    Urgent
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      <JobDisclaimer />
    </div>
  );
}
