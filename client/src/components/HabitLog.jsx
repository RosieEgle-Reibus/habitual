import React, { Component } from 'react'
import axios from 'axios'
import SingleHabit from './SingleHabit.jsx'


export default class HabitLog extends Component {
    state = {
        habitList: [],
        totalCompletes: 0,
        habitId: '',
        changeCompletions: {
            totalTimesCompleted: ''
        }
    }
    // componentDidMount() {
    //     axios.get('/api/habit')
    //         .then((res) => {
    //             this.setState({ habitList: res.data},
    //                 )
    //         })
    // }
    refereshCompletions = () => {
        axios.get('/api/habit')
            .then((res) => {
                this.setState({ habitList: res.data })
            })
    }

    changeSingleHabit = (event, habitId) => {
        console.log(event)
        event.preventDefault()
        axios.put(`/api/habit/${habitId}`, this.state.changeCompletions)
            .then(() => {
                this.refereshCompletions()
            })
    }
    onChangeCompletion = (event) => {
        const previousState = { ...this.state.changeCompletions }
        const currentCompletion = event.target.value
        previousState.totalTimesCompleted = currentCompletion
        this.setState({ changeCompletions: previousState })
    }

    onChange = (event) => {
        const copyChangeCompletions = { ...this.state.changeCompletions}
        copyChangeCompletions[event.target.name] = event.target.value 
        this.setState({ changeCompletions: copyChangeCompletions})
    }

    // const completionElements = this.state.habitList.map((habit) => {
    //     let totalCompletes = this.state.totalCompletes + parseInt({habit.totalTimesCompleted})

    //     return(
    //         totalCompletes
    //     )
    // })

    render() {
        // const HabitListElements = this.state.habitList.map((habit) => {
        //     console.log(habit)
            
        //     return (
        //         <div key={habit._id}>
        //             <h1>{habit.habit}</h1>
        //             <h2>Daily Goal for Completions: {habit.expectedTimesPerDay}</h2>
        //             <h2>Times Completed Today: {this.state.changeCompletions.totalTimesCompleted}</h2>
        //             <form onSubmit={(e)=> this.changeSingleHabit(e, habit._id)}>
        //                 <input
        //                     type="Number"
        //                     placeholder="Number Completed"
        //                     value={this.state.changeCompletions.totalTimesCompleted}
        //                     name="totalTimesCompleted"
        //                     onChange={this.onChange} />
        //                     <input
        //                     type="hidden"
        //                     placeholder="Id"
        //                     name="habitId"
        //                     value={habit._id}
        //                     onChange={this.onChange}
        //                      />
        //                 <input type="Submit" value="Add Completion"
        //                      />
        //             </form>
        //         </div>
        //     )
        // })
       
        return (
            <div>
                 <SingleHabit />
                <h1>Log from a tree</h1>
                {/* {HabitListElements} */}
            </div>
        )
    }
}
