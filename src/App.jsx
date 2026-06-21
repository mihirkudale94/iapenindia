import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingSocials from './components/FloatingSocials';
import SupportWidget from './components/SupportWidget';
import { DemoProvider } from './components/DemoContext';
import ToastContainer from './components/ToastContainer';
import GuidedTour from './components/GuidedTour';

// Lazy load pages for better performance (Code Splitting)
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Chapters = lazy(() => import('./pages/Chapters'));
const CoreGroups = lazy(() => import('./pages/CoreGroups'));
const Membership = lazy(() => import('./pages/Membership'));
const Courses = lazy(() => import('./pages/Courses'));
const Journal = lazy(() => import('./pages/Journal'));
const Events = lazy(() => import('./pages/Events'));
const Contact = lazy(() => import('./pages/Contact'));
const Policies = lazy(() => import('./pages/Policies'));
const Dashboard = lazy(() => import('./pages/Dashboard'));

// Simple loading fallback
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[50vh]">
    <div className="w-12 h-12 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin"></div>
  </div>
);

function App() {
  return (
    <HelmetProvider>
      <DemoProvider>
        <Router>
          <div className="app-container">
            <Navbar />
            <FloatingSocials />
            <SupportWidget />
            <ToastContainer />
            <GuidedTour />
            <main className="main-content">
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/chapters" element={<Chapters />} />
                  <Route path="/core-groups" element={<CoreGroups />} />
                  <Route path="/membership" element={<Membership />} />
                  <Route path="/courses" element={<Courses />} />
                  <Route path="/journal" element={<Journal />} />
                  <Route path="/events" element={<Events />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/privacy-policy" element={<Policies defaultTab="privacy" />} />
                  <Route path="/terms-and-conditions" element={<Policies defaultTab="terms" />} />
                  <Route path="/refund-policy" element={<Policies defaultTab="refund" />} />
                </Routes>
              </Suspense>
            </main>
            <Footer />
          </div>
        </Router>
      </DemoProvider>
    </HelmetProvider>
  );
}

export default App;
