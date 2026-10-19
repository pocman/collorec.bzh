# Website

Ce site est construit avec [Docusaurus](https://docusaurus.io/).

## Installation

```bash
npm install
```

## Développement local

```bash
npm run start
```

## Build de production

```bash
npm run build
```

## Mise à jour de l'agenda communal

L'accueil affiche une liste d'événements, et le fichier iCalendar est téléchargeable.

**Source unique de vérité :** Le fichier `src/data/events.json` contient les événements.

Les fichiers iCalendar suivants sont générés automatiquement à partir de `src/data/events.json`:

- `static/agenda.ics` (agenda global)
- `static/agenda-ape.ics` (agenda APE)
- `static/agenda-marche-des-marguerites.ics` (agenda Marché des Marguerites)

La génération est lancée automatiquement avant `npm run start` et `npm run build`.

Règle de gestion recommandée :

1. Ajouter ou modifier d'abord l'événement dans `src/data/events.json`
   - `title` : titre de l'événement
   - `startsAt` : date/heure ISO 8601 (ex: "2026-05-14T18:30:00+02:00")
   - `endsAt` (optionnel) : date/heure ISO 8601 de fin
   - `place` : lieu de l'événement
   - `details` : description courte
   - `category` : catégorie (APE, Marché, Entreprises, Associations)

2. Lancer `npm run start` ou `npm run build` pour générer (ou régénérer) les fichiers `.ics`.

3. Vérifier le rendu sur la page d'accueil et tester l'import du fichier `.ics` dans un client calendrier.

## Bulletin municipal et photographies de Collorec

La page `/bulletin-municipal` et les emplacements de la bannière et du carrousel
sont prêts. Le dernier bulletin trimestriel et les photographies de paysage ne
sont pas fournis dans le dépôt. Ne pas les remplacer par des documents fictifs.

Pour les publier, déposer le PDF dans `static/bulletins/` et les photos autorisées
dans `static/img/collorec/`, puis renseigner `src/data/municipalMedia.ts` :

```ts
export const landscapePhotos: LandscapePhoto[] = [
  {
    src: '/img/collorec/paysage.jpg',
    alt: 'Description du paysage de Collorec photographié',
    credit: 'Nom du photographe — autorisation ou licence',
  },
  // Ajouter les autres photographies ici.
];

export const municipalBulletin: {title: string; file: string} | null = {
  title: 'Bulletin municipal — trimestre et année',
  file: '/bulletins/dernier-bulletin.pdf',
};
```

La première photo sert de paysage pour la bannière ; toutes les photos figurent
dans le carrousel sous le bandeau d’accueil. Renseigner une description et le
crédit de chaque photo, et vérifier les droits de publication avant tout ajout.
Les chemins sont relatifs à `static/`, sans le préfixe de déploiement GitHub Pages.
Sans photo, le bandeau conserve son fond actuel et le carrousel reste masqué.
Sans PDF, la page du bulletin affiche un message d’attente sans lien cassé.
