const articles = require('../articles')
const template = require('../defaultTemplate')

module.exports = articles
    .map(template)
    .join('')