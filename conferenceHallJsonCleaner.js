#!/usr/bin/env node

const args = process.argv.slice(1);

if (!args[1]) {
  console.log(`first arg should be the conference-hall extracted Json file path`);
  process.exit(1);
}

const conferenceHallDatas = require(args[1]);

const fs = require('fs');
const path = require('path');

const {
  categories,
  formats
} = conferenceHallDatas;

console.log(`raw talks count : ${conferenceHallDatas.talks.length}`);

const talks = conferenceHallDatas.talks
  .map((
    {organizersThread, rating, loves, hates, ...datas}) => {
    return {...datas};
  })
  .filter(({state}) => state === 'confirmed');

console.log(`confirmed talks count : ${talks.length}`);

const confirmedSpeakersId = talks
  .map(({speakers}) => {return speakers})
  .reduce((a, b) => a.concat(b), []);

console.log(`raw speaker count : ${conferenceHallDatas.speakers.length}`);

const speakers = conferenceHallDatas.speakers
  .map(({email, phone, ...datas}) => {return {...datas}})
  .filter(({uid}) => confirmedSpeakersId.includes(uid));

console.log(`confirmed speaker count : ${speakers.length}`);

fs.writeFile(
  path.join(__dirname, 'api/conferenceHall.json'),
  JSON.stringify({talks, speakers, categories, formats }, null, '  '),
    readErr => {
    if (readErr) {
      console.log(err);
      process.exit(2);
    }
    console.log(`The file conferenceHall.json was saved!`);
  });
