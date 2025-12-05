#!/usr/bin/env node
/**
 * Generate OpenFeedback JSON file
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
const schedule = JSON.parse(fs.readFileSync(path.join(__dirname, '../api/generated/schedule.json'), 'utf8'));
const { talks, speakers: speakersData } = JSON.parse(fs.readFileSync(path.join(__dirname, '../api/generated/conferenceHall.json'), 'utf8'));
const times = JSON.parse(fs.readFileSync(path.join(__dirname, '../api/config/times.json'), 'utf8'));
const rooms = JSON.parse(fs.readFileSync(path.join(__dirname, '../api/config/rooms.json'), 'utf8'));

// Config
const DATE_BY_DAY = {
  1: '2026-02-05',
  2: '2026-02-06'
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
for (const slot of schedule) {
  if (EXCLUDED_IDS.includes(slot.id)) continue;

  const talk = talksById[slot.id];
  if (!talk) continue;

  const timeIdx = slot.times[0];
  const timeObj = times[timeIdx];
  if (!timeObj) continue;

  const startTime = parseISO(`${DATE_BY_DAY[slot.day]}T${timeObj.time}:00`);
  const duration = getDuration(slot.formats);
  const endTime = addMinutes(startTime, duration);

  sessions[slot.id] = {
    id: slot.id,
    title: slot.title,
    trackTitle: rooms[slot.rooms[0] - 1] || 'Unknown',
    tags: [slot.categories, slot.formats].filter(Boolean),
    speakers: talk.speakers || [],
    startTime: formatISO(startTime),
    endTime: formatISO(endTime),
  };
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
    photoUrl: `https://raw.githubusercontent.com/TouraineTech/tourainetech.github.io/develop/assets/img/speakers/${speaker.uid}.png`,
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
