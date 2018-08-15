import _ from 'lodash'
import moment from 'moment'

/**
 * The default date format.
 *
 * @type {String}
 */
export const DEFAULT_DATE_FORMAT = 'M/D/YYYY'

/**
 * Transforms the provided date into a consumable format for Moment.
 *
 * @param {Date|String|Number} date
 * @returns {Date|String|Number}
 */
function transformDate(date) {
  // If it's a number and looks like seconds, let's convert to milliseconds.
  return _.isNumber(date) && `${date}`.length === 10 ? date * 1000 : date
}

/**
 * Formats the provided time into a date string (default MM/DD/YYYY).
 * If a timestamp is provided, it should be seconds since the Epoch.
 *
 * @param {String|Number} date
 * @param {String} [dateFormat]
 * @param {Object} [opts]
 * @param {String} [opts.parseFormat] The format to use to parse the provided date.
 * @returns {String}
 */
export function formatDate(
  date,
  dateFormat = DEFAULT_DATE_FORMAT,
  { parseFormat = null } = {}
) {
  const momentToFormat = moment(transformDate(date), parseFormat)

  return momentToFormat.format(dateFormat)
}
