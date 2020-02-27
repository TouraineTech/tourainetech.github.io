const fetch = require('node-fetch');
const parser = require('fast-xml-parser');
const fs = require('fs');

const {API_KEY: apiKey} = process.env;

if (!apiKey) {
  console.log(`API_KEY ENV value should exist`);
  process.exit(1);
}

const parse = (body) => (parser.parse(body, {ignoreAttributes: false}));

const createPhotoJSON = (albumId) => (fetch('https://www.flickr.com/services/rest/?method=flickr.photosets.getPhotos&photoset_id='+albumId+'&api_key='+apiKey+'&per_page=500&extras=url_s,url_o,date_taken')
.then(response => response.text())
.then(body => parse(body))
.then(json => json.rsp.photoset.photo.map(photo => ({date: photo['@_datetaken'], small: photo['@_url_s'], original: photo['@_url_o']})))
.then(urls => fs.writeFile('api/photos_'+albumId+'.json', JSON.stringify(urls), () => {})));

createPhotoJSON('72157713187904526');