import fetch from "node-fetch";
import * as fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const speakers = JSON.parse(fs.readFileSync(path.join(__dirname, '../api/conferenceHall.json'), 'utf8')).speakers;

const speakersDir = path.join(__dirname, '../assets/img/speakers');
const defaultImgPath = path.join(speakersDir, 'default.jpeg');

function copyDefaultImage(uid) {
  const destPath = path.join(speakersDir, `${uid}.png`);
  fs.copyFileSync(defaultImgPath, destPath);
  console.log(`Copied default image for ${uid}`);
}

speakers.forEach(async (s) => {
  const destPath = path.join(speakersDir, `${s.uid}.png`);

  if (!s.picture) {
    copyDefaultImage(s.uid);
    return;
  }

  console.log(`Downloading ${s.picture} for ${s.name}`);
  try {
    const response = await fetch(s.picture);
    if (response.ok) {
      response.body.pipe(fs.createWriteStream(destPath));
    } else {
      copyDefaultImage(s.uid);
    }
  } catch (e) {
    console.error(`Error downloading for ${s.name}:`, e.message);
    copyDefaultImage(s.uid);
  }
});

