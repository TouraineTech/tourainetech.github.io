const articles = require('../articles')
const template = require('../defaultTemplate')

const max = 2

module.exports = articles.slice(0, max)
    .map(template)
    .join('')