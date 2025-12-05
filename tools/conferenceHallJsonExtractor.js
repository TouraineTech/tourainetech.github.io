#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const eventId = 'touraine-tech-2026';

const {API_KEY: apiKey, WRITE_RAW_FILE: createRawConferenceHallDataFile} = process.env;

if (!apiKey) {
  console.log(`API_KEY ENV value should exist`);
  process.exit(1);
}

function writeConferenceHallDataFile(talks, speakers, categories, formats) {
  const datas = JSON.stringify({talks, speakers, categories, formats}, null, '  ');


  fs.writeFile(
    path.join(__dirname, '../api/conferenceHall.json'),
    datas,
    readErr => {
      if (readErr) {
        console.log(readErr);
        process.exit(2);
      }
      console.log(`The file conferenceHall.json was saved!`);
    });
}

async function retrieveData(apiKey) {
  // Pour le développement local, décommenter la ligne suivante :
  // return JSON.parse(fs.readFileSync(path.join(__dirname, '../api/conferenceHallRawDatas.json'), { encoding: 'utf8', flag: 'r' }));
  const response = await fetch(`https://conference-hall.io/api/v1/event/${eventId}?key=${apiKey}`);
  return await response.json();
}

function talksFilter(...states) {
  return ({confirmationStatus, deliberationStatus}) => (
    states.includes(confirmationStatus) || states.includes(deliberationStatus)
  );
}


function getTalks(conferenceHallDatas, speakers) {
  console.log(`raw talks count : ${conferenceHallDatas.length}`);
  const talksNeedToBeForceConfirmed = []
  const talksNeedToBeForceRefused = []
  const talks = conferenceHallDatas.map(t => {
    if(talksNeedToBeForceConfirmed.includes(t.id)) {
      t.confirmationStatus = 'confirmed';
    }
    if(talksNeedToBeForceRefused.includes(t.id)) {
      t.confirmationStatus = 'refused'
    }
    return t
  })
  const confirmedTalks = talks.filter(talksFilter('confirmed'));

  console.log(`raw speaker count : ${speakers.length}`);

  const allTalks = talks
    .filter(talksFilter('confirmed', 'ACCEPTED'))
    .map((
      {organizersThread, rating, reviews, references, deliberationStatus, confirmationStatus, level, loves, hates, speakers, formats, categories, ...datas}) => {
      return {
        ...datas,
        speakers: speakers.map(({name}) => name.replaceAll(" ", "_")),
        formats: formats[0],
        categories: categories[0],
        level
      };
    })

  console.log(`confirmed talks count : ${confirmedTalks.length}/${allTalks.length}`);

  return {talks: allTalks, confirmedTalks};
}

function getSpeakers(conferenceHallDatas, talks) {
  const confirmedSpeakersId = talks
    .map(({speakers}) => {return speakers})
    .reduce((a, b) => a.concat(b), []);

  const speakers = conferenceHallDatas.speakers
    .map(({email, phone, address, comments, state, references, ...datas}) => {
      return {...datas}
    })
    .filter(({uid}) => confirmedSpeakersId.includes(uid));

  console.log(`confirmed speaker count : ${speakers.length}`);
  return speakers;
}

function doSomeCorrection(rawTalks, rawSpeakers) {
  const talks = rawTalks;
  const speakers = rawSpeakers.map(({name, ...speaker}) => ({uid: name.replaceAll(" ", "_"),name, ...speaker}));

  return {talks, speakers};
}

async function doWork() {
  const conferenceHallDatass = await retrieveData(apiKey);
  const {proposals: conferenceHallDatas} = conferenceHallDatass;
  if (createRawConferenceHallDataFile) {
    fs.writeFile(
      path.join(__dirname, '../api/conferenceHallRawDatas.json'),
      JSON.stringify(conferenceHallDatas, null, '  '),
      readErr => {
        if (readErr) {
          console.log(readErr);
          process.exit(2);
        }
        console.log(`The file conferenceHallRawDatas.json was saved!`);
      }
    );
  }

  const categories = [...new Set(conferenceHallDatas.flatMap(({categories}) => categories))];
  const formats = [...new Set(conferenceHallDatas.flatMap(({formats}) => formats))];

  const speakersWithDuplicates = conferenceHallDatas.flatMap(({speakers}) => speakers);
  const speakerList = Array.from(new Set(speakersWithDuplicates.map(a => a.name)))
    .map(name => {
      return speakersWithDuplicates.find(a => a.name === name)
    }).map(({email, phone, address, comments, state, location, references, ...datas}) => {
      return {...datas}
    });

  const {talks: rawTalks} = getTalks(conferenceHallDatas, speakerList);
  const {talks, speakers} = doSomeCorrection(rawTalks, speakerList);
  writeConferenceHallDataFile(talks, speakers, categories, formats);

}

doWork();
