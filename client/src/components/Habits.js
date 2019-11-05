
import React, { Component } from 'react'
import axios from 'axios'
import SingleHabit from './SingleHabit.jsx'

export default class Habits extends Component {

    /* Step 3
    * Create a state for the component to store view data
    *
    */
    state = {
        habitList: []
    }

    /* Step 4
    * Use componentDidMount to retrieve any data to display
    *   Here you can make calls to your local express server
    *   or to an external API
    *   setState can be run here as well
    *   -REMINDER remember `setState` it is an async function
    */
    componentDidMount() {
        axios.get('/api/habit')
            .then((res) => {
                console.log(res.data)
                this.setState({habitList: res.data})
            })
    }

    /* Step 5
    *  The render function manages what is shown in the browser
    *  TODO: delete the jsx returned
    *   and replace it with your own custom jsx template
    *
    */
    render() {
        const HabitListElements = this.state.habitList.map((habit) => {
            return (
                <div>
                   
                </div>
            )
        })

        return (
            <div>
                {/* Accessing the value of message from the state object */}
                <h1>Daily Habits You want to Work On</h1>
            </div>
        )
    }
}
