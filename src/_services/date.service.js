import { DateTime } from 'luxon'

export class DateService {
  static format (date = DateTime.local().toISO(), format = 'DATETIME_FULL') {
    return DateTime.fromISO(date).toLocaleString(DateTime[format])
  }
}
