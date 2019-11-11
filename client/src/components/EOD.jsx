import React, { Component } from 'react'

export default class EOD extends Component {
    render() {
       const {
           potentialPoints,
           pointsEarned,
           smallReward
       } = this.props
        return (
            <div>
               <h1>Hi EOD</h1>
              Potential Points: {potentialPoints}
              Points Earned: {pointsEarned}
              Small Rewards: {smallReward}
            </div>
        )
    }
}
