import { Layers, Linkedin, Twitter, Github, Mail } from 'lucide-react';
<<<<<<< HEAD
import { Link } from 'react-router-dom';
=======
>>>>>>> 45d975d09caff3e1305b751cc91fa91d910af43b

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Layers className="w-6 h-6 text-emerald-500" />
              <span className="text-xl font-bold">The Info Stack</span>
            </div>
            <p className="text-sm text-gray-400">
              Your trusted source for tech jobs, product reviews, and curated news.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Jobs</h3>
            <ul className="space-y-2 text-sm">
              <li>
<<<<<<< HEAD
                <Link to="/" className="text-gray-400 hover:text-emerald-400 transition-colors">
                  Browse All Jobs
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-400 hover:text-emerald-400 transition-colors">
                  Urgent Opportunities
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-emerald-400 transition-colors">
                  Post a Job
                </Link>
=======
                <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
                  Browse All Jobs
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
                  Urgent Opportunities
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
                  Post a Job
                </a>
>>>>>>> 45d975d09caff3e1305b751cc91fa91d910af43b
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Reviews</h3>
            <ul className="space-y-2 text-sm">
              <li>
<<<<<<< HEAD
                <Link to="/" className="text-gray-400 hover:text-emerald-400 transition-colors">
                  All Reviews
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-400 hover:text-emerald-400 transition-colors">
                  Top Rated
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-emerald-400 transition-colors">
                  Submit Review
                </Link>
=======
                <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
                  All Reviews
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
                  Top Rated
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
                  Submit Review
                </a>
>>>>>>> 45d975d09caff3e1305b751cc91fa91d910af43b
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-white">More</h3>
            <ul className="space-y-2 text-sm">
              <li>
<<<<<<< HEAD
                <Link to="/news" className="text-gray-400 hover:text-emerald-400 transition-colors">
                  News Feed
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-emerald-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-emerald-400 transition-colors">
                  Contact
                </Link>
=======
                <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
                  News Feed
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
                  Contact
                </a>
>>>>>>> 45d975d09caff3e1305b751cc91fa91d910af43b
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-400">
              © 2026 The Info Stack. All rights reserved.
            </p>

            <div className="flex items-center gap-4">
              <a
                href="#"
                className="text-gray-400 hover:text-emerald-400 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-emerald-400 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-emerald-400 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-emerald-400 transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
