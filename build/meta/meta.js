const yaml = require('js-yaml')

const splitter = '---'

module.exports = {
    splitter,
    hasMeta,
    getMeta,
    removeMeta,
}

function hasMeta(content) {
    return content.slice(0, 3) === splitter
}

function getMeta(content) {
    if (hasMeta(content)) {
        const [ /** empty string */, rawMeta ] = content.split(splitter)
        return yaml.safeLoad(rawMeta) || {}
    }

    return {}
}

function removeMeta(content) {
    if(hasMeta(content)) {
        const contents = content.split(splitter).slice(2) // ignores empty string and meta part

        return contents.join(splitter)
    }

    return content
}