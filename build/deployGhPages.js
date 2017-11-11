const ghpages = require('gh-pages')
const path = require('path')

const isPR = process.env.TRAVIS_PULL_REQUEST && process.env.TRAVIS_PULL_REQUEST != 'false'
const prNumber = process.env.TRAVIS_PULL_REQUEST
const token = process.env.GITHUB_TOKEN
deploy()

function deploy() {
    if (!isPR) {
        console.log('wont publish cause it\'s not a PR')
        process.exit(0)
        return
    }
    if (!token) {
        console.error('no token provided')
        process.exit(0)
        return
    }
    ghpages.publish(path.join(__dirname, '../dist'), {
        add   : true,
        branch: 'master',
        dest  : prNumber,
        repo  : `https://${token}@github.com/TouraineTech/tourainetech.github.io.git`
    }, (error) => {
        if (error) {
            console.error(error)
            process.exit(1)
            return
        }
        process.exit(0)
    })
}