import { apiDelete, get, post } from '@jrubins/utils/lib/requests'

/**
 * Creates a new lunch place.
 *
 * @param {Object} data
 * @returns {Promise}
 */
export function createLunchPlace(data) {
  return post('/lunch_places', {
    body: data,
  })
}

/**
 * Deletes a lunch place.
 *
 * @param {String} id
 * @returns {Promise}
 */
export function deleteLunchPlace(id) {
  return apiDelete(`/lunch_places/${id}`)
}

/**
 * Fetches existing lunch places.
 *
 * @param {Object} opts
 * @param {String} opts.jwt
 * @returns {Promise}
 */
export function fetchLunchPlaces() {
  return get('/lunch_places')
}

/**
 * Marks a lunch place as visited.
 *
 * @param {String} id
 * @returns {Promise}
 */
export function markLunchPlaceVisited(id) {
  return post(`/lunch_places/${id}/visited`)
}
