import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

// Liste des candidats avec photos
const candidates = [
  { name: 'Georges Croguennec', role: 'Maire sortant', photo: '/img/team/georges.png', description: '68 ans - Retraité de l\'agriculture' },
  { name: 'Nadine Poupon', role: 'Adjointe sortante', photo: '/img/team/nadine.png', description: '65 ans - Infirmière retraitée' },
  { name: 'Philippe Castel', role: 'Président Collorec en fête', photo: '/img/team/philippe.png', description: '30 ans - Artisan plombier et électricien' },
  { name: 'Fabienne Bourlès', role: 'Conseillère sortante', photo: '/img/team/fabienne.png', description: '36 ans - Agricultrice' },
  { name: 'Delphine Cochennec', role: 'Conseillère sortante', photo: '/img/team/delphine.png', description: '38 ans - Consultante en recrutement' },
  { name: 'Francis Le Baut', role: 'Conseiller sortant', photo: '/img/team/francis.png', description: '66 ans - Retraité de l\'agriculture' },
];

// Points clés du programme (basés sur la circulaire)
const keyPoints = [
  {
    title: '🏠 Habitat & Mobilité',
    description: 'Favoriser le locatif, activer la compétence mobilité, entretenir la voirie et la sécurité routière.',
  },
  {
    title: '🎒 Vie Scolaire',
    description: 'Aménager l\'école et ses abords, soutenir les projets pédagogiques, conforter la cantine et la garderie.',
  },
  {
    title: '💼 Vie Économique',
    description: 'Extension du restaurant, soutien aux artisans et agriculteurs, reprise du local communautaire.',
  },
  {
    title: '🎭 Culture & Patrimoine',
    description: 'Commission culture, entretien des chapelles et de l\'église, mise en valeur du plan d\'eau.',
  },
  {
    title: '📢 Communication',
    description: 'Site internet, newsletters, bulletin municipal, permanence d\'un élu le samedi matin.',
  },
  {
    title: '🤝 Social',
    description: 'Maintien du CCAS, soutien aux associations, lien intergénérationnel.',
  },
];

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <div className={styles.heroLogo}>
          <img src="/img/logo.svg" alt="Collorec, terre de liens" />
        </div>
        <Heading as="h1" className={styles.heroTitle}>
          {siteConfig.title}
        </Heading>
        <p className={styles.heroSubtitle}>{siteConfig.tagline}</p>
        <p className={styles.heroDescription}>
          Une équipe menée par Georges Croguennec, maire sortant, avec l'ambition 
          de renforcer les liens entre les habitants et les acteurs de notre commune. 
          Dialogue, concertation et solidarité pour construire une commune plus unie et dynamique.
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/programme">
            Découvrir notre programme
          </Link>
          <Link
            className="button button--outline button--lg"
            to="/equipe">
            Rencontrer l'équipe
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
          17 femmes et hommes de Collorec, engagés pour notre commune
        </p>
        <div className={styles.teamPhotoContainer}>
          <img src="/img/team/liste.png" alt="Notre liste complète" className={styles.teamPhoto} />
        </div>
        <div className={styles.candidatesGrid}>
          {candidates.map((candidate, idx) => (
            <div key={idx} className={styles.candidateCard}>
              <div className={styles.candidateAvatar}>
                <img src={candidate.photo} alt={candidate.name} />
              </div>
              <Heading as="h3">{candidate.name}</Heading>
              <p className={styles.candidateAge}>{candidate.description.split(' - ')[0]}</p>
              <p className={styles.candidateJob}>{candidate.description.split(' - ')[1]}</p>
              <p className={styles.candidateRole}>{candidate.role}</p>
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
            <Heading as="h2">À propos de notre projet</Heading>
            <p>
              Avec <strong>"Collorec, terre de liens"</strong>, nous voulons construire une commune 
              où chacun se sent impliqué et où les projets naissent de la collaboration entre élus et citoyens.
            </p>
            <p>
              Notre ambition est claire : <strong>renforcer les liens entre les habitants</strong>, 
              les associations et les acteurs économiques pour bâtir une Collorec plus unie et dynamique.
            </p>
            <p>
              <em>"Nous voulons que Collorec soit une terre d'accueil, de partage et de solidarité. 
              Chaque idée, chaque projet compte pour nous."</em> déclare Georges Croguennec, maire sortant.
            </p>
            <p>
              L'<strong>écoute et la concertation</strong> sont au cœur de notre approche. 
              Nous croyons que c'est ensemble que nous construirons l'avenir de Collorec.
            </p>
          </div>
          <div className={styles.aboutStats}>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>17</span>
              <span className={styles.statLabel}>Candidats</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>6</span>
              <span className={styles.statLabel}>Axes de programme</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>Mars 2026</span>
              <span className={styles.statLabel}>Élections</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FacebookBanner(): ReactNode {
  return (
    <section className={styles.facebookBanner}>
      <div className="container">
        <div className={styles.facebookContent}>
          <div className={styles.facebookText}>
            <Heading as="h2">Rejoignez-nous sur Facebook !</Heading>
            <p>
              Suivez notre actualité, échangez avec l'équipe et restez informés 
              de nos actions pour Collorec.
            </p>
          </div>
          <div className={styles.facebookAction}>
            <Link
              className="button button--lg"
              href="https://www.facebook.com/profile.php?id=61588640097787"
              style={{
                background: '#f3764c',
                color: 'white',
                border: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Suivre notre page
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function MeetingBanner(): ReactNode {
  // Afficher la bannière jusqu'au 9 février (2 jours après le 7 février)
  const meetingDate = new Date(2026, 1, 7); // 7 février 2026
  const hideDate = new Date(2026, 1, 9); // 9 février 2026
  const today = new Date();
  
  if (today > hideDate) {
    return null;
  }

  return (
    <section className={styles.meetingBanner}>
      <div className="container">
        <div className={styles.meetingContent}>
          <Heading as="h2">📅 Réservez la date !</Heading>
          <p className={styles.meetingTitle}>Réunion publique</p>
          <p className={styles.meetingDate}>Samedi 07 février à 11h</p>
          <p className={styles.meetingPlace}>à la Maison Pour Tous</p>
          <p className={styles.meetingDescription}>Présentation de l'équipe et du programme</p>
        </div>
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
        <FacebookBanner />
        <MeetingBanner />
        <KeyPointsSection />
        <AboutCollorec />
        <CandidatesSection />
      </main>
    </Layout>
  );
}
