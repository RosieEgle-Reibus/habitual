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
import { totalEarnedPointsCalc } from './api/main.js'
import { totalPotentialPointsCalc } from './api/main.js'

const initialState = {
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
export default class App extends Component {
  state = {...initialState}

  componentDidMount() {
    getAllHabits()
    //this.refreshComponent()
  }

  refreshComponent = () => {
    axios.get('/api/habit')
      .then((res) => {
        const newState = {...initialState}
        newState.habitList = res.data

        this.setState(newState)
        // this.totalPotentialPointsCalc()
        // this.totalEarnedPointsCalc()
        // this.testFunc()
        // totalEarnedPointsCalc(this.state.habitList)
        this.setPointsEarned()
        this.setPointPotential()
      })
  }
  setPointsEarned = () => {
    let calculatedPoints = totalEarnedPointsCalc(this.state.habitList)
    this.setState({pointsEarned: calculatedPoints})
  }

  setPointPotential = () => {
    let calculatedPoints = totalPotentialPointsCalc(this.state.habitList)
    this.setState({potentialPoints: calculatedPoints})
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

  // totalPotentialPointsCalc = () => {
    
  //   this.state.habitList.map((habit) => {
  //     const previousState = this.state.potentialPoints
  //     if (habit.difficulty <= 5) {
  //       let potPoints = habit.difficulty * 30
  //       let totalPotPoints = previousState + potPoints
  //       this.setState({ potentialPoints: totalPotPoints })
  //       return (totalPotPoints)
  //     } else {
  //       let potPoints = habit.difficulty * 50
  //       let totalPotPoints = previousState + potPoints
  //       this.setState({ potentialPoints: totalPotPoints })
  //       return totalPotPoints
  //     }
  //   })
  // }

  // totalEarnedPointsCalc = () => {
  //   this.state.habitList.map((habit) => {
  //     const previousState = this.state.pointsEarned
  //     if (habit.difficulty <= 5) {
  //       let potPoints = habit.difficulty * 30
  //       let percentDecimals = (habit.totalTimesCompleted / habit.expectedTimesPerDay)
  //       let percent = percentDecimals.toFixed()
  //       let pointsEarnedDecimal = potPoints * percent
  //       let totalPotPoints = previousState + pointsEarnedDecimal
  //       this.setState({ pointsEarned: totalPotPoints })
  //       return totalPotPoints
  //     } else {
  //       let potPoints = habit.difficulty * 50
  //       let percentDecimals = (habit.totalTimesCompleted / habit.expectedTimesPerDay)
  //       let percent = percentDecimals.toFixed()
  //       let pointsEarnedDecimal = potPoints * percent
  //       let totalPotPoints = previousState + pointsEarnedDecimal
  //       this.setState({ pointsEarned: totalPotPoints })
  //       return totalPotPoints
  //     }
  //   })
  // }

  // testFunc = () => {
  //   this.state.habitList.map((habit) => {
  //     const previousState = this.state.potentialPoints
  //     let addExpectedAndCompleted = habit.expectedTimesPerDay + habit.totalTimesCompleted
  //     let addExpectedAndPotentialAndPreviousState = previousState + addExpectedAndCompleted
  //     this.setState({ potentialPoints: addExpectedAndPotentialAndPreviousState })
  //     console.log('expected', habit.expectedTimesPerDay)
  //     console.log('completed', habit.totalTimesCompleted)
  //     console.log('addExpectedAndCompleted', addExpectedAndCompleted)
  //     console.log('previousState', previousState)
  //     console.log('addExpectedAndPotentialAndPreviousState', addExpectedAndPotentialAndPreviousState)
  //     console.log(this.state.potentialPoints)
  //     return addExpectedAndPotentialAndPreviousState
  //   })
  // }


  render() {
    return (
      <div className="App">
        <div>
        <div className="title-border">
          <div className="title-container"><h1 className="title">Habitual</h1></div>
          </div>
        <Router>
          <nav>
            <NavBar />
          </nav>
        <h1 className="tagline">A Habit Tracking App</h1>
       
       
          <Switch>
            <Route exact path="/reward" render={(props) => <Reward {...props} potentialPoints={this.state.potentialPoints}
              pointsEarned={this.state.pointsEarned} />} />
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
              totalEarnedPointsCalc={totalEarnedPointsCalc}
            />
          </Switch>
        </Router>
      </div>
      </div>
    )
  }
}


