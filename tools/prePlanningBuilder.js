#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const conferenceHallDatas = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'api/conferenceHall.json'), 'utf8'));

// Read existing planning-source.json if it exists, otherwise empty array
let planningSourceData = [];
const planningSourcePath = path.join(__dirname, '..', 'api/planning-source.json');
if (fs.existsSync(planningSourcePath)) {
  planningSourceData = JSON.parse(fs.readFileSync(planningSourcePath, 'utf8'));
}

// Get all talk IDs from conferenceHall
const conferenceHallIds = new Set(conferenceHallDatas.talks.map(t => t.id));

// Process talks from conferenceHall
const talks = conferenceHallDatas.talks.map(({id, title, categories, formats, level}) => {
  const existingTalk = planningSourceData.find((planningTalk) => {
    return planningTalk.id === id
  }) || {};

  // Preserve existing planning data in the new format
  const result = {id, title, categories, formats};

  // Handle room/rooms
  if (existingTalk.room) {
    result.room = existingTalk.room;
  } else if (existingTalk.rooms) {
    result.rooms = existingTalk.rooms;
  } else {
    result.room = null;
  }

  // Handle time/times
  if (existingTalk.time) {
    result.time = existingTalk.time;
  } else if (existingTalk.times) {
    result.times = existingTalk.times;
  } else {
    result.time = null;
  }

  // Handle day
  result.day = existingTalk.day || null;

  // Keep level
  if (level) {
    result.level = level;
  }

  return result;
});

// Preserve entries not in conferenceHall (keynotes, dummies, etc.)
const extraEntries = planningSourceData.filter(entry => !conferenceHallIds.has(entry.id));
const allTalks = [...talks, ...extraEntries];

fs.writeFile(
  planningSourcePath,
  JSON.stringify(allTalks, null, '  '),
  readErr => {
    if (readErr) {
      console.log(readErr);
      process.exit(2);
    }
    console.log(`The file planning-source.json was saved!`);
  });
