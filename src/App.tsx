<<<<<<< HEAD
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { NewsTicker } from './components/NewsTicker';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { NewsFeed } from './pages/NewsFeed';
import { AboutUs } from './pages/AboutUs';
import { Contact } from './pages/Contact';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <NewsTicker />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/news" element={<NewsFeed />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>

        <Footer />
      </div>
    </Router>
=======
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
>>>>>>> 45d975d09caff3e1305b751cc91fa91d910af43b
  );
}

export default App;
