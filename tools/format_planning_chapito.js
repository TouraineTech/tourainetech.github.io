#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const planningData = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'api/planning.json'), 'utf8'));
const conferenceHall = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'api/conferenceHall.json'), 'utf8'));
const times = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'api/times.json'), 'utf8'));
const rooms = {
  1:'Turing',
  2:'Pascal',
  3:'Lovelace',
  4:'TD1'
}

const categories = {
  "46293012-ca7f-5197-8c58-69bc9a6c7a4b" : "Design, UI, UX",
  "78e751d2-e8f0-5aca-9e0e-373fc79208c3" : "Front web",
  "87b16802-9e01-5a51-910f-71141789a8b8" : "Backend, Cloud, Big Data",
  "ef452c33-83cf-5472-8e72-acd374e24b58" : "Mobile, Internet des objets",
  "63920d15-9b86-58e5-875c-441301f6dbb9": "Conception, architecture",
  "18c44d7d-ed48-5dde-94ba-8b4477a84db3" : "Outillage, pratiques de développement",
  "3035cc9f-f3b2-5164-b9c1-1737e6fd04fa" : "Humain & Tech",
  "ed8afd05-a6aa-58e7-a6fd-7413d262a8b9" : "Alien"
}

const formats = {
  "d6fdc077-e3e3-5fe2-bdd4-5af4bc349e2a" : "Quickie (15min)",
  "84638839-c9f7-5eaf-9df5-5fcb578c2c6d" : "Conférence (50min)",
  "95d5ba79-ebfc-5e1a-8b45-184925424f1b" : "Hands-on (120min)"
}

const speakers = conferenceHall.speakers.reduce((obj, item) => ({...obj, [item.uid]: item}) ,{});
const talksConferenceHall = conferenceHall.talks.reduce((obj, item) => ({...obj, [item.id]: item}) ,{});

const chapito = planningData.map(p => {
  p.times = times[p.times]?.time
  p.rooms = rooms[p.rooms]
  p.categories = categories[p.categories]
  p.formats = formats[p.formats]
  p.abstract = talksConferenceHall[p.id].abstract
  p.speakers = talksConferenceHall[p.id].speakers.map(s => speakers[s].displayName)
  p.day = p.day === 1 ? 'Jeudi' : 'Vendredi'
  console.log(p)
  return p;
})

// console.log(lol);
fs.writeFile(
  path.join(__dirname, '..', 'api/planning_Chapito.json'),
  JSON.stringify(chapito, null, '  '),
  readErr => {
    if (readErr) {
      console.log(readErr);
      process.exit(2);
    }
    console.log(`The file talks.json was saved!`);
  });

