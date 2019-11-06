import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Habits from './components/Habits.js'
import './App.css'
import Reward from './components/Reward'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Habits}/>
          <Route exact path="/reward" component={Reward}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
