import { useEffect, useState } from 'react';
import { Newspaper, ExternalLink, Zap, Sparkles, TrendingUp, Code, Cpu, Shield, Wifi, Cloud, Smartphone, Tablet, Monitor } from 'lucide-react';
import { NewsLink } from '../types';
import { newsLinksApi } from '../services/api';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Newspaper,
  Zap,
  Sparkles,
  TrendingUp,
  Code,
  Cpu,
  Shield,
  Wifi,
  Cloud,
  Smartphone,
  Tablet,
  Monitor,
};

function getIcon(iconName: string) {
  return iconMap[iconName] || Newspaper;
}

export function NewsGrid() {
  const [news, setNews] = useState<NewsLink[]>([]);

  useEffect(() => {
    newsLinksApi.getLatest(6).then(setNews).catch(console.error);
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <Newspaper className="w-6 h-6 text-emerald-600" />
        <h2 className="text-2xl font-bold text-gray-900">Curated Tech News</h2>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.length === 0 ? (
          <p className="text-gray-500 text-center py-8 col-span-full">
            No news available at the moment
          </p>
        ) : (
          news.map((item) => {
            const IconComponent = getIcon(item.icon_name);
            return (
            <div
              key={item.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow flex flex-col"
            >
              <div className="mb-3 flex items-start gap-3">
                <IconComponent className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wide mb-2">
                    {item.source_name}
                  </p>
                  <h3 className="text-lg font-bold text-gray-900 line-clamp-2">
                    {item.headline}
                  </h3>
                </div>
              </div>

              {item.curator_take && (
                <div className="mb-4 flex-1">
                  <p className="text-sm text-gray-700 italic border-l-4 border-emerald-200 pl-3">
                    "{item.curator_take}"
                  </p>
                </div>
              )}

              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <span className="text-xs text-gray-500">
                  {new Date(item.published_date).toLocaleDateString()}
                </span>
                <a
                  href={item.external_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-semibold text-sm"
                >
                  Read More
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
            );
          })
        )}
      </div>
    </div>
  );
}
