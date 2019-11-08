
import React, { Component } from 'react'
import axios from 'axios'
import SingleHabit from './SingleHabit.jsx'

export default class Habits extends Component {

    /* Step 3
    * Create a state for the component to store view data
    *
    */
    state = {
        habitList: [],
        newHabit: {
            habit: '',
            expectedTimesPerDay: '',
            difficulty: '',
            totalTimesCompleted: '',
            potentialPoints: '',
            pointsEarned: ''
        },
        createHabit: false,
        allPotentialPoints: 0,
        allPointsEarned: 0,

    }
    componentDidMount() {
        axios.get('/api/habit')
            .then((res) => {
                console.log(res.data)
                this.setState({ habitList: res.data })
            })
    }

    refreshComponent = () => {
        axios.get('/api/habit')
            .then((res) => {
                console.log(res.data)
                this.setState({ habitList: res.data })
            })
    }

    createNewHabit = (event) => {
        event.preventDefault()
        axios.post('/api/habit', this.state.newHabit)
            .then(() => {
                this.refreshComponent()
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

    onHabitDeleteClick = (habitId) => {
        axios.delete(`/api/habit/${habitId}`)
            .then(() => {
                this.refreshComponent()
            })
    }

    toggleCreateForm = () => {
        const createHabit = !this.state.createHabit
        this.setState({ createHabit })
    }

    percentComplete = (totalTimesCompleted, expectedTimesPerDay) => {
       
        console.log(totalTimesCompleted)
        let percentDecimals = (totalTimesCompleted / expectedTimesPerDay) * 100
        let percent = percentDecimals.toFixed()
        return percent
    }

    // percentComplete = () => {
    //     let percentDecimals = (habit.pointsEarned / habit.potentialPoints) * 100
    //     let percent = percentDecimals.toFixed()
    //     return percent
    // }




    render() {

        const HabitListElements = this.state.habitList.map((habit) => {
     
            return (
                <div>
                    <SingleHabit
                        habitId={habit._id}
                        habit={habit.habit}
                        expectedTimesPerDay={habit.expectedTimesPerDay}
                        totalTimesCompleted={habit.totalTimesCompleted}
                        difficulty={habit.difficulty}
                        onHabitDeleteClick={this.onHabitDeleteClick}
                        changeSingleHabit={this.changeSingleHabit}
                        refreshHabits={this.refreshComponent}
                        potentialPoints={this.potentialPoints} 
                        pointsEarned={this.pointsEarned}
                    />
                    <h1>Percent: {this.percentComplete(habit.totalTimesCompleted, habit.expectedTimesPerDay)}</h1>
                </div>

            )
        })

        return (
            <div>
                <h1>Daily Habits You want to Work On</h1>
                <button onClick={this.toggleCreateForm}>Add New Habit</button>
                {this.state.createHabit ?
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
                    </form> : null}
                {HabitListElements}

            </div>
        )
    }
}
