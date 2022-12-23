#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const conferenceHallDatas = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'api/conferenceHall.json'), 'utf8'));
const planningData = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'api/planning.json'), 'utf8'));

const talks = conferenceHallDatas.talks.map(({id, title, categories, formats}) => {
  const existingTalk = planningData.find((planningTalk) => {
    return planningTalk.id === id
  }) || {};
  const {rooms = [], times = [], day = 1} = existingTalk
  return {id, title, categories, formats, rooms, times, day}
});

fs.writeFile(
  path.join(__dirname, '..', 'api/planning.json'),
  JSON.stringify(talks, null, '  '),
  readErr => {
    if (readErr) {
      console.log(readErr);
      process.exit(2);
    }
    console.log(`The file talks.json was saved!`);
  });
