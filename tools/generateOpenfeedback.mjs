#!/usr/bin/env node

import * as fs from "fs";
import path from "path";
import {parseISO} from "date-fns/parseISO";
import {formatISO} from "date-fns/formatISO";
import {addMinutes} from "date-fns/addMinutes";

const __dirname = path.resolve(path.dirname(''));

const planningData = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'api/planning.json'), 'utf8'));
const conferenceHall = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'api/conferenceHall.json'), 'utf8'));
const times = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'api/times.json'), 'utf8'));
const rooms = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'api/rooms.json'), 'utf8'));

const categories = conferenceHall.categories.reduce((obj, item) => ({...obj, [item.id]: item.name}), {});
const formats = conferenceHall.formats.reduce((obj, item) => ({
  ...obj,
  [item.id]: {
    name: item.name,
    duration: Number(item.name.substring(item.name.indexOf('(') + 1, item.name.indexOf(')') - 3))
  }
}), {});
const talksConferenceHall = conferenceHall.talks.reduce((obj, item) => ({...obj, [item.id]: item}), {});
const date = {
  1: '2024-02-08',
  2: '2024-02-09'
}
const sessions = planningData.filter(p => !['keynoteCloture1', 'keynoteCloture2', 'keynoteOuverture1', 'keynoteOuverture2', 'dummy1', 'dummy2'].includes(p.id)).reduce((obj, p) => {
  const startTime = parseISO(`${date[p.day]}T${times[p.times[0]].time}:00`)
  const endTime = addMinutes(startTime, formats[p.formats].duration)
  return {
    ...obj, [p.id]: {
      id: p.id,
      title: p.title,
      trackTitle: rooms[p.rooms[0]],
      tags: [categories[p.categories], formats[p.formats].name],
      speakers: talksConferenceHall[p.id]?.speakers,
      startTime: formatISO(startTime),
      endTime: formatISO(endTime),
    }
  };
}, {});

const speakers = conferenceHall.speakers.reduce((obj, item) => ({
  ...obj, [item.uid]: {
    id: item.uid,
    name: item.displayName,
    photoUrl: `https://raw.githubusercontent.com/TouraineTech/tourainetech.github.io/develop/assets/img/speakers/${item.uid}.png`,
    socials: [{name: 'twitter', link: item.twitter}, {name: 'github', link: item.github}].filter(s => s.link),
  }
}), {});

fs.writeFile(
  path.join(__dirname, '..', 'api/openfeedback.json'),
  JSON.stringify({sessions, speakers}, null, 2),
  readErr => {
    if (readErr) {
      console.log(readErr);
      process.exit(2);
    }
    console.log(`The file talks.json was saved!`);
  });

