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

Les deux emplacements à maintenir ensemble sont :

- `src/data/events.json` (tableau d'événements)
- `static/calendrier-collorec.ics` (export au format iCalendar)

Règle de gestion recommandée :

1. Ajouter ou modifier d'abord l'événement dans `src/data/events.json`
   - `title` : titre de l'événement
   - `startsAt` : date/heure ISO 8601 (ex: "2026-05-14T18:30:00+02:00")
   - `place` : lieu de l'événement
   - `details` : description courte
   - `category` : catégorie (APE, Marche, Entreprises, Associations)

2. Reporter la même information dans `static/calendrier-collorec.ics` :
   - UID unique de la forme `{slug}-{date}@collorec.bzh`
   - DTSTART/DTEND en UTC (Z)
   - SUMMARY, LOCATION, DESCRIPTION
   - Exemple : une date à 18:30 +02:00 devient 16:30 UTC

3. Vérifier le rendu sur la page d'accueil et tester l'import du fichier `.ics` dans un client calendrier.
