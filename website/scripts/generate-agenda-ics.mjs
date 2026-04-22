import {readFileSync, writeFileSync} from 'node:fs';
import {resolve} from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
const EVENTS_PATH = resolve(ROOT, 'src/data/events.json');
const STATIC_DIR = resolve(ROOT, 'static');

const DEFAULT_EVENT_DURATION_MINUTES = 120;

const CALENDAR_OUTPUTS = [
  {
    fileName: 'agenda.ics',
    calendarName: 'Agenda communal de Collorec',
  },
  {
    fileName: 'agenda-ape.ics',
    calendarName: 'Agenda APE de Collorec',
    categories: ['APE'],
    organizerEmail: 'ape.collorecoise@hotmail.com',
    defaultAddress: 'Rue de l\'École, 29530 Collorec',
  },
  {
    fileName: 'agenda-marche-des-marguerites.ics',
    calendarName: 'Agenda Marché des Marguerites',
    categories: ['Marché'],
    organizerEmail: 'marchedesmarguerites@gmail.com',
    defaultAddress: 'Le Plan d\'Eau, 29530 Collorec',
  },
];

const CATEGORY_URLS = {
  APE: 'https://collorec.bzh/ape',
  Marché: 'https://collorec.bzh/marche-des-marguerites',
  Entreprises: 'https://collorec.bzh/entreprises',
  Associations: 'https://collorec.bzh/associations',
};

const DEFAULT_GEO = '48.283329;-3.783330';

function formatUtcDate(date) {
  const yyyy = date.getUTCFullYear();
  const mm = String(date.getUTCMonth() + 1).padStart(2, '0');
  const dd = String(date.getUTCDate()).padStart(2, '0');
  const hh = String(date.getUTCHours()).padStart(2, '0');
  const mi = String(date.getUTCMinutes()).padStart(2, '0');
  const ss = String(date.getUTCSeconds()).padStart(2, '0');
  return `${yyyy}${mm}${dd}T${hh}${mi}${ss}Z`;
}

function slugify(value) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function escapeIcsText(value) {
  return String(value)
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\r?\n/g, '\\n');
}

function buildUid(event, startDate) {
  const dateKey = startDate.toISOString().slice(0, 10).replace(/-/g, '');
  return `${slugify(event.category)}-${slugify(event.title)}-${dateKey}@collorec.bzh`;
}

function toIcsEvent(event, calendarOutput = {}) {
  const startDate = new Date(event.startsAt);
  if (Number.isNaN(startDate.getTime())) {
    throw new Error(`Invalid startsAt date for event "${event.title}": ${event.startsAt}`);
  }

  const endDate = event.endsAt
    ? new Date(event.endsAt)
    : new Date(startDate.getTime() + DEFAULT_EVENT_DURATION_MINUTES * 60_000);

  if (Number.isNaN(endDate.getTime())) {
    throw new Error(`Invalid endsAt date for event "${event.title}": ${event.endsAt}`);
  }

  const eventUrl = event.url ?? CATEGORY_URLS[event.category];
  const geo = event.geo ?? DEFAULT_GEO;
  const location = calendarOutput.defaultAddress
    ? calendarOutput.defaultAddress
    : (event.place ? event.place : "Collorec");

  return [
    'BEGIN:VEVENT',
    `UID:${buildUid(event, startDate)}`,
    `DTSTAMP:${formatUtcDate(new Date())}`,
    `DTSTART:${formatUtcDate(startDate)}`,
    `DTEND:${formatUtcDate(endDate)}`,
    `SUMMARY:${escapeIcsText(event.title)}`,
    `LOCATION:${escapeIcsText(location)}`,
    `GEO:${geo}`,
    `DESCRIPTION:${escapeIcsText(event.details)}`,
    ...(eventUrl ? [`URL:${eventUrl}`] : []),
    ...(calendarOutput.organizerEmail ? [`ORGANIZER:mailto:${calendarOutput.organizerEmail}`] : []),
    'STATUS:CONFIRMED',
    'BEGIN:VALARM',
    'TRIGGER:-P1D',
    'ACTION:DISPLAY',
    `DESCRIPTION:Rappel : ${escapeIcsText(event.title)}`,
    'END:VALARM',
    'END:VEVENT',
  ].join('\n');
}

function buildCalendar(events, calendarOutput) {
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Commune de Collorec//Agenda communal//FR',
    'CALSCALE:GREGORIAN',
    'METHOD:REQUEST',
    `X-WR-CALNAME:${escapeIcsText(calendarOutput.calendarName)}`,
    'X-WR-TIMEZONE:Europe/Paris',
    ...events.map((event) => toIcsEvent(event, calendarOutput)),
    'END:VCALENDAR',
    '',
  ].join('\n');
}

function main() {
  const eventsRaw = readFileSync(EVENTS_PATH, 'utf8');
  const events = JSON.parse(eventsRaw);

  if (!Array.isArray(events)) {
    throw new Error('events.json must contain an array of events');
  }

  const sortedEvents = [...events].sort((a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime());

  CALENDAR_OUTPUTS.forEach((output) => {
    const selectedEvents = output.categories
      ? sortedEvents.filter((event) => output.categories.includes(event.category))
      : sortedEvents;

    const content = buildCalendar(selectedEvents, output);
    const outputPath = resolve(STATIC_DIR, output.fileName);
    writeFileSync(outputPath, content, 'utf8');

    console.log(`Generated ${outputPath} from ${EVENTS_PATH} (${selectedEvents.length} events)`);
  });
}

main();
