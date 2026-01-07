import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit2, Trash2, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';
import { JobPost } from '../types';
import { jobPostsApi } from '../services/api';
import { supabase } from '../lib/supabase';

export function AdminJobs() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<JobPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    job_title: '',
    company_name: '',
    location: '',
    deadline: '',
    apply_url: '',
    description: '',
    is_urgent: false,
  });

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      const data = await jobPostsApi.getLatest(50);
      setJobs(data);
    } catch (error) {
      setMessage('Error loading jobs');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingId) {
        const { error } = await supabase
          .from('job_posts')
          .update(formData)
          .eq('id', editingId);

        if (error) throw error;
        setMessage('Job updated successfully');
      } else {
        const { error } = await supabase.from('job_posts').insert([formData]);

        if (error) throw error;
        setMessage('Job created successfully');
      }

      resetForm();
      loadJobs();
    } catch (error) {
      setMessage('Error saving job');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this job?')) return;

    try {
      const { error } = await supabase.from('job_posts').delete().eq('id', id);

      if (error) throw error;
      setMessage('Job deleted successfully');
      loadJobs();
    } catch (error) {
      setMessage('Error deleting job');
    }
  };

  const handleEdit = (job: JobPost) => {
    setFormData({
      job_title: job.job_title,
      company_name: job.company_name,
      location: job.location,
      deadline: job.deadline,
      apply_url: job.apply_url,
      description: job.description,
      is_urgent: job.is_urgent,
    });
    setEditingId(job.id);
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      job_title: '',
      company_name: '',
      location: '',
      deadline: '',
      apply_url: '',
      description: '',
      is_urgent: false,
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
            <h1 className="text-4xl font-bold text-gray-900">Manage Jobs</h1>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            {showForm ? 'Cancel' : 'Add Job'}
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
              {editingId ? 'Edit Job' : 'Create New Job'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Job Title"
                  value={formData.job_title}
                  onChange={(e) =>
                    setFormData({ ...formData, job_title: e.target.value })
                  }
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                  required
                />
                <input
                  type="text"
                  placeholder="Company Name"
                  value={formData.company_name}
                  onChange={(e) =>
                    setFormData({ ...formData, company_name: e.target.value })
                  }
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Location"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                  required
                />
                <input
                  type="date"
                  value={formData.deadline}
                  onChange={(e) =>
                    setFormData({ ...formData, deadline: e.target.value })
                  }
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                  required
                />
              </div>

              <input
                type="url"
                placeholder="Apply URL"
                value={formData.apply_url}
                onChange={(e) =>
                  setFormData({ ...formData, apply_url: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                required
              />

              <textarea
                placeholder="Job Description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                required
              />

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.is_urgent}
                  onChange={(e) =>
                    setFormData({ ...formData, is_urgent: e.target.checked })
                  }
                  className="w-4 h-4"
                />
                <span className="text-gray-700 font-semibold">Mark as Urgent</span>
              </label>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="bg-emerald-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
                >
                  {editingId ? 'Update Job' : 'Create Job'}
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
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Company
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Location
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Deadline
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Urgent
                    </th>
                    <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {jobs.map((job) => (
                    <tr key={job.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900 font-semibold">
                        {job.job_title}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {job.company_name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {job.location}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(job.deadline).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            job.is_urgent
                              ? 'bg-red-100 text-red-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {job.is_urgent ? 'Yes' : 'No'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right text-sm space-x-2 flex justify-end">
                        <button
                          onClick={() => handleEdit(job)}
                          className="p-2 hover:bg-yellow-100 rounded-lg transition-colors text-yellow-600"
                        >
                          <Edit2 className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(job.id)}
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
