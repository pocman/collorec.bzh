import type {ReactNode} from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import EventsList from '../components/EventsList';

export default function APEPage(): ReactNode {
  return (
    <Layout
      title="APE Collorécoise"
      description="Informations pratiques de l'Association des Parents d'Élèves de l'école de Collorec">
      <main>
        <div className="container" style={{marginTop: '2rem', marginBottom: '2rem'}}>
          <Heading as="h1">APE Collorécoise</Heading>

          <p style={{fontSize: '1.1rem', lineHeight: '1.7'}}>
            L'Association des Parents d'Élèves accompagne l'école dans ses projets et organise des actions pour soutenir les activités des enfants.
          </p>

          <Heading as="h2">Missions principales</Heading>
          <ul style={{fontSize: '1rem', lineHeight: '1.8'}}>
            <li>Soutenir les projets éducatifs et sorties scolaires</li>
            <li>Organiser des actions de financement (kermesse, ventes, animations)</li>
            <li>Maintenir un lien régulier entre familles, équipe enseignante et commune</li>
          </ul>

          <Heading as="h2">Équipe</Heading>
          <p style={{fontSize: '1rem', lineHeight: '1.7'}}>
            C'est avec plaisir que nous vous annonçons l'élection de notre nouvelle équipe pour cette année :
          </p>
          <ul style={{fontSize: '1rem', lineHeight: '1.8'}}>
            <li><strong>Co-présidentes :</strong> Fabienne Bourlès et Céline Jouel</li>
            <li><strong>Co-secrétaires :</strong> Yolande Noire et Pauline Sergent</li>
            <li><strong>Trésorier :</strong> Jason Quenaon</li>
          </ul>

          <Heading as="h2">Prochains rendez-vous</Heading>
          <EventsList category="APE" title="Événements APE à venir" />

          <Heading as="h2">Informations pratiques</Heading>
          <ul style={{fontSize: '1rem', lineHeight: '1.8'}}>
            <li>Réunions : consultez l'agenda ci-dessus</li>
            <li>Lieu principal : école de Collorec</li>
            <li>Contact : <a href="mailto:fabienne@collorec.bzh">fabienne@collorec.bzh</a></li>
          </ul>

          <Heading as="h2">Participer</Heading>
          <p style={{fontSize: '1rem', lineHeight: '1.7'}}>
            Parents et habitants peuvent contribuer ponctuellement (bénévolat, logistique, communication) ou rejoindre l'association.
          </p>
        </div>
      </main>
    </Layout>
  );
}
