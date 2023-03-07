import fetch from 'node-fetch';
import parser from 'fast-xml-parser';
import fs from 'fs';

const {API_KEY: apiKey} = process.env;

if (!apiKey) {
  console.log(`API_KEY ENV value should exist`);
  process.exit(1);
}

const parse = (body) => (parser.parse(body, {ignoreAttributes: false}));

const createPhotoJSON = async (albumId) => {
  const responsePage1 = await fetch('https://www.flickr.com/services/rest/?method=flickr.photosets.getPhotos&photoset_id=' + albumId + '&api_key=' + apiKey + '&per_page=500&extras=url_s,url_o,date_taken')
    .then(response => response.text())
    .then(body => parse(body))
    .then(json => json.rsp.photoset.photo.map(photo => ({
      date: photo['@_datetaken'],
      small: photo['@_url_s'],
      original: photo['@_url_o']
    })))
  const responsePage2 = await fetch('https://www.flickr.com/services/rest/?method=flickr.photosets.getPhotos&photoset_id=' + albumId + '&api_key=' + apiKey + '&per_page=500&page=2&extras=url_s,url_o,date_taken')
    .then(response => response.text())
    .then(body => parse(body))
    .then(json => json.rsp.photoset.photo.map(photo => ({
      date: photo['@_datetaken'],
      small: photo['@_url_s'],
      original: photo['@_url_o']
    })))
  const allPhotos = [...responsePage1,...responsePage2]
  fs.writeFile('api/photos_' + albumId + '.json', JSON.stringify(allPhotos), () => {});
};

createPhotoJSON('72177720306535189');
