import React, { Component } from 'react'
import axios from 'axios'
import SingleHabit from './SingleHabit.jsx'

import { getAllHabits } from '../api/main.js'

export default class HabitChild extends Component {
    state = {
        newHabit: {
            habit: '',
            expectedTimesPerDay: '',
            difficulty: '',
            totalTimesCompleted: '',
            potentialPoints: '',
            pointsEarned: ''
        }
    }

    componentDidMount() {
        getAllHabits()
        
        .then(() => {
            const { habitList } = this.props
        console.log(habitList)
            const { refreshComponent } = this.props 
            refreshComponent()
        })
        
    }




    createNewHabit = (event) => {
        event.preventDefault()
        axios.post('/api/habit', this.state.newHabit)

            .then(() => {
                const { refreshComponent } = this.props
                refreshComponent()
            })
    }

    onCreateHabit = (event) => {
        const previousState = { ...this.state }
        const newHabitHabit = event.target.value
        previousState.newHabit.habit = newHabitHabit
        this.setState({ previousState })
    }

    onCreateTimesExpected = (event) => {
        const previousState = { ...this.state }
        const newHabitTimesExpected = event.target.value
        previousState.newHabit.expectedTimesPerDay = newHabitTimesExpected
        this.setState({ previousState })
    }

    onCreateDifficulty = (event) => {
        const previousState = { ...this.state }
        const newHabitDifficulty = event.target.value
        previousState.newHabit.difficulty = newHabitDifficulty
        this.setState({ previousState })
    }
    render() {
        const {
            habitList,
            newHabit,
            potentialPoints,
            pointsEarned,
            refreshComponent,
            onHabitDeleteClick,
            toggleCreateForm,
            percentComplete,
            potentialPointsCalc,
            pointsEarnedCalc,
            totalPotentialPointsCalc,
            totalEarnedPointsCalc

        } = this.props

        const HabitListElements = habitList.map((habit) => {
            return (

                <div>
                    <SingleHabit
                        habitId={habit._id}
                        habit={habit.habit}
                        expectedTimesPerDay={habit.expectedTimesPerDay}
                        totalTimesCompleted={habit.totalTimesCompleted}
                        difficulty={habit.difficulty}
                        onHabitDeleteClick={onHabitDeleteClick}
                        refreshHabits={refreshComponent}
                        potentialPoints={potentialPoints}
                        pointsEarned={pointsEarned}
                        potentialPointsCalc={potentialPointsCalc}
                        pointsEarnedCalc={pointsEarnedCalc}
                    />
                    <h1>Percent: {percentComplete(habit.totalTimesCompleted, habit.expectedTimesPerDay)}</h1>

                </div>

            )
        })


        return (
            <div>
                <h1>Habit Child Hi</h1>
                <h2>Total Points Earned {pointsEarned}</h2>
                <h2>Total Potential Points {potentialPoints}</h2>

                <form onSubmit={this.createNewHabit}>
                    <label for="habit">Add a Habit</label>
                    <input
                        type="string"
                        placeholder="New Habit"
                        id="habit"
                        name="newHabit.name"
                        value={this.state.newHabit.habit}
                        onChange={this.onCreateHabit} />
                    <label for="Texpected">How many times a day do you think you can realistically complete the habit?</label>
                    <input
                        type="number"
                        id="Texpected"
                        placeholder="Times Expected"
                        value={this.state.newHabit.expectedTimesPerDay}
                        onChange={this.onCreateTimesExpected} />
                    <label for="difficulty">How hard is it to make yourself do it?</label>
                    <input
                        type="number"
                        id="difficulty"
                        placeholder="Times Expected"
                        value={this.state.newHabit.difficulty}
                        onChange={this.onCreateDifficulty} />
                    <input type="Submit" value="Make a New Habit!" />
                </form>
                {HabitListElements}
            </div>
        )
    }
}
