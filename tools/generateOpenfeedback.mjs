#!/usr/bin/env node
/**
 * Generate OpenFeedback JSON file from planning source
 * Usage: node tools/generateOpenfeedback.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { parseISO } from 'date-fns/parseISO';
import { formatISO } from 'date-fns/formatISO';
import { addMinutes } from 'date-fns/addMinutes';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load data
const planning = JSON.parse(fs.readFileSync(path.join(__dirname, '../api/source/planning.json'), 'utf8'));
const { talks, speakers: speakersData } = JSON.parse(fs.readFileSync(path.join(__dirname, '../api/generated/conferenceHall.json'), 'utf8'));

// Config
const DATE_BY_DAY = {
  jeudi: '2026-02-12',
  vendredi: '2026-02-13'
};

const EXCLUDED_IDS = [
  'keynoteCloture1', 'keynoteCloture2',
  'keynoteOuverture1', 'keynoteOuverture2',
  'dummy1', 'dummy2'
];

// Build talk lookup
const talksById = Object.fromEntries(talks.map(t => [t.id, t]));

// Extract duration from format string (e.g., "Conférence (50min)" → 50)
function getDuration(formatStr) {
  if (!formatStr) return 50; // default
  const match = formatStr.match(/\((\d+)min\)/);
  return match ? parseInt(match[1], 10) : 50;
}

// Generate sessions
const sessions = {};

for (const [dayName, slots] of Object.entries(planning)) {
  const dateStr = DATE_BY_DAY[dayName];
  if (!dateStr) {
    console.warn(`⚠️ Unknown day: ${dayName}`);
    continue;
  }

  for (const [timeStr, sessionList] of Object.entries(slots)) {
    for (const slot of sessionList) {
      if (EXCLUDED_IDS.includes(slot.id)) continue;

      const talk = talksById[slot.id];
      if (!talk) continue;

      const startTime = parseISO(`${dateStr}T${timeStr}:00`);
      const duration = getDuration(talk.formats);
      const endTime = addMinutes(startTime, duration);

      sessions[slot.id] = {
        id: slot.id,
        title: slot.title,
        trackTitle: slot.rooms[0] || 'Unknown',
        tags: [talk.categories, talk.formats].filter(Boolean),
        speakers: talk.speakers || [],
        startTime: formatISO(startTime),
        endTime: formatISO(endTime),
      };
    }
  }
}

// Generate speakers
const speakers = {};
for (const speaker of speakersData) {
  const socials = [];
  if (speaker.twitter) {
    socials.push({ name: 'twitter', link: `https://x.com/${speaker.twitter}` });
  }
  if (speaker.github) {
    socials.push({ name: 'github', link: `https://github.com/${speaker.github}` });
  }

  speakers[speaker.uid] = {
    id: speaker.uid,
    name: speaker.name,
    photoUrl: `https://raw.githubusercontent.com/TouraineTech/tourainetech.github.io/develop/public/img/speakers/${speaker.uid}.png`,
    socials,
  };
}

// Write output
const output = { sessions, speakers };
const outputPath = path.join(__dirname, '../api/openfeedback.json');

fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));
console.log(`✅ OpenFeedback file generated: ${outputPath}`);
console.log(`   ${Object.keys(sessions).length} sessions`);
console.log(`   ${Object.keys(speakers).length} speakers`);
