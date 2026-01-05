import { useEffect, useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { NewsLink } from '../types';
import { newsLinksApi } from '../services/api';

export function NewsTicker() {
  const [news, setNews] = useState<NewsLink[]>([]);

  useEffect(() => {
    newsLinksApi.getLatest(10).then(setNews).catch(console.error);
  }, []);

  if (news.length === 0) return null;

  return (
    <div className="bg-gray-900 text-white py-2 overflow-hidden">
      <div className="flex animate-scroll">
        {[...news, ...news].map((item, index) => (
          <a
            key={`${item.id}-${index}`}
            href={item.external_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-8 whitespace-nowrap hover:text-emerald-400 transition-colors"
          >
            <span className="text-emerald-400 font-bold">{item.source_name}</span>
            <span className="text-gray-400">•</span>
            <span>{item.headline}</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        ))}
      </div>
      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 60s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
