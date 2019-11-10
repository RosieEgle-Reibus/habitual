import React, { Component } from 'react'

export default class EOD extends Component {
    render() {
       const {
           potentialPoints,
           pointsEarned
       } = this.props
        return (
            <div>
               Hi EOD 
              Potential Points: {potentialPoints}
              Points Earned: {pointsEarned}
            </div>
        )
    }
}
