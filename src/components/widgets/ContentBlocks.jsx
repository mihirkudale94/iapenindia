// Text, photo galleries and videos copied from a page on iapenindia.org, rendered in page order.
// Shared by the Chapter and Core Group detail pages.

// "Events :" / "Activities" headings on the live site introduce a section; other headings are event titles.
const SECTION_HEADING = /^(events?|activities)\s*:?$/i;

const ContentBlocks = ({ blocks, variant = 'activities' }) => {
  if (!blocks?.length) return null;
  // The event title each block belongs to, used as alt text for its photos.
  const eventTitles = blocks.reduce((titles, block) => {
    const previous = titles[titles.length - 1] || '';
    const isEventTitle = block.type === 'heading' && !SECTION_HEADING.test(block.text);
    return [...titles, isEventTitle ? block.text : previous];
  }, []);
  return (
    <div className={`chapter-activities${variant === 'intro' ? ' is-intro' : ''}`}>
      {blocks.map((block, index) => {
        if (block.type === 'heading') {
          if (SECTION_HEADING.test(block.text)) {
            return (
              <h2 key={index} className="section-title chapter-activities-title">
                {block.text.replace(/\s*:$/, '')}
              </h2>
            );
          }
          return (
            <h3 key={index} className="chapter-activity-heading">
              {block.text}
            </h3>
          );
        }
        if (block.type === 'text') {
          return (
            <p key={index} className="chapter-activity-text">
              {block.text}
            </p>
          );
        }
        if (block.type === 'video') {
          return (
            <div key={index} className="chapter-activity-video">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${block.youtubeId}`}
                title={eventTitles[index] || 'IAPEN India video'}
                loading="lazy"
                allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          );
        }
        const label = eventTitles[index] || 'Activity';
        const single = block.images.length === 1;
        return (
          <div key={index} className={`chapter-activity-gallery${single ? ' is-single' : ''}`}>
            {block.images.map((image, photo) => (
              <figure key={image.src}>
                <a href={image.src} target="_blank" rel="noopener noreferrer">
                  <img
                    src={image.src}
                    alt={image.caption || image.alt || `${label} – photo ${photo + 1}`}
                    loading="lazy"
                    decoding="async"
                  />
                </a>
                {image.caption && <figcaption>{image.caption}</figcaption>}
              </figure>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default ContentBlocks;
