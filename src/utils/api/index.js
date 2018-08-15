import _ from 'lodash'

/**
 * Delays an API request. Most useful for testing loading states during development.
 *
 * @param {Object} opts
 * @param {Number} opts.msTimeout
 * @param {Function} opts.resolveFn
 * @returns {Error}
 */
export function delayedApiRequest({ msTimeout, resolveFn }) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(resolveFn())
    }, msTimeout)
  })
}

/**
 * Returns if the passed in param represents an API request error.
 *
 * @param {Object} param
 * @returns {Boolean}
 */
export function isApiRequestError(param) {
  return param instanceof Error
}

/**
 * Makes an error object for an API request that failed.
 *
 * @param {Number} options.statusCode
 * @param {Object} options.json
 * @returns {Error}
 */
export function makeApiResponseError({ statusCode, json }) {
  const error = new Error(json.message || 'Internal server error')
  error.statusCode = statusCode
  error.data = json || {} // eslint-disable-line camelcase

  return error
}

/**
 * Stringifies the provided object for use in a query string.
 *
 * @param {Object} obj
 * @returns {String}
 */
export function queryStringify(obj) {
  return _.reduce(
    obj,
    (result, value, key) => {
      // If value is an object, its expected to have "operator" and "value" properties so we can construct a query
      // param of the form key[operator]=value.
      if (_.isObject(value)) {
        const { operator, value: queryParamValue } = value
        if (_.isUndefined(operator) || _.isUndefined(queryParamValue)) {
          throw new Error(
            `Object query param ${key} must have "operator" and "value" properties.`
          )
        }

        result.push(
          `${key}[${value.operator}]=${encodeURIComponent(value.value)}`
        )
      } else if (value) {
        result.push(`${key}=${encodeURIComponent(value)}`)
      }

      return result
    },
    []
  ).join('&')
}

/**
 * Transforms data into the format the API expects using the provided data.
 *
 * @param {Object} options.data
 * @param {Boolean} [options.onlyWithValue]
 * @returns {Object}
 */
export function transformFieldsForAPI({ data, onlyWithValue = true }) {
  let apiData = _.mapKeys(data, (value, key) => key)

  if (onlyWithValue) {
    apiData = _.pickBy(apiData, value => {
      // We allow any boolean values - don't consider that empty.
      if (_.isBoolean(value)) {
        return true
      }

      return value && (!_.isArray(value) || !_.isEmpty(value))
    })
  }

  return apiData
}
