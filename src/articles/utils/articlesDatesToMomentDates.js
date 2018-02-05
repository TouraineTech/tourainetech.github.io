import moment from 'moment'

export function articlesDatesToMomentDates(a) {
    return ({
        ...a,
        creationDate: moment(a.meta.creationDate),
        updateDate  : moment(a.meta.updateDate),
    })
}