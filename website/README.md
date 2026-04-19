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

Le fichier `static/agenda.ics` est généré automatiquement à partir de `src/data/events.json` lors du build.

Règle de gestion recommandée :

1. Ajouter ou modifier d'abord l'événement dans `src/data/events.json`
   - `title` : titre de l'événement
   - `startsAt` : date/heure ISO 8601 (ex: "2026-05-14T18:30:00+02:00")
   - `endsAt` (optionnel) : date/heure ISO 8601 de fin
   - `place` : lieu de l'événement
   - `details` : description courte
   - `category` : catégorie (APE, Marche, Entreprises, Associations)

2. Lancer `npm run build` pour générer (ou régénérer) `static/agenda.ics`.

3. Vérifier le rendu sur la page d'accueil et tester l'import du fichier `.ics` dans un client calendrier.
