import {readFileSync, writeFileSync} from 'node:fs';
import {resolve} from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
const EVENTS_PATH = resolve(ROOT, 'src/data/events.json');
const OUTPUT_PATH = resolve(ROOT, 'static/agenda.ics');

const DEFAULT_EVENT_DURATION_MINUTES = 120;

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

function toIcsEvent(event) {
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

  return [
    'BEGIN:VEVENT',
    `UID:${buildUid(event, startDate)}`,
    `DTSTAMP:${formatUtcDate(new Date())}`,
    `DTSTART:${formatUtcDate(startDate)}`,
    `DTEND:${formatUtcDate(endDate)}`,
    `SUMMARY:${escapeIcsText(event.title)}`,
    `LOCATION:${escapeIcsText(event.place)}`,
    `DESCRIPTION:${escapeIcsText(event.details)}`,
    'END:VEVENT',
  ].join('\n');
}

function main() {
  const eventsRaw = readFileSync(EVENTS_PATH, 'utf8');
  const events = JSON.parse(eventsRaw);

  if (!Array.isArray(events)) {
    throw new Error('events.json must contain an array of events');
  }

  const sortedEvents = [...events].sort(
    (a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime(),
  );

  const calendar = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Commune de Collorec//Agenda communal//FR',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'X-WR-CALNAME:Agenda communal de Collorec',
    'X-WR-TIMEZONE:Europe/Paris',
    ...sortedEvents.map(toIcsEvent),
    'END:VCALENDAR',
    '',
  ].join('\n');

  writeFileSync(OUTPUT_PATH, calendar, 'utf8');
  console.log(`Generated ${OUTPUT_PATH} from ${EVENTS_PATH} (${sortedEvents.length} events)`);
}

main();
