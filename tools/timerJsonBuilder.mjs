#!/usr/bin/env node
/**
 * Generate timer JSON files for each room/day
 * Usage: node tools/timerJsonBuilder.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load data
const times = JSON.parse(fs.readFileSync(path.join(__dirname, '../api/config/times.json'), 'utf8'));
const rooms = JSON.parse(fs.readFileSync(path.join(__dirname, '../api/config/rooms.json'), 'utf8'));
const breaks = JSON.parse(fs.readFileSync(path.join(__dirname, '../api/config/breaks.json'), 'utf8'));
const schedule = JSON.parse(fs.readFileSync(path.join(__dirname, '../api/generated/schedule.json'), 'utf8'));
const { talks } = JSON.parse(fs.readFileSync(path.join(__dirname, '../api/generated/conferenceHall.json'), 'utf8'));

// Build talk lookup by ID
const talksById = Object.fromEntries(
  talks.map(t => [t.id, { id: t.id, name: t.title, speakers: t.speakers || [] }])
);

// Build time lookup by index
const timeByIndex = Object.fromEntries(
  times.map((t, idx) => [idx, t.time])
);

function generateDayRoom(day, roomIndex) {
  const slots = [];

  // Add talks for this room/day
  schedule
    .filter(s => s.day === day && s.rooms.includes(roomIndex))
    .forEach(s => {
      const talk = talksById[s.id];
      if (!talk) return;

      // Use first time slot for display
      const timeIdx = s.times[0];
      slots.push({
        time: timeByIndex[timeIdx],
        timeIdx,
        talk: { ...talk }
      });
    });

  // Add breaks for this room/day
  breaks
    .filter(b => b.days.includes(day) && b.rooms.includes(roomIndex))
    .forEach(b => {
      const timeIdx = b.times[0];
      slots.push({
        time: timeByIndex[timeIdx],
        timeIdx,
        talk: {
          id: b.id,
          name: b.name,
          speakers: []
        }
      });
    });

  // Sort by time index
  slots.sort((a, b) => a.timeIdx - b.timeIdx);

  // Remove timeIdx from output
  return slots.map(({ time, talk }) => ({ time, talk }));
}

function main() {
  console.log('⏱️  Generating timer files...\n');

  const days = [...new Set(times.flatMap(t => t.days))];

  for (const day of days) {
    const dayDir = path.join(__dirname, `../assets/timer/day${day}`);

    // Ensure directory exists
    if (!fs.existsSync(dayDir)) {
      fs.mkdirSync(dayDir, { recursive: true });
    }

    for (let roomIdx = 0; roomIdx < rooms.length; roomIdx++) {
      const roomName = rooms[roomIdx];
      const data = generateDayRoom(day, roomIdx + 1);

      const filePath = path.join(dayDir, `${roomName}.json`);
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
      console.log(`   ✅ day${day}/${roomName}.json (${data.length} slots)`);
    }
  }

  // Also update days.json
  fs.writeFileSync(
    path.join(__dirname, '../api/config/days.json'),
    JSON.stringify(days, null, 2)
  );
  console.log(`\n   ✅ api/config/days.json`);

  console.log('\n🎉 Timer files generated!');
}

main();
