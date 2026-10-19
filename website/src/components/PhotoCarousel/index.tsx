import {useState, type ReactNode} from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {landscapePhotos, type LandscapePhoto} from '../../data/municipalMedia';
import styles from './styles.module.css';

function Photo({photo}: {photo: LandscapePhoto}): ReactNode {
  const src = useBaseUrl(photo.src);

  return (
    <>
      <img src={src} alt={photo.alt} loading="lazy" />
      <figcaption>{photo.alt}{photo.credit && ` — ${photo.credit}`}</figcaption>
    </>
  );
}

export default function PhotoCarousel(): ReactNode {
  const [current, setCurrent] = useState(0);

  if (landscapePhotos.length === 0) {
    return null;
  }

  return (
    <section className={`container ${styles.carousel}`} aria-label="Photographies de Collorec" aria-roledescription="carrousel">
      {landscapePhotos.map((photo, index) => (
        <figure
          key={photo.src}
          hidden={index !== current}
          role="group"
          aria-roledescription="diapositive"
          aria-label={`${index + 1} sur ${landscapePhotos.length}`}>
          <Photo photo={photo} />
        </figure>
      ))}
      {landscapePhotos.length > 1 && (
        <div className={styles.controls}>
          <button className="button button--secondary" type="button" onClick={() => setCurrent((current + landscapePhotos.length - 1) % landscapePhotos.length)}>
            Photo précédente
          </button>
          <span aria-live="polite" aria-atomic="true">Photo {current + 1} sur {landscapePhotos.length}</span>
          <button className="button button--secondary" type="button" onClick={() => setCurrent((current + 1) % landscapePhotos.length)}>
            Photo suivante
          </button>
        </div>
      )}
    </section>
  );
}
