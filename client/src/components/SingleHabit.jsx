import React, { Component } from 'react'
import axios from 'axios'



export default class SingleHabit extends Component {
    render() {
        const {
            habitId,
            habit,
            expectedTimesPerDay,
            totalTimesCompleted,
            difficulty
        } = this.props
        return (
            <div key={habitId}>
                <h1>{habit}</h1>

            </div>
        )
    }
}
