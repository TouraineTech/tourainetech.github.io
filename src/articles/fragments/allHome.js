import articles from '../articles'
import template from '../homeNewsTemplate'

module.exports = articles
    .map(template)
    .join('')