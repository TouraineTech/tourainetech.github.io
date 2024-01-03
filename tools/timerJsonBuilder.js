#!/usr/bin/env node

const fse = require('fs-extra');
const path = require('path');

const times = require('../api/times');
const rooms = require('../api/rooms')
const planning = require('../api/planning')
const breaks = require('../api/breaks')
const conferenceHall = require('../api/conferenceHall')

// expected output format example :
// api/day{dayNumber}/{roomName}.json

//     {"time": "08:00", "talk": {"id": "break","name": "\uD83D\uDC4B Accueil et petit déjeuner ","speakers": []}},
//     {"time": "09:00", "talk": {"id": "keynote","name": "Keynote d'ouverture","speakers": []}},
//     {"time": "09:50", "talk": {"id": "break","name": "\uD83E\uDD50 Suite du petit déjeuner ","speakers": []}},
//     {"time": "10:10", "talk": {"id": "o9KtP8ZrZ130zLZPzdqn","name": "Mon premier service en Rust","speakers": ["Zp3MwNioZ5TglJfR4UPR1jBkoAj1"]}},
//     {"time": "11:00", "talk": {"id": "break","name": "☕ Pause café ","speakers": []}},
//     {"time": "11:10", "talk": {"id": "YcEtI1UV5Pj9ytQSOUeE", "name": "Comme Mickey dans Fantasia, devenez un apprenti sorcier de l'intégration continue (et du déploiement) avec les GitLab Runners et OpenFaaS", "speakers": ["E5FaOXhwPVdJhu1zHQ3fKSVSrTd2"]}},
//     {"time": "12:00", "talk": {"id": "break","name": "\uD83C\uDF7D Pause déjeuner ","speakers": []}},
//     {"time": "12:20", "talk": {"id": "6lzGoQwIVhyYQTSHce99", "name": "CORS, XSS, CSRF, SQL injection  #BackToTheBasics", "speakers": ["jyGjaD4PluQG5VMVsjFVsNiIEMX2"]}},
//     {"time": "12:35", "talk": {"id": "break","name": "\uD83C\uDF7D Pause déjeuner ","speakers": []}},
//     {"time": "12:45", "talk": {"id": "HYF2lJgOpRZuOWtlWKCU", "name": "Microservices : tests et déploiements dans la vraie vie.", "speakers": ["HGGzindQTLbxds93dMDhfNbDQAI2"]}},
//     {"time": "13:00", "talk": {"id": "break","name": "\uD83C\uDF7D Pause déjeuner ","speakers": []}},
//     {"time": "13:30", "talk": {"id": "9LEkve9gG21jqE65Cu7B", "name": "Web components en 2019, on en est où ?", "speakers": ["1oPhUlhcF9Zgb39gj1ULLoepdsl2"]}},
//     {"time": "14:20", "talk": {"id": "break","name": "☕ Pause café ","speakers": []}},
//     {"time": "14:30", "talk": {"id": "sEyFkiS6aHzlXuWo6Z8a", "name": "Démystifions les CSS Custom Properties", "speakers": ["ID1KHqoOCeRrwgtGqS2QAgJnyvm2","MKCVoyKPwHb8Cd0uTe2erKbhPqf1"]}},
//     {"time": "15:20", "talk": {"id": "break","name": "☕ Pause café ","speakers": []}},
//     {"time": "15:45", "talk": {"id": "OAx0UfebSJQASUjcXZIn","name": "Un peu de sociologie, appliquée à notre métier de développeur","speakers": ["JiYTvOjns7ggKQCY8jV5eR8Rw8k1"]}},
//     {"time": "16:35", "talk": {"id": "break","name": "☕ Pause café ","speakers": []}},
//     {"time": "16:45", "talk": {"id": "5GmnOuRUqsEDDnl3VVRA", "name": "Choisir entre une API RPC, SOAP, REST, GraphQL? Et si le problème était ailleurs ?", "speakers": ["ysFOUdvTjwbmvXr4pHABwdhC2qY2"]}},
//     {"time": "17:35", "talk": {"id": "break","name": "This is the end","speakers": []}},
//     {"time": "17:40", "talk": {"id": "keynoteend", "name": "Keynote de clôture","speakers": []}},
//     {"time": "18:00", "talk": {"id": "goodBye","name": "goodBye","speakers": []}}
//


function writeTimerDayDataFiles(slots, filename, day) {
  const paths = `../api/day${day}/${filename}.json`;
  writeTimerDataFiles(slots, paths);
}

function writeTimerDataFiles(slots, paths) {

  let datas = JSON.stringify(slots, null, '  ');
  const completePath = path.join(__dirname, paths);

  fse.outputFile(
    completePath,
    datas,
    readErr => {
      if (readErr) {
        console.log(readErr);
        process.exit(2);
      }
      console.log(`The file ${completePath} was saved!`);
    });
}

function getRoomData(allSlots, roomIndex, times) {
  return allSlots
    .filter(({rooms}) => rooms.includes(roomIndex))
    .map(({times: [thisTime], rooms, speakers = [], ...rest}) => ({
      time: times[thisTime].time,
      talk: {speakers, ...rest}
    }));
}

const getOutputDataByDay = (myPlanning, breaks, times, selectedDay, talksById, rooms)  => {
  const completeTalks = myPlanning
    .filter(({id}) => !["dummy1", "dummy2"].includes(id))
    .filter(({day}) => day === selectedDay)
    .map(({id, rooms, times}) => {
      const talk = talksById[id];
      times.sort();
      rooms.sort();
      return {...talk, rooms, times};
    })
    .filter(({rooms}) => rooms.length !== 0);

  const cleanedBreaks = breaks
    .filter(({days}) => days.includes(selectedDay))
    .map(({format, rooms, days, ...rest}) => {
      return {rooms, ...rest}
    });

  const allSlots = [...completeTalks, ...cleanedBreaks];

  allSlots.sort(({times: [timeA], rooms: [roomA]}, {
    times: [timeB],
    rooms: [roomB]
  }) => (timeA - timeB) !== 0 ? (timeA - timeB) : (roomA - roomB));

  const filteredTimesPerDay = times.filter(({days}) => days.includes(selectedDay));

  return rooms
    .map((roomName, index) => ({roomName, roomData: getRoomData(allSlots, index + 1, filteredTimesPerDay)}))
    .reduce((acc, {roomName, roomData}) => ({...acc, [roomName]: roomData}), {});
}

async function doWork() {

  const {
    talks,
    speakers
  } = conferenceHall;

  const days = [...new Set(times.flatMap(({days}) => days))];

  const talksById = talks
    .reduce((acc, {id, title, speakers}) => {
      acc[id] = {id, name: title, speakers};
      return acc
    }, {});

  const datasByDay = days.map(day => ({day, outputData: getOutputDataByDay(planning, breaks, times, day, talksById, rooms)}))

  for ({day, outputData} of datasByDay) {
    for (const [roomName, roomDatas] of Object.entries(outputData)) {
      writeTimerDayDataFiles(roomDatas, roomName, day);
    }
  }

  writeTimerDataFiles(days, '../api/days.json')
}

doWork();
