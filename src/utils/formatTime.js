import { compareAsc, format, formatDistanceToNow, sub } from 'date-fns'
import viLocale from 'date-fns/locale/vi'

const formatTime = (time, extend = false) => {
    const date = new Date(time)
    const subDate = sub(new Date(), { days: 1 })

    if (compareAsc(date, subDate) === -1) {
        return format(date, (extend ? 'HH:mm:ss ' : '') + 'dd-MM-yyyy')
    }

    return formatDistanceToNow(date, {
        addSuffix: true,
        locale: viLocale
    })
}

export default formatTime
