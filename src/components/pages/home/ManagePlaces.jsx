import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { KEYCODES } from '@jrubins/utils/lib/keyboard'
import { isApiRequestError } from '@jrubins/utils/lib/api'
import _ from 'lodash'
import ApiRequest from '@jrubins/react-components/lib/api/ApiRequest'
import Input from '@jrubins/react-components/lib/forms/fields/Input'

import {
  createLunchPlace,
  deleteLunchPlace,
} from '../../../utils/api/lunchPlaces'

import LunchPlace from './LunchPlace'

const ManagePlaces = ({ lunchPlaces, refetchLunchPlaces }) => {
  const [newLunchPlaceName, setNewLunchPlaceName] = useState(null)

  /**
   * Creates a new lunch place.
   *
   * @returns {Promise}
   */

  return (
    <div className="manage-places">
      <ApiRequest
        apiFn={async () => {
          const createLunchPlaceApiResult = await createLunchPlace({
            name: newLunchPlaceName,
          })

          if (!isApiRequestError(createLunchPlaceApiResult)) {
            refetchLunchPlaces()
            setNewLunchPlaceName(null)
          }

          return createLunchPlaceApiResult
        }}
      >
        {({ makeApiRequest }) => (
          <Input
            handleChange={setNewLunchPlaceName}
            handleKeyDown={event => {
              if (event.keyCode === KEYCODES.ENTER) {
                makeApiRequest()
              }
            }}
            placeholder="Type a lunch location you're willing to eat..."
            type="text"
            value={newLunchPlaceName}
          />
        )}
      </ApiRequest>

      <div className="manage-places-existing">
        <ul>
          {_.map(_.sortBy(lunchPlaces, 'name'), ({ id, name, visits }) => (
            <li key={id}>
              <LunchPlace
                onDelete={async () => {
                  await deleteLunchPlace(id)
                  refetchLunchPlaces()
                }}
                name={name}
                visits={visits}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

ManagePlaces.propTypes = {
  lunchPlaces: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      visits: PropTypes.array,
    })
  ).isRequired,
  refetchLunchPlaces: PropTypes.func.isRequired,
}

export default ManagePlaces
