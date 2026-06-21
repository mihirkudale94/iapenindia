import { useCallback, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, ArrowRight, Camera, Expand, X } from 'lucide-react';
import styles from './Events.module.css';

const sourceOrder = [2, 1, 8, 10, 11, 3, 4, 5, 7, 6, 9];

const gallery = sourceOrder.map((number, index) => ({
  src: `/images/events/icnc-2022-${number}.jpeg`,
  alt: `Indian Clinical Nutrition Congress 2022 highlight ${index + 1}`,
}));

const Events = () => {
  const [activeImage, setActiveImage] = useState(null);

  const showPrevious = useCallback(() => {
    setActiveImage((current) => (current === 0 ? gallery.length - 1 : current - 1));
  }, []);

  const showNext = useCallback(() => {
    setActiveImage((current) => (current === gallery.length - 1 ? 0 : current + 1));
  }, []);

  useEffect(() => {
    if (activeImage === null) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setActiveImage(null);
      if (event.key === 'ArrowLeft') showPrevious();
      if (event.key === 'ArrowRight') showNext();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeImage, showNext, showPrevious]);

  return (
    <div className={styles.page}>
      <Helmet>
        <title>Events | IAPEN India</title>
        <meta
          name="description"
          content="Explore highlights from the Indian Clinical Nutrition Congress and IAPEN India events."
        />
      </Helmet>

      <header className={styles.hero}>
        <div className={styles.heroGlow} aria-hidden="true" />
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowLine} />
            IAPEN India Events
          </div>
          <h1>
            Where clinical nutrition
            <br />
            moves forward.
          </h1>
          <p>
            A look inside the conversations, collaborations and people advancing evidence-based
            nutrition care across India.
          </p>
          <a className={styles.skipLink} href="#event-gallery">
            Explore the gallery <ArrowRight size={16} aria-hidden="true" />
          </a>
        </div>
        <div className={styles.heroIndex} aria-hidden="true">
          2022
        </div>
      </header>

      <main id="event-gallery" className={styles.gallerySection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <div>
              <span className={styles.kicker}>Event archive · ICNC</span>
              <h2>Glimpses from ICNC 2022</h2>
            </div>
            <div className={styles.sectionMeta}>
              <Camera size={19} aria-hidden="true" />
              <span>{gallery.length} moments</span>
            </div>
          </div>

          <p className={styles.intro}>
            Moments from the Indian Clinical Nutrition Congress 2022—bringing together clinicians,
            researchers and nutrition professionals around a shared standard of better care.
          </p>

          <div className={styles.galleryGrid}>
            {gallery.map((image, index) => (
              <button
                className={`${styles.galleryCard} ${styles[`card${index + 1}`] || ''}`}
                key={image.src}
                type="button"
                onClick={() => setActiveImage(index)}
                aria-label={`Open photo ${index + 1} of ${gallery.length}`}
              >
                <img src={image.src} alt={image.alt} loading={index > 2 ? 'lazy' : 'eager'} />
                <span className={styles.cardShade} />
                <span className={styles.expandIcon}>
                  <Expand size={18} aria-hidden="true" />
                </span>
              </button>
            ))}
          </div>

          <div className={styles.archiveNote}>
            <span>Indian Clinical Nutrition Congress</span>
            <span className={styles.noteRule} />
            <span>Official event archive</span>
          </div>
        </div>
      </main>

      {activeImage !== null && (
        <div
          className={styles.lightbox}
          role="dialog"
          aria-modal="true"
          aria-label={`Event photo ${activeImage + 1} of ${gallery.length}`}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setActiveImage(null);
          }}
        >
          <button
            type="button"
            className={styles.closeButton}
            onClick={() => setActiveImage(null)}
            aria-label="Close photo viewer"
          >
            <X size={24} />
          </button>
          <button
            type="button"
            className={`${styles.lightboxArrow} ${styles.previous}`}
            onClick={showPrevious}
            aria-label="Previous photo"
          >
            <ArrowLeft size={24} />
          </button>
          <figure className={styles.lightboxFigure}>
            <img src={gallery[activeImage].src} alt={gallery[activeImage].alt} />
            <figcaption>
              <span>ICNC 2022</span>
            </figcaption>
          </figure>
          <button
            type="button"
            className={`${styles.lightboxArrow} ${styles.next}`}
            onClick={showNext}
            aria-label="Next photo"
          >
            <ArrowRight size={24} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Events;
