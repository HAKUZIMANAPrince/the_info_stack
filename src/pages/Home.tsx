import { HeroSection } from '../components/HeroSection';
import { JobBoardWidget } from '../components/JobBoardWidget';
import { ReviewsGrid } from '../components/ReviewsGrid';
import { NewsGrid } from '../components/NewsGrid';

export function Home() {
  return (
    <>
      <HeroSection />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        <JobBoardWidget />
        <ReviewsGrid />
        <NewsGrid />
      </div>
    </>
  );
}
