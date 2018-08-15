import React, { Component } from 'react'
import _ from 'lodash'
import cn from 'classnames'

import { fetchLunchPlaces } from '../../../services/api/lunchPlaces'

import ApiRequest from '../../reusable/api/ApiRequest'
import LunchTime from './LunchTime'
import ManagePlaces from './ManagePlaces'

class HomePage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      activeTab: 'LUNCH_TIME',
    }

    this.changeActiveTab = this.changeActiveTab.bind(this)
  }

  /**
   * Changes the active tab.
   *
   * @param {String} activeTab
   */
  changeActiveTab(activeTab) {
    this.setState({
      activeTab,
    })
  }

  render() {
    const { activeTab } = this.state

    return (
      <div className="home-page page">
        <header>
          <div className="logo">
            divvy<span className="logo-emphasis">LUNCH</span>
          </div>
          <div className="home-nav">
            <a
              className={cn('home-nav-item', {
                'home-nav-item-active': activeTab === 'LUNCH_TIME',
              })}
              onClick={() => this.changeActiveTab('LUNCH_TIME')}
            >
              Lunch Time!
            </a>
            <a
              className={cn('home-nav-item', {
                'home-nav-item-active': activeTab === 'MANAGE_PLACES',
              })}
              onClick={() => this.changeActiveTab('MANAGE_PLACES')}
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
                    onClickAddPlaces={() =>
                      this.changeActiveTab('MANAGE_PLACES')
                    }
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
}

export default HomePage
