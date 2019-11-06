import React, { Component } from 'react'
import axios from 'axios'



export default class SingleHabit extends Component {
    state = {
        changeHabit : {
            habitId: '',
            habit: '',
            expectedTimesPerDay: '',
            difficulty: ''
        },
        editHabit: false
    }
   
    componentDidMount() {
        const prevState = {...this.state}
        prevState.changeHabit = this.props
        this.setState(prevState)
        console.log(this.props)
        console.log(this.state)
    }
  

    
    onChangeToHabit = (event) => {
        const newChangeHabit = {...this.state.changeHabit}
        const currentHabit = event.target.value 
        newChangeHabit.habit = currentHabit
        this.setState({changeHabit: newChangeHabit})
    }

    onChangeToTimesExpected = (event) => {
        const newChangeHabit = {...this.state.changeHabit}
        const currentTimesExpected = event.target.value 
        newChangeHabit.expectedTimesPerDay = currentTimesExpected
        this.setState({changeHabit: newChangeHabit})
    }

    onChangeToDifficulty = (event) => {
        const newChangeHabit = {...this.state.changeHabit}
        const currentDifficulty = event.target.value 
        newChangeHabit.difficulty = currentDifficulty
        this.setState({changeHabit: newChangeHabit})
    }

    changeSingleHabit = (event) => {
        event.preventDefault()
        const {refreshHabits} = this.props
        const { habitId} = this.state.changeHabitupd
        axios.put(`/api/habit/${habitId}`, this.state.changeHabit)
        .then(() => {
            refreshHabits()
        })
    }

    toggleEditForm = () => {
        const editHabit = !this.state.editHabit
        this.setState({editHabit})
    }


    render() {
        const {
            habitId,
            habit,
            expectedTimesPerDay,
            totalTimesCompleted,
            difficulty,
            onHabitDeleteClick,
        } = this.props

        return (
            <div key={habitId}>
                <h1>{habit}</h1>
                <h2>Difficulty: {difficulty}</h2>
                <h2>How Many Times You would like to {habit} per day: {expectedTimesPerDay}</h2>
                <button onClick={()=> onHabitDeleteClick(habitId)}>Delete Habit</button>
                <button onClick={this.toggleEditForm}>Edit Habit</button>
                
                <div>
                {this.state.editHabit ?
                    <form onSubmit={this.changeSingleHabit}>
                        <input 
                        type="String"
                        placeholder="Habit"
                        value={this.state.changeHabit.habit}
                        onChange={this.onChangeToHabit}/>
                        <input 
                        type="Number"
                        placeholder="Times Expected"
                        value={this.state.changeHabit.expectedTimesPerDay}
                        onChange={this.onChangeToTimesExpected}/>
                        <input 
                        type="Number"
                        placeholder="Difficulty"
                        value={this.state.changeHabit.difficulty}
                        onChange={this.onChangeToDifficulty}/>
                        <input type="Submit" value="Save Changes"/>
                    </form> : null }
                </div>

            </div>
        )
    }
}
