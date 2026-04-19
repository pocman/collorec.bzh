import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';
import agendaEvents from '../data/events.json';

type SectionCard = {
  title: string;
  description: string;
  to: string;
  cta: string;
};

type EventItem = {
  title: string;
  startsAt: string;
  place: string;
  details: string;
  category: 'APE' | 'Marche' | 'Entreprises' | 'Associations';
};

const sectionCards: SectionCard[] = [
  {
    title: 'APE de l\'école',
    description: 'Retrouvez les informations de l\'association des parents d\'élèves, les actions en cours et les rendez-vous de l\'école.',
    to: '/ape',
    cta: 'Voir la page APE',
  },
  {
    title: 'Marché des Marguerites',
    description: 'Consultez les prochains marchés, les producteurs présents et les initiatives autour des circuits courts à Collorec.',
    to: '/marche-des-marguerites',
    cta: 'Voir le marché',
  },
  {
    title: 'Entreprises de Collorec',
    description: 'Découvrez les artisans, commerces, exploitations et services qui font vivre l\'économie locale.',
    to: '/entreprises',
    cta: 'Voir les entreprises',
  },
  {
    title: 'Associations',
    description: 'Explorez la vie associative de la commune : culture, sport, solidarité et initiatives citoyennes.',
    to: '/associations',
    cta: 'Voir les associations',
  },
];

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

function getNextEventsByCategory(): EventItem[] {
  const now = new Date();
  const categories = new Set<string>();
  const nextEvents: EventItem[] = [];

  // Get all unique categories
  agendaEvents.forEach(event => categories.add(event.category));

  // Find the next event for each category
  categories.forEach(category => {
    const futureEvents = (agendaEvents as EventItem[])
      .filter(event => event.category === category && new Date(event.startsAt) >= now)
      .sort((a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime());
    
    if (futureEvents.length > 0) {
      nextEvents.push(futureEvents[0]);
    }
  });

  // Sort by date
  return nextEvents.sort((a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime());
}

function Hero(): ReactNode {
  const {siteConfig} = useDocusaurusContext();

  return (
    <header className={styles.hero}>
      <div className="container">
        <div className={styles.heroLogoWrap}>
          <img src="/img/logo.svg" alt="Logo de la commune de Collorec" className={styles.heroLogo} />
        </div>
        <Heading as="h1" className={styles.heroTitle}>
          {siteConfig.title}
        </Heading>
        <p className={styles.heroSubtitle}>{siteConfig.tagline}</p>
        <p className={styles.heroIntro}>
          Bienvenue sur le site communal de Collorec. Vous y trouverez les informations utiles pour la vie locale,
          les actualités de la commune et les rendez-vous à venir.
        </p>
        <div className={styles.heroActions}>
          <Link className="button button--primary button--lg" to="/contact">
            Contacter la commune
          </Link>
          <Link className="button button--secondary button--lg" to="/programme">
            Lire le programme municipal
          </Link>
        </div>
      </div>
    </header>
  );
}

function LocalSections(): ReactNode {
  return (
    <section className={styles.sectionBlock}>
      <div className="container">
        <Heading as="h2" className={styles.sectionTitle}>
          Vie locale à Collorec
        </Heading>
        <p className={styles.sectionLead}>
          Accédez directement aux quatre rubriques principales de la commune.
        </p>
        <div className={styles.cardsGrid}>
          {sectionCards.map((card) => (
            <article key={card.title} className={styles.card}>
              <Heading as="h3">{card.title}</Heading>
              <p>{card.description}</p>
              <Link to={card.to} className={styles.cardLink}>
                {card.cta}
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function AgendaSection(): ReactNode {
  const nextEvents = getNextEventsByCategory();

  return (
    <section className={styles.agenda}>
      <div className="container">
        <div className={styles.agendaHeader}>
          <div>
            <Heading as="h2" className={styles.sectionTitle}>
              Calendrier des activités communales
            </Heading>
            <p className={styles.sectionLead}>
              Consultez les prochains rendez-vous de chaque catégorie et téléchargez le calendrier au format iCalendar.
            </p>
          </div>
          <div className={styles.agendaActions}>
            <Link className="button button--primary button--lg" href="webcal://collorec.bzh/agenda.ics">
              S'abonner au calendrier
            </Link>
            <Link className="button button--primary button--lg" href="pathname:///agenda.ics">
              Télécharger le calendrier .ics
            </Link>
          </div>
        </div>
        {nextEvents.length > 0 ? (
          <ul className={styles.eventsList}>
            {nextEvents.map((event) => (
              <li key={`${event.title}-${event.startsAt}`} className={styles.eventItem}>
                <span className={styles.eventTag}>{event.category}</span>
                <Heading as="h3">{event.title}</Heading>
                <p className={styles.eventDate}>{formatDate(event.startsAt)}</p>
                <p className={styles.eventPlace}>{event.place}</p>
                <p className={styles.eventDetails}>{event.details}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p style={{textAlign: 'center', color: '#666', marginTop: '2rem'}}>
            Aucun événement à venir pour le moment.
          </p>
        )}
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  return (
    <Layout
      title="Accueil"
      description="Site communal de Collorec : vie locale, associations, entreprises et agenda des activités.">
      <Hero />
      <main>
        <LocalSections />
        <AgendaSection />
      </main>
    </Layout>
  );
}
