#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const eventId = 'touraine-tech-2025';

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
  return JSON.parse(fs.readFileSync(path.join(__dirname, '../api/conferenceHallRawDatas.json'), { encoding: 'utf8', flag: 'r' }));
  // const response = await fetch(`https://conference-hall.io/api/v1/event/${eventId}?key=${apiKey}`);
  // return await response.json();
}

function talksFilter(...states) {
  return ({id, confirmationStatus}) => (states.includes(confirmationStatus));
}


function keynoteTalkFilter() {
  return ({id}) => id !== 'w96GMrchHy0os6sN5LRD' && id !== '5NCjyjA6K1EsbxtW2Mn6';
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
  const confirmedTalks = talks
    .filter(talksFilter('confirmed'));
  const confirmedTalksSpeakersId = talks
    // .filter(talksFilter('confirmed'))
    .map(({speakers}) => {
      return speakers
    })
    .reduce((a, b) => a.concat(b), []);

  console.log(`raw speaker count : ${speakers.length}`);
  console.log(`confirmed speaker count : ${confirmedTalksSpeakersId.length}`);

  const allTalks = talks
    .map((
      {organizersThread, rating, reviews, references, deliberationStatus, confirmationStatus, level, loves, hates, speakers, formats, categories, ...datas}) => {
      return {
        ...datas,
        speakers: speakers.map(({name}) => name.replaceAll(" ", "_")),
        formats: formats.flatMap(({id}) => id)[0],
        categories: categories.flatMap(({id}) => id)[0]
      };
    })
    // .filter(talksFilter('confirmed','accepted'))
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

  const categoriesWithDuplicates = conferenceHallDatas.flatMap(({categories}) => categories);
  const categories = Array.from(new Set(categoriesWithDuplicates.map(a => a.id)))
    .map(id => {
      return categoriesWithDuplicates.find(a => a.id === id)
    });

  const formatsWithDuplicates = conferenceHallDatas.flatMap(({formats}) => formats);
  const formats = Array.from(new Set(formatsWithDuplicates.map(a => a.id)))
    .map(id => {
      return formatsWithDuplicates.find(a => a.id === id)
    });

  const speakersWithDuplicates = conferenceHallDatas.flatMap(({speakers}) => speakers);
  const speakerList = Array.from(new Set(speakersWithDuplicates.map(a => a.name)))
    .map(name => {
      return speakersWithDuplicates.find(a => a.name === name)
    }).map(({email, phone, address, comments, state, location, references, ...datas}) => {
      return {...datas}
    });

  // const formattedFormats = formats.map(({id, name}) => ({id, name: name.replace("Débutant·e ", "")}))

  const {talks: rawTalks} = getTalks(conferenceHallDatas, speakerList);

  console.log({rawTalks})
  // const rawSpeakers = getSpeakers(conferenceHallDatas, rawTalks);
  //
  const {talks, speakers} = doSomeCorrection(rawTalks, speakerList);
  writeConferenceHallDataFile(talks, speakers, categories, formats);

}

doWork();
