import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import { KEYCODES } from '../../../utils/keyboard'
import {
  createLunchPlace,
  deleteLunchPlace,
} from '../../../services/api/lunchPlaces'
import { isApiRequestError } from '../../../utils/api'

import ApiRequest from '../../reusable/api/ApiRequest'
import Input from '../../reusable/forms/fields/Input'
import LunchPlace from './LunchPlace'

class ManagePlaces extends Component {
  constructor(props) {
    super(props)

    this.state = {
      newLunchPlaceName: null,
    }

    this.createLunchPlace = this.createLunchPlace.bind(this)
    this.onChangeNewLunchPlaceName = this.onChangeNewLunchPlaceName.bind(this)
  }

  /**
   * Creates a new lunch place.
   *
   * @returns {Promise}
   */
  async createLunchPlace() {
    const createLunchPlaceApiResult = await createLunchPlace({
      name: this.state.newLunchPlaceName,
    })

    if (!isApiRequestError(createLunchPlaceApiResult)) {
      this.props.refetchLunchPlaces()

      this.setState({
        newLunchPlaceName: null,
      })
    }

    return createLunchPlaceApiResult
  }

  /**
   * Handles an update to the lunch place name.
   *
   * @param {String} newLunchPlaceName
   */
  onChangeNewLunchPlaceName(newLunchPlaceName) {
    this.setState({
      newLunchPlaceName,
    })
  }

  render() {
    const { lunchPlaces, refetchLunchPlaces } = this.props
    const { newLunchPlaceName } = this.state

    return (
      <div className="manage-places">
        <ApiRequest apiFn={this.createLunchPlace}>
          {({ makeApiRequest }) => (
            <Input
              handleChange={this.onChangeNewLunchPlaceName}
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
