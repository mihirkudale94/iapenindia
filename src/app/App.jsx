import { Suspense } from 'react';
import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import PageLoader from '@/components/ui/PageLoader';
import ToastContainer from '@/components/ui/ToastContainer';
import FloatingSocials from '@/components/widgets/FloatingSocials';
import GuidedTour from '@/components/widgets/GuidedTour';
import SupportWidget from '@/components/widgets/SupportWidget';
import AppProviders from './providers/AppProviders';
import AppRoutes from './router/AppRoutes';

const App = () => (
  <AppProviders>
    <div className="app-container">
      <Navbar />
      <FloatingSocials />
      <SupportWidget />
      <ToastContainer />
      <GuidedTour />
      <main className="main-content">
        <Suspense fallback={<PageLoader />}>
          <AppRoutes />
        </Suspense>
      </main>
      <Footer />
    </div>
  </AppProviders>
);

export default App;
