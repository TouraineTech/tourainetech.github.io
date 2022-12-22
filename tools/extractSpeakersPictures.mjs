import fetch from "node-fetch";
import * as fs from "fs";
import path from "path";
const __dirname = path.resolve(path.dirname(''));


const speakers = JSON.parse(fs.readFileSync(path.join(__dirname, '../api/conferenceHall.json'), 'utf8')).speakers;

speakers.forEach(async (s) => {
  const response = await fetch(s.photoURL)
  response.body.pipe(fs.createWriteStream(`../assets/img/speakers/${s.uid}.png`))
})

