#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const times = require('../api/times');
const rooms = require('../api/rooms');
const planning = require('../api/planning');
const breaks = require('../api/breaks');
const conferenceHall = require('../api/conferenceHall');

// expected output format example :
// room_time_talks.json
// {
//   "Turing": [
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
//   ]
// }
//

//  speakers.json
// [
//   {
//     "id": "QwcKfwwftjf2bkRj4oA2LB74K6Z2",
//     "name": "Marie Guillaumet",
//     "avatar": "https://lh3.googleusercontent.com/-QOui2dBSFZc/AAAAAAAAAAI/AAAAAAAAAAc/ZGf2GDfZrbc/photo.jpg",
//     "github": "kreestal",
//     "twitter": "@kreestal",
//     "bio": "Web designer et intégratrice web senior, Marie Guillaumet est consultante en accessibilité numérique chez [Access42](https://access42.net/). Elle vit et travaille à Rennes, en full remote. Elle a écrit de nombreux articles sur le web design et l’intégration, et partage régulièrement ses découvertes sur [Twitter](https://twitter.com/kReEsTaL) ou lors de conférences. Diplômée de Sciences Po Grenoble et du CELSA, Marie s’intéresse tout particulièrement à la dimension anthropologique et symbolique du web. Sa spécialisation en accessibilité numérique lui permet de concilier design, technique et implication sociale.",
//     "company": "Access42",
//     "city": "Rennes, France",
//     "confirmed": true
//   }
// ]

function writeTimerDataFiles(slots, filename) {
  let datas = JSON.stringify(slots, null, '  ');

  fs.writeFile(
    path.join(__dirname, `../api/${filename}.json`),
    datas,
    readErr => {
      if (readErr) {
        console.log(err);
        process.exit(2);
      }
      console.log(`The file ${filename}.json was saved!`);
    });
}

function getRoomData(allSlots, roomIndex) {
  return allSlots
    .filter(({rooms}) => rooms.includes(roomIndex))
    .map(({times: [thisTime], rooms, speakers = [], ...rest}) => {
      return {time: times[thisTime], talk: {speakers, ...rest}};
    });
}

async function doWork() {

  const {
    talks,
    speakers
  } = conferenceHall;

  const talksById = talks
    .reduce((acc, {id, title, speakers}) => {
      acc[id] = {id, name: title, speakers};
      return acc
    }, {});

  const completeTalks = planning
    .map(({id, rooms, times}) => {
      const talk = talksById[id];
      times.sort();
      rooms.sort();
      return {...talk, rooms, times};
    })
    .filter(({rooms}) => rooms.length !== 0);

  const cleanedBreaks = breaks.map(({format, rooms, ...rest}) => {
    return {rooms, ...rest}
  });
  const allSlots = [...completeTalks, ...cleanedBreaks];

  allSlots.sort(({times: [timeA], rooms: [roomA]}, {times: [timeB], rooms: [roomB]}) => (timeA - timeB) !== 0 ? (timeA - timeB) : (roomA - roomB));

  const [turing, pascal, lovelace, td1, td2] = rooms;

  const turingData = getRoomData(allSlots, 1);
  const pascalData = getRoomData(allSlots, 2);
  const lovelaceData = getRoomData(allSlots, 3);
  const td1Data = getRoomData(allSlots, 4);
  const td2Data = getRoomData(allSlots, 5);

  const output = {
    [turing]: turingData,
    [pascal]: pascalData,
    [lovelace]: lovelaceData,
    [td1]: td1Data,
    [td2]: td2Data
  };

  writeTimerDataFiles(output, "room_time_talks");

  const correctedSpeakers = speakers.map(({uid, displayName, photoURL, github, twitter, bio, company}) => {
    return {id: uid,
    name: displayName,
    avatar: photoURL,
    github,
    twitter,
    bio,
    company,
    city: "",
    confirmed: true
  }});
  writeTimerDataFiles(correctedSpeakers, "speakers");

}

doWork();
