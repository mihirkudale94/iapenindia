import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import { DemoProvider } from '@/context/DemoContext';

/**
 * Every cross-cutting provider the app needs, in one place, so `App` stays a
 * description of the layout rather than a stack of wrappers.
 */
const AppProviders = ({ children }) => (
  <HelmetProvider>
    <DemoProvider>
      <BrowserRouter>{children}</BrowserRouter>
    </DemoProvider>
  </HelmetProvider>
);

export default AppProviders;
