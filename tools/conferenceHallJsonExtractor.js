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
  let data = JSON.stringify({talks, speakers, categories, formats}, null, '  ');

  const datas = data
    .replace(
  "https://pbs.twimg.com/profile_images/893697090538360832/bzPdkHN9_normal.jpg",
  "https://pbs.twimg.com/profile_images/1193220065619070976/kY7G0fQR_400x400.jpg")
    .replace(
  "https://pbs.twimg.com/profile_images/959477038477389824/9pIYfLhL_normal.jpg",
  "https://pbs.twimg.com/profile_images/1201869350107566081/zcZed08W_400x400.jpg")
    .replace(
      "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg",
      "https://pbs.twimg.com/profile_images/966390108747456517/z_Oph3Yv_400x400.jpg")
    .replace(" (LostInBrittany)", "");

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
  const response = await fetch(`https://conference-hall.io/api/v1/event/ihmyut4ulJwU7UMSGbt4?key=${apiKey}`);
  const json = await response.json();
  return json;
}

function confirmedTalksFilter() {
  return ({id, state}) => (state === 'confirmed' || id === "P39ti4I6J5PN4nn3oNll");
}

function acceptedTalksFilter() {
  return ({id, state}) => (state === 'accepted' && id !== "P39ti4I6J5PN4nn3oNll");
}

function keynoteTalkFilter() {
  return ({id}) => id !== '2UyymcQvMehGkX1W40IE';
}

function getTalks(conferenceHallDatas) {
  console.log(`raw talks count : ${conferenceHallDatas.talks.length}`);

  const acceptedTalks = conferenceHallDatas.talks
    .filter(acceptedTalksFilter());

  const confirmedTalksSpeakersId = conferenceHallDatas.talks
    .filter(confirmedTalksFilter())
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
    .filter(confirmedTalksFilter())
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

  talks.filter(({id}) => "C7diXezyH5e5CAZHCD8w" === id)[0].speakers.push("dcwy5r3Xy5P679SNm57j0Mmu34D2")
  speakers.push({
    "uid": "dcwy5r3Xy5P679SNm57j0Mmu34D2",
    "displayName": "Ulrich VACHON",
    "bio": "Développeur avec une bonne pratique de l'agilité, Ulrich a travaillé chez des éditeurs logiciels, des sociétés de services, mais aussi en tant que freelance. Ulrich a  endossé les rôles de développeurs, leader technique et Scrum Master, avec un intérêt grandissant pour les pratiques DEVOPS.\nActuellement, il participe au développement de Docker Desktop pour Mac et Windows chez Docker !",
    "speakerReferences": "J'ai au l'occasion de présenter des tool in action, quicky et hands-on à Devoxx.\n\nPlus des talks internes.",
    "company": "Docker",
    "photoURL": "https://avatars1.githubusercontent.com/u/225652?v=4",
    "twitter": "@ulrich",
    "github": "ulrich"
  });

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
