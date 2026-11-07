import { lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import ExternalRedirect from '@/components/ui/ExternalRedirect';
import {
  legacyChapterSlugs,
  legacyCoreGroupSlugs,
  legacyPathRedirects,
  retiredThemeSlugs,
} from './legacyRedirects';

// Each page is its own chunk, so a visitor downloads only the route they open.
const Home = lazy(() => import('@/pages/Home'));
const About = lazy(() => import('@/pages/About'));
const OfficeBearers = lazy(() => import('@/pages/OfficeBearers'));
const AdvisoryBoard = lazy(() => import('@/pages/AdvisoryBoard'));
const Chapters = lazy(() => import('@/pages/Chapters'));
const ChapterDetail = lazy(() => import('@/pages/ChapterDetail'));
const CoreGroups = lazy(() => import('@/pages/CoreGroups'));
const CoreGroupDetail = lazy(() => import('@/pages/CoreGroupDetail'));
const Membership = lazy(() => import('@/pages/Membership'));
const Courses = lazy(() => import('@/pages/Courses'));
const Events = lazy(() => import('@/pages/Events'));
const Contact = lazy(() => import('@/pages/Contact'));
const Policies = lazy(() => import('@/pages/Policies'));
const Dashboard = lazy(() => import('@/pages/Dashboard'));

// Resources.jsx holds three small document pages that share one chunk.
const Bylaws = lazy(() => import('@/pages/Resources').then((m) => ({ default: m.Bylaws })));
const NewsletterArchive = lazy(() =>
  import('@/pages/Resources').then((m) => ({ default: m.NewsletterArchive }))
);
const MalnutritionActivities = lazy(() =>
  import('@/pages/Resources').then((m) => ({ default: m.MalnutritionActivities }))
);

const JOURNAL_URL = 'https://jnutres.com/';

const AppRoutes = () => (
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
    <Route path="/events" element={<Events />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/journal" element={<ExternalRedirect url={JOURNAL_URL} />} />

    <Route path="/privacy-policy" element={<Policies defaultTab="privacy" />} />
    <Route path="/terms-and-conditions" element={<Policies defaultTab="terms" />} />
    <Route path="/refund-policy" element={<Policies defaultTab="refund" />} />

    <Route path="/bylaws" element={<Bylaws />} />
    <Route path="/newsletter-anniversary-edition" element={<NewsletterArchive />} />
    <Route path="/malnutrition" element={<MalnutritionActivities />} />

    {legacyPathRedirects.map(({ from, to }) => (
      <Route key={from} path={from} element={<Navigate to={to} replace />} />
    ))}
    {legacyCoreGroupSlugs.map((slug) => (
      <Route
        key={slug}
        path={`/${slug}`}
        element={<Navigate to={`/core-groups/${slug}`} replace />}
      />
    ))}
    {legacyChapterSlugs.map((slug) => (
      <Route key={slug} path={`/${slug}`} element={<Navigate to={`/chapters/${slug}`} replace />} />
    ))}
    {retiredThemeSlugs.map((slug) => (
      <Route key={slug} path={`/${slug}`} element={<Navigate to="/" replace />} />
    ))}

    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default AppRoutes;
