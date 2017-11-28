const dir = process.env.WORKSPACE
const path = require('path')
console.log("dir : ", dir)
const ghpages = require(path.join(dir, 'node_modules/gh-pages/lib/index.js'))

const isPR = process.env.ghprbPullId && process.env.ghprbPullId != 'false'
const prNumber = process.env.ghprbPullId
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
    ghpages.publish(path.join(dir, './dist'), {
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