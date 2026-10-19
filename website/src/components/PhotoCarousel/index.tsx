import {useEffect, useRef, useState, type KeyboardEvent, type ReactNode} from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {landscapePhotos, type LandscapePhoto} from '../../data/municipalMedia';
import styles from './styles.module.css';

function Photo({photo, inline}: {photo: LandscapePhoto; inline?: boolean}): ReactNode {
  const src = useBaseUrl(photo.src);

  return (
    <>
      <img
        src={src}
        alt={photo.alt}
        loading={inline ? 'lazy' : 'eager'}
        decoding="async"
      />
      {photo.credit && <figcaption>{photo.alt} — {photo.credit}</figcaption>}
    </>
  );
}

export default function PhotoCarousel(): ReactNode {
  const [current, setCurrent] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const total = landscapePhotos.length;

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) {
      return;
    }

    if (fullscreen && !dialog.open) {
      dialog.showModal();
    }

    if (!fullscreen && dialog.open) {
      dialog.close();
    }
  }, [fullscreen]);

  useEffect(() => {
    if (current >= total) {
      setCurrent(0);
    }
  }, [current, total]);

  if (total === 0) {
    return null;
  }
  const currentPhoto = landscapePhotos[current];

  function goTo(delta: number): void {
    setCurrent((value) => (value + delta + total) % total);
  }

  function closeFullscreen(): void {
    setFullscreen(false);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLElement>): void {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      goTo(-1);
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      goTo(1);
    }

    if (event.key === 'Escape' && fullscreen) {
      event.preventDefault();
      closeFullscreen();
    }
  }

  return (
    <>
      <section
        className={`container ${styles.carousel}`}
        aria-label="Photographies de Collorec"
        aria-roledescription="carrousel"
        tabIndex={0}
        onKeyDown={handleKeyDown}>
        <div className={styles.viewport}>
          <div className={styles.track} style={{transform: `translateX(-${current * 100}%)`}}>
            {landscapePhotos.map((photo, index) => (
              <figure
                key={photo.src}
                className={styles.slide}
                role="group"
                aria-roledescription="diapositive"
                aria-label={`${index + 1} sur ${total}`}>
                <Photo photo={photo} inline />
              </figure>
            ))}
          </div>

          {total > 1 && (
            <>
              <button
                className={`${styles.navButton} ${styles.navButtonPrev}`}
                type="button"
                onClick={() => goTo(-1)}
                aria-label="Photo précédente">
                <span aria-hidden="true">‹</span>
              </button>
              <button
                className={`${styles.navButton} ${styles.navButtonNext}`}
                type="button"
                onClick={() => goTo(1)}
                aria-label="Photo suivante">
                <span aria-hidden="true">›</span>
              </button>
            </>
          )}

          <button
            className={styles.fullscreenButton}
            type="button"
            onClick={() => setFullscreen(true)}
            aria-label="Ouvrir le carrousel en plein écran">
            Plein écran
          </button>

          <div className={styles.counter} aria-live="polite" aria-atomic="true">
            {current + 1}/{total}
          </div>
        </div>
      </section>

      <dialog
        ref={dialogRef}
        className={styles.fullscreenDialog}
        aria-label={`Aperçu plein écran de ${currentPhoto.alt}`}
        onClose={closeFullscreen}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            closeFullscreen();
          }
        }}>
        <div className={styles.fullscreenShell} onKeyDown={handleKeyDown} tabIndex={0}>
          <button className={styles.closeButton} type="button" onClick={closeFullscreen} aria-label="Fermer le plein écran">
            ×
          </button>

          <div className={styles.viewport}>
            <div className={styles.track} style={{transform: `translateX(-${current * 100}%)`}}>
              {landscapePhotos.map((photo, index) => (
                <figure
                  key={photo.src}
                  className={styles.slide}
                  role="group"
                  aria-roledescription="diapositive"
                  aria-label={`${index + 1} sur ${total}`}>
                  <Photo photo={photo} />
                </figure>
              ))}
            </div>

            {total > 1 && (
              <>
                <button
                  className={`${styles.navButton} ${styles.navButtonPrev}`}
                  type="button"
                  onClick={() => goTo(-1)}
                  aria-label="Photo précédente">
                  <span aria-hidden="true">‹</span>
                </button>
                <button
                  className={`${styles.navButton} ${styles.navButtonNext}`}
                  type="button"
                  onClick={() => goTo(1)}
                  aria-label="Photo suivante">
                  <span aria-hidden="true">›</span>
                </button>
              </>
            )}

            <div className={styles.counter} aria-live="polite" aria-atomic="true">
              {current + 1}/{total}
            </div>
          </div>

          <p className={styles.fullscreenCaption}>{currentPhoto.alt}{currentPhoto.credit ? ` — ${currentPhoto.credit}` : ''}</p>
        </div>
      </dialog>
    </>
  );
}
