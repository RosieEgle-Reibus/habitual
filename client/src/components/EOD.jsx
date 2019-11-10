import React, { Component } from 'react'

export default class EOD extends Component {
    render() {
        console.log('pointsEarned', this.props.match.params.pointsEarned)
        console.log('potentialPoints', this.props.match.params.potentialPoints)
        return (
            <div>
                HI
            </div>
        )
    }
}
