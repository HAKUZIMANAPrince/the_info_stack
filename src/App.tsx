import { Navbar } from './components/Navbar';
import { NewsTicker } from './components/NewsTicker';
import { HeroSection } from './components/HeroSection';
import { JobBoardWidget } from './components/JobBoardWidget';
import { ReviewsGrid } from './components/ReviewsGrid';
import { NewsGrid } from './components/NewsGrid';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <NewsTicker />
      <HeroSection />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        <JobBoardWidget />
        <ReviewsGrid />
        <NewsGrid />
      </div>

      <Footer />
    </div>
  );
}

export default App;
