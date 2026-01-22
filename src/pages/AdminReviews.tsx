import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit2, Trash2, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';
import { TechReview } from '../types';
import { techReviewsApi } from '../services/api';
import { supabase } from '../lib/supabase';

export function AdminReviews() {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState<TechReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    product_name: '',
    review_summary: '',
    verdict_score: 5,
    affiliate_link: '',
    pros_list: [] as string[],
    cons_list: [] as string[],
    specs: {} as Record<string, string>,
    product_image_url: '',
    is_featured: false,
  });
  const [prosInput, setProsInput] = useState('');
  const [consInput, setConsInput] = useState('');
  const [specKey, setSpecKey] = useState('');
  const [specValue, setSpecValue] = useState('');

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    try {
      const data = await techReviewsApi.getLatest(50);
      setReviews(data);
    } catch (error) {
      setMessage('Error loading reviews');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Convert empty strings to null for optional fields
      const submitData = {
        ...formData,
        product_image_url: formData.product_image_url.trim() || null,
      };

      if (editingId) {
        const { error } = await supabase
          .from('tech_reviews')
          .update(submitData)
          .eq('id', editingId);

        if (error) throw error;
        setMessage('Review updated successfully');
      } else {
        const { error } = await supabase.from('tech_reviews').insert([submitData]);

        if (error) throw error;
        setMessage('Review created successfully');
      }

      resetForm();
      loadReviews();
    } catch (error) {
      setMessage('Error saving review');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this review?')) return;

    try {
      const { error } = await supabase.from('tech_reviews').delete().eq('id', id);

      if (error) throw error;
      setMessage('Review deleted successfully');
      loadReviews();
    } catch (error) {
      setMessage('Error deleting review');
    }
  };

  const handleEdit = (review: TechReview) => {
    setFormData({
      product_name: review.product_name,
      review_summary: review.review_summary,
      verdict_score: review.verdict_score,
      affiliate_link: review.affiliate_link,
      pros_list: review.pros_list || [],
      cons_list: review.cons_list || [],
      specs: review.specs || {},
      product_image_url: review.product_image_url || '',
      is_featured: review.is_featured,
    });
    setEditingId(review.id);
    setShowForm(true);
  };

  const addPro = () => {
    if (prosInput.trim()) {
      setFormData({
        ...formData,
        pros_list: [...formData.pros_list, prosInput],
      });
      setProsInput('');
    }
  };

  const addCon = () => {
    if (consInput.trim()) {
      setFormData({
        ...formData,
        cons_list: [...formData.cons_list, consInput],
      });
      setConsInput('');
    }
  };

  const addSpec = () => {
    if (specKey.trim() && specValue.trim()) {
      setFormData({
        ...formData,
        specs: { ...formData.specs, [specKey]: specValue },
      });
      setSpecKey('');
      setSpecValue('');
    }
  };

  const removePro = (index: number) => {
    setFormData({
      ...formData,
      pros_list: formData.pros_list.filter((_, i) => i !== index),
    });
  };

  const removeCon = (index: number) => {
    setFormData({
      ...formData,
      cons_list: formData.cons_list.filter((_, i) => i !== index),
    });
  };

  const removeSpec = (key: string) => {
    const newSpecs = { ...formData.specs };
    delete newSpecs[key];
    setFormData({ ...formData, specs: newSpecs });
  };

  const resetForm = () => {
    setFormData({
      product_name: '',
      review_summary: '',
      verdict_score: 5,
      affiliate_link: '',
      pros_list: [],
      cons_list: [],
      specs: {},
      product_image_url: '',
      is_featured: false,
    });
    setProsInput('');
    setConsInput('');
    setSpecKey('');
    setSpecValue('');
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
            <h1 className="text-4xl font-bold text-gray-900">Manage Reviews</h1>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            {showForm ? 'Cancel' : 'Add Review'}
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
              {editingId ? 'Edit Review' : 'Create New Review'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Product Name"
                  value={formData.product_name}
                  onChange={(e) =>
                    setFormData({ ...formData, product_name: e.target.value })
                  }
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                  required
                />
                <input
                  type="number"
                  placeholder="Score (0-10)"
                  min="0"
                  max="10"
                  value={formData.verdict_score}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      verdict_score: parseInt(e.target.value),
                    })
                  }
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                  required
                />
              </div>

              <textarea
                placeholder="Review Summary"
                value={formData.review_summary}
                onChange={(e) =>
                  setFormData({ ...formData, review_summary: e.target.value })
                }
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                required
              />

              <input
                type="url"
                placeholder="Affiliate Link"
                value={formData.affiliate_link}
                onChange={(e) =>
                  setFormData({ ...formData, affiliate_link: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                required
              />

              <input
                type="url"
                placeholder="Product Image URL"
                value={formData.product_image_url}
                onChange={(e) =>
                  setFormData({ ...formData, product_image_url: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
              />

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Pros</h3>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Add a pro"
                    value={prosInput}
                    onChange={(e) => setProsInput(e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                  <button
                    type="button"
                    onClick={addPro}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.pros_list.map((pro, idx) => (
                    <span
                      key={idx}
                      className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                    >
                      {pro}
                      <button
                        type="button"
                        onClick={() => removePro(idx)}
                        className="text-green-800 hover:text-green-900 font-bold"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Cons</h3>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Add a con"
                    value={consInput}
                    onChange={(e) => setConsInput(e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                  <button
                    type="button"
                    onClick={addCon}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.cons_list.map((con, idx) => (
                    <span
                      key={idx}
                      className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                    >
                      {con}
                      <button
                        type="button"
                        onClick={() => removeCon(idx)}
                        className="text-red-800 hover:text-red-900 font-bold"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Specifications</h3>
                <div className="grid md:grid-cols-3 gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Spec name"
                    value={specKey}
                    onChange={(e) => setSpecKey(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Spec value"
                    value={specValue}
                    onChange={(e) => setSpecValue(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                  <button
                    type="button"
                    onClick={addSpec}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Add Spec
                  </button>
                </div>
                <div className="space-y-2">
                  {Object.entries(formData.specs).map(([key, value]) => (
                    <div
                      key={key}
                      className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-center justify-between"
                    >
                      <span className="text-sm text-gray-900">
                        <strong>{key}:</strong> {value}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeSpec(key)}
                        className="text-blue-600 hover:text-blue-700 font-bold"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.is_featured}
                  onChange={(e) =>
                    setFormData({ ...formData, is_featured: e.target.checked })
                  }
                  className="w-4 h-4"
                />
                <span className="text-gray-700 font-semibold">
                  Mark as Featured
                </span>
              </label>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="bg-emerald-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
                >
                  {editingId ? 'Update Review' : 'Create Review'}
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
                      Product
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Score
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Featured
                    </th>
                    <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {reviews.map((review) => (
                    <tr key={review.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900 font-semibold">
                        {review.product_name}
                      </td>
                      <td className="px-6 py-4 text-sm font-bold">
                        <span
                          className={`px-3 py-1 rounded-full ${
                            review.verdict_score >= 8
                              ? 'bg-green-100 text-green-800'
                              : review.verdict_score >= 6
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {review.verdict_score}/10
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            review.is_featured
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {review.is_featured ? 'Yes' : 'No'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right text-sm space-x-2 flex justify-end">
                        <button
                          onClick={() => handleEdit(review)}
                          className="p-2 hover:bg-yellow-100 rounded-lg transition-colors text-yellow-600"
                        >
                          <Edit2 className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(review.id)}
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
