import type {ReactNode} from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import EventsList from '../components/EventsList';
import CalendarSubscribeButton from '../components/CalendarSubscribeButton';

export default function MarchePage(): ReactNode {
  return (
    <Layout
      title="Marché des Marguerites"
      description="Le marché des Marguerites de Collorec, ses dates et ses acteurs">
      <main>
        <div className="container" style={{marginTop: '2rem', marginBottom: '2rem'}}>
          <Heading as="h1">Marché des Marguerites</Heading>

          <p style={{fontSize: '1.1rem', lineHeight: '1.7'}}>
            Le marché des Marguerites rassemble producteurs, artisans et habitants autour de produits locaux et de moments conviviaux.
          </p>

          <Heading as="h2">Ce que vous trouverez au marché</Heading>
          <ul style={{fontSize: '1rem', lineHeight: '1.8'}}>
            <li>Produits alimentaires locaux</li>
            <li>Artisanat et créations locales</li>
            <li>Échanges directs avec les producteurs et exposants</li>
          </ul>

          <Heading as="h3">Nos exposants réguliers</Heading>
          <ul style={{fontSize: '1rem', lineHeight: '1.8'}}>
            <li><strong>Romain</strong> - Pain bio au levain</li>
            <li><strong>Gaby</strong> - Œufs bio</li>
            <li><strong>Jean Mi</strong> - Légumes bio</li>
            <li><strong>Anthony</strong> - Lait cru du jour, yaourts, Cheddar (poivre, cumin, affiné), poulet</li>
            <li><strong>Éline</strong> - Nems, samossas, beignets de crevettes et autres spécialités</li>
            <li><strong>Kombuchas et vinaigres</strong> - Boissons fermentées</li>
            <li><strong>Armelle</strong> - Thés, infusions et cosmétiques bio</li>
            <li><strong>Solène (Nomad'Tif)</strong> - Produits artisanaux (sur réservation)</li>
          </ul>

          <Heading as="h2">Prochaines dates</Heading>
          <p>
            <CalendarSubscribeButton
              buttonLabel="S'abonner à l'agenda du marché"
              webcalUrl="webcal://collorec.bzh/agenda-marche-des-marguerites.ics"
              qrFileName="qr-agenda-marche-des-marguerites.png"
            />
          </p>
          <EventsList category="Marche" title="Prochains marchés" />

          <Heading as="h2">Informations pratiques</Heading>
          <ul style={{fontSize: '1rem', lineHeight: '1.8'}}>
            <li>Lieu : plan d'eau de Collorec</li>
            <li>Horaires : tous les vendredi de 16h30 à 19h</li>
            <li>Organisation : habitants bénévoles et partenaires locaux</li>
          </ul>

          <Heading as="h2">Exposer ou aider</Heading>
          <p style={{fontSize: '1rem', lineHeight: '1.7'}}>
            Vous êtes producteur, artisan ou bénévole ? Contactez l'association du marché via{' '}
            <a href="mailto:marchedesmarguerites@gmail.com">marchedesmarguerites@gmail.com</a>.
          </p>
        </div>
      </main>
    </Layout>
  );
}
