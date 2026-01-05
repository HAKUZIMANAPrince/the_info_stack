import { Navbar } from './components/Navbar';
import { NewsTicker } from './components/NewsTicker';
import { HeroSection } from './components/HeroSection';
import { JobBoardWidget } from './components/JobBoardWidget';
import { ReviewsGrid } from './components/ReviewsGrid';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <NewsTicker />
      <HeroSection />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        <JobBoardWidget />
        <ReviewsGrid />
      </div>

      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} The Info Stack. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
