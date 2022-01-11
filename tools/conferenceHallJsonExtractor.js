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
  const response = await fetch(`https://conference-hall.io/api/v1/event/tREIbPYCGIKKca55XFzh?key=${apiKey}`);
  const json = await response.json();
  return json;
}

function talksFilter(...states) {
  return ({id, state}) => (states.includes(state));
}


function keynoteTalkFilter() {
  return ({id}) => id !== '5dpfmCYFArWV96iuHRld';
}

function getTalks(conferenceHallDatas) {
  console.log(`raw talks count : ${conferenceHallDatas.talks.length}`);

  const acceptedTalks = conferenceHallDatas.talks
    .filter(talksFilter('accepted'));

  const confirmedTalksSpeakersId = conferenceHallDatas.talks
    .filter(talksFilter('confirmed'))
    .map(({speakers}) => {
      return speakers
    })
    .reduce((a, b) => a.concat(b), []);

  console.log(`raw speaker count : ${conferenceHallDatas.speakers.length}`);
  console.log(`confirmed speaker count : ${confirmedTalksSpeakersId.length}`);

  const talks = conferenceHallDatas.talks
    .map((
      {organizersThread, rating, loves, hates, ...datas}) => {
      return {...datas};
    })
    .filter(talksFilter('confirmed','accepted'))
    .filter(keynoteTalkFilter() );

  talks.push(
    {
      "id": "keynoteOuverture",
      "title": "Keynote d'ouverture",
      "speakers": [],
      "formats": "84638839-c9f7-5eaf-9df5-5fcb578c2c6d"
    },
    {
      "id": "keynoteCloture",
      "title": "Keynote de clôture",
      "speakers": [],
      "formats": "84638839-c9f7-5eaf-9df5-5fcb578c2c6d"
    }
  );

  console.log(`confirmed talks count : ${talks.length}/${acceptedTalks.length+talks.length}`);

  return {talks, acceptedTalks};
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
