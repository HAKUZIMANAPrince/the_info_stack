import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Briefcase, Star, Newspaper } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../hooks/useAuth';

export function AdminDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  const adminSections = [
    {
      id: 'jobs',
      title: 'Job Posts',
      description: 'Manage job listings and opportunities',
      icon: Briefcase,
      color: 'bg-blue-600',
      path: '/admin/jobs',
    },
    {
      id: 'reviews',
      title: 'Tech Reviews',
      description: 'Manage product reviews and scores',
      icon: Star,
      color: 'bg-yellow-600',
      path: '/admin/reviews',
    },
    {
      id: 'news',
      title: 'News Links',
      description: 'Manage curated tech news articles',
      icon: Newspaper,
      color: 'bg-purple-600',
      path: '/admin/news',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600 mt-2">Welcome, {user?.email}</p>
          </div>
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:opacity-50"
          >
            <LogOut className="w-5 h-5" />
            {loggingOut ? 'Signing out...' : 'Sign Out'}
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {adminSections.map((section) => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => navigate(section.path)}
                className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow text-left group"
              >
                <div
                  className={`${section.color} text-white w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {section.title}
                </h2>
                <p className="text-gray-600">{section.description}</p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
