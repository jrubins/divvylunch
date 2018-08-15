import React from 'react'
import PropTypes from 'prop-types'

import { formatDate } from '../../../utils/dates'

const LunchPlace = ({ name, onDelete, visits }) => (
  <div className="lunch-place">
    <div className="lunch-place-name">
      {name}
      {onDelete && (
        <a className="manage-places-existing-delete" onClick={onDelete}>
          delete
        </a>
      )}
    </div>
    <div className="lunch-place-last-visit">
      Last visited:{' '}
      {visits && visits.length > 0 ? formatDate(visits.sort()[0]) : 'Never'}
    </div>
  </div>
)

LunchPlace.propTypes = {
  name: PropTypes.string.isRequired,
  onDelete: PropTypes.func,
  visits: PropTypes.arrayOf(PropTypes.string),
}

export default LunchPlace
