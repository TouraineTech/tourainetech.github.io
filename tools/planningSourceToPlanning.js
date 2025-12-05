#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const planningSource = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'api/planning-source.json'), 'utf8'));
const rooms = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'api/rooms.json'), 'utf8'));
const times = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'api/times.json'), 'utf8'));

function roomNameToIndex(roomName) {
  const index = rooms.indexOf(roomName);
  if (index === -1) {
    console.warn(`Room not found: "${roomName}"`);
    return null;
  }
  return index + 1; // 1-indexed
}

function timeStringToIndex(timeStr) {
  const index = times.findIndex(t => t.time === timeStr);
  if (index === -1) {
    console.warn(`Time not found: "${timeStr}"`);
    return null;
  }
  return index;
}

function dayStringToNumber(dayStr) {
  if (!dayStr) return null;
  const normalized = dayStr.toLowerCase();
  if (normalized === 'jeudi') return 1;
  if (normalized === 'vendredi') return 2;
  console.warn(`Unknown day: "${dayStr}"`);
  return null;
}

function convertEntry(entry) {
  const { id, title, categories, formats, level } = entry;

  // Handle room/rooms
  let roomsArray = [];
  if (entry.room) {
    const idx = roomNameToIndex(entry.room);
    if (idx !== null) roomsArray = [idx];
  } else if (entry.rooms && Array.isArray(entry.rooms)) {
    roomsArray = entry.rooms
      .map(r => roomNameToIndex(r))
      .filter(idx => idx !== null);
  }

  // Handle time/times
  let timesArray = [];
  if (entry.time) {
    const idx = timeStringToIndex(entry.time);
    if (idx !== null) timesArray = [idx];
  } else if (entry.times && Array.isArray(entry.times)) {
    timesArray = entry.times
      .map(t => timeStringToIndex(t))
      .filter(idx => idx !== null);
  }

  // Handle day
  const day = dayStringToNumber(entry.day);

  return {
    id,
    title,
    categories,
    formats,
    rooms: roomsArray,
    times: timesArray,
    day,
    level
  };
}

const planning = planningSource.map(convertEntry);

fs.writeFile(
  path.join(__dirname, '..', 'api/planning.json'),
  JSON.stringify(planning, null, '  '),
  err => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log('planning.json generated from planning-source.json');
  }
);
