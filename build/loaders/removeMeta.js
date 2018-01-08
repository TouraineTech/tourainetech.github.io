const { removeMeta } = require('../meta/meta')

module.exports = function removeMetaLoader(content) {
    return removeMeta(content)
}