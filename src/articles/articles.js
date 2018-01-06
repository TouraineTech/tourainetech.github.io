const moment = require('moment')
const mdRequire = require.context('./', true, /\.md/)

module.exports = mdRequire
    .keys()
    .map(mdRequire)
    .map((a) => ({
        ...a,
        creationDate: moment(a.meta.creationDate),
        updateDate  : moment(a.meta.updateDate),
    }))
    .sort(function (a1, a2) {
        const creationDate1 = a1.creationDate
        const creationDate2 = a2.creationDate
        if(creationDate1.isSame(creationDate2)) {
            return 0
        } else if (creationDate1.isAfter(creationDate2)) {
            return -1
        } else {
            return 1
        }
    })