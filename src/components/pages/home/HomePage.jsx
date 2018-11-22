import React, { useState } from 'react'
import _ from 'lodash'
import ApiRequest from '@jrubins/react-components/lib/api/ApiRequest'
import cn from 'classnames'

import { fetchLunchPlaces } from '../../../utils/api/lunchPlaces'

import LunchTime from './LunchTime'
import ManagePlaces from './ManagePlaces'

const HomePage = () => {
  const [activeTab, setActiveTab] = useState('LUNCH_TIME')

  return (
    <div className="home-page page">
      <header>
        <div className="logo">
          divvy
          <span className="logo-emphasis">LUNCH</span>
        </div>
        <div className="home-nav">
          <a
            className={cn('home-nav-item', {
              'home-nav-item-active': activeTab === 'LUNCH_TIME',
            })}
            onClick={() => setActiveTab('LUNCH_TIME')}
          >
            Lunch Time!
          </a>
          <a
            className={cn('home-nav-item', {
              'home-nav-item-active': activeTab === 'MANAGE_PLACES',
            })}
            onClick={() => setActiveTab('MANAGE_PLACES')}
          >
            Manage Places
          </a>
        </div>
      </header>
      <div className="home-content">
        <ApiRequest apiFn={fetchLunchPlaces} onMount={true}>
          {({ data, makeApiRequest }) => {
            const lunchPlaces = _.get(data, 'data', [])

            if (activeTab === 'LUNCH_TIME') {
              return (
                <LunchTime
                  lunchPlaces={lunchPlaces}
                  onClickAddPlaces={() => setActiveTab('MANAGE_PLACES')}
                  refetchLunchPlaces={makeApiRequest}
                />
              )
            } else if (activeTab === 'MANAGE_PLACES') {
              return (
                <ManagePlaces
                  lunchPlaces={lunchPlaces}
                  refetchLunchPlaces={makeApiRequest}
                />
              )
            }
          }}
        </ApiRequest>
      </div>
    </div>
  )
}

export default HomePage
