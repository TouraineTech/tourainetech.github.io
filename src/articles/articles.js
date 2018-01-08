import { compareArticlesByDate } from './utils/compareArticlesByDate'
import { articlesDatesToMomentDates } from './utils/articlesDatesToMomentDates'

const mdRequire = require.context('./content', true, /\.md/)

export default mdRequire
    .keys()
    .map(mdRequire)
    .map(articlesDatesToMomentDates)
    .sort(compareArticlesByDate)