import { compareArticlesByDate } from './utils/compareArticlesByDate'
import { articlesDatesToMomentDates } from './utils/articlesDatesToMomentDates'

const mdRequire = require.context('./content', true, /\.md/)

export default mdRequire
    .keys()
    .map((key) => mdRequire(key))
    .map(articlesDatesToMomentDates)
    .sort(compareArticlesByDate)