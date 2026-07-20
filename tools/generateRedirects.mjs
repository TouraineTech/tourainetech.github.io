#!/usr/bin/env node
/**
 * Génère public/_redirects (format Netlify) pour l'archivage d'une édition.
 * Les anciennes URLs de touraine.tech sont redirigées (301) vers l'archive
 * <DOMAIN> (ex: 2026.touraine.tech) une fois l'édition figée.
 *
 * Usage : YEAR=2026 [DOMAIN=2026.touraine.tech] node tools/generateRedirects.mjs
 * (appelé par `task redirects YEAR=2026`)
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const YEAR = process.env.YEAR;
if (!YEAR) {
  console.error('❌ Variable YEAR requise (ex: YEAR=2026).');
  process.exit(1);
}
const DOMAIN = process.env.DOMAIN || `${YEAR}.touraine.tech`;

const CONFERENCE_HALL = path.join(__dirname, '../src/data/generated/conferenceHall.json');
const OUTPUT = path.join(__dirname, '../public/_redirects');

const { talks = [], speakers = [] } = JSON.parse(fs.readFileSync(CONFERENCE_HALL, 'utf8'));

const lines = [
  `# Redirections d'archivage de l'edition ${YEAR} -> https://${DOMAIN}`,
  `# Auto-genere : task redirects YEAR=${YEAR} (ne pas editer a la main)`,
  '',
];

for (const talk of talks) {
  if (talk?.id) lines.push(`/talk/${talk.id}\thttps://${DOMAIN}/talk/${talk.id}\t301`);
}
for (const speaker of speakers) {
  if (speaker?.uid) lines.push(`/speaker/${speaker.uid}\thttps://${DOMAIN}/speaker/${speaker.uid}\t301`);
}
lines.push('');

fs.writeFileSync(OUTPUT, lines.join('\n'));
console.log(
  `✅ ${OUTPUT} — ${talks.length} talks + ${speakers.length} speakers redirigés vers ${DOMAIN}`
);
