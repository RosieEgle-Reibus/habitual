import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Habits from './components/Habits.js'
import './App.css'
import Reward from './components/Reward'
import Log from './components/HabitLog'
import NavBar from './components/NavBar.jsx'

function App() {
  return (
    <div className="App">
      <Router>
       <nav>
        <NavBar />
       </nav>
        <Switch>
          <Route exact path="/habit" component={Habits}/>
          <Route exact path="/reward" component={Reward}/>
          <Route exact path="/log" component={Log}/>
        </Switch>
      </Router>
    </div>
  );
}


export default App;
