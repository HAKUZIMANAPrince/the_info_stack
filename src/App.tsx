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
  );
}

export default App;
