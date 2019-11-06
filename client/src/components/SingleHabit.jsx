import React, { Component } from 'react'
import axios from 'axios'



export default class SingleHabit extends Component {
    render() {
        const {
            habitId,
            habit,
            expectedTimesPerDay,
            totalTimesCompleted,
            difficulty,
            onHabitDeleteClick
        } = this.props


        return (
            <div key={habitId}>
                <h1>{habit}</h1>
                <h2>Difficulty: {difficulty}</h2>
                <h2>How Many Times You would like to {habit} per day: {expectedTimesPerDay}</h2>
                <button onClick={()=> onHabitDeleteClick(habitId)}>Delete Habit</button>

            </div>
        )
    }
}
