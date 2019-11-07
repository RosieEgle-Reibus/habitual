import React, { Component } from 'react'
import axios from 'axios'


export default class HabitLog extends Component {
    state = {
        habitList: [],
        totalCompletions: 0,
        totalTimesCompleted: '' 
    }
  componentDidMount() {
      axios.get('/api/habit')
      .then((res) => {
          this.setState({habitList : res.data})
      })
  }
  refereshCompletions = () => {
    axios.get('/api/habit')
    .then((res) => {
        this.setState({habitList : res.data})
    })
  }

  changeSingleHabit = (event) => {
      event.preventDefault()
      axios.put(`/api/habit/${this.state.habitId}`, this.state.totalTimesCompleted)
      .then(() => {
          this.refereshCompletions()
      })
  }
  onChangeCompletion = (event) => {
      const previousState = {...this.state}
      const newCompletion = event.target.value 
      previousState.totalTimesCompleted = newCompletion
      this.setState({ previousState})
  }


    render() {
       const HabitListElements = this.state.habitList.map((habit) => {
          return(
              <div key={habit._id}>
              <h1>{habit.habit}</h1>
              <h2>Daily Goal for Completions: {habit.expectedTimesPerDay}</h2>
              <h2>Times Completed Today: {habit.totalTimesCompleted}</h2>
              <form onSubmit={this.changeSingleHabit}> 
                  <input 
                  type="Number"
                  placeholder="Number Completed"
                  value={habit.totalTimesCompleted}/>
                  <input type="Submit" value="Add Completion" 
                  onChange={this.onChangeCompletion}/>
              </form>
              </div>
          ) 
       })
        return (
            <div>
               <h1>Log from a tree</h1>
            {HabitListElements}
           
            </div>
        )
    }
}
