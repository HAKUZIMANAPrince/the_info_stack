import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { NewsTicker } from "./components/NewsTicker";
import { Footer } from "./components/Footer";
import { ProtectedAdminRoute } from "./components/ProtectedAdminRoute";
import { Home } from "./pages/Home";
import { NewsFeed } from "./pages/NewsFeed";
import { AboutUs } from "./pages/AboutUs";
import { Contact } from "./pages/Contact";
import { AdminLogin } from "./pages/AdminLogin";
import { AdminDashboard } from "./pages/AdminDashboard";
import { AdminJobs } from "./pages/AdminJobs";
import { AdminReviews } from "./pages/AdminReviews";
import { AdminNews } from "./pages/AdminNews";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <ProtectedAdminRoute>
                <>
                  <Navbar />
                  <AdminDashboard />
                  <Footer />
                </>
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/jobs"
            element={
              <ProtectedAdminRoute>
                <>
                  <Navbar />
                  <AdminJobs />
                  <Footer />
                </>
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/reviews"
            element={
              <ProtectedAdminRoute>
                <>
                  <Navbar />
                  <AdminReviews />
                  <Footer />
                </>
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/news"
            element={
              <ProtectedAdminRoute>
                <>
                  <Navbar />
                  <AdminNews />
                  <Footer />
                </>
              </ProtectedAdminRoute>
            }
          />

          <Route
            path="/"
            element={
              <>
                <Navbar />
                <NewsTicker />
                <Home />
                <Footer />
              </>
            }
          />
          <Route
            path="/news"
            element={
              <>
                <Navbar />
                <NewsTicker />
                <NewsFeed />
                <Footer />
              </>
            }
          />
          <Route
            path="/about"
            element={
              <>
                <Navbar />
                <NewsTicker />
                <AboutUs />
                <Footer />
              </>
            }
          />
          <Route
            path="/contact"
            element={
              <>
                <Navbar />
                <NewsTicker />
                <Contact />
                <Footer />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}
export default App;
