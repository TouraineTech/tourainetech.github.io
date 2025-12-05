#!/usr/bin/env node
/**
 * Build script - generates conferenceHall.json and schedule.json
 * Usage: node tools/build.mjs [--validate-only]
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PATHS = {
  // Source files
  raw: path.join(__dirname, '../api/source/conferenceHall.raw.json'),
  keynotes: path.join(__dirname, '../api/source/keynotes.json'),
  overrides: path.join(__dirname, '../api/source/overrides.json'),
  planning: path.join(__dirname, '../api/source/planning.json'),
  // Config files
  times: path.join(__dirname, '../api/config/times.json'),
  rooms: path.join(__dirname, '../api/config/rooms.json'),
  // Generated files
  conferenceHall: path.join(__dirname, '../api/generated/conferenceHall.json'),
  schedule: path.join(__dirname, '../api/generated/schedule.json'),
};

const validateOnly = process.argv.includes('--validate-only');

// ============================================================================
// STEP 1: Load source files
// ============================================================================
console.log('📂 Loading source files...');

const raw = JSON.parse(fs.readFileSync(PATHS.raw, 'utf8'));
const keynotes = JSON.parse(fs.readFileSync(PATHS.keynotes, 'utf8'));
const overrides = JSON.parse(fs.readFileSync(PATHS.overrides, 'utf8'));
const planningSource = JSON.parse(fs.readFileSync(PATHS.planning, 'utf8'));
const times = JSON.parse(fs.readFileSync(PATHS.times, 'utf8'));
const rooms = JSON.parse(fs.readFileSync(PATHS.rooms, 'utf8'));

// ============================================================================
// STEP 2: Filter accepted talks
// ============================================================================
console.log('🔍 Filtering accepted talks...');

const acceptedTalks = raw.filter(t =>
  t.deliberationStatus === 'ACCEPTED' || t.confirmationStatus === 'confirmed'
);

console.log(`   ${acceptedTalks.length}/${raw.length} talks accepted`);

// ============================================================================
// STEP 3: Process talks (clean up, extract speaker names)
// ============================================================================
console.log('🔧 Processing talks...');

const talks = acceptedTalks.map(t => {
  const talk = {
    id: t.id,
    title: t.title,
    abstract: t.abstract,
    formats: t.formats[0],
    categories: t.categories[0],
    level: t.level,
    speakers: t.speakers.map(s => s.name.replace(/ /g, '_')),
    languages: t.languages,
  };

  // Apply overrides
  if (overrides[t.id]) {
    Object.assign(talk, overrides[t.id]);
  }

  return talk;
});

// Add keynotes
keynotes.forEach(k => {
  // Check if already exists (don't duplicate)
  if (!talks.find(t => t.id === k.id)) {
    talks.push(k);
  }
});

console.log(`   ${talks.length} total talks (including keynotes)`);

// ============================================================================
// STEP 4: Extract unique speakers
// ============================================================================
console.log('👥 Extracting speakers...');

const speakerMap = new Map();
raw.forEach(t => {
  if (t.deliberationStatus !== 'ACCEPTED' && t.confirmationStatus !== 'confirmed') return;

  t.speakers.forEach(s => {
    const uid = s.name.replace(/ /g, '_');
    if (!speakerMap.has(uid)) {
      speakerMap.set(uid, {
        uid,
        name: s.name,
        bio: s.bio || '',
        company: s.company || '',
        picture: s.photoUrl || null,
        twitter: s.twitter || null,
        github: s.github || null,
      });
    }
  });
});

const speakers = Array.from(speakerMap.values());
console.log(`   ${speakers.length} unique speakers`);

// ============================================================================
// STEP 5: Extract categories and formats
// ============================================================================
const categories = [...new Set(talks.map(t => t.categories).filter(Boolean))];
const formats = [...new Set(talks.map(t => t.formats).filter(Boolean))];

// ============================================================================
// STEP 6: Generate schedule.json from planning
// ============================================================================
console.log('📅 Generating schedule...');

function roomNameToIndex(roomName) {
  const idx = rooms.indexOf(roomName);
  return idx === -1 ? null : idx + 1;
}

function timeStringToIndex(timeStr) {
  const idx = times.findIndex(t => t.time === timeStr);
  return idx === -1 ? null : idx;
}

// Convert "HH:MM" to minutes since midnight
function timeToMinutes(timeStr) {
  const [h, m] = timeStr.split(':').map(Number);
  return h * 60 + m;
}

// Extract duration from format string (e.g., "Hands-on (120min)" → 110)
// Note: 120min hands-on = 110min for slot calculation (3 slots, not 4)
function getDurationFromFormat(formatStr) {
  if (!formatStr) return 50; // default
  const match = formatStr.match(/\((\d+)min\)/);
  if (!match) return 50;
  const minutes = parseInt(match[1], 10);
  // Hands-on 120min → 3 slots (finit avant la pause déjeuner)
  if (minutes === 120) return 110;
  return minutes;
}

// Calculate all time slot indices that a talk occupies based on start time and duration
function calculateTimeSlots(startTimeStr, durationMinutes, dayNumber) {
  const startMinutes = timeToMinutes(startTimeStr);
  const endMinutes = startMinutes + durationMinutes;

  // Filter times for this day and find slots within the duration
  const slots = [];
  for (let i = 0; i < times.length; i++) {
    const slot = times[i];
    if (!slot.days.includes(dayNumber)) continue;

    const slotMinutes = timeToMinutes(slot.time);
    if (slotMinutes >= startMinutes && slotMinutes < endMinutes) {
      slots.push(i);
    }
  }
  return slots;
}

function dayStringToNumber(dayStr) {
  if (dayStr === 'jeudi') return 1;
  if (dayStr === 'vendredi') return 2;
  return null;
}

const schedule = [];
const talkIds = new Set(talks.map(t => t.id));
const placedTalkIds = new Set();
const errors = [];
const warnings = [];

for (const [day, slots] of Object.entries(planningSource)) {
  for (const [time, entries] of Object.entries(slots)) {
    for (const entry of entries) {
      // Validate talk ID
      if (!talkIds.has(entry.id)) {
        errors.push(`❌ Unknown talk ID: ${entry.id}`);
        continue;
      }

      placedTalkIds.add(entry.id);

      // Convert rooms
      const roomsIdx = entry.rooms.map(r => roomNameToIndex(r)).filter(r => r !== null);
      if (roomsIdx.length === 0) {
        errors.push(`❌ Invalid room(s) for ${entry.id}: ${entry.rooms.join(', ')}`);
        continue;
      }

      // Calculate time slots based on format duration
      const talk = talks.find(t => t.id === entry.id);
      const duration = getDurationFromFormat(talk.formats);
      const dayNum = dayStringToNumber(day);
      const timesIdx = calculateTimeSlots(time, duration, dayNum);

      if (timesIdx.length === 0) {
        errors.push(`❌ Invalid time for ${entry.id}: ${time}`);
        continue;
      }

      schedule.push({
        id: entry.id,
        title: talk.title,
        categories: talk.categories,
        formats: talk.formats,
        rooms: roomsIdx,
        times: timesIdx,
        day: dayStringToNumber(day),
        level: talk.level,
      });
    }
  }
}

console.log(`   ${schedule.length} talks scheduled`);

// ============================================================================
// STEP 7: Validation
// ============================================================================
console.log('✅ Validating...');

// Check for unplaced talks (excluding keynotes already handled)
const unplacedTalks = talks.filter(t => !placedTalkIds.has(t.id) && !t.id.startsWith('keynote'));
if (unplacedTalks.length > 0) {
  warnings.push(`⚠️  ${unplacedTalks.length} talks not placed in schedule:`);
  unplacedTalks.forEach(t => warnings.push(`   - ${t.title.substring(0, 50)}...`));
}

// Check for speaker conflicts (same speaker, same time slot)
const speakerSlots = new Map(); // "speaker_day_time" -> [talkIds]
schedule.forEach(s => {
  const talk = talks.find(t => t.id === s.id);
  if (!talk || !talk.speakers) return;

  talk.speakers.forEach(speaker => {
    s.times.forEach(timeIdx => {
      const key = `${speaker}_${s.day}_${timeIdx}`;
      if (!speakerSlots.has(key)) speakerSlots.set(key, []);
      speakerSlots.get(key).push(s.id);
    });
  });
});

speakerSlots.forEach((talkIds, key) => {
  if (talkIds.length > 1) {
    const [speaker, day, time] = key.split('_');
    errors.push(`❌ Speaker conflict: ${speaker} has ${talkIds.length} talks at day ${day}, time index ${time}`);
  }
});

// Print results
if (errors.length > 0) {
  console.log('\n🚨 ERRORS:');
  errors.forEach(e => console.log(`   ${e}`));
}

if (warnings.length > 0) {
  console.log('\n⚠️  WARNINGS:');
  warnings.forEach(w => console.log(`   ${w}`));
}

if (errors.length === 0 && warnings.length === 0) {
  console.log('   All validations passed! ✨');
}

// ============================================================================
// STEP 8: Write output files (unless validate-only)
// ============================================================================
if (validateOnly) {
  console.log('\n🔍 Validate-only mode, no files written.');
  process.exit(errors.length > 0 ? 1 : 0);
}

console.log('\n📝 Writing output files...');

// Ensure generated directory exists
const generatedDir = path.join(__dirname, '../api/generated');
if (!fs.existsSync(generatedDir)) {
  fs.mkdirSync(generatedDir, { recursive: true });
}

// Write conferenceHall.json
const conferenceHallData = { talks, speakers, categories, formats };
fs.writeFileSync(PATHS.conferenceHall, JSON.stringify(conferenceHallData, null, 2));
console.log(`   ✅ ${PATHS.conferenceHall}`);

// Write schedule.json
fs.writeFileSync(PATHS.schedule, JSON.stringify(schedule, null, 2));
console.log(`   ✅ ${PATHS.schedule}`);

console.log('\n🎉 Build complete!');

if (errors.length > 0) {
  process.exit(1);
}
