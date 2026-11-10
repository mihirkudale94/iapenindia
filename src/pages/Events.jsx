import { useCallback, useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  ArrowRight,
  Camera,
  ChevronLeft,
  ChevronRight,
  Download,
  Maximize,
  Minimize,
  Share2,
  X,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import styles from './Events.module.css';

// Same order as the gallery on iapenindia.org/events/
const sourceOrder = [2, 1, 8, 10, 11, 3, 4, 5, 7, 6, 9];

const gallery = sourceOrder.map((number, index) => ({
  src: `/images/events/icnc-2022-${number}.jpeg`,
  alt: `Indian Clinical Nutrition Congress 2022 highlight ${index + 1}`,
}));

const ZOOM_SCALE = 3;
const SWIPE_THRESHOLD = 50;

const clamp = (value, limit) => Math.max(-limit, Math.min(limit, value));

const Lightbox = ({ index, onChange, onClose }) => {
  const rootRef = useRef(null);
  const dragRef = useRef(null);
  const [zoomed, setZoomed] = useState(false);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState(0);
  const [shareOpen, setShareOpen] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);

  const total = gallery.length;
  const current = gallery[index];
  const absoluteSrc =
    typeof window === 'undefined' ? current.src : new URL(current.src, window.location.origin).href;
  const pageUrl = typeof window === 'undefined' ? '' : window.location.href;

  const resetView = () => {
    setZoomed(false);
    setPan({ x: 0, y: 0 });
    setShareOpen(false);
  };

  const go = useCallback(
    (step) => {
      resetView();
      onChange((currentIndex) => (currentIndex + step + total) % total);
    },
    [onChange, total]
  );

  const toggleZoom = () => {
    setZoomed((value) => !value);
    setPan({ x: 0, y: 0 });
  };

  const toggleFullscreen = () => {
    if (document.fullscreenElement) document.exitFullscreen?.();
    else rootRef.current?.requestFullscreen?.();
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && !document.fullscreenElement) onClose();
      if (event.key === 'ArrowLeft') go(-1);
      if (event.key === 'ArrowRight') go(1);
    };
    const handleFullscreen = () => setFullscreen(Boolean(document.fullscreenElement));

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('fullscreenchange', handleFullscreen);
    rootRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('fullscreenchange', handleFullscreen);
      if (document.fullscreenElement) document.exitFullscreen?.();
    };
  }, [go, onClose]);

  const handlePointerDown = (event) => {
    if (event.button !== 0) return;
    dragRef.current = { x: event.clientX, y: event.clientY, pan, moved: false };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event) => {
    const drag = dragRef.current;
    if (!drag) return;
    const dx = event.clientX - drag.x;
    const dy = event.clientY - drag.y;
    if (Math.abs(dx) > 4 || Math.abs(dy) > 4) drag.moved = true;

    if (zoomed) {
      const rect = event.currentTarget.getBoundingClientRect();
      const limitX = (rect.width * (ZOOM_SCALE - 1)) / 2;
      const limitY = (rect.height * (ZOOM_SCALE - 1)) / 2;
      setPan({ x: clamp(drag.pan.x + dx, limitX), y: clamp(drag.pan.y + dy, limitY) });
    } else {
      setDragOffset(dx);
    }
  };

  const handlePointerUp = (event) => {
    const drag = dragRef.current;
    dragRef.current = null;
    if (!drag) return;
    const dx = event.clientX - drag.x;
    setDragOffset(0);

    if (!zoomed && Math.abs(dx) > SWIPE_THRESHOLD) {
      go(dx < 0 ? 1 : -1);
    } else if (!drag.moved && event.target === event.currentTarget) {
      // Clicking the dark area around the photo closes the viewer, as on the original site.
      onClose();
    }
  };

  return (
    <div
      ref={rootRef}
      className={styles.lightbox}
      role="dialog"
      aria-modal="true"
      aria-label={`Event photo ${index + 1} of ${total}`}
      tabIndex={-1}
    >
      <header className={styles.lightboxHeader}>
        <span className={styles.counter}>
          {index + 1} / {total}
        </span>
        <div className={styles.toolbar}>
          <button
            type="button"
            onClick={toggleFullscreen}
            aria-label={fullscreen ? 'Exit fullscreen' : 'Fullscreen'}
            aria-pressed={fullscreen}
          >
            {fullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
          </button>
          <button type="button" onClick={toggleZoom} aria-label="Zoom" aria-pressed={zoomed}>
            {zoomed ? <ZoomOut size={20} /> : <ZoomIn size={20} />}
          </button>
          <button
            type="button"
            onClick={() => setShareOpen((value) => !value)}
            aria-label="Share"
            aria-expanded={shareOpen}
          >
            <Share2 size={20} />
          </button>
          <button type="button" onClick={onClose} aria-label="Close">
            <X size={24} />
          </button>
        </div>
      </header>

      {shareOpen && (
        <div className={styles.shareMenu}>
          <a
            href={`https://www.facebook.com/sharer.php?u=${encodeURIComponent(pageUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Share on Facebook
          </a>
          <a
            href={`https://x.com/intent/tweet?text=${encodeURIComponent(pageUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Share on X
          </a>
          <a
            href={`https://www.pinterest.com/pin/create/button/?url=${encodeURIComponent(
              pageUrl
            )}&media=${encodeURIComponent(absoluteSrc)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Pin it
          </a>
          <a href={current.src} download>
            <Download size={16} aria-hidden="true" /> Download image
          </a>
        </div>
      )}

      <div className={styles.viewport}>
        <div
          className={styles.track}
          style={{
            transform: `translateX(calc(${-index * 100}% + ${dragOffset}px))`,
            transition: dragOffset ? 'none' : undefined,
          }}
        >
          {gallery.map((image, slideIndex) => {
            const active = slideIndex === index;
            return (
              <div
                className={styles.slide}
                key={image.src}
                aria-hidden={!active}
                onPointerDown={active ? handlePointerDown : undefined}
                onPointerMove={active ? handlePointerMove : undefined}
                onPointerUp={active ? handlePointerUp : undefined}
                onPointerCancel={() => {
                  dragRef.current = null;
                  setDragOffset(0);
                }}
                onDoubleClick={active ? toggleZoom : undefined}
              >
                {Math.abs(slideIndex - index) <= 1 && (
                  <img
                    src={image.src}
                    alt={image.alt}
                    draggable="false"
                    className={active && zoomed ? styles.zoomed : undefined}
                    style={
                      active && zoomed
                        ? { transform: `translate(${pan.x}px, ${pan.y}px) scale(${ZOOM_SCALE})` }
                        : undefined
                    }
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      <button
        type="button"
        className={`${styles.lightboxArrow} ${styles.previous}`}
        onClick={() => go(-1)}
        aria-label="Previous slide"
      >
        <ChevronLeft size={34} />
      </button>
      <button
        type="button"
        className={`${styles.lightboxArrow} ${styles.next}`}
        onClick={() => go(1)}
        aria-label="Next slide"
      >
        <ChevronRight size={34} />
      </button>
    </div>
  );
};

const Events = () => {
  const [activeImage, setActiveImage] = useState(null);
  const closeLightbox = useCallback(() => setActiveImage(null), []);

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
              <a
                className={styles.galleryItem}
                key={image.src}
                href={image.src}
                onClick={(event) => {
                  event.preventDefault();
                  setActiveImage(index);
                }}
                aria-label={`Open photo ${index + 1} of ${gallery.length}`}
              >
                <img src={image.src} alt={image.alt} loading={index > 3 ? 'lazy' : 'eager'} />
              </a>
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
        <Lightbox index={activeImage} onChange={setActiveImage} onClose={closeLightbox} />
      )}
    </div>
  );
};

export default Events;
