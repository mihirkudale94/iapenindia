import { useEffect } from 'react';

/**
 * Hands the browser over to an address outside this app. Used for routes that
 * exist only for backwards compatibility with the previous WordPress site.
 */
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

export default ExternalRedirect;
