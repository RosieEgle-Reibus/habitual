import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import axios from 'axios'
// import Habits from './components/Habits.js'
import './App.css'
import Reward from './components/Reward'
import NavBar from './components/NavBar.jsx'
import EOD from './components/EOD'
import { getAllHabits } from './api/main.js'
import HabitChild from './components/HabitChild.jsx'


export default class App extends Component {
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
    potentialPoints: 0,
    pointsEarned: 0
  }

  componentDidMount() {
    //getAllHabits()
    this.refreshComponent()
    //  this.testFunc()
  }

  refreshComponent = () => {
    axios.get('/api/habit')
      .then((res) => {
        // console.log(allHabits)
        console.log('Habit List', this.state.habitList)
        this.setState({ habitList: res.data })
        this.totalPotentialPointsCalc()
        this.totalEarnedPointsCalc()
        // console.log('Potential Points', this.state.potentialPoints)
        // console.log('Points Earned', this.state.pointsEarned)
        // this.testFunc()
      })
  }

  onHabitDeleteClick = (habitId) => {
    axios.delete(`/api/habit/${habitId}`)
      .then(() => {
        this.refreshComponent()
      })
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

  totalPotentialPointsCalc = () => {
    this.state.habitList.map((habit) => {
      const previousState = this.state.potentialPoints
      if (habit.difficulty <= 5) {
        let potPoints = habit.difficulty * 30
        let totalPotPoints = previousState + potPoints
        this.setState({ potentialPoints: totalPotPoints })
        return (totalPotPoints)
      } else {
        let potPoints = habit.difficulty * 50
        let totalPotPoints = previousState + potPoints
        this.setState({ potentialPoints: totalPotPoints })
        return totalPotPoints
      }
    })
  }

  totalEarnedPointsCalc = () => {
    this.state.habitList.map((habit) => {
      const previousState = this.state.pointsEarned
      if (habit.difficulty <= 5) {
        let potPoints = habit.difficulty * 30
        let percentDecimals = (habit.totalTimesCompleted / habit.expectedTimesPerDay)
        let percent = percentDecimals.toFixed()
        let pointsEarnedDecimal = potPoints * percent
        let totalPotPoints = previousState + pointsEarnedDecimal
        this.setState({ pointsEarned: totalPotPoints })
        return totalPotPoints
      } else {
        let potPoints = habit.difficulty * 50
        let percentDecimals = (habit.totalTimesCompleted / habit.expectedTimesPerDay)
        let percent = percentDecimals.toFixed()
        let pointsEarnedDecimal = potPoints * percent
        let totalPotPoints = previousState + pointsEarnedDecimal
        this.setState({ pointsEarned: totalPotPoints })
        return totalPotPoints
      }
    })
  }

  testFunc = () => {
    this.state.habitList.map((habit) => {
      const previousState = this.state.potentialPoints
      let test = habit.expectedTimesPerDay + habit.totalTimesCompleted
      let addition = previousState + test
      this.setState({ potentialPoints: addition })
      console.log('expected', habit.expectedTimesPerDay)
      console.log('completed', habit.totalTimesCompleted)
      console.log('test', test)
      console.log('addition', addition)
      console.log('previousState', previousState)
      console.log(this.state.potentialPoints)
      return addition
    })
  }


  render() {
    return (
      <div className="App">
        <div>
        {/* <h2>Total Points Earned {this.state.pointsEarned}</h2>
                <h2>Total Potential Points {this.state.potentialPoints}</h2> */}
        <h1> App Hi</h1>
        <i className="material-icons md-48">face</i>
        <i className="material-icons md-48">ring_volume</i>
        <Router>
          <nav>
            <NavBar />
          </nav>
          <Switch>
            <Route exact path="/reward" render={(props) => <Reward {...props} potentialPoints={this.state.potentialPoints}
              pointsEarned={this.state.pointsEarned} />} />

            {/* <Route exact path="/eod"
              render={(props) => <EOD {...props} potentialPoints={this.state.potentialPoints}
                pointsEarned={this.state.pointsEarned} />}
            /> */}
            <Route exact path="/EOD" component={EOD}/>
            <Route exact path="/habitchild" component={HabitChild} />
            <HabitChild
              habitList={this.state.habitList}
              newHabit={this.state.newHabit}
              createHabit={this.state.createHabit}
              potentialPoints={this.state.potentialPoints}
              pointsEarned={this.state.pointsEarned}
              refreshComponent={this.refreshComponent}
              createNewHabit={this.createNewHabit}
              onCreateHabit={this.onCreateHabit}
              onCreateTimesExpected={this.onCreateTimesExpected}
              onCreateDifficulty={this.onCreateDifficulty}
              onHabitDeleteClick={this.onHabitDeleteClick}
              toggleCreateForm={this.toggleCreateForm}
              percentComplete={this.percentComplete}
              potentialPointsCalc={this.potentialPointsCalc}
              pointsEarnedCalc={this.pointsEarnedCalc}
              totalPotentialPointsCalc={this.totalPotentialPointsCalc}
              totalEarnedPointsCalc={this.state.totalEarnedPointsCalc}
            />



          </Switch>
        </Router>
      </div>
      </div>
    )
  }
}


