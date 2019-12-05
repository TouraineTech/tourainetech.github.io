#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const fetch = require("node-fetch");

const apiKey = process.env.API_KEY;

if (!apiKey) {
  console.log(`API_KEY ENV value should exist`);
  process.exit(1);
}

function writeConferenceHallDataFile(talks, speakers, categories, formats) {
  let data = JSON.stringify({talks, speakers, categories, formats}, null, '  ');

  const datas = data.replace(
  "https://pbs.twimg.com/profile_images/893697090538360832/bzPdkHN9_normal.jpg",
  "https://pbs.twimg.com/profile_images/1193220065619070976/kY7G0fQR_400x400.jpg");

  fs.writeFile(
    path.join(__dirname, 'api/conferenceHall.json'),
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
  const response = await fetch(`https://conference-hall.io/api/v1/event/ihmyut4ulJwU7UMSGbt4?key=${apiKey}`);
  const json = await response.json();
  return json;
}

function getTalks(conferenceHallDatas) {
  console.log(`raw talks count : ${conferenceHallDatas.talks.length}`);

  const acceptedTalks = conferenceHallDatas.talks
    .filter(({state}) => state === 'accepted');

  const talks = conferenceHallDatas.talks
    .map((
      {organizersThread, rating, loves, hates, ...datas}) => {
      return {...datas};
    })
    .filter(({state}) => state === 'confirmed');

  console.log(`confirmed talks count : ${talks.length}/${acceptedTalks.length+talks.length}`);

  const acceptedTalksSpeakersId = conferenceHallDatas.talks
    .filter(({state}) => state === 'accepted')
    .map(({speakers}) => {
      return speakers
    })
    .reduce((a, b) => a.concat(b), []);

  console.log(`raw speaker count : ${conferenceHallDatas.speakers.length}`);
  console.log(`accepted speaker count : ${acceptedTalksSpeakersId.length}`);
  return talks;
}

function getSpeakers(conferenceHallDatas, talks) {
  const confirmedSpeakersId = talks
    .map(({speakers}) => {return speakers})
    .reduce((a, b) => a.concat(b), []);

  const speakers = conferenceHallDatas.speakers
    .map(({email, phone, address, ...datas}) => {
      return {...datas}
    })
    .filter(({uid}) => confirmedSpeakersId.includes(uid));

  console.log(`confirmed speaker count : ${speakers.length}`);
  return speakers;
}

async function doWork() {
  const conferenceHallDatas = await retrieveData(apiKey);

  const {
    categories,
    formats
  } = conferenceHallDatas;

  const talks = getTalks(conferenceHallDatas);
  const speakers = getSpeakers(conferenceHallDatas, talks);

  writeConferenceHallDataFile(talks, speakers, categories, formats);

}

doWork();
