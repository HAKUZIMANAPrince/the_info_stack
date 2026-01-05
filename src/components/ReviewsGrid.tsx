import { useEffect, useState } from 'react';
import { Star, ExternalLink, ThumbsUp, ThumbsDown } from 'lucide-react';
import { TechReview } from '../types';
import { techReviewsApi } from '../services/api';
import { AffiliateDisclosure } from './AffiliateDisclosure';

export function ReviewsGrid() {
  const [reviews, setReviews] = useState<TechReview[]>([]);

  useEffect(() => {
    techReviewsApi.getLatest(6).then(setReviews).catch(console.error);
  }, []);

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'bg-green-600';
    if (score >= 6) return 'bg-yellow-600';
    return 'bg-red-600';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <Star className="w-6 h-6 text-emerald-600" />
        <h2 className="text-2xl font-bold text-gray-900">Tech Reviews</h2>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {reviews.length === 0 ? (
          <p className="text-gray-500 text-center py-8 col-span-full">
            No reviews available at the moment
          </p>
        ) : (
          reviews.map((review) => (
            <div
              key={review.id}
              className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
            >
              {review.product_image_url && (
                <div className="relative">
                  <img
                    src={review.product_image_url}
                    alt={review.product_name}
                    className="w-full h-48 object-cover"
                  />
                  <div
                    className={`absolute top-4 right-4 ${getScoreColor(
                      review.verdict_score
                    )} text-white px-4 py-2 rounded-lg font-bold text-lg shadow-lg flex items-center gap-1`}
                  >
                    <Star className="w-5 h-5 fill-current" />
                    {review.verdict_score}/10
                  </div>
                </div>
              )}

              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {review.product_name}
                </h3>

                <p className="text-gray-700 text-sm mb-3 line-clamp-2">
                  {review.review_summary}
                </p>

                {review.pros_list && review.pros_list.length > 0 && (
                  <div className="mb-2">
                    <div className="flex items-center gap-1 text-green-700 text-xs font-semibold mb-1">
                      <ThumbsUp className="w-3 h-3" />
                      Pros
                    </div>
                    <ul className="text-xs text-gray-600 space-y-0.5">
                      {review.pros_list.slice(0, 2).map((pro, idx) => (
                        <li key={idx}>• {pro}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {review.cons_list && review.cons_list.length > 0 && (
                  <div className="mb-3">
                    <div className="flex items-center gap-1 text-red-700 text-xs font-semibold mb-1">
                      <ThumbsDown className="w-3 h-3" />
                      Cons
                    </div>
                    <ul className="text-xs text-gray-600 space-y-0.5">
                      {review.cons_list.slice(0, 2).map((con, idx) => (
                        <li key={idx}>• {con}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <a
                  href={review.affiliate_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-emerald-700 transition-colors text-sm w-full justify-center"
                >
                  Buy Now
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))
        )}
      </div>

      <AffiliateDisclosure />
    </div>
  );
}
