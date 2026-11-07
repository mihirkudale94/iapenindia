/** Suspense fallback shown while a lazily-loaded route chunk is fetched. */
const PageLoader = () => (
  <div className="page-loader" role="status" aria-live="polite">
    <span className="page-loader__spinner" aria-hidden="true" />
    <span className="sr-only">Loading…</span>
  </div>
);

export default PageLoader;
