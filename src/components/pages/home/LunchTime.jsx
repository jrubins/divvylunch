import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import { markLunchPlaceVisited } from '../../../services/api/lunchPlaces'

import ApiRequest from '../../reusable/api/ApiRequest'
import Button from '../../reusable/forms/fields/Button'
import LunchPlace from './LunchPlace'

class LunchTime extends Component {
  constructor(props) {
    super(props)

    this.state = {
      lunchPlaceToEatAtId: null,
    }

    this.chooseLunchPlace = this.chooseLunchPlace.bind(this)
  }

  /**
   * Chooses a random lunch place for the user to go to.
   */
  chooseLunchPlace() {
    const { lunchPlaces } = this.props
    const randomIndex = _.random(0, lunchPlaces.length - 1)

    this.setState({
      lunchPlaceToEatAtId: lunchPlaces[randomIndex].id,
    })
  }

  render() {
    const { lunchPlaces, onClickAddPlaces, refetchLunchPlaces } = this.props
    const { lunchPlaceToEatAtId } = this.state
    const lunchPlaceToEatAt = _.find(lunchPlaces, { id: lunchPlaceToEatAtId })

    return (
      <div className="lunch-time">
        {lunchPlaces.length === 0 && (
          <p>
            You have no lunch places. <a onClick={onClickAddPlaces}>Add</a>{' '}
            places you're willing to eat!
          </p>
        )}

        {lunchPlaces.length > 0 && (
          <div className="lunch-time-content">
            <div className="lunch-time-options">
              <h3>Options</h3>
              <ul>
                {_.map(
                  _.sortBy(lunchPlaces, 'name'),
                  ({ id, name, visits }) => (
                    <li key={id}>
                      <LunchPlace name={name} visits={visits} />
                    </li>
                  )
                )}
              </ul>
            </div>
            <div className="lunch-time-eat">
              {!lunchPlaceToEatAt && (
                <Button handleClick={this.chooseLunchPlace}>Let's Eat!</Button>
              )}

              {lunchPlaceToEatAt && (
                <div className="lunch-time-chosen-place">
                  <LunchPlace
                    name={lunchPlaceToEatAt.name}
                    visits={lunchPlaceToEatAt.visits}
                  />
                  <ApiRequest
                    apiFn={async () => {
                      await markLunchPlaceVisited(lunchPlaceToEatAt.id)
                      refetchLunchPlaces()
                    }}
                  >
                    {({ makeApiRequest }) => (
                      <Button handleClick={makeApiRequest}>Sounds Good!</Button>
                    )}
                  </ApiRequest>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    )
  }
}

LunchTime.propTypes = {
  lunchPlaces: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      visits: PropTypes.array,
    })
  ).isRequired,
  onClickAddPlaces: PropTypes.func.isRequired,
  refetchLunchPlaces: PropTypes.func.isRequired,
}

export default LunchTime
