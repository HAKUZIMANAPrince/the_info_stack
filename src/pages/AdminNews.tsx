import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit2, Trash2, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';
import { NewsLink } from '../types';
import { newsLinksApi } from '../services/api';
import { supabase } from '../lib/supabase';

export function AdminNews() {
  const navigate = useNavigate();
  const [news, setNews] = useState<NewsLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    headline: '',
    source_name: '',
    external_url: '',
    published_date: '',
    curator_take: '',
    icon_name: 'Newspaper',
    image_url: '',
  });

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    try {
      const data = await newsLinksApi.getLatest(50);
      setNews(data);
    } catch (error) {
      setMessage('Error loading news');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingId) {
        const { error } = await supabase
          .from('news_links')
          .update(formData)
          .eq('id', editingId);

        if (error) throw error;
        setMessage('News updated successfully');
      } else {
        const { error } = await supabase.from('news_links').insert([formData]);

        if (error) throw error;
        setMessage('News created successfully');
      }

      resetForm();
      loadNews();
    } catch (error) {
      setMessage('Error saving news');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this news item?')) return;

    try {
      const { error } = await supabase.from('news_links').delete().eq('id', id);

      if (error) throw error;
      setMessage('News deleted successfully');
      loadNews();
    } catch (error) {
      setMessage('Error deleting news');
    }
  };

  const handleEdit = (newsItem: NewsLink) => {
    setFormData({
      headline: newsItem.headline,
      source_name: newsItem.source_name,
      external_url: newsItem.external_url,
      published_date: newsItem.published_date,
      curator_take: newsItem.curator_take || '',
      icon_name: newsItem.icon_name,
      image_url: newsItem.image_url || '',
    });
    setEditingId(newsItem.id);
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      headline: '',
      source_name: '',
      external_url: '',
      published_date: '',
      curator_take: '',
      icon_name: 'Newspaper',
      image_url: '',
    });
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/admin')}
              className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </button>
            <h1 className="text-4xl font-bold text-gray-900">Manage News</h1>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            {showForm ? 'Cancel' : 'Add News'}
          </button>
        </div>

        {message && (
          <div
            className={`mb-6 p-4 rounded-lg flex items-start gap-3 ${
              message.includes('Error')
                ? 'bg-red-50 border border-red-200'
                : 'bg-green-50 border border-green-200'
            }`}
          >
            {message.includes('Error') ? (
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            ) : (
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            )}
            <p
              className={`text-sm ${
                message.includes('Error') ? 'text-red-800' : 'text-green-800'
              }`}
            >
              {message}
            </p>
          </div>
        )}

        {showForm && (
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {editingId ? 'Edit News' : 'Add New News'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Headline"
                value={formData.headline}
                onChange={(e) =>
                  setFormData({ ...formData, headline: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                required
              />

              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Source Name (e.g., The Verge)"
                  value={formData.source_name}
                  onChange={(e) =>
                    setFormData({ ...formData, source_name: e.target.value })
                  }
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                  required
                />
                <input
                  type="date"
                  value={formData.published_date}
                  onChange={(e) =>
                    setFormData({ ...formData, published_date: e.target.value })
                  }
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                  required
                />
              </div>

              <input
                type="url"
                placeholder="External URL"
                value={formData.external_url}
                onChange={(e) =>
                  setFormData({ ...formData, external_url: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                required
              />

              <textarea
                placeholder="Curator's Take (Your opinion)"
                value={formData.curator_take}
                onChange={(e) =>
                  setFormData({ ...formData, curator_take: e.target.value })
                }
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
              />

              <select
                value={formData.icon_name}
                onChange={(e) =>
                  setFormData({ ...formData, icon_name: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
              >
                <option value="Newspaper">Newspaper</option>
                <option value="Zap">Zap (Lightning)</option>
                <option value="Sparkles">Sparkles</option>
                <option value="TrendingUp">Trending Up</option>
                <option value="Code">Code</option>
                <option value="Cpu">Cpu</option>
                <option value="Shield">Shield</option>
                <option value="Wifi">Wifi</option>
                <option value="Cloud">Cloud</option>
                <option value="Smartphone">Smartphone</option>
                <option value="Tablet">Tablet</option>
                <option value="Monitor">Monitor</option>
              </select>

              <input
                type="url"
                placeholder="News Image URL"
                value={formData.image_url}
                onChange={(e) =>
                  setFormData({ ...formData, image_url: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
              />

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="bg-emerald-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
                >
                  {editingId ? 'Update News' : 'Create News'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-400 transition-colors"
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Headline
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Source
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Published
                    </th>
                    <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {news.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900 font-semibold max-w-xs truncate">
                        {item.headline}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {item.source_name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(item.published_date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-right text-sm space-x-2 flex justify-end">
                        <button
                          onClick={() => handleEdit(item)}
                          className="p-2 hover:bg-yellow-100 rounded-lg transition-colors text-yellow-600"
                        >
                          <Edit2 className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-2 hover:bg-red-100 rounded-lg transition-colors text-red-600"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
