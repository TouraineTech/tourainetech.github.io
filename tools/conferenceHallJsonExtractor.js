#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const fetch = require("node-fetch");

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
        console.log(err);
        process.exit(2);
      }
      console.log(`The file conferenceHall.json was saved!`);
    });
}

async function retrieveData(apiKey) {
  const response = await fetch(`https://conference-hall.io/api/v1/event/3lWSdH0pfZkHEAL7RWSJ?key=${apiKey}`);
  const json = await response.json();
  return json;
}

function talksFilter(...states) {
  return ({id, state}) => (states.includes(state));
}


function keynoteTalkFilter() {
  return ({id}) => id !== 'w96GMrchHy0os6sN5LRD' && id !== '5NCjyjA6K1EsbxtW2Mn6';
}

function getTalks(conferenceHallDatas) {
  console.log(`raw talks count : ${conferenceHallDatas.talks.length}`);
  const talksNeedToBeForceConfirmed = ['TuXPjtB8tUG4yaSnj6pn', 'RKdpxRlsknOPkd4Lazye', 'QL23LjbKcwLMnCVGYAn8', 'vWqRo4G2Zt787YV5hu0p', '9mx91dnbQegxuMZPrp8m', 'SltiD9i2aW0hxWmNWWop' ]
  const talksNeedToBeForceRefused = ['vlxojaVlUVeS6ZbF6dcm', 'J7gGsPyGOyyIxADiHN04', ]
  const talks = conferenceHallDatas.talks.map(t => {
    if(talksNeedToBeForceConfirmed.includes(t.id)) {
      t.state = 'confirmed';
    }
    if(talksNeedToBeForceRefused.includes(t.id)) {
      t.state = 'refused'
    }
    return t
  })
  const confirmedTalks = talks
    .filter(talksFilter('confirmed'));
  const confirmedTalksSpeakersId = talks
    .filter(talksFilter('confirmed'))
    .map(({speakers}) => {
      return speakers
    })
    .reduce((a, b) => a.concat(b), []);

  console.log(`raw speaker count : ${conferenceHallDatas.speakers.length}`);
  console.log(`confirmed speaker count : ${confirmedTalksSpeakersId.length}`);

  const allTalks = talks
    .map((
      {organizersThread, rating, loves, hates, ...datas}) => {
      return {...datas};
    })
    .filter(talksFilter('confirmed','accepted'))
    .filter(keynoteTalkFilter());

  allTalks.push(
    {
      "id": "keynoteOuverture1",
      "title": "Keynote d'ouverture",
      "speakers": [],
      "formats": "84638839-c9f7-5eaf-9df5-5fcb578c2c6d"
    },
    {
      "id": "keynoteCloture1",
      "title": "Keynote de clôture",
      "speakers": [],
      "formats": "84638839-c9f7-5eaf-9df5-5fcb578c2c6d"
    },
    {
      "id": "keynoteOuverture2",
      "title": "Keynote d'ouverture",
      "speakers": [],
      "formats": "84638839-c9f7-5eaf-9df5-5fcb578c2c6d"
    },
    {
      "id": "keynoteCloture2",
      "title": "Keynote de clôture",
      "speakers": [],
      "formats": "84638839-c9f7-5eaf-9df5-5fcb578c2c6d"
    }
  );
  console.log(`confirmed talks count : ${confirmedTalks.length}/${allTalks.length}`);

  return {talks: allTalks, confirmedTalks};
}

function getSpeakers(conferenceHallDatas, talks) {
  const confirmedSpeakersId = talks
    .map(({speakers}) => {return speakers})
    .reduce((a, b) => a.concat(b), []);

  const speakers = conferenceHallDatas.speakers
    .map(({email, phone, address, comments, state, ...datas}) => {
      return {...datas}
    })
    .filter(({uid}) => confirmedSpeakersId.includes(uid));

  console.log(`confirmed speaker count : ${speakers.length}`);
  return speakers;
}

function doSomeCorrection(rawTalks, rawSpeakers) {
  const talks = [...rawTalks];
  const speakers = [...rawSpeakers];

  return {talks, speakers};
}

async function doWork() {
  const conferenceHallDatas = await retrieveData(apiKey);

  if (createRawConferenceHallDataFile) {
    fs.writeFile(
      path.join(__dirname, '../api/conferenceHallRawDatas.json'),
      JSON.stringify(conferenceHallDatas, null, '  '),
      readErr => {
        if (readErr) {
          console.log(err);
          process.exit(2);
        }
        console.log(`The file conferenceHallRawDatas.json was saved!`);
      }
    );
  }

  const {
    categories,
    formats
  } = conferenceHallDatas;

  const {talks: rawTalks} = getTalks(conferenceHallDatas);
  const rawSpeakers = getSpeakers(conferenceHallDatas, rawTalks);

  const {talks, speakers} = doSomeCorrection(rawTalks, rawSpeakers);

  writeConferenceHallDataFile(talks, speakers, categories, formats);

}

doWork();
