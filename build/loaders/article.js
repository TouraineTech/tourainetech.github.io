const { getMeta } = require('../meta/meta')
const { statSync } = require('fs')
const { resolve } = require('path')

const loaders = [ 'html-loader', 'markdown-loader', resolve(__dirname, './removeMeta.js') ]

loaders.forEach(
    checkIfLoaderIsInstalled
)

module.exports = function articleLoader(content) {
    const resourcePath = this.resourcePath
    const stats = statSync(resourcePath)
    const defaultsMeta = {
        creationDate: stats.birthtime,
        updateDate  : stats.mtime,
    }

    const meta = parseMeta(content, defaultsMeta)

    return `module.exports = {
        meta   : ${JSON.stringify(meta)},
        content: require('!!${escapeString(loaders.join('!'))}!${escapeString(resourcePath)}')
    }`
}

function checkIfLoaderIsInstalled(loader) {
    try {
        require(loader)
    } catch (e) {
        throw new Error(`Loader : ${loader} not found. Please install it like that for example : npm i -D ${loader}`)
    }
}

function parseMeta(content, defaultsMeta) {
    return Object.assign(
        {},
        defaultsMeta,
        getMeta(content), // Allows dates defaults overload
    )
}

function escapeString(s) {
    return JSON.stringify(s).slice(1, -1);
}