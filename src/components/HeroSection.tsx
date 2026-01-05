import { useEffect, useState } from 'react';
import { Star, ExternalLink, Clock, MapPin } from 'lucide-react';
import { TechReview, JobPost } from '../types';
import { techReviewsApi, jobPostsApi } from '../services/api';

export function HeroSection() {
  const [featuredReview, setFeaturedReview] = useState<TechReview | null>(null);
  const [urgentJob, setUrgentJob] = useState<JobPost | null>(null);

  useEffect(() => {
    techReviewsApi.getFeatured().then(setFeaturedReview).catch(console.error);
    jobPostsApi.getMostUrgent().then(setUrgentJob).catch(console.error);
  }, []);

  return (
    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8">
          {featuredReview && (
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm font-semibold">
                  Featured Review
                </span>
                <div className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg font-bold">
                  <Star className="w-5 h-5 fill-current" />
                  {featuredReview.verdict_score}/10
                </div>
              </div>

              {featuredReview.product_image_url && (
                <img
                  src={featuredReview.product_image_url}
                  alt={featuredReview.product_name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              )}

              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {featuredReview.product_name}
              </h3>

              <p className="text-gray-700 mb-4 line-clamp-3">
                {featuredReview.review_summary}
              </p>

              <a
                href={featuredReview.affiliate_link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
              >
                Buy Now
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          )}

          {urgentJob && (
            <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-red-200 hover:shadow-xl transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-semibold animate-pulse">
                  Urgent Opportunity
                </span>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {urgentJob.job_title}
              </h3>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-gray-700">
                  <span className="font-semibold">{urgentJob.company_name}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  {urgentJob.location}
                </div>
                <div className="flex items-center gap-2 text-red-600 font-semibold">
                  <Clock className="w-4 h-4" />
                  Deadline: {new Date(urgentJob.deadline).toLocaleDateString()}
                </div>
              </div>

              <p className="text-gray-700 mb-4 line-clamp-3">
                {urgentJob.description}
              </p>

              <a
                href={urgentJob.apply_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
              >
                Apply Now
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
