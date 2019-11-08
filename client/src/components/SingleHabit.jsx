import React, { Component } from 'react'
import axios from 'axios'



export default class SingleHabit extends Component {
    state = {
        changeHabit: {
            habitId: '',
            habit: '',
            expectedTimesPerDay: '',
            difficulty: '',
            totalTimesCompleted: '',
            potentialPoints: '',
            pointsEarned: ''
        },
        editHabit: false,
       
    }

    componentDidMount() {
        const prevState = { ...this.state }
        prevState.changeHabit = this.props
        this.setState(prevState)
        console.log(this.props)
        console.log(this.state)
    }
    onChangeToHabit = (event) => {
        const newChangeHabit = { ...this.state.changeHabit }
        const currentHabit = event.target.value
        newChangeHabit.habit = currentHabit
        this.setState({ changeHabit: newChangeHabit })
    }

    onChangeToTimesExpected = (event) => {
        const newChangeHabit = { ...this.state.changeHabit }
        const currentTimesExpected = event.target.value
        newChangeHabit.expectedTimesPerDay = currentTimesExpected
        this.setState({ changeHabit: newChangeHabit })
    }

    onChangeToDifficulty = (event) => {
        const newChangeHabit = { ...this.state.changeHabit }
        const currentDifficulty = event.target.value
        newChangeHabit.difficulty = currentDifficulty
        this.setState({ changeHabit: newChangeHabit })
    }

    onChangeToTimesCompleted = (event) => {
        const newChangeHabit = { ...this.state.changeHabit }
        const currentTimesCompleted = event.target.value
        newChangeHabit.totalTimesCompleted = currentTimesCompleted
        this.setState({ changeHabit: newChangeHabit })
    }

    changeSingleHabit = (event) => {
        event.preventDefault()
        const { refreshHabits } = this.props
        const { habitId } = this.state.changeHabit
        axios.put(`/api/habit/${habitId}`, this.state.changeHabit)
            .then(() => {
                refreshHabits()
            })
    }

    toggleEditForm = () => {
        const editHabit = !this.state.editHabit
        this.setState({ editHabit })
    }

    percentComplete = () => {
        let percentDecimals = (this.state.changeHabit.totalTimesCompleted /this.state.changeHabit.expectedTimesPerDay  ) * 100
        let percent = percentDecimals.toFixed()
        return percent
    }

    potentialPointsCalc = () => {
       if(this.state.changeHabit.difficulty <= 5) {
           let potentialPoints = this.state.changeHabit.difficulty * 30
           return potentialPoints
       } 
       else {
           let potentialPoints = this.state.changeHabit.difficulty * 50
           return potentialPoints
       }
    }

    pointsEarnedCalc = () => {
        if(this.state.changeHabit.difficulty <= 5) {
            let potentialPoints = this.state.changeHabit.difficulty * 30
            let percentDecimals = (this.state.changeHabit.totalTimesCompleted /this.state.changeHabit.expectedTimesPerDay  )
            let pointsEarned = potentialPoints * percentDecimals
            return pointsEarned
        } 
        else {
            let potentialPoints = (this.state.changeHabit.difficulty * 50)
            let percentDecimals = (this.state.changeHabit.totalTimesCompleted /this.state.changeHabit.expectedTimesPerDay  )
            let pointsEarnedDecimal = potentialPoints * percentDecimals
            let pointsEarned = pointsEarnedDecimal.toFixed()
            return pointsEarned
        }
     }




    render() {
        const {
            habitId,
            habit,
            expectedTimesPerDay,
            difficulty,
            onHabitDeleteClick,
            totalTimesCompleted,
            potentialPoints,
            pointsEarned
        } = this.props

        return (
            <div key={habitId}>
                <h1>{habit}</h1>
                <button onClick={() => onHabitDeleteClick(habitId)}>Delete Habit</button>
                <button onClick={this.toggleEditForm}>Edit Habit</button>
                {/* <h1>You have currently completed {this.percentComplete()}% of your daily goal</h1> */}
                {/* <h3> Potential Points: {this.potentialPointsCalc()}</h3>
                <h1> Points Earned: {this.pointsEarnedCalc()}</h1> */}
                <div>
                    {this.state.editHabit ?
                        <form onSubmit={this.changeSingleHabit}>
                            <input
                                type="String"
                                placeholder="Habit"
                                value={this.state.changeHabit.habit}
                                onChange={this.onChangeToHabit} />
                            <input
                                type="Number"
                                placeholder="Times Expected"
                                value={this.state.changeHabit.expectedTimesPerDay}
                                onChange={this.onChangeToTimesExpected} />
                            <input
                                type="Number"
                                placeholder="Difficulty"
                                value={this.state.changeHabit.difficulty}
                                onChange={this.onChangeToDifficulty} />
                            <input type="Submit" value="Save Changes" />
                        </form> : null}
                    <h2>Difficulty: {difficulty}</h2>
                    <h2>How Many Times You would like to {habit} per day: {expectedTimesPerDay}</h2>
                    <h2>How Many Times You Actually {habit} today: {totalTimesCompleted}</h2>
                    <form onSubmit={this.changeSingleHabit}>
                        <label for="totalTimesCompleted">Log how many times you completed it!</label>
                        <input
                            type="Number"
                            id="totalTimesCompleted"
                            placeholder="Actual Times Completed"
                            value={this.state.changeHabit.totalTimesCompleted}
                            onChange={this.onChangeToTimesCompleted} />
                        <input type="Submit" value="Save Changes" />
                    </form>
                </div>

            </div>
        )
    }
}
