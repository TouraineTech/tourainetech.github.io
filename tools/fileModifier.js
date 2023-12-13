#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const planning = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'api/planning.json'), 'utf8'));

function compareNumbers(a, b) {
  return a - b;
}
//
// const newPlanning = planning.map(({times, ...talkPlanning}) => {
//   if (times.length === 1 && times[0] === 13) {
//     return {...talkPlanning, times: [19]};
//   }
//   if (times.length === 1 && times[0] === 15) {
//     return {...talkPlanning, times: [13]};
//   }
//   if (times.length === 1 && times[0] === 17) {
//     return {...talkPlanning, times: [15]};
//   }
//   return {...talkPlanning, times};
// })

planning
  // sort by first room
  .sort(({rooms: timesA}, {rooms: timesB}) => timesA.sort(compareNumbers)[0] - timesB.sort(compareNumbers)[0])
  // sort by first time
  .sort(({times: timesA}, {times: timesB}) => timesA.sort(compareNumbers)[0] - timesB.sort(compareNumbers)[0])
  // sort by day
  .sort(({day: dayA}, {day: dayB}) => dayA - dayB)


fs.writeFile(
  path.join(__dirname, '..', 'api/planning.json'),
  JSON.stringify(planning, null, '  '),
  readErr => {
    if (readErr) {
      console.log(readErr);
      process.exit(2);
    }
    console.log(`The file planning.json was saved!`);
  });


