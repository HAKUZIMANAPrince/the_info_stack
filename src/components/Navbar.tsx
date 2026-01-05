import { Search, Layers } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Search query:', searchQuery);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <Layers className="w-8 h-8 text-emerald-600" />
            <h1 className="text-2xl font-bold text-gray-900">
              The Info Stack
            </h1>
          </Link>

          <div className="flex items-center gap-8">
            <div className="hidden md:flex items-center gap-6">
              <Link
                to="/"
                className={`font-semibold transition-colors ${
                  isActive('/') ? 'text-emerald-600' : 'text-gray-700 hover:text-emerald-600'
                }`}
              >
                Home
              </Link>
              <Link
                to="/news"
                className={`font-semibold transition-colors ${
                  isActive('/news') ? 'text-emerald-600' : 'text-gray-700 hover:text-emerald-600'
                }`}
              >
                News Feed
              </Link>
              <Link
                to="/about"
                className={`font-semibold transition-colors ${
                  isActive('/about') ? 'text-emerald-600' : 'text-gray-700 hover:text-emerald-600'
                }`}
              >
                About Us
              </Link>
              <Link
                to="/contact"
                className={`font-semibold transition-colors ${
                  isActive('/contact') ? 'text-emerald-600' : 'text-gray-700 hover:text-emerald-600'
                }`}
              >
                Contact
              </Link>
            </div>

            <form onSubmit={handleSearch} className="hidden lg:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </nav>
  );
}
