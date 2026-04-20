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
