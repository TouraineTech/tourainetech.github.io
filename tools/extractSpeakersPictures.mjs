import fetch from "node-fetch";
import * as fs from "fs";
import path from "path";
const __dirname = path.resolve(path.dirname(''));


const speakers = JSON.parse(fs.readFileSync(path.join(__dirname, '../api/conferenceHall.json'), 'utf8')).speakers;

speakers
  .filter(({picture}) => !!picture)
  .forEach(async (s) => {
    console.log(`Downloading ${s.picture} for ${s.name}`)
    const response = await fetch(s.picture)
    if(response.ok)
      response.body.pipe(fs.createWriteStream(`../assets/img/speakers/${s.uid}.png`))
    else {
      const defaultImg = fs.createReadStream('../assets/img/speakers/default.jpeg');
      defaultImg.pipe(fs.createWriteStream(`../assets/img/speakers/${s.uid}.png`));
    }

})

