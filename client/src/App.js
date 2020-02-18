import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import axios from 'axios'
import './App.css'
import Reward from './components/Reward'
import NavBar from './components/NavBar.jsx'
import EOD from './components/EOD'
import { getAllHabits } from './api/main.js'
import HabitChild from './components/HabitChild.jsx'
import { totalEarnedPointsCalc } from './api/main.js'
import { totalPotentialPointsCalc } from './api/main.js'
import { potentialPointsCalc } from './api/main.js'
import {pointsEarnedCalc} from './api/main.js'

const initialState = {
  habitList: [],
  potentialPoints: 0,
  pointsEarned: 0,
}

export default class App extends Component {
  state = { ...initialState }

  componentDidMount() {
    getAllHabits()
  }

  //Automatically refreshes after componentDidMount to set state for total points earned and potential points
  refreshComponent = () => {
    axios.get('/api/habit')
      .then((res) => {
        const newState = { ...initialState }
        newState.habitList = res.data
        this.setState(newState)
        this.setPointsEarned()
        this.setPointPotential()
      })
  }

  setPointsEarned = () => {
    let calculatedPoints = totalEarnedPointsCalc(this.state.habitList)
    this.setState({ pointsEarned: calculatedPoints })
  }

  setPointPotential = () => {
    let calculatedPoints = totalPotentialPointsCalc(this.state.habitList)
    this.setState({ potentialPoints: calculatedPoints })
  }

  onHabitDeleteClick = (habitId) => {
    axios.delete(`/api/habit/${habitId}`)
      .then(() => {
        this.refreshComponent()
      })
  }

  toggleNavBar = () => {
    const showNav = !this.state.showNav
    this.setState({ showNav })
  }

  render() {
    return (
      <div className="App">
        <div>
          <Router>
            <nav>
              <NavBar />
            </nav>
            <div className="title-border">
              <div className="title-container">
                <h1 className="title">Habitual</h1>
              </div>
            </div>
            <h1 className="tagline">A Habit Tracking App</h1>
            <Switch>
              <Route exact path="/reward" render={(props) => <Reward {...props} potentialPoints={this.state.potentialPoints}
                pointsEarned={this.state.pointsEarned} />} />
              <Route exact path="/EOD" component={EOD} />
              <Route exact path="/habitchild" component={HabitChild} />
              <HabitChild
                habitList={this.state.habitList}
                potentialPoints={this.state.potentialPoints}
                pointsEarned={this.state.pointsEarned}
                refreshComponent={this.refreshComponent}
                onHabitDeleteClick={this.onHabitDeleteClick}
                potentialPointsCalc={potentialPointsCalc}
                pointsEarnedCalc={pointsEarnedCalc} 
              />
            </Switch>
          </Router>
        </div>
      </div>
    )
  }
}


