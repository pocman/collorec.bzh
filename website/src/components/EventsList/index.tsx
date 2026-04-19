import type {ReactNode} from 'react';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import agendaEvents from '../../data/events.json';

type EventsListProps = {
  category?: string;
  title?: string;
  maxItems?: number;
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

function EventsList({category, title, maxItems}: EventsListProps): ReactNode {
  const now = new Date();
  
  let filteredEvents = agendaEvents.filter(event => {
    if (category && event.category !== category) return false;
    return new Date(event.startsAt) >= now;
  });

  filteredEvents.sort((a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime());

  if (maxItems) {
    filteredEvents = filteredEvents.slice(0, maxItems);
  }

  if (filteredEvents.length === 0) {
    return (
      <div className={styles.noEvents}>
        <p>Aucun événement à venir pour le moment.</p>
      </div>
    );
  }

  return (
    <div className={styles.eventsContainer}>
      {title && <Heading as="h3" className={styles.eventsTitle}>{title}</Heading>}
      <ul className={styles.eventsList}>
        {filteredEvents.map((event) => (
          <li key={`${event.title}-${event.startsAt}`} className={styles.eventItem}>
            <span className={styles.eventTag}>{event.category}</span>
            <h4 className={styles.eventTitle}>{event.title}</h4>
            <p className={styles.eventDate}>{formatDate(event.startsAt)}</p>
            <p className={styles.eventPlace}>{event.place}</p>
            <p className={styles.eventDetails}>{event.details}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EventsList;
