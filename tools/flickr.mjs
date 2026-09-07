import fetch from 'node-fetch';
import {XMLParser} from 'fast-xml-parser';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUTPUT_PATH = path.join(__dirname, '../src/data/generated/photos.json');

const {API_KEY: apiKey} = process.env;

if (!apiKey) {
  console.log(`API_KEY ENV value should exist`);
  process.exit(1);
}

const parse = (body) => (new XMLParser({ignoreAttributes: false}).parse(body));

const fetchPage = async (albumId, page) => {
  const response = await fetch('https://www.flickr.com/services/rest/?method=flickr.photosets.getPhotos&photoset_id=' + albumId + '&api_key=' + apiKey + '&per_page=500&page=' + page + '&extras=url_s,url_o,date_taken');
  const {rsp} = parse(await response.text());

  if (rsp['@_stat'] !== 'ok') {
    throw new Error(`Flickr returned ${rsp['@_stat']} for album ${albumId} (page ${page}): ${rsp.err?.['@_msg'] ?? 'no message'}`);
  }

  // fast-xml-parser yields a bare object rather than an array when a page holds a single photo.
  const photos = [].concat(rsp.photoset.photo ?? []);

  return {
    pages: Number(rsp.photoset['@_pages']),
    photos: photos.map(photo => ({
      date: photo['@_datetaken'],
      small: photo['@_url_s'],
      original: photo['@_url_o']
    }))
  };
};

const createPhotoJSON = async (albumId) => {
  const firstPage = await fetchPage(albumId, 1);
  const allPhotos = [...firstPage.photos];

  for (let page = 2; page <= firstPage.pages; page++) {
    allPhotos.push(...(await fetchPage(albumId, page)).photos);
  }

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(allPhotos));
  console.log(`Wrote ${allPhotos.length} photos to ${path.relative(process.cwd(), OUTPUT_PATH)}`);
};

createPhotoJSON('72177720332338811').catch((err) => {
  console.error(err);
  process.exit(1);
});
