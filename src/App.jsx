import { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingSocials from './components/FloatingSocials';
import SupportWidget from './components/SupportWidget';
import { DemoProvider } from './components/DemoContext';
import ToastContainer from './components/ToastContainer';
import GuidedTour from './components/GuidedTour';
import { legacyChapterSlugs, legacyCoreGroupSlugs, retiredThemeSlugs } from './data/legacyRoutes';

// Lazy load pages for better performance (Code Splitting)
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const OfficeBearers = lazy(() => import('./pages/OfficeBearers'));
const AdvisoryBoard = lazy(() => import('./pages/AdvisoryBoard'));
const Chapters = lazy(() => import('./pages/Chapters'));
const CoreGroups = lazy(() => import('./pages/CoreGroups'));
const CoreGroupDetail = lazy(() => import('./pages/CoreGroupDetail'));
const ChapterDetail = lazy(() => import('./pages/ChapterDetail'));
const Membership = lazy(() => import('./pages/Membership'));
const Courses = lazy(() => import('./pages/Courses'));
const Events = lazy(() => import('./pages/Events'));
const Contact = lazy(() => import('./pages/Contact'));
const Policies = lazy(() => import('./pages/Policies'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Bylaws = lazy(() =>
  import('./pages/Resources').then((module) => ({ default: module.Bylaws }))
);
const NewsletterArchive = lazy(() =>
  import('./pages/Resources').then((module) => ({ default: module.NewsletterArchive }))
);
const MalnutritionActivities = lazy(() =>
  import('./pages/Resources').then((module) => ({ default: module.MalnutritionActivities }))
);

// Simple loading fallback
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[50vh]">
    <div className="w-12 h-12 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const ExternalRedirect = ({ url }) => {
  useEffect(() => {
    window.location.replace(url);
  }, [url]);

  return (
    <div className="container section text-center">
      <p>
        Opening the journal at <a href={url}>{url}</a>
      </p>
    </div>
  );
};

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
                  <Route path="/office-bearers" element={<OfficeBearers />} />
                  <Route path="/advisory-board" element={<AdvisoryBoard />} />
                  <Route path="/chapters" element={<Chapters />} />
                  <Route path="/chapters/:slug" element={<ChapterDetail />} />
                  <Route path="/core-groups" element={<CoreGroups />} />
                  <Route path="/core-groups/:slug" element={<CoreGroupDetail />} />
                  <Route path="/membership" element={<Membership />} />
                  <Route path="/courses" element={<Courses />} />
                  <Route
                    path="/journal"
                    element={<ExternalRedirect url="https://jnutres.com/" />}
                  />
                  <Route path="/events" element={<Events />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/privacy-policy" element={<Policies defaultTab="privacy" />} />
                  <Route path="/terms-and-conditions" element={<Policies defaultTab="terms" />} />
                  <Route path="/refund-policy" element={<Policies defaultTab="refund" />} />
                  <Route path="/bylaws" element={<Bylaws />} />
                  <Route path="/newsletter-anniversary-edition" element={<NewsletterArchive />} />
                  <Route path="/malnutrition" element={<MalnutritionActivities />} />
                  <Route path="/about-us" element={<Navigate to="/about" replace />} />
                  <Route path="/contact-us" element={<Navigate to="/contact" replace />} />
                  <Route
                    path="/refund_returns"
                    element={<Navigate to="/refund-policy" replace />}
                  />
                  <Route
                    path="/register-now"
                    element={<Navigate to="/membership#register" replace />}
                  />
                  <Route
                    path="/espen-lll-courses"
                    element={<Navigate to="/courses#espen-lll" replace />}
                  />
                  <Route
                    path="/espen-membership"
                    element={<Navigate to="/courses#espen-membership" replace />}
                  />
                  <Route
                    path="/espen-eligibility-for-t-lll"
                    element={<Navigate to="/courses#t-lll" replace />}
                  />
                  <Route
                    path="/gi-core-group"
                    element={<Navigate to="/core-groups/gastrointestinal-nutrition" replace />}
                  />
                  {legacyCoreGroupSlugs.map((slug) => (
                    <Route
                      key={slug}
                      path={`/${slug}`}
                      element={<Navigate to={`/core-groups/${slug}`} replace />}
                    />
                  ))}
                  {legacyChapterSlugs.map((slug) => (
                    <Route
                      key={slug}
                      path={`/${slug}`}
                      element={<Navigate to={`/chapters/${slug}`} replace />}
                    />
                  ))}
                  {retiredThemeSlugs.map((slug) => (
                    <Route key={slug} path={`/${slug}`} element={<Navigate to="/" replace />} />
                  ))}
                  <Route path="*" element={<Navigate to="/" replace />} />
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
