import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

// Liste des candidats
const candidates = [
  { name: 'À définir', role: 'Tête de liste', description: 'Engagé(e) pour le développement durable de Collorec' },
  { name: 'À définir', role: 'Candidat(e)', description: 'Acteur/Actrice de la vie associative locale' },
  { name: 'À définir', role: 'Candidat(e)', description: 'Impliqué(e) dans la vie économique du territoire' },
  { name: 'À définir', role: 'Candidat(e)', description: 'Défenseur/Défenseuse du patrimoine collorécois' },
  { name: 'À définir', role: 'Candidat(e)', description: 'Engagé(e) pour la jeunesse et l\'éducation' },
  { name: 'À définir', role: 'Candidat(e)', description: 'Acteur/Actrice du monde agricole' },
];

// Points clés du programme
const keyPoints = [
  {
    title: '🌱 Transition Écologique',
    description: 'Accompagner la transition énergétique et préserver notre environnement naturel exceptionnel.',
  },
  {
    title: '🤝 Lien Social',
    description: 'Renforcer les liens entre les habitants et soutenir la vie associative locale.',
  },
  {
    title: '🏡 Cadre de Vie',
    description: 'Améliorer les services de proximité et l\'attractivité de notre commune.',
  },
  {
    title: '💼 Économie Locale',
    description: 'Soutenir l\'agriculture, l\'artisanat et les commerces de proximité.',
  },
];

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className={styles.heroTitle}>
          {siteConfig.title}
        </Heading>
        <p className={styles.heroSubtitle}>{siteConfig.tagline}</p>
        <p className={styles.heroDescription}>
          Ensemble, construisons l'avenir de Collorec avec une équipe engagée, 
          à l'écoute des habitants et tournée vers un développement harmonieux de notre commune.
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/programme">
            Découvrir notre programme 📋
          </Link>
          <Link
            className="button button--outline button--lg"
            to="/equipe">
            Rencontrer l'équipe 👥
          </Link>
        </div>
      </div>
    </header>
  );
}

function KeyPointsSection(): ReactNode {
  return (
    <section className={styles.keyPoints}>
      <div className="container">
        <Heading as="h2" className={styles.sectionTitle}>
          Nos Engagements
        </Heading>
        <div className={styles.keyPointsGrid}>
          {keyPoints.map((point, idx) => (
            <div key={idx} className={styles.keyPointCard}>
              <Heading as="h3">{point.title}</Heading>
              <p>{point.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CandidatesSection(): ReactNode {
  return (
    <section className={styles.candidates}>
      <div className="container">
        <Heading as="h2" className={styles.sectionTitle}>
          Notre Liste Municipale
        </Heading>
        <p className={styles.sectionSubtitle}>
          Des femmes et des hommes de Collorec, engagés pour notre commune
        </p>
        <div className={styles.candidatesGrid}>
          {candidates.map((candidate, idx) => (
            <div key={idx} className={styles.candidateCard}>
              <div className={styles.candidateAvatar}>
                {candidate.name.charAt(0)}
              </div>
              <Heading as="h3">{candidate.name}</Heading>
              <span className={styles.candidateRole}>{candidate.role}</span>
              <p>{candidate.description}</p>
            </div>
          ))}
        </div>
        <div className={styles.seeMoreButton}>
          <Link
            className="button button--primary button--lg"
            to="/equipe">
            Voir toute l'équipe →
          </Link>
        </div>
      </div>
    </section>
  );
}

function AboutCollorec(): ReactNode {
  return (
    <section className={styles.aboutSection}>
      <div className="container">
        <div className={styles.aboutContent}>
          <div className={styles.aboutText}>
            <Heading as="h2">Collorec, notre commune</Heading>
            <p>
              Située au cœur du Finistère, Collorec est une commune rurale riche 
              de son patrimoine, de ses paysages et surtout de ses habitants.
            </p>
            <p>
              <strong>Notre liste "Collorec, terre de liens"</strong> propose une 
              vision ambitieuse et réaliste pour répondre à ces enjeux, 
              en plaçant l'humain et le lien social au cœur de notre projet.
            </p>
          </div>
          <div className={styles.aboutStats}>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>~600</span>
              <span className={styles.statLabel}>Habitants</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>29</span>
              <span className={styles.statLabel}>Finistère</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>2026</span>
              <span className={styles.statLabel}>Élections</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CallToAction(): ReactNode {
  return (
    <section className={styles.ctaSection}>
      <div className="container">
        <Heading as="h2">Rejoignez-nous !</Heading>
        <p>
          Vous souhaitez vous engager pour Collorec ? 
          Participez à nos réunions publiques et partagez vos idées.
        </p>
        <Link
          className="button button--secondary button--lg"
          to="/contact">
          Nous contacter 📧
        </Link>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title="Accueil"
      description="Collorec, terre de liens - Liste municipale candidate aux élections 2026. Ensemble pour un avenir durable et solidaire.">
      <HomepageHeader />
      <main>
        <KeyPointsSection />
        <AboutCollorec />
        <CandidatesSection />
        <CallToAction />
      </main>
    </Layout>
  );
}
