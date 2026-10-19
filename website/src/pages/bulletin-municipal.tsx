import type {ReactNode} from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {municipalBulletin} from '../data/municipalMedia';

export default function BulletinMunicipal(): ReactNode {
  const bulletinUrl = useBaseUrl(municipalBulletin?.file ?? '/');

  return (
    <Layout title="Bulletin municipal" description="Consultez le dernier bulletin municipal trimestriel de Collorec.">
      <main className="container margin-vert--lg">
        <Heading as="h1">Lire le dernier bulletin municipal</Heading>
        {municipalBulletin ? (
          <>
            <Heading as="h2">{municipalBulletin.title}</Heading>
            <p>
              <a className="button button--primary" href={bulletinUrl} download>
                Télécharger le bulletin municipal (PDF)
              </a>
            </p>
            <object data={bulletinUrl} type="application/pdf" width="100%" height="800" aria-label={municipalBulletin.title}>
              <p>La lecture du PDF n’est pas disponible dans votre navigateur. <a href={bulletinUrl}>Ouvrir le bulletin municipal</a>.</p>
            </object>
          </>
        ) : (
          <p>
            Le dernier bulletin municipal trimestriel n’est pas encore disponible sur ce site.
            En attendant, vous pouvez <Link to="/contact">contacter la mairie</Link> pour en demander un exemplaire.
          </p>
        )}
      </main>
    </Layout>
  );
}
