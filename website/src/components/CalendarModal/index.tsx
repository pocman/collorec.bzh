import {type ReactNode, useState} from 'react';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import agendaEvents from '../../data/events.json';

type CalendarModalProps = {
  buttonLabel?: string;
};

function formatDate(isoString: string): string {
  const date = new Date(isoString);
  return new Intl.DateTimeFormat('fr-FR', {
    weekday: 'short',
    day: '2-digit',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

export default function CalendarModal({buttonLabel = 'Voir l\'agenda complet'}: CalendarModalProps): ReactNode {
  const [isOpen, setIsOpen] = useState(false);

  // Sort events by date
  const sortedEvents = [...agendaEvents].sort(
    (a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime()
  );

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <a
        className="button button--primary button--lg"
        onClick={() => setIsOpen(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            setIsOpen(true);
          }
        }}
      >
        {buttonLabel}
      </a>

      {isOpen && (
        <div className={styles.overlay} onClick={closeModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <Heading as="h2" className={styles.modalTitle}>
                Agenda complet
              </Heading>
              <button
                className={styles.closeButton}
                onClick={closeModal}
                type="button"
                aria-label="Fermer"
              >
                ×
              </button>
            </div>

            <div className={styles.eventsList}>
              {sortedEvents.map((event) => (
                <div key={`${event.title}-${event.startsAt}`} className={styles.eventItem}>
                  <div className={styles.eventHeader}>
                    <span className={styles.eventCategory}>{event.category}</span>
                    <span className={styles.eventDate}>
                      {formatDate(event.startsAt)}
                    </span>
                  </div>
                  <Heading as="h3" className={styles.eventItemTitle}>
                    {event.title}
                  </Heading>
                  {event.details && (
                    <p className={styles.eventItemDetails}>{event.details}</p>
                  )}
                  {event.place && (
                    <p className={styles.eventItemPlace}>📍 {event.place}</p>
                  )}
                  {event.lieu && (
                    <p className={styles.eventItemPlace}>📍 {event.lieu}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
