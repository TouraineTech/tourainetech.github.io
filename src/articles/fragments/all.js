import articles from '../articles'
import template from '../newsTemplate'

module.exports = articles
    .map(template)
    .join('')