import { useEffect, useState } from "react";
import { Newspaper, ExternalLink, Calendar, Filter } from "lucide-react";
import { NewsLink } from "../types";
import { newsLinksApi } from "../services/api";

export function NewsFeed() {
  const [news, setNews] = useState<NewsLink[]>([]);
  const [filteredNews, setFilteredNews] = useState<NewsLink[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSource, setSelectedSource] = useState<string>("all");

  useEffect(() => {
    newsLinksApi
      .getLatest(50)
      .then((data) => {
        setNews(data);
        setFilteredNews(data);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    let filtered = news;

    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.headline.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.curator_take?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedSource !== "all") {
      filtered = filtered.filter((item) => item.source_name === selectedSource);
    }

    setFilteredNews(filtered);
  }, [searchTerm, selectedSource, news]);

  const sources = Array.from(new Set(news.map((item) => item.source_name)));

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Newspaper className="w-8 h-8 text-emerald-600" />
            <h1 className="text-4xl font-bold text-gray-900">Tech News Feed</h1>
          </div>
          <p className="text-lg text-gray-600">
            Stay updated with the latest curated technology news from trusted
            sources
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Filter className="w-5 h-5 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="search"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Search News
              </label>
              <input
                id="search"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search headlines..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="source"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Filter by Source
              </label>
              <select
                id="source"
                value={selectedSource}
                onChange={(e) => setSelectedSource(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none bg-white"
              >
                <option value="all">All Sources</option>
                {sources.map((source) => (
                  <option key={source} value={source}>
                    {source}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredNews.length} of {news.length} articles
          </div>
        </div>

        <div className="space-y-6">
          {filteredNews.length === 0 ? (
            <div className="bg-white rounded-xl shadow-md p-12 text-center">
              <Newspaper className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-xl text-gray-500">No news articles found</p>
              <p className="text-gray-400 mt-2">Try adjusting your filters</p>
            </div>
          ) : (
            filteredNews.map((item) => (
              <article
                key={item.id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-semibold uppercase tracking-wide">
                          {item.source_name}
                        </span>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Calendar className="w-4 h-4" />
                          {new Date(item.published_date).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </div>
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-3">
                        {item.headline}
                      </h2>
                    </div>
                  </div>

                  {item.curator_take && (
                    <div className="bg-gray-50 border-l-4 border-emerald-500 rounded-r-lg p-4 mb-4">
                      <p className="text-sm font-semibold text-gray-700 mb-1">
                        Curator's Take:
                      </p>
                      <p className="text-gray-800 italic">
                        "{item.curator_take}"
                      </p>
                    </div>
                  )}

                  <a
                    href={item.external_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
                  >
                    Read Full Article
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
