
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
        potentialPoints: 0

    }
    componentDidMount() {
        axios.get('/api/habit')

            .then((res) => {
                console.log(res.data)
                this.setState({ habitList: res.data })
                this.testFunc()
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

        let percentDecimals = (totalTimesCompleted / expectedTimesPerDay) * 100
        let percent = percentDecimals.toFixed()
        return percent
    }

    potentialPointsCalc = (difficulty) => {
        if (difficulty <= 5) {
            let potentialPoints = difficulty * 30
            return potentialPoints
        } else {
            let potentialPoints = difficulty * 50
            return potentialPoints
        }
    }

    pointsEarnedCalc = (difficulty, totalTimesCompleted, expectedTimesPerDay) => {
        if (difficulty <= 5) {
            let potentialPoints = difficulty * 30
            let percentDecimals = (totalTimesCompleted / expectedTimesPerDay)
            let pointsEarnedDecimal = potentialPoints * percentDecimals
            let pointsEarned = pointsEarnedDecimal.toFixed()
            return pointsEarned
        } else {
            let potentialPoints = difficulty * 50
            let percentDecimals = (totalTimesCompleted / expectedTimesPerDay)
            let pointsEarnedDecimal = potentialPoints * percentDecimals
            let pointsEarned = pointsEarnedDecimal.toFixed()
            return pointsEarned
        }

    }

    // addPotentialPoints = (difficulty) => {
    //     let totalPotentialPoints += this.potentialPointsCalc(difficulty)
    //     this.setState({allPotentialPoints : totalPotentialPoints})
    // }

testFunc = () => { this.state.habitList.map((habit) => {
    const previousState = this.state.potentialPoints
    let test= habit.expectedTimesPerDay + habit.totalTimesCompleted
    let addition = previousState + test
    this.setState({potentialPoints: addition})
    console.log(test)
    console.log(addition)
    console.log(previousState)
        
    })
}

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
                        potentialPointsCalc={this.potentialPointsCalc}
                        pointsEarnedCalc={this.pointsEarnedCalc}
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
